import { PUBLIC_ERC404_ADDRESSS } from '$env/static/public';

/** @type {import('./$types').RequestHandler} */
export function GET() {
	return new Response(PUBLIC_ERC404_ADDRESSS);
}
