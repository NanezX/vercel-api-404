export class Attribute {
	trait_type: string;
	value: number;

	constructor(trait_type: string, value: number) {
		this.trait_type = trait_type;
		this.value = value;
	}

	/**
	 * Using a JSON String to generate  attribute based on his key/value.
	 * This NOT support nested objects and  only for simples object key/value.
	 * Also, this code assume that the object only contain key/values representing
	 * the `trait_type` and `value`.
	 * @param data - A JSON string
	 * @returns An array with all the attributes
	 */
	static fromJson(data: string): Attribute[] {
		const attributes: Attribute[] = [];

		// Parse the JSON String to an object
		const jsonData = JSON.parse(data);

		// Iterate over the keys of the object to get all the traits
		for (const key in jsonData) {
			attributes.push(new Attribute(key, Number(jsonData[key])));
		}

		return attributes;
	}
}
