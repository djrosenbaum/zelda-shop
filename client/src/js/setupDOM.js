import displayBank from './bank/display-bank.js';
import displayShop from './shop/display-shop.js';

export default function setupDOM() {
  displayMarkup();
}

async function displayMarkup() {
  console.log('markup');

  const network = await dapp.provider.getNetwork();

  const { name, ensAddress } = network;

  console.log('network name:', name);

  if (name === 'rinkeby') {
    document.getElementById('network_status').innerHTML = name;
    // show the bank
    await displayBank();
  } else if (name === 'homestead' && ensAddress === '0x314159265dd8dbb310642f98f50c066173c1259b') {
    document.getElementById('network_status').innerHTML = 'SKALE';
    // show the shop
    await displayShop();
  } else {
    document.getElementById('network_status').innerHTML = 'not connected';
  }
}