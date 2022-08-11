import '../styles/styles.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as api from '../../api.js';
import { useState } from "react";
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function ViewEditStaff() {
   
        const [jobRole, setJobRole] = useState('');
        const [firstName, setFirstName] = useState('');
        const [surname, setSurname] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [jobRoleId, setJobRoleId] = useState(0);
        const [title, setTitle] = useState('');
        const [id, setId] = useState(0);    
        const [assignedStaff, setAssignedStaff] = useState([]);
        const [userData, setUserData] = useState([]);
        const [selectedStaff, setSelectedStaff] = useState({});
        const [selectedUsername, setSelectedUsername] = useState('');
        
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

            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (loggedInUser) {
              setUserData(loggedInUser);
             }

            async function fetchSelectedStaffData() {
                // get all staff who have a manager id of the manager that's logged in
                await api.fetchAssignedStaff(loggedInUser.id).then((res) => {
                   console.log("all users" ,res.data)
                    setAssignedStaff(res.data);
                }).catch((err) => {
                    console.log(err);
                })
            }

// update with selected users details 
            async function fetchData() { await api.fetchCurrentStaff(1).then(    (res) => {
                setFirstName(selectedStaff.firstName);
                setSurname(selectedStaff.surname);
                setEmail(selectedStaff.email);
                setPassword(selectedStaff.password);
                setJobRoleId(selectedStaff.job_role_id);
                setTitle(selectedStaff.title);
                setId(selectedStaff.id);
                }).catch((err) =>toast(err.message));
            }
    
            async function fetchJobName () { 
            //     await api.fetchJobRoleById(1).then((res) => {
            //     setJobRole(res.data[0].description);
            //  }).catch((err) => console.log(err));
            }
            fetchData();
            fetchJobName();
            fetchSelectedStaffData();
        }, [jobRoleId, selectedStaff.email, selectedStaff.firstName, selectedStaff.id, selectedStaff.job_role_id, selectedStaff.password, selectedStaff.surname, selectedStaff.title])


        const handleSelect= async (staffName)=>{
            setSelectedUsername(staffName);
          }

          const handleOnClick = (event) => {

          const staffId = Number(event.target.id)

          console.log("id", staffId)

           const staffDetails = assignedStaff.filter(staff => staff.id === staffId)
           setSelectedStaff(staffDetails[0]);

          }

          console.log("selected staff", selectedStaff)
    
    
    return (
    <div  className="container">
     <Form onSubmit={onFormSubmit}>
     <Dropdown>
             <DropdownButton title={!selectedUsername ? "Staff" : selectedUsername} onSelect={handleSelect} >

             {!assignedStaff? 'No staff to display':  assignedStaff.map((staff, index) => {
                     return <Dropdown.Item key={staff.id} id={staff.id} eventKey={`${staff.firstName} ${staff.surname}`} onClick={handleOnClick}>
                        {staff.firstName} {staff.surname} 
                        </Dropdown.Item>
                    }) }
             </DropdownButton>
             </Dropdown> 
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

export default ViewEditStaff;