export default async function displayShop() {
    document.getElementById('space').innerHTML = await getMarkup();
    const account = await getAccount();
    const allowable = await dapp.contracts.ETH_ERC20.contract.functions.allowance(account, dapp.contracts.Shop.address);

    console.log('allowable:', allowable);

    if (allowable < 1) {
        console.log('not allowed');
        document.getElementById('buyArrows').parentElement.style.display = 'none';
    } else {
        console.log('allowed');
    }
    addListeners();
}

async function getMarkup() {
    const account = await getAccount();
    const balanceSKALE = await getBalanceSKALE();
    const balanceERC20 = await getBalanceERC20(account);
    const defaultCostAndItems = await getDefaultCostsAndItems(account);

    return `<div class="shop">
        <div class="space"><h1>SHOP</h1></div>
        <div class="account">Wallet: <span>${account}</span></div>
        <div class="balance">SKALE Balance: <span>${balanceSKALE} ETH</span></div>
        <div class="balance">SKALE ERC-20 Balance: <span>${balanceERC20} ETH</span></div>
        <div>Total Arrows: <span>${defaultCostAndItems[4]}</span></div>
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
    await dapp.contracts.ETH_ERC20.contract.functions.approve(dapp.contracts.Shop.contract.address, ethers.utils.parseEther('0.001')).then(displayShop);
}

async function buyArrows() {
    const account = await getAccount();
    const allowable = await dapp.contracts.ETH_ERC20.contract.functions.allowance(account, dapp.contracts.Shop.address);

    if (allowable > 0) {
        await dapp.contracts.Shop.contract.functions.buyItem(1).then(displayShop);
    } else {
        alert('approve before buying');
    }
}

async function getDefaultCostsAndItems(account) {
    return await dapp.contracts.Shop.contract.functions.getDefaultCostsAndItems(account);
}

async function exit() {
    const account = await getAccount();
    const amount = await dapp.contracts.ETH_ERC20.contract.functions.balanceOf(account);
    const message = ethers.utils.toUtf8Bytes('Come visit again soon');

    await dapp.contracts.TokenManager.contract.functions.exitToMain(account, amount).then(displayShop);
}

function addListeners() {
    document.getElementById('approveArrows').addEventListener('click', approveArrows);
    document.getElementById('buyArrows').addEventListener('click', buyArrows);
    document.getElementById('exit').addEventListener('click', exit);
}