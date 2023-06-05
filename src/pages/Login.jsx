import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';

import RecipesContext from '../context/RecipesContext';

export default function Login() {
  const { loginState } = useContext(RecipesContext);
  const { login, setLogin } = loginState;

  const history = useHistory();

  const minLengthPassword = 6;
  const buttonDisable = validator
    .isEmail(login.email) && login.password.length >= minLengthPassword;

  return (
    <div>
      <input
        type="email"
        name="email"
        id="email"
        data-testid="email-input"
        value={ login.email }
        onChange={ ({ target }) => {
          setLogin({ ...loginState, email: target.value });
        } }
      />
      <input
        type="password"
        name="password"
        id="password"
        data-testid="password-input"
        value={ login.password }
        onChange={ ({ target }) => {
          setLogin({ ...loginState, password: target.value });
        } }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonDisable }
        onClick={ () => {
          localStorage.setItem('user', JSON.stringify({ email: login.email }));
          history.push('/recipes');
        } }
      >
        Enter
      </button>
    </div>
  );
}
