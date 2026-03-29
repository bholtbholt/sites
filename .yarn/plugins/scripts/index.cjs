module.exports = {
	name: `plugin-scripts`,
	factory: (require) => {
		const { BaseCommand } = require(`@yarnpkg/cli`);
		const { Configuration, Project, structUtils, formatUtils } = require(`@yarnpkg/core`);
		const { Command } = require(`clipanion`);

		class ScriptsListCommand extends BaseCommand {
			static paths = [['scripts']];

			static usage = Command.Usage({
				description: `List all available scripts including global scripts from other workspaces`,
				examples: [[`List all available scripts`, `yarn scripts`]],
			});

			async execute() {
				const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
				const { project, workspace } = await Project.find(configuration, this.context.cwd);

				await project.restoreInstallState();

				const localScripts = workspace.manifest.scripts;

				const scriptsByName = new Map();

				for (const ws of project.workspaces) {
					for (const [name, command] of ws.manifest.scripts) {
						if (!name.includes(':')) continue;

						if (!scriptsByName.has(name)) {
							scriptsByName.set(name, []);
						}
						scriptsByName.get(name).push({ workspace: ws, command });
					}
				}

				const isRoot = workspace.cwd === project.cwd;

				const globalScripts = [];
				for (const [name, entries] of scriptsByName) {
					if (entries.length !== 1) continue;
					if (!isRoot && localScripts.has(name)) continue;

					const ws = entries[0].workspace;
					const wsName = ws.manifest.name
						? structUtils.stringifyIdent(ws.manifest.name)
						: ws.relativeCwd;

					globalScripts.push({ name, command: entries[0].command, source: wsName });
				}

				globalScripts.sort((a, b) => a.name.localeCompare(b.name));
				const globalScriptNames = new Set(globalScripts.map((s) => s.name));

				const allNames = [...globalScriptNames, ...[...localScripts.keys()]];
				const maxLen = Math.max(...allNames.map((n) => n.length), 0);
				const pad = (str) => str.padEnd(maxLen + 4);

				const { stdout } = this.context;
				const bold = (s) => formatUtils.applyStyle(configuration, s, formatUtils.Style.BOLD);
				const colorName = (s) => formatUtils.pretty(configuration, s, formatUtils.Type.NAME);
				const colorCmd = (s) => formatUtils.pretty(configuration, s, formatUtils.Type.RANGE);
				const cleanCmd = (s) =>
					s
						.replace(/\s*--cwd=\$INIT_CWD/g, '')
						.replace(/\s*--root=\$PROJECT_CWD/g, '')
						.replace(/\w+=\$PROJECT_CWD\s*/g, '')
						.replace(/cd\s+\$INIT_CWD\s*&&\s*/g, '')
						.replace(/\$PROJECT_CWD\//g, '')
						.replace(/\$PROJECT_CWD/g, '')
						.replace(/\$INIT_CWD\//g, '')
						.replace(/\$INIT_CWD/g, '')
						.replace(/[\r\n]/g, '')
						.replace(/\s{2,}/g, ' ')
						.trim();

				if (globalScripts.length > 0) {
					stdout.write(`🌎 ${bold('Global scripts:')}\n`);
					for (const { name, command } of globalScripts) {
						stdout.write(`${colorName(pad(name))} ${colorCmd(`${cleanCmd(command)}`)}\n`);
					}
					stdout.write(`\n`);
				}

				stdout.write(`🏡 ${bold('Local scripts:')}\n`);
				for (const [name, command] of localScripts) {
					if (globalScriptNames.has(name)) continue;
					stdout.write(`${colorName(pad(name))} ${colorCmd(`${command}`)}\n`);
				}
			}
		}

		return {
			commands: [ScriptsListCommand],
		};
	},
};
