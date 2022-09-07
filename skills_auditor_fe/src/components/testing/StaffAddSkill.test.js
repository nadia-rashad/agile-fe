/**
 * @jest-environment jsdom
 */

import React from 'react';
import StaffAddSkill from "../staff/StaffAddSkill";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
const api = require('../../api');
const axios = require('axios');

jest.mock('axios');

const data =  {
    firstName: "firstname",
    surname: "surname",
    title: "title",
    email: "email",
    job_role_id: "job_role_id",
    password: "password",
    system_role_id: "system_role_id"
};

const mockChildComponent = jest.fn();
jest.mock("../../components/staff/StaffAddSkill", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});

describe('Staff - Add Skill Component', () => {
    afterEach(() => jest.resetAllMocks());

    test('should assign a skill correctly', async () => {
        const createdSkill = {
            skill_id: 1,
            staff_id: 2,
            expiry_date: "2022/05/26",
            strength: "Strong"
        };
        const resp = {data : createdSkill}
        axios.post.mockImplementation(() => Promise.resolve(resp));
  
       return await api.assignSkill().then(data => expect(data).toEqual({data : createdSkill}));
    });

    test('renders the assign skills page with props', () => {
        const { addSkill } = render(
            <StaffAddSkill data={data} />
        );

        expect(mockChildComponent).toHaveBeenCalledWith(
            expect.objectContaining({
              data: data,
            })
          );
    });

    test('renders the form with the correct drop downs and date picker', () => {
    //     const { addSkill } = render(
    //         <StaffAddSkill data={data} />
    //     );

    //     console.log(mockChildComponent)

    //     const form = screen.getByTestId("add skill form")
    //     console.log("i'm the form", form)
    //   //  const form = screen.getByRole("form", {name : "add skill form"});
    //     expect(form).toBeInTheDocument();

        
    });
});

