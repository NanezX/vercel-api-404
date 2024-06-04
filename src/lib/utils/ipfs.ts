import { Variants, getContract } from '$lib';

type FetchIpfsOptions = {
	/**
	 * Define if want the value to be saved in cache. Default value is false
	 */
	cache?: boolean;
	/**
	 * Define the error message in case of failure.
	 */
	errorMsg?: string;
};

async function fetchIpfs(url_: URL, options: FetchIpfsOptions = {}): Promise<Buffer> {
	// Get options and default values
	const { errorMsg = 'Failed to fetch data from IPFS', cache = false } = options;

	// // Getting the URL Key
	// const urlKey = url_.toString();

	// // Check if the data buffer is on cache and return it
	// const cachedData = this.cache.get<Buffer>(urlKey);
	// if (cachedData) return cachedData;

	// Make the fetch using the URL
	const response = await fetch(url_);

	// If the response failed, throw an error
	if (!response.ok) {
		throw new Error(`${errorMsg}: ${response.statusText}`);
	}

	// Return the response as buffer
	const bufferData = Buffer.from(await response.arrayBuffer());

	// if (cache) {
	// 	// Save response buffer in cache
	// 	this.cache.set(urlKey, bufferData);
	// }

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
	const respBuffer = await fetchIpfs(variantUrl, { cache: true });

	// Return the Variants class using the JSON created from the Buffer
	return new Variants(JSON.parse(respBuffer.toString()), baseUrl);
}
