<script>
	import Modal from './Modal.svelte';
	import Icon from 'svelte-awesome';
	// import { handPaperO, handScissorsO, handRockO } from 'svelte-awesome/icons';
	import {
		faHandBackFist,
		faHand,
		faHandScissors,
		faEquals
	} from '@fortawesome/free-solid-svg-icons';

	let showModal = false;
</script>

<button on:click={() => (showModal = true)}> What is rock-paper-scissors? </button>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<h2 slot="header">Choose rock, paper, or scissors. <br> Your opponent also chooses from the same 3 options.</h2>
		<div class="icons">
			<!-- <Icon data={handPaperO} scale={5} />
			<Icon data={handScissorsO} />
			<Icon data={handRockO} /> -->
		</div>
		<ol class="definition-list">
			<h3>How do I win?</h3>

			<li>paper covers rock</li>
			<Icon data={faHand} scale="4" style="color: green" />
			<Icon data={faHandBackFist} scale="3" />
			<li>scissors cut paper</li>
			<Icon data={faHandScissors} scale="4" style="color: green" flip="horizontal" />
			<Icon data={faHand} scale="3" />
			<li>rock crushes the scissors</li>
			<Icon data={faHandBackFist} scale="4" style="color: green" />
			<Icon data={faHandScissors} scale="3" />
			<br />
			<li><em>same choice = tie</em></li>
			<Icon
				data={faEquals}
				scale="3"
				spin
				style="animation-duration: 1.5s; animation-iteration-count: 3"
			/>
		</ol>
	</Modal>
{/if}

<style>
	.definition-list,
	.icons {
		text-decoration: none;
		list-style: none;
		margin: 2rem;
		text-align: left;
		padding-left: 2rem;
	}
</style>
