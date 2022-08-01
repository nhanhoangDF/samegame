import './css/App.css'
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [ // create array img 
  //matched : de danh dau trang thai cua tung card
  { src: "./img/builder-1.png", matched: false },
  { src: "./img/hero-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/power-1.png", matched: false },
  { src: "./img/resource-1.png", matched: false },
  { src: "./img/super-1.png", matched: false },
  { src: "./img/research-1.png", matched: false },
  { src: "./img/rune-1.png", matched: false },
]

function App() {

  // card, setCards, turns, setTurns for location card, change location when clicking button "new game"
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // choiceOne, setChoiceOne, choiceTwo, setChoiceTwo for turn around the card
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // display how many time clicked and how many card 
  const [founded, setFounded] = useState([]);
  // const [clicked, setClicked] = useState(0);
  
  // shuffle for random img card in game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) // random number card
      .map((card) => ({ ...card, id: Math.random() })) //random location card

    setCards(shuffledCards) // render 
    setTurns(0) // how many clicked in game
    setFounded(0) // how many card to founded
  }
  // prop handleChoice to SingleCard component
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card); // why setChoiceTwo front choiceOne???
    setTurns(turns => turns + 1)
  }

  useEffect(() => { // useEffect for compare card samething, use logic && inreact for compare choiceOne vs choiceTwo
    if (choiceOne && choiceTwo) { // will compare choiceOne vs choiceTwo
      if (choiceOne.src === choiceTwo.src) { // neu' nhu hai src giong nhau thì`
        setCards(prevCards => {              // su dung setCards de danh dau card da chon
          return prevCards.map(card => {     // 
            if (card.src === choiceOne.src) {
              return { ...card, matched: true } // ket qua cuoi de change matched tu false to true neu hai card giong nhau
            } else {
              return card //sai thi quay lai tu dau de chay func lai tu dau
            }
          })
        })
        setFounded(founded => founded + 1)
        resetTurn();
      } 
      else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]) //include choiceOne and choiceTwo for comparing

  // reset when choice different card in game
  const resetTurn = () => {
    setChoiceTwo(null)
    setChoiceOne(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Memory game by react</h1>
      <button onClick={shuffleCards}>Reset Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice} // su dung props de ket noi SingleCard component de su dung 
            flipped={card === choiceOne || card === choiceTwo || card.matched} // conditional render =)
          />
        ))}
        <p>{turns} clicked</p>
        <p>{founded}/8 correct</p>
      </div>
    </div>
  );
}

export default App;
