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

export async function put({ platform }: RequestEvent) {
	// what goes here??

	const [updates, errors] = await platform.env.CONTACTS.put('data', { data });
	console.log(updates);
	if (errors) {
		return {
			status: 400,
			body: { errors }
		};
	}
	return { body: { success: true } };
}
