import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function get({ platform }: RequestEvent) {
	const result = (await platform.env.CONTACTS.get('data')) || '';
	const results = JSON.parse(result);
	return { body: results };
}

export async function put({ platform, request }: RequestEvent) {
	// how are we sending the data through here and how it reading it? Trying to pass through after platform: RequestEvent so we don't get an error message on data in line 18.
	const data = await request.json();
	

	await platform.env.CONTACTS.put('data', JSON.stringify(data))
	// console.log(updates.json());

	return { body: { success: true }};
}
