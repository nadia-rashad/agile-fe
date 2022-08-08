import '../styles/styles.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/Dropdown'
import * as api from '../../api.js';
import { useState } from "react";
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function AddStaff() {
    
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jobRoles, setJobRoles] = useState([]);
    const [jobRole, setJobRole] = useState('');
    const [jobRoleId, setJobRoleId] = useState(0);    

    const onInputTitle =  ({target:{value}}) => setTitle(value);
    const onInputFirstName = ({target:{value}}) => setFirstName(value);
    const onInputSurname = ({target:{value}}) => setSurname(value);
    const onInputEmail = ({target:{value}}) => setEmail(value);
    const onInputPassword = ({target:{value}}) => setPassword(value);
    const onInputJobRole = ({target:{value}}) => setJobRole(value);

    const notify = () => toast('New employee added');
    const errorNotification = () => toast('There has been an error submitting your request');

    const onFormSubmit = async (e) => {
      e.preventDefault()

      const userDetails = {
        firstName: firstName,
        surname: surname,
        title: title,
        email: email,
        job_role_id: jobRoleId,
        password: password
      }
     await api.addStaff(userDetails);
     notify();
    }
 
    useEffect(()=> {
        async function fetchRoles() { 
            await api.fetchJobRoles().then((res) => {
                res.data.forEach(jobRole => {
                    setJobRoles(jobRoles.concat(jobRole));
            });
            }).catch((err) =>toast(err.message));
        }

        fetchRoles();
    },)

    return (
        <div  className="container">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                <Form.Label >Title</Form.Label>
                    <Form.Control type="text" onChange={onInputTitle} value={title} />
                    <Form.Label >First name</Form.Label>
                    <Form.Control type="text" onChange={onInputFirstName} value={firstName} />
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" onChange={onInputSurname} value={surname} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"  onChange={onInputEmail} value={email}/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={onInputPassword} value={password} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >Job Role</Form.Label>
                    
                </Form.Group>


                <br></br>
                <Button variant="primary" type="submit" >
                    Add Staff Member
                </Button>
                <Toaster toastOptions={{
                className: '',
                style: {
                border: '2px solid #713200',
                padding: '16px',
                color: '#713200',
                },
                }}/>
            </Form>
        </div>
    )
}

export default AddStaff;