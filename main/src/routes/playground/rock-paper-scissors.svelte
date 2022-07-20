<script lang="ts">
	import RPSGame from '$lib/playground/rock-paper-scissors/Game.svelte';
</script>

<!-- Rock paper scissors without the copyright infringement -->

<svelte:head>
	<title>Svelte Playground: Rock, paper, scissors by Kim Moran</title>
	<meta name="description" content="Rock, paper, scissors, built in SvelteKit by Kim Moran" />
</svelte:head>

<div class="window">
	<RPSGame />
</div>

<style>
	.window {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
