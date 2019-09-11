export default {
	address: '0x0f5042d05a67b3dfd5dbc53f4db3421710d3da18',
	abi: [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "itemId",
          "type": "uint256"
        }
      ],
      "name": "buyItem",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "erc20_address",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "itemId",
          "type": "uint256"
        }
      ],
      "name": "getCost",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getDefaultCosts",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "arrowCost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "bombCost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "shieldCost",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "customer",
          "type": "address"
        }
      ],
      "name": "getDefaultCostsAndItems",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "arrowCost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "bombCost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "shieldCost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalArrows",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalBombs",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalShields",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "customer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "itemId",
          "type": "uint256"
        }
      ],
      "name": "getItemCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
}