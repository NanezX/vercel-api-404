import { Attribute } from '$lib';

export class TokenMetadataRespondeDto {
	image: string;
	name: string;
	attributes: Attribute[];
	description: string;

	constructor(id_: string, dnaJson: string, name_: string, urlBase_: string) {
		this.image = `${urlBase_}/api/picture/${id_}`;
		this.name = name_;
		this.description = 'The best collection using ERC404 is Pet404';
		this.attributes = Attribute.fromJson(dnaJson);
	}
}
