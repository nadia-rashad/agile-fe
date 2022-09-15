/**
* @jest-environment jsdom
*/

import React from 'react';
import ViewEditCategories from "../manager/ViewEditCategories";
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as api from'../../api';
import userEvent from '@testing-library/user-event';
import {categoryList, categoryResp} from "./test_data"

describe('Manager - View/Edit Categories (Editing and removing existing categories)', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should render the textfield, dropdown button and save button correctly", async () => {
        render(<ViewEditCategories/>);
        
        expect(screen.getByRole("label", {name: 'Categories'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Select a category to edit'})).toBeInTheDocument();
        expect(screen.getByRole("label", {name: 'Category Name'})).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: 'Text field to edit category name'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Submit edited category details'})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: 'Delete selected category'})).toBeInTheDocument();

    });

    test('ViewEditCategories component calls fetchallcategories and category dropdown is populated', async () => {

        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList))
        const fetchCategories = jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryResp))

        render(<ViewEditCategories/>);

        const categoryDropdown =  screen.getByRole("button", {name: 'Select a category to edit'});
        fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });

        const category1 = await screen.findByText('Office365');
        const category2 = await screen.findByText('Programming');
        
        expect(fetchCategories).toHaveBeenCalled();
        expect(category1).toBeInTheDocument();
        expect(category2).toBeInTheDocument();
    });

    test('Save and delete buttons are disabled until a category is chosen and if category name is empty', async () => {
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList));
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryResp));

        render(<ViewEditCategories/>);

        const saveButton = screen.getByRole("button", {name: 'Submit edited category details'});
        const deleteButton = screen.getByRole("button", {name: 'Delete selected category'});

        expect(saveButton).toBeDisabled();
        expect(deleteButton).toBeDisabled();

        const categoryDropdown = screen.getByRole("button", {name: 'Select a category to edit'});
        fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });
        await screen.findByText('Office365')
        fireEvent.click(screen.getByText('Office365'));
        
        expect(saveButton).not.toBeDisabled();
        expect(deleteButton).not.toBeDisabled();

        const categoryNameTextField = screen.getByRole("textbox",  {name: 'Text field to edit category name'});
        fireEvent.change(categoryNameTextField, {target: {value: ''}});

        expect(saveButton).toBeDisabled();
        expect(deleteButton).toBeDisabled(); 
    });

    test('Category can be edited successfully and category dropdown reflects new changes', async () => {  
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList));
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryResp));

        render(<ViewEditCategories/>);

        const categoryDropdown = screen.getByRole("button", {name: 'Select a category to edit'});
        fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });
        await screen.findByText('Office365')
        fireEvent.click(screen.getByText('Office365'));

        const categoryNameTextField = screen.getByRole("textbox",  {name: 'Text field to edit category name'});
        fireEvent.change(categoryNameTextField, {target: {value: 'Edit Category'}});

        const saveButton = screen.getByRole("button", {name: 'Submit edited category details'});
        userEvent.click(saveButton);

        setTimeout(() => {
            expect(screen.getByText('Category successfully updated')).toBeInTheDocument()
        }, 2000);
       
        setTimeout(() => {
        fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });
        const editedCategory = screen.getByText('Edit Category');
        expect(editedCategory).toBeInTheDocument();
        }, 2000);
    });

    test('Category can be deleted successfully and category dropdown reflects new changes', async () => {  
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryList));
        jest.spyOn(api, "fetchAllCategories").mockImplementation(() => Promise.resolve(categoryResp));

        render(<ViewEditCategories/>);

        const categoryDropdown = screen.getByRole("button", {name: 'Select a category to edit'});
        fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });
        await screen.findByText('Office365')
        fireEvent.click(screen.getByText('Office365'));

        const deleteButton = screen.getByRole("button", {name: 'Delete selected category'});
        userEvent.click(deleteButton);

        setTimeout(() => {
            expect(screen.getByText('Category successfully deleted')).toBeInTheDocument()
        }, 2000);
       
        setTimeout(() => {
        fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });
        expect('Office365').not.toBeInTheDocument();
        }, 2000);
    });
});