import React from 'react'
import './SingleCard.css'

function SingleCard({ card, handleChoice, flipped }) { // khai bao ben App.js thi phai khai bao ben component de co the su dung duoc

    const handleClick = () => {
        handleChoice(card);
    }
    return (
        <div className="card-grid-items" >
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="front card" />
                <img
                    className="back"
                    src="./img/cover.png"
                    alt="back"
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}
export default SingleCard;
