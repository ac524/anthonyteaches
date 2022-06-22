import type { RequestEvent } from '@sveltejs/kit/types/private';
import { v4 as uuidv4 } from 'uuid';

export async function get({ platform }: RequestEvent) {
	const result = (await platform.env.CONTACTS.get('data')) || '';
	const results = JSON.parse(result);
	return { body: results };
}

export async function put({ platform, request }: RequestEvent) {
	const data = await request.json();
	let uuid = uuidv4();
	console.log(uuid);
	await platform.env.CONTACTS.put(`${uuid}`, JSON.stringify(data));

	return { body: { success: true } };
}
