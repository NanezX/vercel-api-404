import { getDefaultProvider, Contract, isError } from 'ethers';
import { PRIVATE_RPC_URL } from '$env/static/private';
import { PUBLIC_ERC404_ADDRESSS } from '$env/static/public';
import { abi } from '../abis/IDiamondNFT404.json';
import { error as svelteError } from '@sveltejs/kit';
import { getVariants } from './ipfs';

type ContractOption = {
	/**
	 * Contract instance. Pass a contract instance already created to avoid create
	 * a new one.
	 */
	contract?: Contract;
};

type GetDnaOptions = ContractOption & {
	/**
	 * Variant counter from variant.json. Pass and use an existing variantCounter
	 * to avoid fetching a new one
	 */
	variantCounters?: (number | bigint)[];
};

export function getContract(): Contract {
	const provider = getDefaultProvider(PRIVATE_RPC_URL);
	return new Contract(getContractAddress(), abi, provider);
}

export function getContractAddress(): string {
	return PUBLIC_ERC404_ADDRESSS;
}

export async function getDnaJson(id: string, options: GetDnaOptions = {}): Promise<string> {
	// Check if DNA JSON is cached
	// const dnaCached = this.cache.get<string>(id);
	// if (dnaCached) return dnaCached;

	// Using default values (generate new ones) if no options were used
	const { contract = getContract(), variantCounters = (await getVariants()).getCounters() } =
		options;

	// Use the contract to interpreate the DNA using the counters
	try {
		const dnaJson = await contract.dnaOfToJson(id, variantCounters);
		// 	// this.cache.set(id, dnaJson);

		return dnaJson;
	} catch (error) {
		let message = 'Internal error';
		let code = 500;
		if (isError(error, 'CALL_EXCEPTION')) {
			if (error.revert?.name == 'NotExistingId') {
				code = 404;
			}
			message = `${error.revert?.name}: ${error.revert?.args}`;
		} else {
			if (error instanceof Error) {
				message = error.message;
			}
		}

		svelteError(code, { message });
	}
}

export async function getNameWithReadableId(
	id: string,
	options: ContractOption = {}
): Promise<string> {
	// If no contract instance, generate one
	const { contract = getContract() } = options;

	// Get name of the ERC404 Token
	const name = await contract.name();

	// Get the readable ID for better user experience
	const readableId = await contract.getReadableTokenId(id);

	// Generate the name with a readable ID
	return `${name}#${readableId}`;
}
