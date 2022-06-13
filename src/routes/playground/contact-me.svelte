<script lang="ts">
	import Contact from '$lib/playground/contact-me/Contact.svelte';

	import type { RequestEvent } from '@sveltejs/kit/types/private';

	export async function get({ platform }: RequestEvent) {
		const result = (await platform.env.CONTACTS.get('data')) || '';
		console.log(result);
		return result;
	}

	export async function put({ platform }: RequestEvent) {
		const updates = await platform.env.CONTACTS.put('data', { data });
		console.log(updates);

		return { body: { success: true } };
	}
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
