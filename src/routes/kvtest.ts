import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function get({ params, platform }: RequestEvent) {
	// `params.id` comes from [id].js

    const result = await platform.env.FILES.put("test", "test");

	return {
		body: {
            platform,
        }
	};

	return {
		status: 404
	};
}
