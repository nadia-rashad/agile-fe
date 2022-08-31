/**
 * @jest-environment jsdom
 */

import Login from './Login';
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {checkUserCredentials} from '../api'
const axios = require('axios');

jest.mock('axios');


describe('Login component testing', () => {
    it('renders the login component with the correct headings', async () => {
       const { loginPage } = render(
            <Login/>
        );

     const title = screen.getByRole("heading", {name : "page header"});
     const pageHeader = screen.getByRole("heading", {name : "login header"});

     expect(title).toBeInTheDocument();
     expect(pageHeader).toBeInTheDocument();
    });

    it('renders the form on the login component', () => {
        const { loginPage } = render(
            <Login/>
        );

        const form = screen.getByRole("form", {name : "login form"});
        const emailField = screen.getByRole("textbox", {name : "Text feild to enter email"});
        const passwordField = screen.getByLabelText("Text feild to enter password",  {selector: 'input'});

        expect(form).toBeInTheDocument();
        expect(emailField).toBeVisible();
        expect(passwordField).toBeVisible();
    });

    it('disables the login submit button if no text is entered in the username and password fields', () => {
        const { loginPage } = render(
            <Login/>
        );

        const button = screen.getByTestId('submit');
        expect(button).toBeDisabled();
    });

    it('enables the submit button once a username and password has been input', async () => {
        const {loginPage} = render(
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

    it('returns a token and staff id for a successful login', async() => {
        axios.get.mockResolvedValue({
            data: [
              {
                token: "1234",
                id: 1,
              }
            ]
          }); 

          const user = await checkUserCredentials();
          expect(user.data[0]).toEqual(
            {
              token: "1234",
              id: 1,
            }
          )
    });
});