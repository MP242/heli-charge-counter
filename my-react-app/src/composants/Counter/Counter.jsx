import React, { useState } from 'react';
import './Counter.scss';

export const Counter = ({name,value, onIncrement }) => {
  const [count, setCount] = useState(0);

  // const handleIncrement = () => {
  //   setCount((prevCount) => prevCount + 1);
  // };

  return (
    <div className="Counter" onClick={onIncrement}>      
      <h2 className="Counter__title">{name}</h2>
      <p className="Counter__value">{value}</p>
    </div>
  );
};
