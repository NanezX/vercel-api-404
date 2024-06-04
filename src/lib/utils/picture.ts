import { error } from '@sveltejs/kit';
import { getDnaJson } from './contract';
import { getImageBuffers, getVariants } from './ipfs';
import sharp from 'sharp';

export async function getPicture(id: string) {
	// Get variants to make just one fetch
	const variants = await getVariants();

	// Obtain the DNA JSON string from contract based on ID
	const dnaJson = await getDnaJson(id, {
		variantCounters: variants.getCounters()
	});

	// Use the variant class to resolve all the layer URLs based on the dna json
	const layersUrls = variants.resolveVariants(dnaJson);

	// Get all the images buffer based on the layer URLs resolved
	const images = await getImageBuffers(layersUrls);

	// Create the composite layers with the info that we want
	const compositeLayers = images.map((image) => ({
		input: image,
		top: 0,
		left: 0
	}));

	// Get the Width and Height of the images
	const { width, height } = await sharp(images[0]).metadata();

	if (!width || !height) {
		error(500, 'Internal error: width or height not processed');
	}

	// Composite the images with this value to guarantee the transparency
	const result = await sharp({
		create: {
			width,
			height,
			channels: 4,
			background: { r: 0, g: 0, b: 0, alpha: 0 }
		}
	})
		.composite(compositeLayers)
		.png()
		.toBuffer();

	return result;
}
