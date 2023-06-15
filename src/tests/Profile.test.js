import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes do componente Profile', () => {
  test('Testa se ao clicar no botão "Logout" o usuário é rederenciado para a rota "/"', () => {
    const { history } = renderWithRouter(<App />, '/profile');

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });

    act(() => {
      userEvent.click(logoutBtn);
    });

    expect(history.location.pathname).toBe('/');
  });
  test('Testa se ao clicar no botão " Done Recipes" o usuário é rederenciado para a rota "/done-recipes"', () => {
    const { history } = renderWithRouter(<App />, '/profile');

    const doneRecipesBtn = screen.getByRole('button', {
      name: /Done Recipes/i,
    });

    act(() => {
      userEvent.click(doneRecipesBtn);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('Testa se ao clicar no botão " Favorite Recipes" o usuário é rederenciado para a rota "/done-recipes"', () => {
    const { history } = renderWithRouter(<App />, '/profile');

    const doneRecipesBtn = screen.getByRole('button', {
      name: /Favorite Recipes/i,
    });

    act(() => {
      userEvent.click(doneRecipesBtn);
    });

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
