import React, {useEffect, useState} from 'react';
import './CardList.scss';
import Card from '../Card/Card';

const CardList = () => {
    const [finishedItems, setFinishedItems] = useState([]);
    const [defaultItems, setDefaultItems] = useState(true);
    const [cards, setCards] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    function getAllPrimeNumber(num) {
        const array = [];
        let isPrime;
        for (let i = 2; i < num; i++) {
            for (let j = 2; (isPrime = i === j || i % j !== 0) && j <= i / 2; j++) {}

            isPrime && array.push(i);
        }
        return array;
    }

    const primeNumberArray = getAllPrimeNumber(59).sort(() => Math.random() - 0.5);

    const checkItems = (firstIndex, secondIndex) => {
        if (
            firstIndex !== secondIndex &&
            cards[firstIndex] === cards[secondIndex]
        ) {
            setFinishedItems([...finishedItems, firstIndex, secondIndex]);
        } else {
            setTimeout(() => {
                setVisibleItems([]);
            }, 600);
        }
    };

    useEffect(()=>{
        setCards(primeNumberArray.concat(primeNumberArray).sort(() => Math.random() - 0.5));
        setTimeout(() => {
            setDefaultItems(false);
        }, 5000);
    },[]);

    return (
        <div className="cardList">
            {cards.map((item, index) => (
                <Card
                    className={`${
                        visibleItems.includes(index) ? " card-show" : ""
                    }${
                        defaultItems ? " card-show-default" : ""
                    }${
                        finishedItems.includes(index)
                            ? " card-show card-finished"
                            : ""
                    }`}
                    onClick={() => {
                        if (!finishedItems.includes(index)) {
                            switch (visibleItems.length) {
                                case 0:
                                    setVisibleItems([index]);
                                    break;
                                case 1:
                                    if (visibleItems[0] !== index) {
                                        setVisibleItems(visibleItems.concat(index));
                                        checkItems(visibleItems[0], index);
                                    }
                                    break;
                                case 2:
                                    setVisibleItems([index]);
                                    break;
                                default:
                                    setVisibleItems([]);
                            }
                        }
                    }}
                    key={`card-${index}`} value={item}
                />
            ))}
        </div>
    )
}

export default CardList;
