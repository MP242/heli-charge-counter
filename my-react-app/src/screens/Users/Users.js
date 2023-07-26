import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteUser } from '../../hooks/user/useDeleteUser';
import { useCreateUser } from '../../hooks/user/useCreateUser';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const { loading, deleteUser } = useDeleteUser();
  const { loading: loadingCreate, newUser, createUser } = useCreateUser();

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('http://127.0.0.1:3000/users', requestOptions)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log('error', error));
  }, []);

  function handleDeleteUser(id) {
    deleteUser(id);
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    createUser(name, email, password)
      .then(() => {
        console.log('hello je suis avant le nouveau user', newUser);
        setUsers([...users, newUser]);
        console.log('hello je suis après les nouveau users', users);
      }) // ici, on ajoute le nouveau user à notre liste de users
      .catch((error) => console.error('Error creating user:', error));

    event.target.reset();
  }

  return (
    <div className="container">
      <div className="subContainer">
        <h1>Mes utilisateurs</h1>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <Link to={`/user/${user._id}`}>{user.name}</Link>
              <button onClick={() => handleDeleteUser(user._id)}>
                Supprimer
              </button>
              {loading && <p>Loading...</p>}
            </li>
          ))}
        </ul>
      </div>
      <div className="subContainer">
        <h1>Ajouter un utilisateur</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Yann Irbah" required />
          <input
            type="email"
            name="email"
            placeholder="email@gmail.com"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="********"
            required
          />
          <button type="submit" disabled={loading}>
            Ajouter
          </button>
          {loadingCreate && <p>Loading...</p>}
        </form>
      </div>
    </div>
  );
};
