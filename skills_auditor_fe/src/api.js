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

export const updatePersonalDetails = (staff) => {
    return Axios.put(`${BaseURL}staff/`, staff)
}

export const checkUserCredentials = (userCredentials) => {
    return Axios.get(`${BaseURL}`, {params: {details: userCredentials}})

export const addCategory = (category) => {
    return Axios.post(`${BaseURL}category/`, category)
}
    
export const addNewSkill = (skill) => {
    return Axios.post(`${BaseURL}skill`, skill)
}

export const fetchAllCategories = () => {
    return Axios.get(`${BaseURL}category`)
}

export const fetchCategoryId = (description) => {
    return Axios.get(`${BaseURL}category/desc/${description}`)
}