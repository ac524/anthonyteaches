<script lang="ts">
	interface Names {
		name: string;
		github: string;
		linkedin: string;
	}

	let lists: Names[] = [];

	const displayItems = async () => {
		const result = await fetch('/playground/network/api', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(result);
		lists = await result.json();
		console.log(lists);
		//Do I need to map out lists here? I can't figure out why it's erroring on line 27
		alert('Form submitted successfully');
		return lists;
	};
</script>

<button on:click={() => displayItems} type="submit">View List </button>

<div>
	{#if lists}
		{#each lists as { name, github, linkedin }}
			<li>{name}</li>
			<li>{github}</li>
			<li>{linkedin}</li>
		{/each}
	{/if}
</div>
