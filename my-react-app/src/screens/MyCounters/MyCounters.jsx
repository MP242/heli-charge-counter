import React, { useEffect } from 'react';
import './MyCounters.scss';
import { useGetSessionCounter } from '../../hooks/sessionCounter/useGetSessionCounter';
import { Accordion } from '../../composants/Accordion/Accordion';

export const MyCounters = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { loading, AllSessionCounter, getAllSessionCounter } =
    useGetSessionCounter();

  useEffect(() => {
    getAllSessionCounter(user.userId);
  }, []);

  return (
    <div className='MyCounters'>
      {loading && <p>Loading...</p>}
      {AllSessionCounter.map((sessionCounter) => {
        const date = new Date(sessionCounter.created_at);
        const formattedDate = date.toLocaleDateString('fr-FR');

        return (
          <div className="sessionCounter" key={sessionCounter._id}>
            <Accordion
              title={formattedDate}
              counters={sessionCounter.counterSession}
            />
          </div>
        );
      })}
    </div>
  );
};
