import '../styles/styles.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as api from '../../api.js';
import { useState } from "react";
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function AddStaff() {
    
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jobRoles, setJobRoles] = useState([]);
    const [systemRoles, setSystemRoles] = useState([]);
    const [lineManagers, setLineManagers] = useState([]);

    const [selectedJobRole, setJobRole] = useState('');
    const [selectedJobRoleId, setJobRoleId] = useState(0);
    const [selectedSystemRole, setSystemRole] = useState('');
    const [selectedSystemRoleId, setSystemRoleId] = useState(0);
    const [selectedLineManager, setLineManager] = useState('');
    const [selectedLineManagerId, setLineManagerId] = useState(0);

    const onInputTitle =  ({target:{value}}) => setTitle(value);
    const onInputFirstName = ({target:{value}}) => setFirstName(value);
    const onInputSurname = ({target:{value}}) => setSurname(value);
    const onInputEmail = ({target:{value}}) => setEmail(value);
    const onInputPassword = ({target:{value}}) => setPassword(value);

    useEffect(()=> {
        async function fetchJobRoles() {
            await api.fetchAllJobRoles().then((res) => {
                setJobRoles(res.data);
            })
        }

        async function fetchSystemRoles() {
            await api.fetchAllSystemRoles().then((res) => {
                setSystemRoles(res.data);
            })
        }

        async function fetchAllManagers() {
            await api.fetchStaffBySystemRoleId(1).then((res) => {
                setLineManagers(res.data)
            })
        }

        fetchJobRoles();
        fetchSystemRoles();
        fetchAllManagers();
    }, [])

    const convertSelectedJobRoleToId = async (e)=>{
        setJobRole(e);

        await api.fetchJobRoleId(e).then((res) => {
            setJobRoleId(res.data[0].id);
        })
       
    }

    const convertSelectedSystemRoleToId= async (e)=>{
        setSystemRole(e);

        await api.fetchSystemRoleId(e).then((res) => {
            setSystemRoleId(res.data[0].id);
        })
       
    }

    const setSelectedManagerDetails= async (e)=>{
        await api.fetchCurrentStaff(e).then((res) => {
            setLineManagerId(res.data[0].id);
            setLineManager(`${res.data[0].firstName} ${res.data[0].surname}`)
        })
       
    }

    const onFormSubmit = async (e) => {
      e.preventDefault()

      const userToAdd = {
        firstName: firstName,
        surname: surname,
        title: title,
        email: email,
        job_role_id: selectedJobRoleId,
        password: password,
        system_role_id: selectedSystemRoleId,
        manager_id: selectedLineManagerId
      }

        await api.addStaff(userToAdd).then((res) => {
            if(res.status === 201 ){
                toast("Staff member added");
                setTitle('');
                setFirstName('');
                setSurname('');
                setEmail('');
                setPassword('');
                setJobRole('');
                setSystemRole('');
                setLineManager('');
            }
            else {
                toast(res.data.message);
            }
        })

    }

    return (
        <div  className="container">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                <Form.Label >Title</Form.Label>
                    <Form.Control aria-label='Text field to enter the employees title' type="text" onChange={onInputTitle} value={title} />
                    <Form.Label >First name</Form.Label>
                    <Form.Control aria-label='Text field to enter the employees first name' type="text" onChange={onInputFirstName} value={firstName} />
                    <Form.Label>Surname</Form.Label>
                    <Form.Control aria-label='Text field to enter the employees surname' type="text" onChange={onInputSurname} value={surname} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control aria-label='Text field to enter the employees email' type="email"  onChange={onInputEmail} value={email}/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control aria-label='Text field to enter the employees password' type="password" onChange={onInputPassword} value={password} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >Job Role</Form.Label>

                    <br></br>
                    <Dropdown>
                    <DropdownButton aria-label='Dropdown menu to choose the employees job role' title={selectedJobRole ? selectedJobRole : "Job Roles"} onSelect={convertSelectedJobRoleToId} >

                    {!jobRoles? 'No job roles to display':  jobRoles.map((jobRoles) => {
                        return <Dropdown.Item value={jobRoles.description} eventKey={jobRoles.description} key={jobRoles.id}  >{jobRoles.description}</Dropdown.Item>
                        }) 
                    }
                    </DropdownButton>
                    </Dropdown> 
                    <br></br>

                    <Form.Label >System Role</Form.Label> 
                    <br></br>
                    <Dropdown>
                    <DropdownButton aria-label='Dropdown menu to choose the employees system role' title={selectedSystemRole ? selectedSystemRole : "System Roles"} onSelect={convertSelectedSystemRoleToId} >

                    {!systemRoles? 'No system roles to display':  systemRoles.map((systemRoles) => {
                        return <Dropdown.Item value={systemRoles.description} eventKey={systemRoles.description} key={systemRoles.id}  >{systemRoles.description}</Dropdown.Item>
                        }) 
                    }
                    </DropdownButton>
                    </Dropdown> 
                    <br></br>

                    <Form.Label >Line Manager</Form.Label> 
                    <br></br>
                    <Dropdown>
                    <DropdownButton title={selectedLineManager ? selectedLineManager : "Assign a line manager"} onSelect={setSelectedManagerDetails} >

                    {!lineManagers? 'No managers to display':  lineManagers.map((lineManagers) => {
                        return <Dropdown.Item value={`${lineManagers.firstName} ${lineManagers.surname}`}  eventKey={lineManagers.id} key={lineManagers.id} >{lineManagers.firstName} {lineManagers.surname}</Dropdown.Item>
                        }) 
                    }
                    </DropdownButton>
                    </Dropdown> 
                    <br></br>

                </Form.Group>

                <Button aria-label='Submit new employee' variant="primary" type="submit" disabled={!title || !firstName || !surname || !email || !password || !selectedJobRole || !selectedSystemRole}>

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