import React from 'react';
import { act, screen } from '@testing-library/react';

/*
  doneRecipes: [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image:
          'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image:
          'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ],
*/

import userEvent from '@testing-library/user-event';
import { localStorageMock } from './mocks/localStorage';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testa o componente DoneRecipes', () => {
  it('testa se as informações estão corretas', async () => {
    await act(async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
      renderWithRouter(<App />, '/done-recipes');
    });

    const favoriteRecipe = screen.getByTestId('0-horizontal-image');
    expect(favoriteRecipe).toBeInTheDocument();
    expect(favoriteRecipe).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(favoriteRecipe).toHaveAttribute('alt', 'Spicy Arrabiata Penne');

    const mealCategory = screen.getByTestId('filter-by-meal-btn');
    expect(mealCategory).toBeInTheDocument();

    const drinkCategory = screen.getByTestId('filter-by-drink-btn');
    expect(drinkCategory).toBeInTheDocument();

    userEvent.click(mealCategory);

    userEvent.click(drinkCategory);

    userEvent.click(screen.getByTestId('0-horizontal-image'));
  });
});
