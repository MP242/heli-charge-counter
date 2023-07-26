import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import './Login.scss';

export const Login = ({ setIsLoggedIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur', criteriaMode: 'all' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(`Email: ${data.email}, Password: ${data.password}`);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://127.0.0.1:3000/users/login', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          console.log(result.error);
          setError('Email ou mot de passe incorrect !');
        } else {
          console.log(result);
          localStorage.setItem('user', JSON.stringify(result));
          setIsLoggedIn(true);
          navigate('/');
        }
      })
      .catch((error) => {
        console.log('ton error ', error);
        setError(error);
      });
  };

  return (
    <>
      {error && <p className="errors">{error} </p>}
      <div className="login">
        <section className="login__container">
          <h1 className="login__container__title">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login__container__inputContainer">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                {...register('email', {
                  required: "L'email est requis",
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: 'Veuillez entrer une adresse email valide',
                  },
                })}
              />
              {errors.email && (
                <p className="login__container__inputContainer__errors">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="login__container__inputContainer">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Le mot de passe est requis',
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    message:
                      "Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial (!@#$%^&*) et être d'au moins 8 caractères de long",
                  },
                })}
              />
              {errors.password && (
                <p className="login__container__inputContainer__errors">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="login__container__btnContainer">
              <button
                type="submit"
                disabled={!isValid}
                className={
                  !isValid ? 'login__container__btnContainer__disabled' : ''
                }
              >
                Login
              </button>
              <Link to="/register">Je n'ai pas de compte</Link>
            </div>
          </form>
          {loggedIn && <p>Success !</p>}
        </section>
      </div>
    </>
  );
};
