import displayBank from './bank/display-bank.js';
import displayShop from './shop/display-shop.js';

export default function setupDOM() {
  displayMarkup();
}

async function displayMarkup() {
  const network = await dapp.provider.getNetwork();
  const genesis = await dapp.contracts.ETH_ERC20.contract.provider.getBlock(0);

  const { name, ensAddress } = network;

  if (name === 'rinkeby') {
    document.getElementById('network_status').innerHTML = name;
    // show the bank
    await displayBank();
  } else if (genesis.hash === '0x8557a11162d51c58ee93a0e3ed63127db76b9f377dca2c35114e3af1b5e88ffd') {
    document.getElementById('network_status').innerHTML = 'SKALE';
    // show the shop
    await displayShop();
  } else {
    document.getElementById('network_status').innerHTML = 'not connected';
  }
}