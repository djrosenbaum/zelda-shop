import rinkebyABIs from './contracts/rinkeby-deposit-box.json';
import schainABIs from './contracts/proxySchain_drab-diphda.json';
import shopABI from './contracts/shop.sol.js';
import { ethers } from 'ethers';

export default async function setupState() {
  window.dapp.contracts = {
    DepositBox: {
      address: rinkebyABIs.deposit_box_address,
      contract: new ethers.Contract(rinkebyABIs.deposit_box_address, rinkebyABIs.deposit_box_abi, window.dapp.provider.getSigner()),
    },
    LockAndDataForMainnet: {
      address: rinkebyABIs.lock_and_data_for_mainnet_address,
      contract: new ethers.Contract(rinkebyABIs.lock_and_data_for_mainnet_address, rinkebyABIs.lock_and_data_for_mainnet_abi, window.dapp.provider.getSigner()),
    },
    TokenManager: {
      address: schainABIs.token_manager_address,
      contract: new ethers.Contract(schainABIs.token_manager_address, schainABIs.token_manager_abi, window.dapp.provider.getSigner()),
    },
    ETH_ERC20: {
      address: schainABIs.eth_erc20_address,
      contract: new ethers.Contract(schainABIs.eth_erc20_address, schainABIs.eth_erc20_abi, window.dapp.provider.getSigner()),
    },
    Shop: {
      address: shopABI.address,
      contract: new ethers.Contract(shopABI.address, shopABI.abi, window.dapp.provider.getSigner()),
    }
  };
}