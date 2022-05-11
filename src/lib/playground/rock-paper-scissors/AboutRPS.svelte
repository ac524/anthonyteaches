<script>
	import Modal from './Modal.svelte';
	import Icon from 'svelte-awesome';
	let paper = '/handpapersolid.svg';
	let rock = '/handrocksolid.svg';
	let scissors = '/handscissorssolid.svg';
	let equals = '/equals.svg';

	let showModal = false;
</script>

<button on:click={() => (showModal = true)}>
	How to play, if you've been living under a rock</button
>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<h2 slot="header">
			Choose rock, paper, or scissors. <br /> Your opponent also chooses from the same 3 options.
		</h2>
		<div class="icons">
			<!-- <Icon data={handPaperO} scale={5} />
			<Icon data={handScissorsO} />
			<Icon data={handRockO} /> -->
		</div>
		<ol class="definition-list">
			<h3>How do I win?</h3>

			<li>paper covers rock</li>
			<img class="image-win" alt="medal" src={paper} style="color: teal" />
			<img class="image" alt="medal" src={rock} style="color: teal" />
			<li>scissors cut paper</li>
			<img class="image-win" alt="medal" src={scissors} style="color: teal" />
			<img class="image" alt="medal" src={paper} style="color: teal" />
			<li>rock crushes the scissors</li>
			<img class="image-win" alt="medal" src={rock} style="color: teal" />
			<img class="image" alt="medal" src={scissors} style="color: teal" />
			<br />
			<li><em>same choice = tie</em></li>
			<img
				alt="tie"
				class="image"
				src={equals}
				style="animation-duration: 1.5s; animation-iteration-count: 1"
			/>
		</ol>
	</Modal>
{/if}

<style>
	.definition-list {
		text-decoration: none;
		list-style: none;
		margin: 2rem;
		text-align: left;
		padding-left: 2rem;
	}
	.image {
		height: 40px;
		width: auto;
		padding: 1rem;
	}

	.image-win {
		height: 45px;
		width: auto;
		filter: invert(40%) sepia(30%) saturate(600%) hue-rotate(90deg) brightness(90%) contrast(90%);
		padding: 1rem;
	}
</style>
