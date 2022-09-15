/**
* @jest-environment jsdom
*/

import React from 'react';
import AddSkill from "../manager/AddSkill";
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as api from'../../api';
import userEvent from '@testing-library/user-event';
import {categoryList} from "./test_data"
 
 
describe('Manager - Add Skill (Adding a new skill)', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should render the textfield, dropdown button and save button correctly", async () => {
        render(<AddSkill/>);
    
        expect(screen.getByRole("label", {name: 'Skill Name'})).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: 'Text field to enter skill name'})).toBeInTheDocument();
        expect(screen.getByRole("label", {name: 'Skill Category'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Select a category'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Submit new skill'})).toBeInTheDocument();
    });

    test('AddSkills component calls fetchAllCategories and categories dropdown is populated', async () => {

        const fetchCategories = jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList))

        render(<AddSkill/>);

        const categoryDropdown =  screen.getByRole("button", {name: 'Select a category'});
        fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });

        const category1 = await screen.findByText('Office365');
        const category2 = await screen.findByText('Programming');

        expect(fetchCategories).toHaveBeenCalled();
        expect(category1).toBeInTheDocument();
        expect(category2).toBeInTheDocument();
    });

    test('Save button is disabled until both skill name is entered and skill category is selected', async () => {
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList))

        render(<AddSkill/>);

        const skillNameTextField = screen.getByRole("textbox",  {name: 'Text field to enter skill name'});
        fireEvent.change(skillNameTextField, {target: {value: 'skillName'}});

        const saveButton = screen.getByRole("button", {name: 'Submit new skill'});
        expect(saveButton).toBeDisabled();

        const categoryDropdown =  screen.getByRole("button", {name: 'Select a category'});
        fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });
        await screen.findByText('Programming')
        fireEvent.click(screen.getByText('Programming'));
        
        expect(saveButton).not.toBeDisabled();
    });

    test('Skill is not added if it already exists', async () => {  
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList))

        render(<AddSkill/>);

        const skillNameTextField = screen.getByRole("textbox",  {name: 'Text field to enter skill name'});
        fireEvent.change(skillNameTextField, {target: {value: 'Javascript'}});

        const categoryDropdown =  screen.getByRole("button", {name: 'Select a category'});
        fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });
        await screen.findByText('Programming')
        fireEvent.click(screen.getByText('Programming'));

        const saveButton = screen.getByRole("button", {name: 'Submit new skill'});
        userEvent.click(saveButton);

        setTimeout(() => {
            expect(screen.getByText('Entry already exists, could not add')).toBeInTheDocument()
       }, 2000);
    });

    test('New skill can be added', async () => {  
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList))

        render(<AddSkill/>);

        const skillNameTextField = screen.getByRole("textbox",  {name: 'Text field to enter skill name'});
        fireEvent.change(skillNameTextField, {target: {value: 'New Skill'}});

        const categoryDropdown =  screen.getByRole("button", {name: 'Select a category'});
        fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });
        await screen.findByText('Programming')
        fireEvent.click(screen.getByText('Programming'));

        const saveButton = screen.getByRole("button", {name: 'Submit new skill'});
        userEvent.click(saveButton);

        setTimeout(() => {
            expect(screen.getByText('Skill added successfully')).toBeInTheDocument()
       }, 2000);
    });
});