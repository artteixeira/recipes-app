import React, { useContext } from 'react';
import '../css/Login.css';

import { useHistory } from 'react-router-dom';
import validator from 'validator';

import LogoLogin from '../images/LogoLogin.png';

import RecipesContext from '../context/RecipesContext';

export default function Login() {
  const { loginState } = useContext(RecipesContext);
  const { login, setLogin } = loginState;

  const history = useHistory();

  const minLengthPassword = 6;
  const buttonDisable = validator
    .isEmail(login.email) && login.password.length > minLengthPassword;

  return (
    <div className="login-container">
      <div className="input-container">
        <img src={ LogoLogin } alt="Logo App" />
        <input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          value={ login.email }
          onChange={ ({ target }) => {
            setLogin({ ...loginState.login, email: target.value });
          } }
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          value={ login.password }
          onChange={ ({ target }) => {
            setLogin({ ...loginState.login, password: target.value });
          } }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !buttonDisable }
          onClick={ () => {
            localStorage.setItem('user', JSON.stringify({ email: login.email }));
            history.push('/meals');
          } }
        >
          Enter
        </button>
      </div>
    </div>
  );
}
