import './cards.css'
import Deco  from './deco'

export default function Cards({ num, onClick, click, locked = false, disabled = false }) {
  const handle = onClick ?? click

  return (
    <>
      <button
        onClick={handle}
        disabled={disabled || locked}
        className={`card ${locked ? 'locked' : ''}`}
        aria-pressed={locked}
      >
        {locked ? '🔒 ' : ''}{num} <Deco/>
      </button>
    </>
  )
}