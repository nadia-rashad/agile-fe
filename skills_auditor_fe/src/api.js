import Axios from 'axios';

const BaseURL = "http://localhost:8080/"

export const fetchStaff = () => {
    console.log("in fetch")
    return Axios.get(`${BaseURL}staff/`);
}