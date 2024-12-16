import React, { useState } from "react";
import { ethers } from "ethers";
import { DEX_ABI } from "../constants";

const RemoveLiquidity = ({ dexAddress }) => {
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  const handleRemoveLiquidity = async () => {
    try {
      if (!window.ethereum) throw new Error("Please install MetaMask!");

      const provider = new ethers.providers.Web3Provider(window.ethereum); // Ethers v5
      const signer = provider.getSigner();
      const dexContract = new ethers.Contract(dexAddress, DEX_ABI, signer);

      const tx = await dexContract.removeLiquidity(
        ethers.utils.parseEther(amountA),
        ethers.utils.parseEther(amountB)
      );
      await tx.wait();

      alert("Liquidity removed successfully!");
    } catch (err) {
      console.error("Error removing liquidity:", err);
      alert(err.message || "Error removing liquidity");
    }
  };

  return (
    <div>
      <h2>Remove Liquidity</h2>
      <input
        type="text"
        placeholder="Amount of Token A"
        value={amountA}
        onChange={(e) => setAmountA(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount of Token B"
        value={amountB}
        onChange={(e) => setAmountB(e.target.value)}
      />
      <button onClick={handleRemoveLiquidity}>Remove Liquidity</button>
    </div>
  );
};

export default RemoveLiquidity;
