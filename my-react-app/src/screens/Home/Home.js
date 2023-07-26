import React, { useState } from 'react';
import { FormCounter } from '../../composants/FormCounter/FormCounter';
import { Counter } from '../../composants/Counter/Counter';
import { useCreateSessionCounter } from '../../hooks/sessionCounter/useCreateSessionCounter';
import './Home.scss';

export const Home =()=> {
  const [sessionCounters, setSessionCounters] = useState(false);
  const [counterNames, setCounterNames] = useState({});
  const { loading, newSessionCounter, createSessionCounter } =
    useCreateSessionCounter();
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user);

  const handleSession = () => {
    // console.log('counterNames', counterNames);
    setSessionCounters(!sessionCounters);
  };
  const saveSession = async () => {
    console.log('counterNames', counterNames);
    try {
      const userID = user.userId;
      const newSessionCounter = await createSessionCounter(
        userID,
        counterNames
      );
      if (newSessionCounter) {
        console.log('newSessionCounter', newSessionCounter);
        alert('Session enregistrée !');
        setSessionCounters(false);
      }
    } catch (error) {
      console.error('Error creating Session Counter:', error);
    }
  };

  const handleIncrement = (counterName) => {
    console.log('counterName', counterNames);
    setCounterNames((prevState) => ({
      ...prevState,
      [counterName]: prevState[counterName] + 1,
    }));
  };

  return (
    <div className="Home">
      {sessionCounters ? (
        <>
          <div className="Home__list">
            {Object.keys(counterNames).map((counterName, index) => (
              <Counter
                key={index}
                name={counterName}
                value={counterNames[counterName]}
                onIncrement={() => handleIncrement(counterName)}
              />
            ))}
          </div>
          <button onClick={saveSession}>Sauvegarder</button>
        </>
      ) : (
        <>
          <h1>Bonjour {user.surname},</h1>
          <h1>
            bienvenue sur la page d'accueil du compteur de charge Helilagon !
          </h1>
          <div>
            <FormCounter
              onCounterNamesChange={(newCounterNames) => {
                setCounterNames(newCounterNames);
                console.log(newCounterNames);
              }}
            />
            <button onClick={handleSession}>Démarrer la session</button>
          </div>
        </>
      )}
    </div>
  );
};
