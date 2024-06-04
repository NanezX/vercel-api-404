import { getDefaultProvider, Contract } from 'ethers';
import { PRIVATE_RPC_URL } from '$env/static/private';
import { PUBLIC_ERC404_ADDRESSS } from '$env/static/public';
import { abi } from '../abis/IDiamondNFT404.json';

export function getContract(): Contract {
	const provider = getDefaultProvider(PRIVATE_RPC_URL);
	return new Contract(getContractAddress(), abi, provider);
}

export function getContractAddress(): string {
	return PUBLIC_ERC404_ADDRESSS;
}
