import React from 'react';
import { useFormContext } from 'react-hook-form';

function FormField({ name, label, type = 'text', validation }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="register__container__inputContainer">
      <label htmlFor={name}>{label}:</label>
      <input type={type} {...register(name, validation)} />
      {errors[name] && (
        <p className='register__container__inputContainer__errors'>{errors[name].message}</p>
      )}
    </div>
  );
}

export default FormField;
