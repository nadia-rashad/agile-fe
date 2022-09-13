/**
 * @jest-environment jsdom
 */

import * as api from'../../api';
import Login from '../Login';
import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
const axios = require('axios');
jest.mock('axios');


jest.mock('axios');

const checkUserMockResponse = {data : [{details: 2,
  token: "1149bed4-b737-4665-9b78-e353ca64c1d8"}]}

describe('Login component testing', () => {
    test('renders the login component with the correct fields', async () => {
      render(
            <Login/>
        );

     const title = screen.getByRole("heading", {name : "page header"});
     const loginIcon = screen.getByRole("img", {name : "Log in icon"});
     const form = screen.getByRole("form", {name : "login form"})
     const emailTextBox = screen.getByRole("textbox", {name : "Text feild to enter email"})
     const loginButton = screen.getByRole("button", {name : "Button to login"})

     expect(title).toBeInTheDocument();
     expect(loginIcon).toBeInTheDocument();
     expect(form).toBeInTheDocument();
     expect(emailTextBox).toBeInTheDocument();
     expect(loginButton).toBeInTheDocument();
    });

    test('renders the form on the login component', () => {
       render(
            <Login/>
        );

        const form = screen.getByRole("form", {name : "login form"});
        const emailField = screen.getByRole("textbox", {name : "Text feild to enter email"});
        const passwordField = screen.getByLabelText("Text feild to enter password",  {selector: 'input'});

        expect(form).toBeInTheDocument();
        expect(emailField).toBeVisible();
        expect(passwordField).toBeVisible();
    });

    test('disables the login submit button if no text is entered in the username and password fields', () => {
         render(
            <Login/>
        );

        const button = screen.getByTestId('submit');
        expect(button).toBeDisabled();
    });

    test('enables the submit button once a username and password has been input', async () => {
         render(
          <Login/>
        )
     
    const userNameField = screen.getByTestId('username_input');
    fireEvent.change(userNameField, {target: {value: 'username'}});

    const passwordField = screen.getByTestId('password_input');
    fireEvent.change(passwordField, {target: {value: 'password'}});

    const button = screen.getByTestId('submit');
      
    expect(userNameField.value).toBe('username');
    expect(passwordField.value).toBe('password');

    expect(button).not.toBeDisabled();

    });

    test('login component calls checkUserCredentials', async () => {

      const checkCredentialsMock = jest.spyOn(api, "checkUserCredentials").mockResolvedValue(() => Promise.resolve(checkUserMockResponse));

      render(
        <Login/>
      )
   
      const userNameField = screen.getByTestId('username_input');
      fireEvent.change(userNameField, {target: {value: 'hello'}});

      const passwordField = screen.getByTestId('password_input');
      fireEvent.change(passwordField, {target: {value: 'password'}});

      expect(userNameField.value).toBe('hello');
      expect(passwordField.value).toBe('password');
  
      const loginButton = screen.getByTestId('submit');
      expect(loginButton).not.toBeDisabled();

      fireEvent.submit(loginButton);
    
      await waitFor(()=> expect(checkCredentialsMock).toHaveBeenCalled());
      await waitFor(()=> expect(checkCredentialsMock).toHaveBeenCalledTimes(1));     
      
    });

});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
