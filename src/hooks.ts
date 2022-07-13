import type { Handle } from '@sveltejs/kit';

import { mode } from '$app/env';

const handle: Handle = async ({ event, resolve }) => {
    if( mode === "development" ) {
        const { createPlatformMock } = await import("$lib/mocks");
        event.platform = createPlatformMock();
    }

	const response = await resolve(event);
	return response;
};

export { handle };
