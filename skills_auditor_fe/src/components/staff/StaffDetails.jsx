import '../styles/styles.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as api from '../../api.js';
import { useState } from "react";
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function StaffDetails() {

    const [jobRole, setJobRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jobRoleId, setJobRoleId] = useState(0);
    const [title, setTitle] = useState('');
    const [id, setId] = useState(0);    
    
    const onInputFirstName = ({target:{value}}) => {
        setFirstName(value)};
    const onInputSurname = ({target:{value}}) => setSurname(value);
    const onInputEmail = ({target:{value}}) => setEmail(value);
    const onInputPassword = ({target:{value}}) => setPassword(value);
    const onInputTitle =  ({target:{value}}) => setTitle(value);

    const notify = () => toast('Updated user details saved');

    const onFormSubmit = async (e) => {
      e.preventDefault()

      const userDetails = {
        id: id,
        firstName: firstName,
        surname: surname,
        title: title,
        email: email,
        job_role_id: jobRoleId,
        password: password
      }
     await api.updatePersonalDetails(userDetails);
     notify();
    }


    useEffect(()=> {
        async function fetchData() { await api.fetchCurrentStaff(1).then(    (res) => {
            setFirstName(res.data[0].firstName);
            setSurname(res.data[0].surname);
            setEmail(res.data[0].email);
            setPassword(res.data[0].password);
            setJobRoleId(res.data[0].job_role_id);
            setTitle(res.data[0].title);
            setId(res.data[0].id);
            }).catch((err) => console.log(err));
        }

        async function fetchJobName () { 
            await api.fetchJobRoleById(jobRoleId).then((res) => {
            setJobRole(res.data[0].description);
         }).catch((err) => console.log(err));
        }
        fetchData();
        fetchJobName();
    }, [jobRoleId])


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
        <Form.Control type="text" value={jobRole} disabled/>
    </Form.Group>

     
     <br></br>
      <Button variant="primary" type="submit" >
        Save
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

export default StaffDetails;