import React, { useState } from 'react';
import './Accordion.scss';

export const Accordion = ({ title, counters }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Accordion" onClick={() => setIsOpen(!isOpen)}>
      <div className="Accordion__mainLine">
        <span>Date : {title}</span>
        <span>|</span>
        <span>nombre de compteur : {Object.keys(counters).length} </span>
        <span>|</span>
        <span>{isOpen ? '▼' : '►'}</span>
      </div>
      {isOpen && (
        <table className='Accordion__table'>
          <thead>
            <tr>
              <th>Nom du compteur</th>
              <th>Nombre de charges</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(counters).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
