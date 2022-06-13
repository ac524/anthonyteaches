<script lang="ts">
	import Contact from '$lib/playground/contact-me/Contact.svelte';
	export let errors: any;
</script>

<svelte:head>
	<title>Svelte Playground: Contact Page</title>
	<meta name="description" content="Workers/KV Storage Route for Contact Form" />
</svelte:head>

<div class="window">
	<Contact />
	{#if errors?.title}
		<p class="error">{errors.title}</p>
	{/if}
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
