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

  constructor(data: { url_: string }) {
    this.image = data.url_;
    this.attributes = [];
  }
}
