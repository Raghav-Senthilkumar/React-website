import React from "react";
import './CardInfo.css'

const CardInfo = ({ imageUrl, title, paragraph }) => {
    return (
        <article className="card__article">
            <div className="card_data">
                <img src={imageUrl} alt="Card" />
                <h1 className="title">{title}</h1>
                <p>{paragraph}</p>
            </div>
        </article>
    );
};

export default CardInfo;