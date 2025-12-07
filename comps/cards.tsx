import './cards.css'
import Deco from './deco'

interface CardsProps {
    num: number;
    onClick?: () => void;
    click?: () => void;
    locked?: boolean;
    disabled?: boolean;
}


const Cards:React.FC<CardsProps> = ({ num, onClick, click, locked = false, disabled = false }) => {
    const handle = onClick ?? click

    return (
        <>
            <button
                onClick={handle}
                disabled={disabled || locked}
                className={`card ${locked ? 'locked' : ''}`}
                aria-pressed={locked}
            >
                {locked ? '🔒 ' : ''}{num} <Deco />
            </button>
        </>
    )
}
export default Cards