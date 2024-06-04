import { error, json } from '@sveltejs/kit';
import { isValidBigInt, getContract, getDnaJson, getNameWithReadableId, getPicture } from '$lib';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, setHeaders }) {
	const { id } = params;

	if (!isValidBigInt(id)) {
		error(400, {
			message: 'Invalid ID'
		});
	}

	return new Response(await getPicture(id), {
		headers: {
			'Content-Type': 'image/png'
		}
	});
}
