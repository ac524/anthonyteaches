import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function get({ platform }: RequestEvent) {
	const [result, errors] = (await platform.env.CONTACTS.get('data')) || '';
	console.log(result);
	if (errors) {
		return {
			status: 400,
			body: { errors }
		};
	}
	return result;
}

export async function put({ platform }: RequestEvent, data: Object) {
	// how are we sending the data through here and how it reading it? Trying to pass through after platform: RequestEvent so we don't get an error message on data in line 18.

	const [updates, errors] = await platform.env.CONTACTS.put('data', data);
	console.log(updates);
	if (errors) {
		return {
			status: 400,
			body: { errors }
		};
	}
	return { body: { success: true } };
}
