import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateUser } from '../../hooks/user/useUpdateUser';
import './Profile.scss';

export const Profile = () => {
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState([]);
  const { loading, error, updateUser } = useUpdateUser();

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const url = `http://127.0.0.1:3000/users/${id}`;
    console.log(url);

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log('error', error));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      // admin: event.target.elements.admin.value || false,
    };
    updateUser(id, data);
  }

  return (    
      <div className="profile">
        <p>Mettre à jour mon profil</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom</label>
          <input type="text" name="name" defaultValue={user.name} />
          <label htmlFor="name">Prénom</label>
          <input type="text" name="surname" defaultValue={user.surname} />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" defaultValue={user.email} />
          {/* <label htmlFor="admin">Admin</label>
          <input type="text" name="admin" defaultValue={user.admin} /> */}
          <button type="submit" disabled={loading}>
            Mettre à jour
          </button>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
        </form>
      </div>  
  );
};
