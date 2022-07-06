import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function get({ platform }: RequestEvent) {
	const result = (await platform.env.CONTACTS.list({ prefix: 'contact' })) || '';
	const results = JSON.parse(result);
	return { body: results };
}
