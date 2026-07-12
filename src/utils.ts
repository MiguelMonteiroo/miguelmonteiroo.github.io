import type { CollectionEntry } from 'astro:content';

export function slugFromId(id: string): string {
  return id.replace(/\.md$/, '').replace(/\/index\.md$/, '');
}

export function getSortedPosts(
  posts: CollectionEntry<'posts'>[],
  dates: Record<string, string>,
  limit?: number,
) {
  return posts
    .map((p) => ({
      slug: slugFromId(p.id),
      title: p.data.title,
      date: dates[slugFromId(p.id)] || null,
    }))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, limit);
}
