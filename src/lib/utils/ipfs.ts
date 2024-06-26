import * as async from 'async';
import { Variants, getContract } from '$lib';

type FetchIpfsOptions = {
	/**
	 * Define the error message in case of failure.
	 */
	errorMsg?: string;
};

async function fetchIpfs(url_: URL, options: FetchIpfsOptions = {}): Promise<Buffer> {
	// Get options and default values
	const { errorMsg = 'Failed to fetch data from IPFS' } = options;

	// Make the fetch using the URL
	const response = await fetch(url_);

	// If the response failed, throw an error
	if (!response.ok) {
		throw new Error(`${errorMsg}: ${response.statusText}`);
	}

	// Return the response as buffer
	const bufferData = Buffer.from(await response.arrayBuffer());

	return bufferData;
}

/**
 * Get the IPFS Base URL using the schema hash stored in the ERC404Meme contract
 * @returns A string with the IPFS base url
 */
export async function getBaseUrl(): Promise<string> {
	const schemaIpfs = await getContract().getSchemaHash();
	return `https://ipfs.io/ipfs/${schemaIpfs}/`;
}

/**
 * Get the variants from IPFS
 * @returns
 */
export async function getVariants(): Promise<Variants> {
	// Base IPFS URL string
	const baseUrl = await getBaseUrl();

	// Generate the URL using base url and the path to the JSON
	const variantUrl = new URL('variants.json', baseUrl);

	// Make the fetch
	const respBuffer = await fetchIpfs(variantUrl);

	// Return the Variants class using the JSON created from the Buffer
	return new Variants(JSON.parse(respBuffer.toString()), baseUrl);
}

export async function getImageBuffers(urls: URL[]): Promise<Buffer[]> {
	// Max concurrency limit
	const limit = 5;

	const iteratorFn = async (url: URL) => {
		const errorMsg = 'Failed to fetch layer';
		try {
			return await fetchIpfs(url, {
				errorMsg
			});
		} catch (error) {
			throw new Error(`${errorMsg}: \n${error}`);
		}
	};

	return new Promise((resolve, reject) => {
		async.mapLimit(urls, limit, iteratorFn, (err, results: (Buffer | undefined)[] | undefined) => {
			if (err || results === undefined || results.some((result) => result === undefined)) {
				return reject(err || new Error('Undefined result'));
			}

			// Now we can safely assume that all values in results are defined
			const validResults: Buffer[] = results as Buffer[];
			resolve(validResults);
		});
	});
}
