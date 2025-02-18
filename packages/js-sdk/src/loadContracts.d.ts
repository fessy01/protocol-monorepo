import type { ethers, Contract as EthersContract, utils, ContractInterface } from "ethers"; 
import type { Contract as Web3Contract } from "web3-eth-contract";
import TruffleContract from "@truffle/contract";
import type Web3 from "web3";

type SuperfluidContractNames =
  | 'ERC20WithTokenInfo'
  | 'IConstantFlowAgreementV1'
  | 'IERC20'
  | 'IInstantDistributionAgreementV1'
  | 'IResolver'
  | 'ISETH'
  | 'ISuperAgreement'
  | 'ISuperToken'
  | 'ISuperTokenFactory'
  | 'ISuperfluid'
  | 'ISuperfluidGovernance'
  | 'SuperfluidLoader'
  | 'TestToken'
  | 'TokenInfo'
  | 'UUPSProxiable';

export type SuperfluidContractObject = {
  abi: ContractInterface;
  contractName: SuperfluidContractNames;
  at: (address: string) => EthersContract;
}

export type SuperfluidContracts = Record<SuperfluidContractNames, SuperfluidContractObject>

export interface EthersWithSigner {
    getSigner(): () => any
}

export type LoadedContract = Web3Contract | TruffleContract.Contract | EthersContract;
export type AbiContainer = Pick<utils.Interface, "abi">;
export type ContractLoader = (name: string) => AbiContainer;

declare function setTruffleContractDefaults(c: TruffleContract.Contract, networkId: number, from: string): void;

declare function defaultContractLoader(name: string): {contractName: string, abi: AbiContainer}

interface AdaptedContractOpts {
    address: string;
    abi: AbiContainer;
    ethers: EthersWithSigner;
}
declare function getAdaptedContract({address, abi, ethers}: AdaptedContractOpts): EthersContract;

export declare function loadContracts({ isTruffle, ethers, web3, from, additionalContracts, contractLoader, networkId, }: {
    isTruffle: boolean;
    ethers?: EthersWithSigner;
    web3?: Web3;
    from: string;
    additionalContracts?: string[];
    contractLoader: ContractLoader;
    networkId: number;
}): Promise<SuperfluidContracts>;
