import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Register.scss';
import { useCreateUser } from '../../hooks/user/useCreateUser';

export const Register = ({ setIsLoggedIn }) =>{
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onBlur', criteriaMode: 'all' });

  const password = watch('password', '');

  const { loading, newUser, createUser } = useCreateUser();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await createUser(
        data.userName,
        data.surname,
        data.name,
        data.email,
        data.password
      );
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la création de l'utilisateur : ",
        error
      );
      setErrorMessage(
        "Une erreur s'est produite lors de la création de l'utilisateur, veuillez réessayer."
      );
      // Vous pouvez ici ajouter une gestion d'erreur supplémentaire si nécessaire
      // par exemple afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <div className="register">
      <section className="register__container">
        <h1 className="register__container__title">S'enregistrer</h1>
        {errorMessage && (
          <p className="register__container__error">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="register__container__inputContainer">
            <label htmlFor="userName">Pseudo:</label>
            <input
              type="text"
              {...register('userName', {
                required: 'Le pseudo est requis',
              })}
            />
            {errors.userName && (
              <p className="register__container__inputContainer__errors">
                {errors.userName.message}
              </p>
            )}
          </div>
          <div className="register__container__NameSurnameContainer">
            <div className="register__container__NameSurnameContainer__NameSurnameSubContainer">
              <label htmlFor="Prénom">Prénom:</label>
              <input
                type="text"
                {...register('surname', {
                  required: 'Le prénom est requis',
                })}
              />
              {errors.surname && (
                <p className="register__container__inputContainer__errors">
                  {errors.surname.message}
                </p>
              )}
            </div>
            <div className="register__container__NameSurnameContainer__NameSurnameSubContainer">
              <label htmlFor="Nom">Nom:</label>
              <input
                type="text"
                {...register('name', {
                  required: 'Le nom est requis',
                })}
              />
              {errors.name && (
                <p className="register__container__inputContainer__errors">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div className="register__container__inputContainer">
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
              <p className="register__container__inputContainer__errors">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="register__container__inputContainer">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              {...register('password', {
                required: 'Le mot de passe est requis',
                pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    message: 'Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial (!@#$%^&*) et être d\'au moins 8 caractères de long',
                  },
              })}
            />
            {errors.password && (
              <p className="register__container__inputContainer__errors">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="register__container__inputContainer">
            <label htmlFor="confPassword">Confirme Password:</label>
            <input
              type="password"
              {...register('confPassword', {
                required: 'La confirmation du mot de passe est requise',
                pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    message: 'Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial (!@#$%^&*) et être d\'au moins 8 caractères de long',
                  },
                validate: (value) =>
                  value === password ||
                  'Les mots de passe doivent correspondre',
              })}
            />
            {errors.confPassword && (
              <p className="register__container__inputContainer__errors">
                {errors.confPassword.message}
              </p>
            )}
          </div>
          <div className="register__container__btnContainer">
            <button
              type="submit"
              disabled={!isValid}
              className={
                !isValid ? 'register__container__btnContainer__disabled' : ''
              }
            >
              S'enregistrer
            </button>
            <Link to="/login">J'ai déjà un compte</Link>
          </div>
          {loading && <p>Loading...</p>}
        </form>
      </section>
    </div>
  );
}
