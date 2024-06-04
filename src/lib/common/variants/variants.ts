import { Attribute } from '../attribute/attribute.entity';

// Type for better handling that also should follow the Variant json
type VariantJSON = {
	/**
	 * The key is the main name for variant/layer, like background, hat, body, etc.
	 */
	[key: string]: {
		/**
		 * The path is where the images for this layer are stored. It's relative to
		 * the variant.json file.
		 */
		path: string;
		/**
		 * Represent the total count of the probabilities to get a variant. It's
		 * intended to represent a 100%
		 */
		variants_count: number;
		/**
		 * The description for each variant
		 */
		variants: {
			/**
			 * The type of the probability for this variant. Generally, for this version,
			 * only support `range` types.
			 */
			type: string;
			/**
			 * The name of this variant that is used on the file stored, for example:
			 * The file is `Blue.png`, so the name of the variant is `Blue`
			 */
			name: string;
			/**
			 * The initial value that ca be accepted to get this variant.
			 */
			from: number;
			/**
			 * The max value that ca be accepted to get this variant.
			 */
			to: number;
		}[];
	};
};

export class Variants {
	constructor(
		private readonly variantsJson: VariantJSON,
		private readonly baseUrl: string
	) {}

	getCounters(): (bigint | number)[] {
		// Counters array where the each variant count will be pushed
		const counters: (bigint | number)[] = [];

		// Iterate over the variants json to get each variant count
		for (const key in this.variantsJson) {
			counters.push(this.variantsJson[key].variants_count);
		}

		return counters;
	}

	resolveVariants(dnaJson: string) {
		// Paths array where each path resolved for the images will be saved
		const urls: URL[] = [];

		// Use the DNA JSON string to get all the attributes on simpler way to handle
		const attributes = Attribute.fromJson(dnaJson);

		// Iterate on each attribute to find correct variant on Variant JSON
		attributes.forEach((attribute_) => {
			// Get the variant type from the JSON using the trait type
			const variantType = this.variantsJson[attribute_.trait_type];

			// Find the correct variant solution based on the "probabilities" defined
			const variant = variantType.variants.find(
				(variant_) => attribute_.value >= variant_.from && attribute_.value <= variant_.to
			);

			if (!variant) {
				// TODO: HERE
				throw new Error('LOL ERROR');
			}

			// If variant name is none, means that the image will not be resolved. This
			// because could be a trait/variant that is intended to be missing, like a hat
			// (could or not have a hat).
			if (variant.name !== 'None') {
				const variantUrl = new URL(`${variantType.path}${variant.name}.png`, this.baseUrl);

				urls.push(variantUrl);
			}
		});

		return urls;
	}
}
