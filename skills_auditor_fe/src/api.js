import Axios from 'axios';

const BaseURL = "http://localhost:8080/"

export const fetchStaff = () => {
    return Axios.get(`${BaseURL}staff/`);
}

export const fetchCurrentStaff = (staffId) => { // why is this fetch "current" staff?
    return Axios.get(`${BaseURL}staff/id/${staffId}`);
}

export const fetchJobRoleById = (id) => {
    return Axios.get(`${BaseURL}job_role/id/${id}`);
}

export const updatePersonalDetails = (staff) => {
    return Axios.put(`${BaseURL}staff/`, staff)
}

export const addCategory = (category) => {
    return Axios.post(`${BaseURL}category/`, category)
}
    
export const addNewSkill = (skill) => {
    return Axios.post(`${BaseURL}skill`, skill)
}

export const fetchSkillByDescription = (description) => {
    return Axios.get(`${BaseURL}skill/desc/${description}`)
}

export const updateSkillDetails = (skill) => {
    return Axios.put(`${BaseURL}skill/`, skill)
}

export const fetchAssignedStaff = (managerId) => {
    return Axios.get(`${BaseURL}staff/assignedStaff/${managerId}`)
}

export const fetchAllSkills = () => {
    return Axios.get(`${BaseURL}skill`)
}

export const fetchSkillById = (id) => {
    return Axios.get(`${BaseURL}skill/id/${id}`)
}

export const deleteSkill = (skillId) => {
    return Axios.delete(`${BaseURL}skill/delete/${skillId}`)
}


export const fetchAssignedSkills = (id) => {
    return Axios.get(`${BaseURL}staff_skill/st_id/${id}`)
}

export const deleteStaffSkill = (id) => {
    return Axios.delete(`${BaseURL}staff_skill/delete/${id}`)
}

export const assignSkill = (staffSkill) => {
    return Axios.post(`${BaseURL}staff_skill`, staffSkill)
}

export const fetchSkillsTableData = (assignedSkills) => {
    return Axios.post(`${BaseURL}staff_skill/table_data`, assignedSkills)
}

export const fetchJobRoles = () => {
    return Axios.get(`${BaseURL}job_role/`) 
}   

export const checkUserCredentials = (userCredentials) => {
    return Axios.get(`${BaseURL}`, {params: {details: userCredentials}})
}

export const fetchAllCategories = () => {
    return Axios.get(`${BaseURL}category`)
}

export const fetchCategoryByDescription = (description) => {
    return Axios.get(`${BaseURL}category/desc/${description}`)
}

export const fetchCategoryById = (categoryId) => {
    return Axios.get(`${BaseURL}category/id/${categoryId}`)
}

export const updateCategoryDetails = (category) => {
    return Axios.put(`${BaseURL}category/`, category)
}

export const deleteCategory = (categoryId) => {
    return Axios.delete(`${BaseURL}category/delete/${categoryId}`)
}

export const addStaff = (staff) => {
    return Axios.post(`${BaseURL}staff/`, staff)
}

export const fetchAllJobRoles = () => {
    return Axios.get(`${BaseURL}job_role`)
}

export const fetchJobRoleId = (description) => {
    return Axios.get(`${BaseURL}job_role/desc/${description}`)
}

export const fetchAllSystemRoles = () => {
    return Axios.get(`${BaseURL}system_role`)
}

export const fetchSystemRoleId = (description) => {
    return Axios.get(`${BaseURL}system_role/desc/${description}`)
}

export const fetchStaffBySystemRoleId = (systemRoleId) => {
    return Axios.get(`${BaseURL}staff/system_role_id/${systemRoleId}`)
}