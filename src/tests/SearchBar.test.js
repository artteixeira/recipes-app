import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('', () => {
  test('', async () => {
    global.alert = jest.fn().mockReturnValue('xablau');
    renderWithRouter(<App />, '/meals');

    act(async () => {
      userEvent.click(screen.getByRole('img', {
        name: /search icon/i,
      }));
      const nameFilter = await screen.findByRole('textbox');
      act(async () => {
        userEvent.click(await screen.findByText(/first letter/i));
        userEvent.type(nameFilter, 'soup');
      });
      expect(global.alert).toHaveBeenCalled();
    });
  });
});
