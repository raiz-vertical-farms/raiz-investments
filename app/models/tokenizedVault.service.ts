// require('dotenv').config();
const web3 = require("web3.js");

const contractJson = require('assets/contracts/TokenizedVault.json')

export const tokenizedVaultContract = new web3.eth.Contract(
  contractJson.abi,
  process.env.TOKENIZEDVAULT_CONTRACT_ADDRESS
);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return addressArray[0];
    } catch (err) {
      return (err as Error).message;
    }
  }
};

export const deposit = async (assets, receiver) => {
    const shares = await tokenizedVaultContract.methods.deposit(assets, receiver).call();
    return shares;
};

export const balanceOf = async (userAddress) => await tokenizedVaultContract.methods.balanceOf(userAddress).call();