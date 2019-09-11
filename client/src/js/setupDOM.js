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
    document.getElementById('network_status').innerHTML = name;
    // show the shop
    await displayShop();
  } else {
    document.getElementById('network_status').innerHTML = 'not connected';
  }
}

// async function listItem() {
//   await window.dapp.provider.listAccounts();

//   const BN = window.ethers.utils.bigNumberify;

//   const itemName = document.getElementById('item_name').value;
//   const description = document.getElementById('description').value;
//   const image_url = document.getElementById('image_url').value;
//   const zipcode = BN(document.getElementById('zipcode').value);
//   const duration = BN(document.getElementById('duration').value);
//   const cost = BN(document.getElementById('cost').value);

//   window.dapp.contracts.Stakeable.contract.createItem(itemName, description, image_url, zipcode, duration, cost).then((tx) => {
//     console.log('transaction:', tx);

//     document.getElementById('items').insertAdjacentHTML('afterend', `<div class="item">
//       <div class="item-preview"><img src="${image_url}"></div>
//       <div class="item-meta">
//         <div class="item-name">${itemName}</div>
//         <div class="description">${description}</div>
//         <div class="item-cost">${ethers.utils.formatEther(cost)} ETH</div>
//       </div>
//     </div>`);
//   });
// }