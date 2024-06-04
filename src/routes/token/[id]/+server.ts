import { error, json } from '@sveltejs/kit';
import { isValidBigInt, getContract, getDnaJson, getNameWithReadableId } from '$lib';
import { TokenMetadataRespondeDto } from './dto/token-metadata-response.dto.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const { id } = params;

	if (!isValidBigInt(id)) {
		error(400, {
			message: 'Invalid ID'
		});
	}

	const baseUrl = `${url.protocol}//${url.host}`;

	// Create the contract instance for IDiamondNFT404 (generate just once)
	const contract = getContract();

	// Get the JSON DNA string
	const jsonDnaString = await getDnaJson(id, { contract });

	// Generate the name with a readable ID
	const nameWithReadableId = await getNameWithReadableId(id, {
		contract
	});

	return json(new TokenMetadataRespondeDto(id, jsonDnaString, nameWithReadableId, baseUrl));
}
