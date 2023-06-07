// import Web3 from "web3";
import web3 from "~/web3";
import { CeloContract } from "@celo/contractkit";
import { newKitFromWeb3 } from "@celo/contractkit";

require('dotenv').config();
const contractJson = require('~/assets/contracts/TokenizedVault.json');

const TOKENIZEDVAULT_CONTRACT_ADDRESS = "0xb3B5a64C2971e3a62625506D6056c902bC6A5c36";

// const web3 = new Web3("https://alfajores-forno.celo-testnet.org"); // celo testnet rpc
export const kit = newKitFromWeb3(web3);

const initContract = async () => {
	// Check the Celo network ID
	// const networkId = await web3.eth.net.getId();
	
	// Get the contract associated with the current network
	// const deployedNetwork = HelloWorld.networks[networkId];

	await kit.setFeeCurrency(CeloContract.StableToken);

	// Set default account
	// let accounts = await kit.web3.eth.getAccounts();
	// console.log('accounts', accounts);
	// console.log('accounts[0]', accounts[0]);
	// kit.defaultAccount = accounts[0];

	// Create a new contract instance with the tokenized vault contract info
	let instance = await new kit.web3.eth.Contract(
		contractJson.abi,
		TOKENIZEDVAULT_CONTRACT_ADDRESS,
	);

	return instance;
};

export const getAccounts = async () => {
	let accounts = await kit.web3.eth.getAccounts();
	return accounts;
};

export const balanceOf = async (address) => {
	const contract = await initContract();
	const tx = contract.methods.balanceOf(address).call();
	return tx;
};

export const approve = async (signer, assets) => {
  let cUSDcontract = await kit.contracts.getStableToken();
  
  const allowance = kit.web3.utils.toWei(assets.toString(), "ether");
  const tx = await cUSDcontract.approve(TOKENIZEDVAULT_CONTRACT_ADDRESS, allowance.toString()).send({ from: signer });
  return tx;
};

export const assetAllowance = async (spender) => {
  let cUSDcontract = await kit.contracts.getStableToken();

  const currentAllowance  = await cUSDcontract.allowance(spender, TOKENIZEDVAULT_CONTRACT_ADDRESS);
  return currentAllowance;
};

export const deposit = async (assets, receiver) => {
	const contract = await initContract();

	// Todo: Get stable token contract (asset) decimals from token contract
	const allowance = kit.web3.utils.toWei(assets.toString(), "ether");

	let txObject = await contract.methods.deposit(allowance, receiver);
  let tx = await kit.sendTransactionObject(txObject, { from: receiver });
  await tx.waitReceipt();

	return tx;
};

export const withdraw = async (assets, receiver) => {
	const contract = await initContract();

	const allowance = kit.web3.utils.toWei(assets.toString(), "ether");
	let txObject = await contract.methods.withdraw(allowance, receiver, receiver);
  	let tx = await kit.sendTransactionObject(txObject, { from: receiver });
	await tx.waitReceipt();

	return tx;
};

export const totalAssets = async () => {
	const contract = await initContract();

	let assetAmount = await contract.methods.totalAssets().call();
	return assetAmount;
};

export const previewWithdraw = async (assets) => {
	const contract = await initContract();

	let sharesAmount = await contract.methods.previewWithdraw(assets).call();
	return sharesAmount;
};