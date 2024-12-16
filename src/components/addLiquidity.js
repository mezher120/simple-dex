import React, { useState } from "react";
import { getSimpleDEXContract, getTokenContract } from "../web3";
import { TOKEN_A_ADDRESS, TOKEN_B_ADDRESS } from "../constants";

const AddLiquidity = () => {
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  const handleAddLiquidity = async () => {
    try {
      const dexContract = getSimpleDEXContract();
      const tokenA = getTokenContract(TOKEN_A_ADDRESS);
      const tokenB = getTokenContract(TOKEN_B_ADDRESS);

      // Aprobar tokens
      const txA = await tokenA.approve(dexContract.address, amountA);
      const txB = await tokenB.approve(dexContract.address, amountB);
      await Promise.all([txA.wait(), txB.wait()]);

      // Agregar liquidez
      const tx = await dexContract.addLiquidity(amountA, amountB);
      await tx.wait();
      alert("Liquidity added!");
    } catch (error) {
      console.error("Error adding liquidity:", error);
    }
  };

  return (
    <div>
      <h2>Add Liquidity</h2>
      <input
        type="number"
        placeholder="Amount Token A"
        value={amountA}
        onChange={(e) => setAmountA(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount Token B"
        value={amountB}
        onChange={(e) => setAmountB(e.target.value)}
      />
      <button onClick={handleAddLiquidity}>Add Liquidity</button>
    </div>
  );
};

export default AddLiquidity;
