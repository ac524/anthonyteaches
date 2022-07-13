import type { RequestEvent } from '@sveltejs/kit/types/private';
import { v4 as uuidv4 } from 'uuid';

export async function get({ platform }: RequestEvent) {
	let list = await platform.env.CONTACTS.list();
	console.log(list + 'this is the list');
	const allKeys = JSON.parse(list.key);
	console.log(allKeys);
	let values = [];
	for (const key in allKeys) {
		const person = await platform.env.CONTACTS.get(key || '');
		const value = JSON.parse(person);
		console.log(
			value +
				'is the value of the person we are trying to display on the page. This is server side function'
		);
		values.push(value);
	}
	console.log(values + 'these are the values of all the people to display on our networking page');
	return values;
}

export async function put({ platform, request }: RequestEvent) {
	const data = await request.json();
	let uuid = uuidv4();
	await platform.env.CONTACTS.put(`contact-${uuid}`, JSON.stringify(data));

	return { body: { success: true } };
}
