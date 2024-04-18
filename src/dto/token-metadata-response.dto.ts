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

  @ApiProperty({ type: [Attributes] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  attributes: Attributes[];

  @ApiProperty({ example: 'The most random NFT that you will find' })
  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(data: { url_: string; atributes_: any[] }) {
    this.image = data.url_;
    this.attributes = data.atributes_;
    this.description = 'The best collection using ERC404 is CAT404';
  }
}
