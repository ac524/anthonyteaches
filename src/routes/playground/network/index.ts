import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function get({ platform }: RequestEvent) {
	let list = await platform.env.CONTACTS.list();

	const allKeys = new Response(list.keys);
	console.log(allKeys);
	let values = [];
	for (const result in allKeys) {
		const person = await platform.env.CONTACTS.get(result || '');
		const value = JSON.parse(person);
		console.log(value);
		values.push(value);
	}
	return values;
}
