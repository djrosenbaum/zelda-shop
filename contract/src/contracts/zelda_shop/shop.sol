pragma solidity 0.5.11;

// Zelda Shop proof of concept

contract Shop {
	address shopOwner;

	mapping(address => mapping(uint256 => uint256)) items;

	mapping(uint256 => uint256) itemCost;

	IERC20 internal eth_erc20_interface;

	constructor(address erc20_address)
		public
	{
		shopOwner = msg.sender;

		// Arrows
		itemCost[1] = 0.001 ether;

		// Bombs
		itemCost[2] = 0.05 ether;

		// Shields
		itemCost[3] = 0.25 ether;

		eth_erc20_interface = IERC20(erc20_address);
	}

	function() external payable {}

	function buyItem(uint256 itemId)
		public
	{
		require(eth_erc20_interface.allowance(msg.sender, address(this)) >= itemCost[itemId], "Not approved");

		eth_erc20_interface.transferFrom(msg.sender, address(this), itemCost[itemId]);

		items[msg.sender][itemId] = items[msg.sender][itemId] + 1;
	}

	function getCost(uint256 itemId)
		public
		view
		returns(uint256)
	{
		return (itemCost[itemId]);
	}

	function getItemCount(address customer, uint256 itemId)
		public
		view
		returns(uint256)
	{
		return(items[customer][itemId]);
	}

	function getDefaultCosts()
		public
		view
		returns(uint256 arrowCost, uint256 bombCost, uint256 shieldCost)
	{
		return(itemCost[1], itemCost[2], itemCost[3]);
	}

	function getDefaultCostsAndItems(address customer)
		public
		view
		returns(uint256 balance, uint256 arrowCost, uint256 bombCost, uint256 shieldCost, uint256 totalArrows, uint256 totalBombs, uint256 totalShields)
	{
		return(address(this).balance, itemCost[1], itemCost[2], itemCost[3], items[customer][1], items[customer][2], items[customer][3]);
	}

	// withdraw shop profits
	function withdraw()
		public
	{
        uint256 profit = eth_erc20_interface.balanceOf(address(this));
		if (msg.sender == shopOwner && profit > 0) {
		    eth_erc20_interface.approve(msg.sender, profit);
			eth_erc20_interface.transfer(msg.sender, profit);
		}
	}
}

/* https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol */
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}