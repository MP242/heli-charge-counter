import { useState } from 'react';

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState([]);

  function createUser(userName,surname,name, email, password) {
    setLoading(true);

    return fetch('http://127.0.0.1:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName,surname,name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User created:', data);
        setLoading(false);
        setNewUser(data);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        setLoading(false);
      });
  }

  return { loading, newUser, createUser };
}
