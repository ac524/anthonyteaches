<script lang="ts">
	export let label: string;
	export let type: string = 'text';
	export let value: string = '';
	export let disabled: boolean = false;
	export let validate: (val: string) => boolean;
	export let valid: boolean = false;
	let id = `field-${Math.floor(Math.random() * 1000)}`;
	function handleInput(e: any) {
		value = e.target.value;
		if (validate) valid = validate(value);
	}
</script>

<p class:valid>
	{#if label}
		<label for={id}
			>{label}{#if valid}<span>✔</span>{/if}</label
		>
	{/if}
	<input {disabled} {type} {id} on:input={handleInput} />
</p>

<style lang="postcss">
	label {
		font-size: 15px;
		font-family: sans-serif;
		font-weight: bold;
		display: block;
		line-height: 1.2;
		margin: 0.5rem 0;
	}
	label span {
		margin-left: 0.5rem;
	}
	.valid label {
		color: rgb(11, 148, 125);
	}
	input {
		border: 1px solid #dedede;
		border-radius: 0.25rem;
		padding: 0.8rem 1.2rem;
		font-size: 16px;
		display: block;
		width: 100%;
	}
	.valid input {
		border-color: rgb(0, 180, 96);
	}
</style>
