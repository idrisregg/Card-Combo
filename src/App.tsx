import { useState, useEffect } from 'react'
import getRandomNumber from '../calc/calc.ts'
import './App.css'
import Cards from '../comps/cards.tsx'

function App() {
  const [combination, setCombination] = useState<number[]>(getRandomNumber())
  const target = combination[0] * combination[1] * combination[2]

  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [timer, setTimer] = useState<number>(20)
  const [gameActive, setGameActive] = useState<boolean>(true)
  const [message, setMessage] = useState<string>('')


  useEffect(() => {
    document.body.style.backgroundImage = "url('/bg.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }, []);

  // end game when timer reaches 0
  useEffect(() => {
    if (timer <= 0 && gameActive) {
      setTimeout(() => {
        setGameActive(false)
        setMessage(`Time's up! The combination was ${combination.join(' × ')} = ${target}`)
      }, 0)
    }
  }, [timer, gameActive, combination, target])

  // run the countdown
  useEffect(() => {
    if (!gameActive) return

    const interval = setInterval(() => {
      setTimer(t => t - 1)
    }, 1000)

    // cleanup when game stops or component unmounts
    return () => clearInterval(interval)
  }, [gameActive])

  // resets game to default settings
  function handleCardClick(num: number) {

    if (!gameActive) return

    if (selectedCards.includes(num)) return

    if (selectedCards.length >= 3) return

    const newSelected = [...selectedCards, num]
    setSelectedCards(newSelected)

    if (newSelected.length === 3) {
      const product = newSelected.reduce((a, b) => a * b, 1)

      if (product === target) {
        setGameActive(false)
        setMessage("You Win! 🎉")
      } else {
        setGameActive(false)
        setMessage(`${product} ≠ ${target} — You Lose 😞`)
      }
    }
  }


  // resets everything back to a fresh game
  function resetGame(): void {
    setCombination(getRandomNumber())
    setSelectedCards([])
    setTimer(20)
    setGameActive(true)
    setMessage('')
  }



  return (
    <>
      <h2>Pick 3 Cards</h2>
      <div className='timer'>⏱️ {timer}s</div>
      <h3>Target: {target}</h3>

      <div className='main'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
          <Cards
            key={num}
            num={num}
            onClick={() => handleCardClick(num)}
            locked={selectedCards.includes(num)}
            disabled={!gameActive}
          />
        ))}
      </div>

      <p>___________________________________________________________</p>
      <p>{selectedCards.length > 0 ? `Selected: ${selectedCards.join(' × ')}${selectedCards.length === 3 ? ` = ${selectedCards.reduce((a, b) => a * b, 1)}` : ''}` : '...'}</p>
      <p>{message}</p>
      <button className='new' onClick={resetGame}>New Game</button>
    </>
  )
}
export default App