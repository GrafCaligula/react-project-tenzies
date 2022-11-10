import React from "react";
import Die from "./components/Die";

/**
 * Challenge: Add conditional styling to the Die component
 * so that if it's held (isHeld === true), its background color
 * changes to a light green (#59E391)
 *
 * Remember: currently the Die component has no way of knowing
 * if it's "held" or not.
 */

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    const diceValues = [];

    for (let i = 0; i < 10; i++) {
      const rndNum = Math.floor(Math.random() * 6 + 1);

      diceValues.push({ value: rndNum, isHeld: false, id: i });
    }
    return diceValues;
  }

  function rollDice() {
    setDice((prevDice) => {
      return prevDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6 + 1) }
      );
    });
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  const diceElements = dice.map((die, index) => (
    <Die
      key={index}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="board">{diceElements}</div>
      <button className="btn-roll" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
