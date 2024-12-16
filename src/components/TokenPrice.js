import React, { useState } from "react";
import { ethers } from "ethers";
import { DEX_ABI } from "../constants";
import { DEX_ADDRESS, TOKEN_A_ADDRESS, TOKEN_B_ADDRESS } from "../constants";

const TokenPrice = () => {
  const [priceA, setPriceA] = useState("0");
  const [priceB, setPriceB] = useState("0");

  const fetchTokenPrice = async () => {
    try {
      if (!window.ethereum) throw new Error("Please install MetaMask!");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const dexContract = new ethers.Contract(DEX_ADDRESS, DEX_ABI, provider);

      const priceAInB = await dexContract.getPrice(TOKEN_A_ADDRESS); // Replace with actual Token A address
      const priceBInA = await dexContract.getPrice(TOKEN_B_ADDRESS); // Replace with actual Token B address

      setPriceA(ethers.utils.formatEther(priceAInB));
      setPriceB(ethers.utils.formatEther(priceBInA));
    } catch (err) {
      console.error("Error fetching token prices:", err);
    }
  };

  return (
    <div className="token-price">
      <h3>Token Prices</h3>
      <p>
        <strong>1 Token A =</strong> {priceA} Token B
      </p>
      <p>
        <strong>1 Token B =</strong> {priceB} Token A
      </p>
      <button onClick={fetchTokenPrice}>Get Token Price</button>
    </div>
  );
};

export default TokenPrice;

