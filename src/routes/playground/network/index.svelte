<!--  -->
<script lang="ts">
	import Network from '$lib/playground/network/Networking.svelte';
	export let success: boolean;
</script>

<!-- script module - load to make an endpoint -->

<svelte:head>
	<title>Svelte Playground: Contact Page</title>
	<meta name="description" content="Workers/KV Storage Route for Contact Form" />
</svelte:head>

<div class="window">
	<Network />
	<!-- just making sure my stuff is connecting -->
	{success}
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
