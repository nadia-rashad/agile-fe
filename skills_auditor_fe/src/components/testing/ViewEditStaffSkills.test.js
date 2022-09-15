/**
 * @jest-environment jsdom
 */

import ViewEditStaffSkills from "../manager/ViewEditStaffSkills";
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as api from'../../api';
import userEvent from '@testing-library/user-event';
import {managerUserDetails, skillResp, assignedSkillsResp, assignedStaff } from "./test_data"

describe('Manager - Staff Skill Component (Viewing/Assigning/Deleting skills of subordinates and self)', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test("should render buttons, dropdowns and table correctly", async () => {
        render(<ViewEditStaffSkills userDetails={managerUserDetails}/>);
        
        expect(screen.getByRole("button", {name: 'Select a User'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Select a Skill'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Select a Skill Strength'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Add Skill'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Remove Skill'})).toBeInTheDocument();
        expect(screen.getByRole("combobox", {id: 'selectSkillSelect'})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: 'ID'})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: 'Skill name'})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: 'Skill Category'})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: 'Strength'})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: 'Expiry Date'})).toBeInTheDocument();
    });

    test("StaffSkills component calls fetchAssignedStaff for signed in user and displays the staff in the dropdown on screen", async () => {
        const fetchStaff = jest.spyOn(api, "fetchAssignedStaff").mockImplementation(() => Promise.resolve(assignedStaff));
        render(<ViewEditStaffSkills userDetails={managerUserDetails}/>);

        await waitFor(() => expect(fetchStaff).toHaveBeenCalledWith(managerUserDetails.details.id));

        const userDropdown = screen.getByTestId("user-dropdown");
        userEvent.click(userDropdown);
        userEvent.click(await screen.findByRole("button", {name: "Select a User"}));
        
        // ideally this would be pulled from the test data file however the code seems to add a "0" user or
        // whatever the default state for selected user is to this list
        expect(screen.getAllByText("3: Nadia Rashad")[0]).toBeInTheDocument();
        expect(screen.getAllByText("1: Harry Styles")[0]).toBeInTheDocument();
        expect(screen.getAllByText("5: Archie Sanger-Davies")[0]).toBeInTheDocument();        
    });

    test("StaffSkills component calls fetchAllSkills and displays the skills in the dropdown on screen", async () => {
        const fetchSkills = jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp))
        render(<ViewEditStaffSkills userDetails={managerUserDetails}/>);

        await waitFor(() => expect(fetchSkills).toHaveBeenCalled());

        const skillDropdown = screen.getByTestId("skill-dropdown");
        userEvent.click(skillDropdown);
        userEvent.click(await screen.findByRole("button", {name: "Select a Skill"}));

        for(const skill in skillResp.data){
            expect(screen.getAllByText(skillResp.data[skill].description)[0]).toBeInTheDocument();
        }
    });

    test("StaffSkills component calls fetchAssignedSkills for selected user", async () => {
        const fetchStaff = jest.spyOn(api, "fetchAssignedStaff").mockImplementation(() => Promise.resolve(assignedStaff));
        const fetchSkills = jest.spyOn(api, "fetchAssignedSkills").mockImplementation(() => Promise.resolve(assignedSkillsResp))
        render(<ViewEditStaffSkills userDetails={managerUserDetails}/>);

        await waitFor(() => expect(fetchStaff).toHaveBeenCalledWith(managerUserDetails.details.id));

        const userDropdown = screen.getByTestId("user-dropdown");
        userEvent.click(userDropdown);
        userEvent.click(await screen.findByRole("button", {name: "Select a User"}));
        userEvent.click(screen.getByText("5: Archie Sanger-Davies"));

        await waitFor(() => expect(fetchSkills).toHaveBeenCalledWith("5"));
    });

    test("StaffSkills component calls populates the table with the selected users assigned skills", async () => {
        const fetchSkills = jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp));
        render(<ViewEditStaffSkills userDetails={managerUserDetails}/>);

        await waitFor(()=> expect(fetchSkills).toHaveBeenCalled());

        const skillDropdown =  screen.getByTestId("skill-dropdown");
        userEvent.click(skillDropdown);
        userEvent.click(await screen.findByRole("button", {name: "Select a Skill"}));

        expect( screen.getAllByText("Javascript")[0]).toBeInTheDocument();
        expect( screen.getAllByText("Terraform 3")[0]).toBeInTheDocument();
        expect( screen.getAllByText("Excel")[0]).toBeInTheDocument();
    });
})