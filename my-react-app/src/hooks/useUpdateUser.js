import { useState } from 'react';

export function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  function updateUser(id, data) {
    setLoading(true);
    setError(null);

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const url = `http://127.0.0.1:3000/users/${id}`;

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        // handle success
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  }

  return { loading, error, updateUser };
}


