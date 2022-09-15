import '../global-styles/styles.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import * as api from '../../api.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import toast, { Toaster } from 'react-hot-toast';
import { SkillStrength } from '../utilities/SkillStrength';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import React from 'react';


function ViewEditStaffSkills(props) {
    const [assignedSkills, setAssignedSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]); // comes from api call - this is all skills in the db
    const [strengths, setStrengths] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [selectedNewSkill, setSelectedNewSkill] = useState(''); //what's been selected in the dropdown
    const [selectedSkillId, setSkillId] = useState(0); // id of the skill selected
    const [selectedStrength, setStrength] = useState('');
    const [tableData, setTableData] = useState([]);
    const [userData, setUserData] = useState(0);
    const [selectedUser, setSelectedUser] = useState(0);
    const [availableUsers, setAvailableUsers] = useState([]);

    useEffect( () => {
        const userDetails = props.userDetails.details
        setUserData(userDetails)
    }, [
        props
    ])

    useEffect( () => {
        async function fetchAvailableUsers() {
            await api.fetchAssignedStaff(userData.id).then((res) => {
                res.data.push(userData);
                setAvailableUsers(res.data)
            })
        }
        fetchAvailableUsers()
    }, [
        userData
    ])

    useEffect( () => {
        async function fetchAllSkills() {
            await api.fetchAllSkills().then((res) => {
                setAllSkills(res.data);
            })
        }
        fetchAllSkills();

        async function fetchAssignedSkills() {
            await api.fetchAssignedSkills(selectedUser).then((res) => {
                setAssignedSkills(res.data);
            })
        }
        if(selectedUser){
            fetchAssignedSkills();
        }
        setStrengths(SkillStrength);
    }, [
        selectedUser
    ])

    useEffect (() => {
        async function fetchTableData() {
            if (assignedSkills.length > 0) {
                await api.fetchSkillsTableData(
                    {"assignedSkills": assignedSkills})
                    .then((res) => {
                        setTableData(res.data);
                    })
            } else {
                setTableData([])
            }};
        fetchTableData();
    }, [
        assignedSkills
    ])

    const handleSelectUser = async (u) => {
        setSelectedUser(u);

    }

    const handleSelectSkill = async (s) => {
        setSelectedNewSkill(s);
        await api.fetchSkillByDescription(s).then((res) => {
            setSkillId(res.data[0].id);
        })
    }

    const handleSelectStrength = async (s) => {
        setStrength(s);
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    const onFormAdd = async (s) => {
        s.preventDefault();

        const newSkillToAssign = {
            skill_id: selectedSkillId,
            staff_id: selectedUser,
            expiry_date: expiryDate,
            strength: selectedStrength
        }

        await api.assignSkill(newSkillToAssign).then((res) => {
            if(res.status === 201 ){
                toast("Skill assigned successfully");
                setSelectedNewSkill('');
            }
            else {
                toast(res.data.message);
            }
        });
        refreshPage()
    }

    const onFormRemove = () => {
        const id = document.getElementById("selectSkillSelect").value;     
        api.deleteStaffSkill(id);
    }
    
    return (
        <div  className="container">
            <Form>
            <Form.Label>Assign Skills</Form.Label>
            <br/>
            <Form.Label>User ID:</Form.Label>
            <Dropdown>
                <DropdownButton data-testid="user-dropdown" title={selectedUser ? selectedUser : "Select a User" } onSelect={handleSelectUser}>
                    {!availableUsers? 'No Users to display':  availableUsers.map((user) => {
                        return <Dropdown.Item key={user.id} eventKey={user.id}>{user.id + ": " + user.firstName + " " + user.surname}</Dropdown.Item>
                    })}
                </DropdownButton>
            </Dropdown>
            <br/>
            <Form.Label>Skills</Form.Label>
            <Dropdown>
                <DropdownButton data-testid="skill-dropdown" title={selectedNewSkill ? selectedNewSkill : "Select a Skill" } onSelect={handleSelectSkill}>
                    {!allSkills? 'No Skills to display':  allSkills.map((skill) => {
                        return <Dropdown.Item key={skill.description} eventKey={skill.description}>{skill.description}</Dropdown.Item>
                    })}
                </DropdownButton>
            </Dropdown>
            <br/>
            <Form.Label>Strength</Form.Label>
            <Dropdown>
                <DropdownButton data-testid="strength-dropdown" title = { selectedStrength ? selectedStrength : "Select a Skill Strength" } onSelect = {handleSelectStrength} >
                    {!strengths? 'Error, cannot find strength values': strengths.map((strengths) => {
                        return <Dropdown.Item key={strengths} eventKey={strengths}>{strengths}</Dropdown.Item>
                    })}
                </DropdownButton>
            </Dropdown>
            <br/>
            <Form.Label>Expiry Date</Form.Label>
            <DatePicker data-testid="expiry-date-picker" selected={expiryDate} onChange={(date) => setExpiryDate(date)} dateFormat="dd/MM/yyyy"/>
            <Button data-testid="add-skill" variant="primary" type="add" disabled={!selectedNewSkill} onClick={onFormAdd} > Add Skill </Button>
            <Toaster toastOptions={{
                className: '',
                style: {
                border: '2px solid #713200',
                padding: '16px',
                color: '#713200',
                },
            }}/>
            <div>
                <h2>Assigned Skills</h2>
                <select id="selectSkillSelect" aria-label='staff assigned skills table'>
                    {!tableData? 'No Assigned Skills': tableData.map((skill) => {
                        try{
                            return <option value={skill.skillId}>{skill.skillId}</option>
                        } catch(error) {
                            console.log(error)
                            return 'Table Error'
                        }
                    })}
                </select>
                <Button data-testid="remove-skill" variant="primary" type="remove" onClick={onFormRemove} > Remove Skill </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Skill name</th>
                            <th>Skill Category</th>
                            <th>Strength</th>
                            <th>Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!tableData? 'No Assigned Skills to display': tableData.map((skill, i) => {
                            try{
                                return <tr>
                                    <td key={`id-${i}`}>{skill.skillId}</td>
                                    <td key={`name-${i}`}>{skill.skillName}</td>
                                    <td key={`category-${i}`}>{skill.skillCategory}</td>
                                    <td key={`strength-${i}`}>{skill.skillStrength}</td>
                                    <td key={`date-${i}`}>{skill.expiryData}</td>
                                </tr>
                            } catch(error) {
                                console.log(error)
                                return 'Skills Loading'
                            }
                })}
                    </tbody>
                </Table>
            </div>
            </Form>
        </div>
    )
}

export default ViewEditStaffSkills;