import Web3 from "web3";
require('dotenv').config();
// const web3 = require("app/web3");
let web3;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask.
  const provider = new Web3.providers.HttpProvider(
    process.env.RPC_URL || ''
  );
  web3 = new Web3(provider);
}
export default web3;


const contractJson = require('app/assets/contracts/TokenizedVault.json')

export const tokenizedVaultContract = new web3.eth.Contract(
  contractJson.abi,
  process.env.TOKENIZEDVAULT_CONTRACT_ADDRESS
);

export const deposit = async (assets, receiver) => {
  console.log('tokenizedVaultContract', tokenizedVaultContract)
  console.log('assets', assets)
  console.log('receiver', receiver)
  const shares = await tokenizedVaultContract.methods.deposit(assets, receiver).call();
  return shares;
};

export const balanceOf = async (userAddress) => await tokenizedVaultContract.methods.balanceOf(userAddress).call();