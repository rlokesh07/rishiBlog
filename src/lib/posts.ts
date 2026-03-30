export interface PostMeta {
	title: string;
	date: string;
	slug: string;
	description: string;
	tags: string[];
}

export async function getAllPosts(): Promise<PostMeta[]> {
	const modules = import.meta.glob('../posts/*.{md,svx}', { eager: false });

	const posts: PostMeta[] = [];

	for (const path in modules) {
		const mod = await (modules[path] as () => Promise<{ metadata: PostMeta }>)();
		posts.push(mod.metadata);
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
