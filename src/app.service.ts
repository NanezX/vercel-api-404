import { Injectable } from '@nestjs/common';
import configuration from './config/configuration';
import { ethers, getDefaultProvider } from 'ethers';

import { abi } from './abis/IDiamondNFT404.json';
import {
  Attributes,
  TokenMetadataRespondeDto,
} from './dto/token-metadata-response.dto';

@Injectable()
export class AppService {
  async getTokenById(id: string): Promise<TokenMetadataRespondeDto> {
    const contract = await this.get_contract();

    const variantsName = [...(await contract.getVariantsName())];

    // All variant have 5 as counter
    // Of course this is not what production will have
    const variantsCounters = variantsName.map(() => 5n);

    const jsonDnaString = await contract.dnaOfToJson(
      BigInt(id),
      variantsCounters,
    );

    const dnaData = JSON.parse(jsonDnaString);

    const attributes: Attributes[] = [];

    for (const key in dnaData) {
      attributes.push({
        trait_type: key,
        value: dnaData[key],
      });
    }

    const name = await contract.name();
    const readableId = await contract.getReadableTokenId(id);

    const nameWithReadableId = `${name}#${readableId}`;

    return new TokenMetadataRespondeDto(id, attributes, nameWithReadableId);
  }

  async get_contract(): Promise<ethers.Contract> {
    //
    const provider = getDefaultProvider(configuration().sepoliaRpcUrl);

    return new ethers.Contract(
      '0x36983711f9C4869F0B9BEb2Cf677814bb40d41c5',
      abi,
      provider,
    );
  }
}
