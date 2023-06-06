import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes do componente Header', () => {
  test('Testa se ao clicar no botão do Perfil, é enviado para o /profile', async () => {
    const { history } = renderWithRouter(<App />, '/meals');

    await screen.findByRole('heading', {
      name: /meals/i,
    });

    const profileBtn = screen.getByRole('img', {
      name: /profile icon/i,
    });
    act(() => {
      userEvent.click(profileBtn);
    });
    expect(history.location.pathname).toBe('/profile');
  });
  test('Testa se ao clicar no botão do Perfil, é enviado para o /profile', async () => {
    renderWithRouter(<App />, '/meals');

    await screen.findByRole('heading', {
      name: /meals/i,
    });

    const searchBtn = screen.getByRole('img', {
      name: /search icon/i,
    });
    act(() => {
      userEvent.click(searchBtn);
    });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
