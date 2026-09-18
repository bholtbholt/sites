import { docs } from '$lib/docs';
import { site } from '$lib/site';
import { seo } from '$lib/seo';

export const prerender = true;

/**
 * Strips the YAML frontmatter and any HTML comments from a doc's raw markdown, and demotes
 * every heading one level so it nests under the `##` title this file gives each doc. The
 * frontmatter is metadata and the comments are editorial notes to ourselves — neither
 * belongs in something an answer engine ingests as prose.
 */
const body = (source: string) =>
	source
		.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/^(#{1,5}) /gm, '#$1 ')
		// Absolute links: this file gets read away from the site, where `/docs/…` resolves
		// against whatever host is doing the reading.
		.replace(/\]\(\//g, `](${site.domain}/`)
		.replace(/\n{3,}/g, '\n\n')
		.trim();

// The whole documentation set as one file. llms.txt is an index; this is the text itself,
// so a crawler that wants the substance can take it in a single request rather than
// walking every page.
export function GET() {
	const pages = docs
		.map(
			(doc) =>
				`## ${doc.title}\n\nURL: ${site.domain}/docs/${doc.slug}\nQuestion answered: ${doc.question}\nLast updated: ${doc.updated}\n\n${body(doc.source)}`,
		)
		.join('\n\n---\n\n');

	return new Response(
		`# ${site.name} — full documentation

> ${seo.description}

This file contains the complete text of every guide at ${site.domain}/docs. The index, with
the app's features, supported hardware, and FAQ, is at ${site.domain}/llms.txt.

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
