import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes da tela de Login', () => {
  test('Verifica se existe um H1 com o nome "Login"', () => {
    renderWithRouter(<App />);

    const loginTitle = screen.getByRole('heading', { name: /login:/i });

    expect(loginTitle).toBeInTheDocument();
  });
  test('Verifica se o botão está desabilitado e se o botão habilita após digitar nos inputs corretamente', async () => {
    renderWithRouter(<App />);
    const enterButton = await screen.findByRole('button', { name: /enter/i });

    expect(enterButton).toBeDisabled();

    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.type(screen.getByRole('textbox'), 'alguem@alguem.com');

    expect(enterButton).not.toBeDisabled();
  });
  test('Verifica se ao clicar no botão ele salve no localStorage e envia para o diretório "/meals"', async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();

    const { history } = renderWithRouter(<App />);
    const enterButton = await screen.findByRole('button', { name: /enter/i });

    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.type(screen.getByRole('textbox'), 'alguem@alguem.com');
    userEvent.click(enterButton);
    const { pathname } = history.location;

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(pathname).toBe('/meals');
  });
});
