import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithProvider from './utils/renderWithProvider';
import Login from '../pages/Login';
import App from '../App';

describe('Testes da tela de Login', () => {
  test('Verifica se existe um H1 com o nome "Login"', () => {
    renderWithProvider(<App />);

    const loginTitle = screen.getByRole('heading', { name: /login:/i });

    expect(loginTitle).toBeInTheDocument();
  });
  test('Verifica se o botão está desabilitado e se o botão habilita após digitar nos inputs corretamente', async () => {
    renderWithProvider(<App />);
    const enterButton = await screen.findByRole('button', { name: /enter/i });

    expect(enterButton).toBeDisabled();

    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.type(screen.getByRole('textbox'), 'alguem@alguem.com');

    expect(enterButton).not.toBeDisabled();
  });
  test('Verifica se ao clicar no botão ele salve no localStorage e envia para o diretório "/meals"', async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();

    const { history } = renderWithProvider(<App />);
    const enterButton = await screen.findByRole('button', { name: /enter/i });

    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.type(screen.getByRole('textbox'), 'alguem@alguem.com');
    userEvent.click(enterButton);
    const { pathname } = history.location;

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(pathname).toBe('/meals');
  });
});
