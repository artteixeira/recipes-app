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
