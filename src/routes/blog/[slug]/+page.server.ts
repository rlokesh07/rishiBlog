import { getAllPosts } from '$lib/posts';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
	const posts = await getAllPosts();
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) throw error(404, 'Post not found');
	return { slug: params.slug, meta: post };
}

export async function entries() {
	const posts = await getAllPosts();
	return posts.map((p) => ({ slug: p.slug }));
}
