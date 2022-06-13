<script lang="ts">
	// Starting template: https://gist.github.com/danawoodman/1aba56c63e2c268ae840b4a9d66f869a
	import Field from './Field.svelte';
	import put from '../../../routes/playground/contact-me.svelte';
	import { blur } from 'svelte/transition';

	let name = '';
	let linkedIn = '';
	let github = '';
	let nameValid: boolean = false;
	let linkedInIsValid: boolean = false;
	let githubValid: boolean = false;
	let submitting: boolean = false;
	let valid = false;
	var data: Object = {};
	// $: makes the field reactive! :)
	$: {
		valid = nameValid && linkedInIsValid && githubValid;
	}
	async function handleSubmit() {
		submitting = true;
		let data = { name: name, github: github, linkedIn: linkedIn };
		await new put(data);
		console.log(data);
		alert('Form submitted successfully');
	}
	function handleValidateName(val: string) {
		return val?.length > 3;
	}
	function handleValidateLinkedIn(val: string) {
		console.log(val);
		return /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/i?.test(val);
	}

	function handleValidateGitHub(val: string) {
		val.toLowerCase();
		console.log(val);
		return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i?.test(val);
	}
</script>

<section transition:blur={{ delay: 300, duration: 800 }}>
	<form on:submit|preventDefault={handleSubmit}>
		<h1>Get added to the networking page!</h1>
		<Field
			label="Name"
			disabled={submitting}
			bind:value={name}
			bind:valid={nameValid}
			validate={handleValidateName}
		/>
		<Field
			label="LinkedIn"
			disabled={submitting}
			bind:value={linkedIn}
			bind:valid={linkedInIsValid}
			validate={handleValidateLinkedIn}
		/>
		<Field
			label="GitHub"
			disabled={submitting}
			bind:value={github}
			bind:valid={githubValid}
			validate={handleValidateGitHub}
		/>
		<p>
			<button type="submit" disabled={!valid || submitting}>Add me to the networking list!</button>
		</p>
	</form>
</section>

<style lang="css">
	h1 {
		font-family: 'Times New Roman', Times, serif;
		font-size: 32px;
		color: black;
	}

	button {
		margin-top: 1rem;
		background: rgb(11, 148, 125);
		color: white;
		border-radius: 0.25rem;
		border: 0 none;
		font-size: 18px;
		padding: 0.6rem 1.2rem;
	}
	button:disabled {
		background: #ddd;
	}
</style>
