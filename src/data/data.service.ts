import { Injectable } from '@nestjs/common';
import configuration from '../config/configuration';
import { ethers, getDefaultProvider } from 'ethers';
import { abi } from '../abis/IDiamondNFT404.json';
import { DataRespondeDto } from './dto/response.dto';

@Injectable()
export class DataService {
  async getData(address: string): Promise<DataRespondeDto> {
    const contract = await this.get_contract();

    const erc20balance = await contract.erc20BalanceOf(address);
    const erc721balance = await contract.erc721BalanceOf(address);
    const owned = await contract.owned(address);
    const isTransferExempt = await contract.erc721TransferExempt(address);

    return new DataRespondeDto(
      address,
      erc20balance,
      erc721balance,
      owned,
      isTransferExempt,
    );
  }

  async get_contract(): Promise<ethers.Contract> {
    const provider = getDefaultProvider(configuration().sepoliaRpcUrl);

    return new ethers.Contract(
      '0x36983711f9C4869F0B9BEb2Cf677814bb40d41c5',
      abi,
      provider,
    );
  }
}
