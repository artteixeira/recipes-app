import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

beforeEach(() => {
  const user = { email: 'alguem@alguem.com' };
  localStorage.setItem('user', JSON.stringify(user));
  jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
    .mockReturnValue(JSON.stringify(user));
});

describe('Testes do componente Profile', () => {
  test('Testa o e-mail recebido do LocalStorage', async () => {
    renderWithRouter(<App />, '/profile');

    await screen.findByTestId('profile-email');

    expect(localStorage.getItem).toHaveBeenCalled();
  });
  test('Testa se ao clicar no botão "Done Recipes" o usuário é rederenciado para a rota "/done-recipes"', () => {
    const { history } = renderWithRouter(<App />, '/profile');

    const doneRecipesBtn = screen.getByRole('button', {
      name: /done recipes/i,
    });

    act(() => {
      userEvent.click(doneRecipesBtn);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('Testa se ao clicar no botão "Favorite Recipes" o usuário é rederenciado para a rota "/favorite-recipes"', () => {
    const { history } = renderWithRouter(<App />, '/profile');

    const favoriteRecipesBtn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });

    act(() => {
      userEvent.click(favoriteRecipesBtn);
    });

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
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
});
