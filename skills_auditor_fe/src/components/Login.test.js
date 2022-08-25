/**
 * @jest-environment jsdom
 */

import Login from './Login';
import React from 'react';
import {render, screen, input} from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Button from 'react-bootstrap/Button';


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

        const button = screen.getByText('Submit').closest("button");
        expect(button).toBeDisabled();
    });


});