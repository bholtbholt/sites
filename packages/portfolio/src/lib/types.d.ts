import type { SvelteComponent } from 'svelte';
export type WorkMetaData = {
  byline: string;
  category: 'article' | 'game' | 'class' | 'project' | 'talk';
  jump_line: string;
  published?: boolean;
  publisher: string;
  publisher_url: string;
  title: string;
};

export type Work = WorkMetaData & {
  date: string;
  slug: string;
  content: typeof SvelteComponent;
};

export type MaybeField<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
