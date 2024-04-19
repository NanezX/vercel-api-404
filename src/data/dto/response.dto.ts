import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DataRespondeDto {
  @ApiProperty({ example: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: '100000' })
  @IsNotEmpty()
  @IsString()
  erc20balance: string;

  @ApiProperty({ example: '5' })
  @IsNotEmpty()
  @IsString()
  erc721balance: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  isTransferExempt: boolean;

  @ApiProperty({ example: ['0', '1', '2'] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  ownedIds: string[];

  // @ApiProperty({ type: [Attributes] })
  // @IsNotEmpty()
  // @IsArray()
  // @ValidateNested({ each: true })
  // attributes: Attributes[];

  constructor(
    address_: string,
    erc20balance_: bigint,
    erc721balance_: bigint,
    owned_: bigint[],
    isTransferExempt_: boolean,
  ) {
    this.address = address_;
    this.erc20balance = erc20balance_.toString();
    this.erc721balance = erc721balance_.toString();
    this.isTransferExempt = isTransferExempt_;
    this.ownedIds = owned_.map((id_) => id_.toString());
  }
}
