import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { DEX_ABI } from "../constants"; // Import your SimpleDEX ABI
import { DEX_ADDRESS } from "../constants"; // Import your deployed SimpleDEX contract address

const LiquidityTracker = () => {
  const [reserveA, setReserveA] = useState("0");
  const [reserveB, setReserveB] = useState("0");

  const fetchLiquidity = async () => {
    try {
      if (!window.ethereum) throw new Error("Please install MetaMask!");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const dexContract = new ethers.Contract(DEX_ADDRESS, DEX_ABI, provider);

      // Fetch reserves
      const reserveA = await dexContract.reserveA();
      const reserveB = await dexContract.reserveB();

      setReserveA(ethers.utils.formatEther(reserveA)); // Convert from wei to human-readable format
      setReserveB(ethers.utils.formatEther(reserveB));
    } catch (err) {
      console.error("Error fetching liquidity:", err);
    }
  };

  // Fetch liquidity on component mount and when reserves may change
  useEffect(() => {
    fetchLiquidity();
  }, []);

  return (
    <div className="liquidity-tracker">
      <h3>Liquidity Pool</h3>
      <p>
        <strong>Token A:</strong> {reserveA}
      </p>
      <p>
        <strong>Token B:</strong> {reserveB}
      </p>
      <button onClick={fetchLiquidity}>Refresh Liquidity</button>
    </div>
  );
};

export default LiquidityTracker;
