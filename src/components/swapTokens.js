import React, { useState } from "react";
import { getSimpleDEXContract } from "../web3";

const SwapTokens = ({ swapType }) => {
  const [amount, setAmount] = useState("");

  const handleSwap = async () => {
    try {
      const dexContract = getSimpleDEXContract();

      if (swapType === "AtoB") {
        const tx = await dexContract.swapAforB(amount);
        await tx.wait();
      } else {
        const tx = await dexContract.swapBforA(amount);
        await tx.wait();
      }

      alert("Swap successful!");
    } catch (error) {
      console.error("Error swapping tokens:", error);
    }
  };

  return (
    <div>
      <h2>Swap {swapType === "AtoB" ? "Token A for B" : "Token B for A"}</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSwap}>Swap</button>
    </div>
  );
};

export default SwapTokens;
