import React from "react";
import Die from "./components/Die";
import Timer from "./components/Timer";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  // State definition:
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [timerStart, setTimerStart] = React.useState(false);

  // Effects:
  React.useEffect(() => {
    const comparedValue = dice[0].value;
    const allHeld = dice.every((die) => die.isHeld);
    const allEqual = dice.every((die) => die.value === comparedValue);
    if (allHeld && allEqual) {
      setTenzies(true);
      setTimerStart(false);    
    }    
  }, [dice]);

  //functions:
  function createNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const diceValues = [];
    for (let i = 0; i < 10; i++) {
      diceValues.push(createNewDie());
    }
    return diceValues;
  }

  function rollDice() {
    setDice((prevDice) => {
      return prevDice.map((die) => (die.isHeld ? die : createNewDie()));
    });
    setRolls((prevState) => prevState + 1); 
    setTimerStart(true);   
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  function newGame() {
    setDice(allNewDice());
    setTenzies(false);
    setRolls(0);
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="board">{diceElements}</div>
      <button className="btn-roll" onClick={tenzies ? newGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div className="stats">
        <div className="rerolls">{`Re-rolls:  ${rolls}`}</div>
        <Timer timerStart={timerStart} rolls={rolls}/>
      </div>
    </main>
  );
}
