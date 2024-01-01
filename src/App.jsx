import { useEffect, useState } from "react";
import Die from "./components/Die"
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => firstValue === die.value);
    if(allHeld && allSameValue) setTenzies(true);
  }, [dice]) 
 console.log(tenzies)

 function generateNewDice() {
  const randomNumber = Math.floor(Math.random() * 6) + 1
  return {
    value : randomNumber,
    isHeld : false,
    id : nanoid()
  }
 }

  function allNewDice() {
    const diceArray = [];
    for(let i=0; i<10; i++) {
      diceArray.push(generateNewDice());
    }
    return diceArray;
  }
 //console.log(allNewDice())

 function diceRoll() {
   setDice(oldDice => oldDice.map(randomDice => {
    return randomDice.isHeld ?
      randomDice : generateNewDice();
   }));

   if(tenzies) {
    setDice(allNewDice());
    setTenzies(false)
   }
 }

 function holdDice(id) {
  setDice(oldDice => oldDice.map(randomDice => {
    return randomDice.id === id ? {...randomDice, isHeld: !randomDice.isHeld} : randomDice;
  }))
 }

  return (
    
   <main className="boarder-layout">
    {tenzies && <Confetti />}
      <div className="inner-boarder-layout">
        <div className="dice-container">
          {dice.map(randomDice=> (
            <Die 
              key={randomDice.id}
              value={randomDice.value}
              isHeld={randomDice.isHeld}
              onHold={() => holdDice(randomDice.id)}
            //  id={randomNum.id} --> The method ik of passing data from child to parent
            //  onHold={holdDice} --> The method ik of passing data from child to parent
              
            />
          ))}
        </div>
        <button 
          className="dice-button"
          onClick={diceRoll}
          > {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
   </main>
  )
}


