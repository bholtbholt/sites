import { docs } from '$lib/docs';
import { site } from '$lib/site';
import { seo } from '$lib/seo';

export const prerender = true;

/**
 * Strips the YAML frontmatter, demotes every heading one level so it nests under the `##`
 * title this file gives each doc, and makes site links absolute.
 */
const body = (source: string) =>
	source
		.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/^(#{1,5}) /gm, '#$1 ')
		.replace(/\]\(\//g, `](${site.domain}/`)
		.replace(/<kbd>(.*?)<\/kbd>/g, '`$1`')
		.replace(/\n{3,}/g, '\n\n')
		.trim();

// The whole documentation set as one file. llms.txt is an index; this is the text itself.
export function GET() {
	const pages = docs
		.map((doc) => `## ${doc.title}\n\nURL: ${site.domain}/docs/${doc.slug}\n\n${body(doc.source)}`)
		.join('\n\n---\n\n');

	return new Response(
		`# ${site.name} — full documentation

> ${seo.description}

This file contains the complete text of every guide at ${site.domain}/docs. The index, with
the app's features and FAQ, is at ${site.domain}/llms.txt.

---

${pages}

---

## Contact

- General: ${site.email}
- Bugs: ${site.bugs}
`,
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
	);
}
