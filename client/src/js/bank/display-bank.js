export default async function displayBank() {
    await dapp.provider.listAccounts();
    document.getElementById('space').innerHTML = await getMarkup();
    addListeners();
}

async function getMarkup() {
    const account = await getAccount();
    const balance = await getBalance();
    const available = await getAvailable(account);

    return `<div class="bank">
        <div class="space"><h1>BANK</h1></div>
        <div class="account">Rinkeby Wallet: ${account}</div>
        <div class="balance">Available for Deposit: ${balance} ETH</div>
        <div class="available">Available for Withdraw: ${available} ETH</div>
        <div><button id="deposit">Deposit 1 ETH</button></div>
        <div><button id="withdraw">Withdraw Available Funds</button></div>
    </div>`;
}

async function getAccount() {
    return await dapp.contracts.DepositBox.contract.signer.getAddress();
}

async function getBalance() {
    const amount = await dapp.contracts.DepositBox.contract.signer.getBalance();
    return ethers.utils.formatEther(amount);
}

async function getAvailable(account) {
    const amount = await dapp.contracts.LockAndDataForMainnet.contract.approveTransfers(account);
    return ethers.utils.formatEther(amount);
}

function addListeners() {
    document.getElementById('deposit').addEventListener('click', deposit);
    document.getElementById('withdraw').addEventListener('click', withdraw);
}

async function deposit() {
    const schainID = 'drab-diphda';
    const account = await dapp.contracts.DepositBox.contract.signer.getAddress();

    await await dapp.contracts.DepositBox.contract.deposit(schainID, account, {value: ethers.utils.parseEther("1.0")});
}

async function withdraw() {
    await dapp.contracts.LockAndDataForMainnet.contract.getMyEth();
}