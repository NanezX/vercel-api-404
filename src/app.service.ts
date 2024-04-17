import { Injectable } from '@nestjs/common';
import configuration from './config/configuration';
import { ethers, getDefaultProvider } from 'ethers';

import { abi } from './abis/IDiamondNFT404.json';
import { TokenMetadataRespondeDto } from './dto/token-metadata-response.dto';

@Injectable()
export class AppService {
  async getTokenById(id: string): Promise<TokenMetadataRespondeDto> {
    const contract = await this.get_contract();

    console.log('name:', await contract.name());

    return new TokenMetadataRespondeDto({
      url_: `https://picsum.photos/seed/${id}/3000/3000`,
    });
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
