import React from "react";
import AddLiquidity from "./components/addLiquidity";
import SwapTokens from "./components/swapTokens";
import RemoveLiquidity from "./components/RemoveLiquidity";
import TokenPrice from "./components/TokenPrice";
import LiquidityTracker from "./components/LiquidityTracker";
import {  DEX_ADDRESS } from "./constants";

const App = () => {

  const dexAddress = DEX_ADDRESS;

  return (
    <div>
      <h1>SimpleDEX Front-End</h1>
      <AddLiquidity />
      <RemoveLiquidity dexAddress={dexAddress} />
      <SwapTokens swapType="AtoB" />
      <SwapTokens swapType="BtoA" />
      <TokenPrice dexAddress={dexAddress} />
      <LiquidityTracker></LiquidityTracker>
    </div>
  );
};

export default App;
