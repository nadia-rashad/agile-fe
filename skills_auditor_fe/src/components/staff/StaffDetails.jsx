import '../styles/styles.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as api from '../../api.js';
import { useState, useEffect } from "react";
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
    const [userData, setUserData] = useState([]);
    
    const onInputFirstName = ({target:{value}}) => {
        setFirstName(value)};
    const onInputSurname = ({target:{value}}) => setSurname(value);
    const onInputEmail = ({target:{value}}) => setEmail(value);
    const onInputPassword = ({target:{value}}) => setPassword(value);
    const onInputTitle =  ({target:{value}}) => setTitle(value);
   
    const notify = () => toast('Updated user details saved');


    useEffect(()=> {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

      if (loggedInUser) {
        setUserData(loggedInUser);
       }
  
      setFirstName(userData.firstName);
      setSurname(userData.surname);
      setEmail(userData.email);
      setPassword(userData.password);
      setJobRoleId(userData.job_role_id);
      setTitle(userData.title);
      setId(userData.id);

       async function fetchJobName () { 
        await api.fetchJobRoleById(jobRoleId).then((res) => {
        setJobRole(res.data[0].description);
     }).catch((err) => console.log(err));
    }
    fetchJobName();
  }, [jobRoleId, userData.firstName, userData.surname,userData.email,userData.password, userData.job_role_id, userData.title, userData.id  ])



    const onFormSubmit = async (e) => {
      e.preventDefault()

      const updatedDetails = {
        id: id,
        firstName: firstName,
        surname: surname,
        title: title,
        email: email,
        job_role_id: jobRoleId,
        password: password
      }
     await api.updatePersonalDetails(updatedDetails);
     notify();
    }

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
      border: '2px solid green',
      padding: '16px',
      color: '#713200',
    },
  }}/>
      
    </Form>
</div>
    )
}

export default StaffDetails;