<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const post = $derived(import(`../../../posts/${data.slug}.md`));
</script>

<svelte:head>
	<title>{data.meta.title} - Rishi's Blog</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<div class="max-w-3xl mx-auto">
	<div class="mb-10">
		<a href="/" class="inline-flex items-center gap-2 px-4 py-2 border-2 border-zinc-900 dark:border-zinc-100 text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 uppercase tracking-wider transition-colors group w-fit">
			<svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			Back
		</a>
	</div>

	<header class="mb-12">
		<h1 class="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase leading-none mb-6">
			{data.meta.title}
		</h1>
		{#if data.meta.description}
			<p class="text-xl text-zinc-700 dark:text-zinc-300 font-medium">
				{data.meta.description}
			</p>
		{/if}
	</header>

	<div class="w-full h-px bg-zinc-200 dark:bg-zinc-800 mb-12"></div>

	<article class="prose max-w-none">
		{#await post}
			<div class="flex items-center space-x-4 animate-pulse">
				<div class="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
			</div>
		{:then { default: Post }}
			<Post />
		{/await}
	</article>
</div>
