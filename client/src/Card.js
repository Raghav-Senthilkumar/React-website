import React from 'react';
import './Card.css'; // Don't forget to create and link your CSS file
import l from './back.jpg'

const Card = () => {
  return (
    <div class="card">
        <img src={l}class="image"/>
    </div>
  );
};

export default Card;