export default async function displayShop() {
    console.log('display shop');
    await dapp.provider.listAccounts();
    document.getElementById('space').innerHTML = await getMarkup();
    addListeners();
}

async function getMarkup() {
    const account = await getAccount();
    const balanceSKALE = await getBalanceSKALE();
    const balanceERC20 = await getBalanceERC20(account);
    const defaultCostAndItems = await getDefaultCostsAndItems(account);

    return `<div class="shop">
        <div class="space"><h1>SHOP</h1></div>
        <div class="account">Chain Wallet: ${account}</div>
        <div class="balance">SKALE Balance: ${balanceSKALE} ETH</div>
        <div class="balance">SKALE ERC-20 Balance: ${balanceERC20} ETH</div>
        <div>Total Arrows: ${defaultCostAndItems[4]}</div>
        <div><button id="approveArrows">Approve Arrows</button></div>
        <div><button id="buyArrows">Buy Arrows 0.001 ETH</button></div>
        <div><button id="exit">Exit to Mainnet</button></div>
        <div class="the-shop"></div>
    </div>`;
}

async function getAccount() {
    return await dapp.contracts.Shop.contract.signer.getAddress();
}

async function getBalanceSKALE() {
    const amount = await dapp.contracts.Shop.contract.signer.getBalance();
    return ethers.utils.formatEther(amount);
}

async function getBalanceERC20(account) {
    const amount = await dapp.contracts.ETH_ERC20.contract.functions.balanceOf(account);
    return ethers.utils.formatEther(amount);
}

async function approveArrows() {
    await dapp.contracts.ETH_ERC20.contract.functions.approve(dapp.contracts.Shop.contract.address, ethers.utils.parseEther('0.001'));
}

async function buyArrows() {
    await dapp.contracts.Shop.contract.functions.buyItem(1);
}

async function getDefaultCostsAndItems(account) {
    return await dapp.contracts.Shop.contract.functions.getDefaultCostsAndItems(account);
}

async function exit() {
    const account = await getAccount();
    const amount = await dapp.contracts.ETH_ERC20.contract.functions.balanceOf(account);
    const message = ethers.utils.toUtf8Bytes('Come visit again soon');

    console.log('account:', account);
    console.log('amount:', amount);

    await dapp.contracts.TokenManager.contract.functions.exitToMain(account, amount);
}

function addListeners() {
    document.getElementById('approveArrows').addEventListener('click', approveArrows);
    document.getElementById('buyArrows').addEventListener('click', buyArrows);
    document.getElementById('exit').addEventListener('click', exit);
}