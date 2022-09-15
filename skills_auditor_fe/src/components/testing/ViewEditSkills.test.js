/**
* @jest-environment jsdom
*/

import React from 'react';
import ViewEditSkills from "../manager/ViewEditSkills";
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as api from'../../api';
import userEvent from '@testing-library/user-event';
import {categoryList, skillResp} from "./test_data"

describe('Manager - View/Edit Skills (Editing and removing existing skills)', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should render the textfield, dropdown button and save button correctly", async () => {
        render(<ViewEditSkills/>);
        
        expect(screen.getByRole("label", {name: 'Skills'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Select a skill to edit'})).toBeInTheDocument();
        expect(screen.getByRole("label", {name: 'Skill Name'})).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: 'Text field to edit skill name'})).toBeInTheDocument();
        expect(screen.getByRole("label", {name: 'Skill Category'})).toBeInTheDocument();
        expect(screen.getByTestId("category-dropdown")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Submit edited skill details'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Delete selected skill'})).toBeInTheDocument();

    });

    test('ViewEditSkills component calls fetchallskills and skill dropdown is populated', async () => {

        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList))
        const fetchSkills = jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp))


        render(<ViewEditSkills/>);

        const skillDropdown =  screen.getByRole("button", {name: 'Select a skill to edit'});
        fireEvent.keyDown(skillDropdown, { key: 'ArrowDown' });

        const skill1 = await screen.findByText('Javascript');
        const skill2 = await screen.findByText('Terraform 3');
        const skill3 = await screen.findByText('Excel');
        
        expect(fetchSkills).toHaveBeenCalled();
        expect(skill1).toBeInTheDocument();
        expect(skill2).toBeInTheDocument();
        expect(skill3).toBeInTheDocument();
    });

    test('ViewEditSkills component calls fetchallcategories and category dropdown is populated', async () => {

        jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp))
        const fetchCategories = jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList))


        render(<ViewEditSkills/>);

        const categoryDropdown = screen.getByTestId("category-dropdown");
        fireEvent.keyDown(categoryDropdown.firstChild, { key: 'ArrowDown' });

        const category1 = await screen.findByText('Office365');
        const category2 = await screen.findByText('Programming');

        expect(fetchCategories).toHaveBeenCalled();
        expect(category1).toBeInTheDocument();
        expect(category2).toBeInTheDocument();
    });

    test('Save and delete buttons are disabled until a skill is chosen and if skill name is empty', async () => {
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList));
        jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp));

        render(<ViewEditSkills/>);

        const saveButton = screen.getByRole("button", {name: 'Submit edited skill details'});
        const deleteButton = screen.getByRole("button", {name: 'Delete selected skill'});

        expect(saveButton).toBeDisabled();
        expect(deleteButton).toBeDisabled();

        const skillDropdown = screen.getByRole("button", {name: 'Select a skill to edit'});
        fireEvent.keyDown(skillDropdown, { key: 'ArrowDown' });
        await screen.findByText('Javascript')
        fireEvent.click(screen.getByText('Javascript'));
        
        expect(saveButton).not.toBeDisabled();
        expect(deleteButton).not.toBeDisabled();

        const skillNameTextField = screen.getByRole("textbox",  {name: 'Text field to edit skill name'});
        fireEvent.change(skillNameTextField, {target: {value: ''}});

        expect(saveButton).toBeDisabled();
        expect(deleteButton).toBeDisabled(); 
    });

    test('Skill can be edited successfully and skill dropdown reflects new changes', async () => {  
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList));
        jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp));

        render(<ViewEditSkills/>);

        const skillDropdown = screen.getByRole("button", {name: 'Select a skill to edit'});
        fireEvent.keyDown(skillDropdown, { key: 'ArrowDown' });
        await screen.findByText('Javascript')
        fireEvent.click(screen.getByText('Javascript'));

        const skillNameTextField = screen.getByRole("textbox",  {name: 'Text field to edit skill name'});
        fireEvent.change(skillNameTextField, {target: {value: 'Edit Skill'}});

        const saveButton = screen.getByRole("button", {name: 'Submit edited skill details'});
        userEvent.click(saveButton);

        setTimeout(() => {
            expect(screen.getByText('Skill successfully updated')).toBeInTheDocument()
        }, 2000);
       
        setTimeout(() => {
        fireEvent.keyDown(skillDropdown, { key: 'ArrowDown' });
        const editedSkill = screen.getByText('Edit Skill');
        expect(editedSkill).toBeInTheDocument();
        }, 2000);
    });

    test('Skill can be deleted successfully and skill dropdown reflects new changes', async () => {  
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList));
        jest.spyOn(api, "fetchAllSkills").mockImplementation(() => Promise.resolve(skillResp));

        render(<ViewEditSkills/>);

        const skillDropdown = screen.getByRole("button", {name: 'Select a skill to edit'});
        fireEvent.keyDown(skillDropdown, { key: 'ArrowDown' });
        await screen.findByText('Javascript')
        fireEvent.click(screen.getByText('Javascript'));

        const deleteButton = screen.getByRole("button", {name: 'Delete selected skill'});
        userEvent.click(deleteButton);

        setTimeout(() => {
            expect(screen.getByText('Skill successfully deleted')).toBeInTheDocument()
        }, 2000);
       
        setTimeout(() => {
        fireEvent.keyDown(skillDropdown, { key: 'ArrowDown' });
        expect('Javascript').not.toBeInTheDocument();
        }, 2000);
    });
});