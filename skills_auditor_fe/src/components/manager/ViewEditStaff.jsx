import '../styles/styles.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as api from '../../api.js';
import { useState } from "react";
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function ViewEditStaff(props) {
   
        const [jobRole, setJobRole] = useState({});
        const [allJobRoles, setAllJobRoles] = useState([])
        const [firstName, setFirstName] = useState('');
        const [surname, setSurname] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [jobRoleId, setJobRoleId] = useState({});
        const [title, setTitle] = useState('');   
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
       
        useEffect(()=> {

            const loggedInUser = props.userDetails.details;
            if (loggedInUser) {
              setUserData(loggedInUser);
             }

            async function fetchSelectedStaffData() {
                await api.fetchAssignedStaff(loggedInUser.id).then((res) => {
                    setAssignedStaff(res.data);
                }).catch((err) => {
                   toast(err.message)
                })
            }

            async function fetchAllJobRoles() {
                await api.fetchAllJobRoles().then((res) => {
                    setAllJobRoles(res.data);
                }).catch((err) => {
                    console.log(err);
                })
            }
    
                setFirstName(selectedStaff.firstName);
                setSurname(selectedStaff.surname);
                setEmail(selectedStaff.email);
                setPassword(selectedStaff.password);
                setJobRoleId(selectedStaff.job_role_id);
                setTitle(selectedStaff.title);

                
    
            async function fetchJobDetails () { 
                await api.fetchJobRoleById(selectedStaff.job_role_id).then((res) => {
                setJobRole(res.data[0]);
             }).catch((err) => console.log(err));
            }

            fetchAllJobRoles();
            fetchJobDetails();
            fetchSelectedStaffData();
        }, [jobRoleId, selectedStaff.email, selectedStaff.firstName, selectedStaff.id, selectedStaff.job_role_id, selectedStaff.password, selectedStaff.surname, selectedStaff.title, props.userDetails.details])


        const handleSelectedStaff= async (staffName)=>{
            setSelectedUsername(staffName);
        }
        
        const handleSelectJobRole = async (jobName) => {
            const jobDetails = allJobRoles.filter(job => job.description === jobName)

            setJobRole(jobDetails[0]);
        }

        const handleOnClickStaff = (event) => {
          const staffId = Number(event.target.id)

           const staffDetails = assignedStaff.filter(staff => staff.id === staffId)
           setSelectedStaff(staffDetails[0]);
        }

        const handleOnClickJobRole = (event) => {
            const selectedJobRoleID = Number(event.target.id);
       
            const jobDetails = allJobRoles.filter(job => job.id === selectedJobRoleID)

            setJobRole(jobDetails);
        }

        const onFormSubmit = async (e) => {
            e.preventDefault()
      
            const userDetails = {
              id: selectedStaff.id,
              firstName:firstName,
              surname: surname,
              title: title,
              email: email,
              job_role_id: jobRole.id,
              password: password,
              system_role_id: selectedStaff.system_role_id
            }

            try {
                await api.updatePersonalDetails(userDetails).then((res) => {
                    if(Object.keys(res.data).length === 0) {
                        toast("Error updating details")
                    }
                    else {
                        toast("Successfully updated")
                    }
                })
            } catch(err) {
                toast("Unable to update: ", err.message)
            }
        }
    
    return (
    <div  className="container">
     <Form onSubmit={onFormSubmit}>

     <Form.Label >Selected staff member</Form.Label>
     <Dropdown>
             <DropdownButton aria-label='Dropdown menu to choose an employee to edit' title={!selectedUsername ? "Staff list" : selectedUsername} onSelect={handleSelectedStaff} className="dropdown-padding">

             {!assignedStaff? 'No staff to display':  assignedStaff.map((staff) => {
                     return <Dropdown.Item key={staff.id} id={staff.id} eventKey={`${staff.firstName} ${staff.surname}`} onClick={handleOnClickStaff}>
                        {staff.firstName} {staff.surname} 
                        </Dropdown.Item>
                    }) }
             </DropdownButton>
             </Dropdown> 
         
        <Form.Group className="mb-3">
        <Form.Label >Title</Form.Label>
            <Form.Control aria-label='Text field to edit the employees title' type="text" onChange={onInputTitle} value={title} />
            <Form.Label >First name</Form.Label>
            <Form.Control aria-label='Text field to edit the employees first name' type="text" onChange={onInputFirstName} value={firstName} />
            <Form.Label>Surname</Form.Label>
            <Form.Control aria-label='Text field to edit the employees surname' type="text" onChange={onInputSurname} value={surname} />
        </Form.Group>
    
         <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control aria-label='Text field to edit the employees email' type="email"  onChange={onInputEmail} value={email}/>
            <Form.Label>Password</Form.Label>
            <Form.Control aria-label='Text field to edit the employees password' type="password" onChange={onInputPassword} value={password} />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label >Job Role</Form.Label>

            <Dropdown>
             <DropdownButton aria-label='Dropdown menu to change the employees job role' title={!jobRole ? "Job Role" : jobRole.description} onSelect={handleSelectJobRole} className="dropdown-padding">

             {!allJobRoles? 'No jobs to display':  allJobRoles.map((job) => {
                     return <Dropdown.Item key={job.id} id={job.id} eventKey={job.description} onClick={handleOnClickJobRole}>
                        {job.description} 
                        </Dropdown.Item>
                    }) }
             </DropdownButton>
             </Dropdown> 
        </Form.Group>
    <br></br>

          <Button aria-label='Save the employees edited details' variant="primary" type="submit" >
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