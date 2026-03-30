<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Rishi's Blog</title>
</svelte:head>

<div class="flex flex-col border-t-2 border-zinc-900 dark:border-zinc-100">
	{#each data.posts as post}
		<a 
			href="/blog/{post.slug}" 
			class="group flex flex-col sm:flex-row sm:items-center justify-between py-6 px-4 border-b-2 border-zinc-900 dark:border-zinc-100 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
		>
			<h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-50 dark:group-hover:text-zinc-900 transition-colors">
				{post.title}
			</h2>
			
			<time class="mt-2 sm:mt-0 text-sm font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600 uppercase tracking-widest transition-colors">
				{new Date(post.date).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' })}
			</time>
		</a>
	{/each}
</div>
