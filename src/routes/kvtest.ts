import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function get({ params, platform }: RequestEvent) {
	// `params.id` comes from [id].js

    const result = (await platform.env.FILES.get("count")) || 0;

    const count = parseInt(result) + 1;

    await platform.env.FILES.put("count", count);

	return {
		body: {
            count
        }
	};
}
