import React from 'react';

function Home() {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  return (
    <div>
      <h1>Bienvenue sur la page d'accueil !</h1>
      {token && <p>Bonjour, utilisateur {userName}!</p>}
    </div>
  );
}

export default Home;
