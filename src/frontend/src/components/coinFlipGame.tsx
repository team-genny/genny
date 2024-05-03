import { useState } from "react";
import "./coinFlipGame.css";
import coinGif from "./images/coin flip.gif"

const CoinFlipGame = () => {
  const [chosenOption, setChosenOption] = useState<string | null>(null);
  const [coinResult, setCoinResult] = useState<string | null>(null);

  const flipCoin = (option: string) => {
    setChosenOption(option);

    const result = Math.random() < 0.5 ? "heads" : "tails";
    setCoinResult(result);
  };

  const retryGame = () => {
    setChosenOption(null);
    setCoinResult(null);
  };

  return (
    <div className="coin-flip-game">
      <img src={coinGif} />
      <div>
        <button
          onClick={() => flipCoin("heads")}
          disabled={coinResult !== null}
        >
          Heads
        </button>
        <button
          onClick={() => flipCoin("tails")}
          disabled={coinResult !== null}
        >
          Tails
        </button>
        <p>pick head or tails</p>
      </div>
      {coinResult && (
        <div className="coin-result">
          <p>{coinResult === chosenOption ? "You won! 🎉" : "You lost. 😔"}</p>
          <button onClick={retryGame}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default CoinFlipGame;
