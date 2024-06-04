export class AccountRespondeDto {
	address: string;
	erc20balance: string;
	erc721balance: string;
	isTransferExempt: boolean;
	isSpecialExempt: boolean;
	ownedIds: string[];

	constructor(
		address_: string,
		erc20balance_: bigint,
		erc721balance_: bigint,
		owned_: bigint[],
		isTransferExempt_: boolean,
		isSpecialExempt_: boolean
	) {
		this.address = address_;
		this.erc20balance = erc20balance_.toString();
		this.erc721balance = erc721balance_.toString();
		this.isTransferExempt = isTransferExempt_;
		this.isSpecialExempt = isSpecialExempt_;
		this.ownedIds = owned_.map((id_) => id_.toString());
	}
}
