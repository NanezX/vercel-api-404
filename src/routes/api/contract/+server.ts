import { getContractAddress } from '$lib/contract';

/** @type {import('./$types').RequestHandler} */
export function GET() {
	return new Response(getContractAddress());
}
