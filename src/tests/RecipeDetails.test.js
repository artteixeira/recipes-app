import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testa o componente RecipeDetails', () => {
  test('Verifica se a renderiza os detalhes da receita corretamente', async () => {
    renderWithRouter(<App />, '/meals/52977');
    await waitFor(() => {
      screen.getByRole('heading', { name: /corba/i });
      screen.getByRole('img', { name: /corba/i });
      screen.getByTestId('recipe-category');
    });
  });
});
