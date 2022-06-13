/** @type {import('@sveltejs/kit').Handle}  */

import type {RequestHandler, RequestEvent, Handle} from '@sveltejs/kit'

    /** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.locals.user = await getUserInformation(event.request.env.get(platform)));
   
    const response = await resolve(event);
    response.headers.set('x-custom-header', 'potato');
   
    return response;
  }
   
    const response = await resolve(event);
    return response;
  }

  interface RequestEvent<
  Params extends Record<string, string> = Record<
    string,
    string
  >
> {
  clientAddress: string;
  locals: App.Locals;
  params: Params;
  platform: Readonly<App.Platform>;
  request: Request;
  routeId: string | null;
  url: URL;
}

