import { IsString, ValidateNested, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Attributes {
  @ApiProperty({ example: 'eyes' })
  @IsNotEmpty()
  @IsString()
  trait_type: string;

  @ApiProperty({ example: 'green' })
  @IsNotEmpty()
  @IsString()
  value: string;
}

export class TokenMetadataRespondeDto {
  @ApiProperty({ example: 'www.token-obtain.com/get/2' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 'Pet#3' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: [Attributes] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  attributes: Attributes[];

  @ApiProperty({ example: 'The most random NFT that you will find' })
  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(id_: string, atributes_: any[], name_: string) {
    this.image = `https://picsum.photos/seed/${id_}/640/640`;
    this.name = name_;
    this.attributes = atributes_;
    this.description = 'The best collection using ERC404 is Pet404';
  }
}
