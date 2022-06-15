<script lang="ts">
	import Contact from '$lib/playground/contact/Contact.svelte';

</script>

<svelte:head>
	<title>Svelte Playground: Contact Page</title>
	<meta name="description" content="Workers/KV Storage Route for Contact Form" />
</svelte:head>

<div class="window">
	<Contact />

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
