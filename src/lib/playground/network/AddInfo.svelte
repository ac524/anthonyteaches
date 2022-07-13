<script lang="ts">
	// Starting template: https://gist.github.com/danawoodman/1aba56c63e2c268ae840b4a9d66f869a
	import Modal from './Modal.svelte';
	import Field from './Field.svelte';
	import { blur } from 'svelte/transition';

	let showModal = false;

	let name = '';
	let linkedIn = '';
	let github = '';
	let nameValid: boolean = false;
	let linkedInIsValid: boolean = false;
	let githubValid: boolean = false;
	let submitting: boolean = false;
	let valid = false;

	async function handleSubmit() {
		submitting = true;
		let data = { name: name, github: github, linkedIn: linkedIn };
		const result = await fetch('/playground/network/api', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const formResult = await result.json();
		alert('Form submitted successfully');
	}

	function handleValidateName(val: string) {
		return val?.length > 2;
	}
	function handleValidateLinkedIn(val: string) {
		return /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/i?.test(val);
	}

	function handleValidateGitHub(val: string) {
		val.toLowerCase();

		return /^(http(s)?:\/\/)?([\w]+\.)?github\.com\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i?.test(
			val
		);
	}
</script>

<button on:click={() => (showModal = true)}>Get added to the networking list!</button>;

{#if showModal}
	<Modal slot="header" on:close={() => (showModal = false)}>
		<section transition:blur={{ delay: 200, duration: 600 }}>
			<form on:submit|preventDefault={handleSubmit}>
				<!--  -->
				<Field
					label="Name"
					disabled={submitting}
					bind:value={name}
					bind:valid={nameValid}
					validate={handleValidateName}
				/>
				<Field
					label="LinkedIn - Enter full LinkedIn url"
					disabled={submitting}
					bind:value={linkedIn}
					bind:valid={linkedInIsValid}
					validate={handleValidateLinkedIn}
				/>
				<Field
					label="GitHub - Enter full Github url"
					disabled={submitting}
					bind:value={github}
					bind:valid={githubValid}
					validate={handleValidateGitHub}
				/>
				<p>
					<button type="submit" disabled={!valid || submitting}
						>Add me to the networking list!</button
					>
				</p>
			</form>
		</section>
	</Modal>
{/if}

<style>
	button:hover {
		cursor: pointer;
		background-color: teal;
		color: white;
	}
	.definition-list {
		text-decoration: none;
		list-style: none;
		margin: 2rem;
		text-align: left;
		padding-left: 2rem;
	}
	.image {
		height: 100px !important;
		width: auto;
		padding: 1rem;
	}

	.image-win {
		height: 100px !important;
		width: auto;
		filter: invert(90%) sepia(50%) saturate(600%) hue-rotate(90deg) brightness(90%) contrast(90%);
		padding: 1rem;
	}
</style>
