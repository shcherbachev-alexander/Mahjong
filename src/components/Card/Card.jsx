import React from 'react';
import './Card.scss';
const Card = (props) => {
    return (
        <div onClick={props.onClick}
            className={`card ${props.className}`}>
            {props.value}
        </div>
    )
}

export default Card;
