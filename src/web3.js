import { ethers } from "ethers";
import { DEX_ADDRESS, DEX_ABI, TOKEN_ABI, TOKEN_A_ADDRESS, TOKEN_B_ADDRESS } from "./constants";

// Conectar a Metamask
export const getProvider = () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  } else {
    alert("Please install Metamask!");
    throw new Error("Metamask not found");
  }
};

// Conectar al contrato SimpleDEX
export const getSimpleDEXContract = () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(DEX_ADDRESS, DEX_ABI, signer);
};

// Conectar a los contratos TokenA y TokenB
export const getTokenContract = (tokenAddress) => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(tokenAddress, TOKEN_ABI, signer);
};
