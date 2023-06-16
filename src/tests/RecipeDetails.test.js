import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import oneMeal from './mocks/oneMeal';
import oneDrink from './mocks/oneDrink';
import drinks from './mocks/drinks';

import { localStorageMock2 } from './mocks/localStorage';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import { fetchRecomendationMealsAPI } from '../services/fetchRecomendationAPI';

jest.mock('../services/fetchRecomendationAPI', () => ({
  fetchRecomendationMealsAPI: jest.fn(),
  fetchRecomendationDrinksAPI: jest.fn(),
}));

describe('Testa o componente RecipeDetails', () => {
  it('should render recipe details correctly if /meals', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(oneMeal),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });

    fetchRecomendationMealsAPI.mockResolvedValue(drinks.drinks);

    await act(async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock2 });
      renderWithRouter(<App />, '/meals/1');
    });

    expect(screen.getByTestId('recipe-title')).toHaveTextContent('Spicy Arrabiata Penne');
    expect(screen.getByTestId('recipe-photo')).toHaveAttribute(
      'src',
      'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    );
    expect(screen.getByTestId('recipe-category')).toHaveTextContent('Vegetarian');
    expect(screen.getByTestId('instructions')).toHaveTextContent(
      'Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.',
    );

    const startButton = screen.getByTestId('start-recipe-btn');
    expect(startButton).toHaveTextContent('Continue Recipe');

    expect(screen.getByTestId('1-recommendation-title')).toHaveTextContent('A1');

    await act(async () => {
      userEvent.click(startButton);
    });

    const checkbox = screen.getByTestId('penne rigate');
    expect(checkbox).toBeChecked();
    const finishButton = screen.getByTestId('finish-recipe-btn');
    expect(finishButton).toHaveTextContent('Finish Recipe');

    await act(async () => {
      userEvent.click(finishButton);
    });
  });

  it('should render recipe details correctly  if /drink', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    await act(async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock2 });
      renderWithRouter(<App />, '/drinks/2');
    });

    expect(screen.getByTestId('recipe-title')).toHaveTextContent('Aquamarine');
    expect(screen.getByTestId('recipe-photo')).toHaveAttribute(
      'src',
      'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    );
    expect(screen.getByTestId('recipe-category')).toHaveTextContent('Alcoholic');
    expect(screen.getByTestId('instructions')).toHaveTextContent(
      'Shake well in a shaker with ice. Strain in a martini glass.',
    );

    const startButton = screen.getByTestId('start-recipe-btn');
    expect(startButton).toHaveTextContent('Continue Recipe');

    await act(async () => {
      userEvent.click(startButton);
    });
  });
});
