import { error, json } from '@sveltejs/kit';
import { ethers } from 'ethers';
import { getContract } from '$lib';
import { AccountRespondeDto } from './dto/response.dto.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const { address } = params;

	if (!ethers.isAddress(address)) {
		error(400, {
			message: 'Invalid account address'
		});
	}

	const contract = getContract();

	const erc20balance = await contract.erc20BalanceOf(address);
	const erc721balance = await contract.erc721BalanceOf(address);
	const owned = await contract.owned(address);
	const isTransferExempt = await contract.erc721TransferExempt(address);
	const isSpecialExempt = await contract.isSpecialExempt(address);

	return json(
		new AccountRespondeDto(
			address,
			erc20balance,
			erc721balance,
			owned,
			isTransferExempt,
			isSpecialExempt
		)
	);
}
