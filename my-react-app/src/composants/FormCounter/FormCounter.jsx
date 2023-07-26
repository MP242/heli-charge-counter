import React, { useState } from 'react';
import './FormCounter.scss';

export const FormCounter = ({onCounterNamesChange}) => {
  const [counterNames, setCounterNames] = useState({});
  const [newCounterName, setNewCounterName] = useState('');

  const handleAddCounter = () => {
    if (newCounterName.trim() !== '') {
      const updatedCounterNames = {
        ...counterNames,
        [newCounterName.trim()]: 0,
      };
      
      setCounterNames(updatedCounterNames);
      onCounterNamesChange(updatedCounterNames); // Notify the parent component
      setNewCounterName('');
    }
  };

  return (
    <div className="CounterForm">      
      <div className='CounterForm__container'>
        <div className='CounterForm__container__form'>
          <h1>Ajouter un ou des compteurs</h1>
          <input
            type="text"
            placeholder="Nom du compteur"
            value={newCounterName}
            onChange={(e) => setNewCounterName(e.target.value)}
          />
          <button onClick={handleAddCounter}>Ajouter un compteur</button>
        </div>
        <ul>
          {Object.keys(counterNames).map((counterName, index) => (
            <li key={index}>compteur n°{index} : {counterName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
