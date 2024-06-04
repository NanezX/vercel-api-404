import { getContractAddress } from '$lib';

/** @type {import('./$types').RequestHandler} */
export function GET() {
	return new Response(getContractAddress());
}
