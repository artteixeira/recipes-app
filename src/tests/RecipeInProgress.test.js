import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import oneDrink from './mocks/oneDrink';

import { localStorageMock } from './mocks/localStorage';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

jest.mock('../services/fetchRecomendationAPI', () => ({
  fetchRecomendationMealsAPI: jest.fn(),
  fetchRecomendationDrinksAPI: jest.fn(),
}));

describe('Testa o componente RecipeDetails', () => {
  it('should render recipe details correctly  if /drink/id/in-progress', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    await act(async () => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
      renderWithRouter(<App />, '/drinks/2');
    });

    const startButton = screen.getByTestId('start-recipe-btn');

    await act(async () => {
      userEvent.click(startButton);
    });
    const checkbox = screen.getByTestId('Hpnotiq');
    expect(checkbox).toBeChecked();
    const finishButton = screen.getByTestId('finish-recipe-btn');
    expect(finishButton).toHaveTextContent('Finish Recipe');

    await act(async () => {
      userEvent.click(finishButton);
    });
  });
});
