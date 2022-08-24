import renderer from 'react-test-renderer';
import Login from './Login';
import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
require('jest-localstorage-mock');

describe('Login component testing', () => {
    it('renders the login component', async () => {

        const loginPage = renderer.create(
            <Login/>
        );

        //render( <Login/>)

       let page = loginPage.toJSON();

       await screen.findByRole('heading')

        expect(screen.getByRole('heading')).toHaveTextContent('Login')
        expect(screen.getByRole('button')).toBeDisabled() 
        
    });

});