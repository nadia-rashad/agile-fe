/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import StaffAddSkill from "../staff/StaffAddSkill";
 import {render, screen, props} from '@testing-library/react';
 import '@testing-library/jest-dom';
 import {BrowserRouter, MemoryRouter} from 'react-router-dom';
 import userEvent from '@testing-library/user-event';
 import App from '../../App';

 jest.mock('axios');

 const userDetails = { 
    details : {
    firstName: "firstname",
    surname: "surname",
    title: "title",
    email: "email",
    job_role_id: "job_role_id",
    password: "password",
    system_role_id: "system_role_id"
  } 
 }

//  const mockChildComponent = jest.fn();
//  jest.mock("../../components/staff/StaffAddSkill", () => (props) => {
//     mockChildComponent(props);
//     return <mock-childComponent />;
// })


describe('add skill unit testing', () => {
  
    test('full app rendering/navigating', () => {
        render(<App />, {wrapper: BrowserRouter})
        const user = userEvent.setup()

        expect(screen.getByText(/login/i)).toBeInTheDocument();
        
    });
});