<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();
	
	let isDark = $state(false);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
		
		// Optional: listen for system theme changes if no explicit preference is set
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			if (!('theme' in localStorage)) {
				isDark = e.matches;
				if (isDark) document.documentElement.classList.add('dark');
				else document.documentElement.classList.remove('dark');
			}
		};
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	});

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Clean Background Base -->
<div class="fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-500 bg-zinc-50 dark:bg-zinc-950">
</div>

<div class="min-h-screen flex flex-col relative z-0">
	<!-- Solid Rugged Header -->
	<header class="sticky top-0 z-50 w-full border-b-2 border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
		<div class="max-w-4xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
			<a href="/" class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">
				Rishi Lokesh
			</a>
			<div class="flex items-center gap-4">
				<button 
					onclick={toggleTheme}
					class="p-2 border-2 border-zinc-900 dark:border-zinc-100 bg-transparent text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
					aria-label="Toggle theme"
				>
					{#if isDark}
						<!-- Sun Icon -->
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					{:else}
						<!-- Moon Icon -->
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-grow max-w-4xl mx-auto w-full px-4 md:px-6 py-12">
		{@render children()}
	</main>
	
	<!-- Minimal Footer -->
	<footer class="w-full border-t border-zinc-200/50 dark:border-zinc-800/50 mt-auto py-8">
		<div class="max-w-4xl mx-auto px-4 md:px-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
			&copy; {new Date().getFullYear()} Rishi's Blog. Built with SvelteKit & Tailwind.
		</div>
	</footer>
</div>


