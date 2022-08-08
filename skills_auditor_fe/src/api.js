import Axios from 'axios';

const BaseURL = "http://localhost:8080/"

export const fetchStaff = () => {
    return Axios.get(`${BaseURL}staff/`);
}

export const fetchCurrentStaff = (staffId) => {
    return Axios.get(`${BaseURL}staff/id/${staffId}`);
}

export const fetchJobRoleById = (id) => {
    return Axios.get(`${BaseURL}job_role/id/${id}`);
}

export const fetchJobRoles = () => {
    return Axios.get(`${BaseURL}job_role/`) 
}   

export const updatePersonalDetails = (staff) => {
    return Axios.put(`${BaseURL}staff/`, staff)
}

export const addStaff = (staff) => {
    return Axios.put(`${BaseURL}staff/`, staff)
}