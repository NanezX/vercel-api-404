const ID_ENCODING_PREFIX: bigint = BigInt(1) << BigInt(255);

export function isValidBigInt(value: bigint | boolean | number | string): boolean {
	try {
		const val = BigInt(value);
		return val > ID_ENCODING_PREFIX;
	} catch {
		return false;
	}
}
