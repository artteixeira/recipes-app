import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testa o componente Footer', () => {
  test('Verifica se ao clicar no botão dos Drinks, o usuário é rederenciado para a aba de drinks', () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const drinkIcon = screen.getByRole('img', {
      name: /drinks icon/i,
    });
    act(() => {
      userEvent.click(drinkIcon);
    });

    expect(history.location.pathname).toBe('/drinks');
  });
  test('Verifica se ao clicar no botão dos Meals, o usuário é rederenciado para a aba de meals', () => {
    const { history } = renderWithRouter(<App />, '/drinks');

    const mealsIcon = screen.getByRole('img', {
      name: /meals icon/i,
    });
    act(() => {
      userEvent.click(mealsIcon);
    });

    expect(history.location.pathname).toBe('/meals');
  });
});
