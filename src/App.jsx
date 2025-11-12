import { useState, useEffect } from 'react'
import getRandomNumber  from '../service/calc.js'
import './App.css'
import Cards from '../comps/cards.jsx'

function App() {
  const [combination, setCombination] = useState(getRandomNumber())
  const target = combination[0] * combination[1] * combination[2]
  
  const [selectedCards, setSelectedCards] = useState([])
  const [timer, setTimer] = useState(20)
  const [gameActive, setGameActive] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (timer <= 0 && gameActive) {
      setGameActive(false)
      setMessage('Time\'s up! You Lose!')
    }
    
    if (!gameActive) return
    
    const interval = setInterval(() => {
      setTimer(t => t - 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [timer, gameActive])

  function handleCardClick(num) {
    if (selectedCards.length < 3 && !selectedCards.includes(num) && gameActive) {
      const newSelected = [...selectedCards, num]
      setSelectedCards(newSelected)

      if (newSelected.length === 3) {
        const product = newSelected.reduce((a, b) => a * b, 1)
        if (product === target) {
          setMessage('🎉 You Win!')
          setGameActive(false)
        } else {
          setMessage(`❌ ${product} ≠ ${target} - You Lose!`)
          setGameActive(false)
        }
      }
    }
  }

  function resetGame() {
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
        {[1,2,3,4,5,6,7,8,9,10].map(num => (
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
