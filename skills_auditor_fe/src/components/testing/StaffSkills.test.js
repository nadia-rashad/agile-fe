/**
 * @jest-environment jsdom
 */

import React from 'react';
import StaffSkills from "../staff/StaffSkills";
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as api from'../../api';
import userEvent from '@testing-library/user-event';
import {userDetails, skillResp, assignedSkillsResp, skillTableData, skillTableAfterDeletion, newSkill } from "./test_data"


describe('Staff - Staff Skill Component (Assigning/ Deleting skills)', () => {
    afterEach(() => {
        jest.restoreAllMocks();
      });

      test("should render the dropdown buttons and table correctly", async () => {
        render(<StaffSkills userDetails={userDetails} />);
    
        expect(screen.getByRole("button", {name: 'Select a Skill'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Select a Skill Strength'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Add Skill'})).toBeInTheDocument();
        expect(screen.getByTestId("remove-skill")).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: 'ID'})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: 'Skill name'})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: 'Skill Category'})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: 'Strength'})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: 'Expiry Date'})).toBeInTheDocument();
      });

      test('StaffSkills component calls fetchAssignedSkills', async () => {

        jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp))

        jest.spyOn(api, "fetchAssignedSkills").mockResolvedValue(() => assignedSkillsResp);  

        const fetchTableDataSpy = jest.spyOn(api, "fetchSkillsTableData").mockResolvedValue(() => skillTableData);

        render(<StaffSkills userDetails={userDetails} />);

        expect(fetchTableDataSpy).toHaveBeenCalled();

        expect(screen.getByText("Assign Skills")).toBeInTheDocument();
    
        expect(screen.getByRole("columnheader", {name: 'ID'})).toBeInTheDocument();
    });

    test('Table of current assigned skills is displayed in the skills table', async () => {
        const fetchSkills = jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp))

        jest.spyOn(api, "fetchAssignedSkills").mockImplementation(() => Promise.resolve(assignedSkillsResp));  

        jest.spyOn(api, "fetchSkillsTableData").mockImplementation(() => Promise.resolve(skillTableData));

        render(<StaffSkills userDetails={userDetails} />);
        
        await waitFor(()=> expect(fetchSkills).toHaveBeenCalled());

        const skillDropdown =  screen.getByTestId("skill-dropdown");
        userEvent.click(skillDropdown);

        userEvent.click(await screen.findByRole("button", {name: "Select a Skill"}));

        expect( screen.getAllByText("Excel")[0]).toBeInTheDocument();
        expect( screen.getAllByText("Terraform")[0]).toBeInTheDocument();
    });

    test('assigns a new skill to the user', async () => {
 
        const fetchSkills = jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp))

        const fetchAssignedSkillsMock = jest.spyOn(api, "fetchAssignedSkills").mockImplementation(() => Promise.resolve(assignedSkillsResp));  

        const fetchSkillsDataMock = jest.spyOn(api, "fetchSkillsTableData").mockImplementation(() => Promise.resolve(skillTableData));

        const fetchSkillByDescMock = jest.spyOn(api, "fetchSkillByDescription").mockImplementation(() => Promise.resolve( {data : [
          { category_id: 1, description: "Terraform 3", id: 5 }
         
        ]}));

        const assignSkillMock = jest.spyOn(api, "assignSkill").mockImplementation(() => Promise.resolve(newSkill));


        render(<StaffSkills userDetails={userDetails} />);

        const button = screen.getByTestId('add-skill');
        expect(button).toBeDisabled();

        const skillDropdown =  screen.getByTestId("skill-dropdown");
        const strengthDropdown =  screen.getByTestId("strength-dropdown");

        fireEvent.keyDown(skillDropdown.firstChild, { key: 'ArrowDown' });
        await screen.findByText('Terraform 3');
        fireEvent.click(screen.getByText('Terraform 3'));

        fireEvent.keyDown(strengthDropdown.firstChild, { key: 'ArrowDown' });
        await screen.findByText('Expert');
        fireEvent.click(screen.getByText('Expert'));

        expect(button).not.toBeDisabled();

        userEvent.click(await screen.findByRole("button", {name: "Add Skill"}));

        await waitFor(()=> expect(fetchSkills).toHaveBeenCalled());
        await waitFor(()=> expect(fetchAssignedSkillsMock).toHaveBeenCalled());
        await waitFor(()=> expect(fetchSkillsDataMock).toHaveBeenCalled());
        await waitFor(()=> expect(assignSkillMock).toHaveBeenCalled());
        await waitFor(()=> expect(fetchSkillByDescMock).toHaveBeenCalled());
  
    });

    test('a skill is deleted successfully', async () => {
        const fetchSkills = jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp))

        const fetchAssignedSkillsMock = jest.spyOn(api, "fetchAssignedSkills").mockImplementation(() => Promise.resolve(assignedSkillsResp));  

        jest.spyOn(api, "fetchSkillsTableData").mockImplementation(() => Promise.resolve(skillTableData));

        render(<StaffSkills userDetails={userDetails} />);
        
        await waitFor(()=> expect(fetchSkills).toHaveBeenCalled());

        const skillDropdown =  screen.getByTestId("skill-dropdown");
        userEvent.click(skillDropdown);

        userEvent.click(await screen.findByRole("button", {name: "Select a Skill"}));

        expect( screen.getAllByText("Excel")[0]).toBeInTheDocument();
        expect( screen.getAllByText("Terraform")[0]).toBeInTheDocument();

        const deleteSkill = jest.spyOn(api, "deleteStaffSkill").mockImplementationOnce(() => Promise.resolve(skillTableAfterDeletion));

        userEvent.click(await screen.findByTestId("remove-skill"));

        const fetchNewSkills = jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillTableAfterDeletion))

        await waitFor(()=> expect(fetchSkills).toHaveBeenCalled());
        await waitFor(()=> expect(fetchAssignedSkillsMock).toHaveBeenCalled());
        await waitFor(()=> expect(deleteSkill).toHaveBeenCalled());
        await waitFor(()=> expect(fetchNewSkills).toHaveBeenCalled());

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

