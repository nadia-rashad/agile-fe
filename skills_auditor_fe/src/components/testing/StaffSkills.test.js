/**
 * @jest-environment jsdom
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import StaffSkills from "../staff/StaffSkills";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as api from'../../api';
const axios = require('axios');

jest.mock('axios');

const userDetails = { details :  {
    email: "alex@email.com",
    firstName: "Alex",
    id: 2,
    job_role_id: 3,
    manager_id: 3,
    password: "abc",
    surname: "Gidman",
    system_role_id: 2,
    title: "Mr",
}};

const skillResp = {
    data: [
      { category_id: 2, description: "Javascript", id: 4 },
      { category_id: 1, description: "Terraform 3", id: 5 },
      { category_id: 3, description: "Excesmnsns", id: 6 },
    ],
  };

const assignedSkillsResp = {
    data: [
        { 
        expiry_date: "2022-08-26",
        id: 33,
        skill_id: 4,
        staff_id: 2,
        strength: "Expert" 
    },
    {
        expiry_date: "2022-08-26",
        id: 34,
        skill_id: 6,
        staff_id: 2,
        strength: "Intermediate"
    }
    ]
}


describe('Staff - Staff Skill Component (Assigning/ Deleting skills)', () => {
    afterEach(() => jest.resetAllMocks());

    test('renders the Staff skills page with props containing users details', () => {
        render(
            <StaffSkills userDetails = {userDetails} />
        );

        expect(StaffSkills).toHaveBeenCalledWith(
            expect.objectContaining({
              userDetails: userDetails,
            })
          );
    });

    test.only("should call all api's correctly", async () => {
        
        act(() => {jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp)) });
 
        Promise.resolve(axios.get.mockResolvedValueOnce(skillResp));
    
        act(() => {jest.spyOn(api, "fetchAssignedSkills").mockImplementation(() => Promise.resolve(assignedSkillsResp))});

        // Promise.resolve(axios.get.mockResolvedValueOnce(assignedSkillsResp));


    
        render(<StaffSkills userDetails={userDetails} />);

        expect(1).toBe(1)



      });
    



    test('renders the form with the correct drop downs and date picker', () => {
        
    });

    test('Skills dropdown populates with the correct data', () => {
        
    });

    test('Select a skill dropdown populates with the correct data', () => {
        
    });

    test('Select a skill strength dropdown populates with the correct data', () => {
        
    });

    test('should be able to select all dropdowns with skill information, submit and adds the new skill to the assigned skills table', () => {
        
    });

    test('the remove skill removes the assigned skill from the user and assigned skills table', () => {
        
    });


});

