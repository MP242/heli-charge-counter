import React,{ useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUpdateUser } from '../hooks/useUpdateUser'


function Profile() {
  const { id } = useParams()
  console.log(id)
  const [user,setUser] = useState([])
  const { loading, error, updateUser } = useUpdateUser();

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const url = `http://127.0.0.1:3000/users/${id}`
    console.log(url)
    
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log('error', error));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      admin: event.target.elements.admin.value
    };
    updateUser(id, data);
  }

  return (
    <div className='container'>
      <div className='subContainer'>
        <p>Mets à jour ton profil {user.name}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom</label>
          <input type="text" name="name" defaultValue={user.name} />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" defaultValue={user.email} />
          <label htmlFor="admin">Admin</label>
          <input type="text" name="admin" defaultValue={user.admin} />
          <button type="submit" disabled={loading}>Mettre à jour</button>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
        </form>
      </div>
    </div>
  )
}

export default Profile