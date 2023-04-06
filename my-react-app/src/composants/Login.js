import React,{ useState } from "react";
// import { Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [noLoggedIn, setNoLoggedIn] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": email,
    "password": password
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:3000/users/login", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('userName', result.userName);
        setLoggedIn(true);
        setIsLoggedIn(true);
    })
    .then(() => navigate('/'))
    .catch(error => {console.log('error', error); setNoLoggedIn(true)});    
    };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {loggedIn && <p>Success !</p>}
        {noLoggedIn && <p>Erreur !  </p>}
    </div>
  );
}

export default Login;
