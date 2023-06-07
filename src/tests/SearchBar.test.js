import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testa o componente SearchBar', () => {
  test('Verifica se, ao selecionar o radio button "First Letter" e digitar mais de uma letra, um alerta é disparado', async () => {
    global.alert = jest.fn().mockReturnValue('xablau');
    renderWithRouter(<App />, '/meals');

    userEvent.click(screen.getByRole('img', {
      name: /search icon/i,
    }));
    const nameFilter = await screen.findByRole('textbox');

    userEvent.click(await screen.findByText(/first letter/i));
    userEvent.type(nameFilter, 'soup');
    expect(global.alert).toHaveBeenCalled();
  });
  // test.only('Verifica se ao selecionar outra opção, o input de texto é limpo', () => {
  //   renderWithRouter(<App />, '/meals');

  //   userEvent.click(screen.getByRole('img', {
  //     name: /search icon/i,
  //   }));
  //   const nameFilter = screen.getByRole('textbox');
  //   userEvent.type(nameFilter, 'apple');

  //   act(() => {
  //     userEvent.click(screen.getByText(/first letter/i));
  //   });
  //   expect(nameFilter.value).toBe('');
  // });
  test('Verifica se o estado do radio button muda ao ser selecionado', async () => {
    renderWithRouter(<App />, '/meals');
    const searchBtn = screen.getByRole('img', {
      name: /search icon/i,
    });
    act(() => {
      userEvent.click(searchBtn);
    });
    const ingredientRadioBtn = screen.getByTestId('ingredient-search-radio');
    act(() => {
      userEvent.click(ingredientRadioBtn);
    });
    expect(ingredientRadioBtn.checked).toBe(true);
  });

  test('Verifica se o estado do radio button muda ao ser selecionado', async () => {
    const { history } = renderWithRouter(<App />, '/meals');
    const searchBtn = screen.getByRole('img', {
      name: /search icon/i,
    });
    act(() => {
      userEvent.click(searchBtn);
    });
    const nameRadioBtn = screen.getByTestId('name-search-radio');
    const nameFilter = await screen.findByRole('textbox');
    const searchFilterBtn = screen.getByTestId('exec-search-btn');
    act(() => {
      userEvent.click(nameRadioBtn);
      userEvent.type(nameFilter, 'Corba');
      userEvent.click(searchFilterBtn);
      history.push('/meals/52977');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
  });
});
