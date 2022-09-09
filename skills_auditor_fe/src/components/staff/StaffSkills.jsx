import '../styles/styles.css';
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

function StaffSkills(props){
    const [assignedSkills, setAssignedSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]); // comes from api call - this is all skills in the db
    const [strengths, setStrengths] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [selectedNewSkill, setSelectedNewSkill] = useState(''); //what's been selected in the dropdown
    const [selectedSkillId, setSkillId] = useState(0); // id of the skill selected
    const [selectedStrength, setStrength] = useState('');
    const [tableData, setTableData] = useState([]);
    const [userData, setUserData] = useState(0);

    useEffect( () => {
        const userDetails = props.userDetails.details
        setUserData(userDetails)
    }, [
        props
    ])

    useEffect( () => {
        async function fetchAllSkills() {
            await api.fetchAllSkills().then((res) => {
                setAllSkills(res.data);
            })
        }
        fetchAllSkills();

        async function fetchAssignedSkills() {
            await api.fetchAssignedSkills(await userData.id).then((res) => {
                setAssignedSkills(res.data);
            })
        }
        if(userData?.id){
            fetchAssignedSkills();
        }
        setStrengths(SkillStrength);

    }, [
        userData
    ])

    useEffect (() => {
        async function fetchTableData() {
            await api.fetchSkillsTableData(
                {"assignedSkills": assignedSkills}
                ).then((res) => {
                setTableData(res.data);
            })
        };
        fetchTableData();
    }, [
        assignedSkills
    ])


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
            staff_id: userData.id,
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
            <Form.Label>Skills</Form.Label>
            <Dropdown>
                <DropdownButton title={selectedNewSkill ? selectedNewSkill : "Select a Skill" } onSelect={handleSelectSkill}>
                    {!allSkills? 'No Skills to display':  allSkills.map((skills) => {
                        return <Dropdown.Item aria-label={`${skills.description} button`} value={skills.description} eventKey={skills.description} key={skills.id}  >{skills.description}</Dropdown.Item>
                    })}
                </DropdownButton>
            </Dropdown>
            <br/>
            <Form.Label>Strength</Form.Label>
            <Dropdown>
                <DropdownButton title = { selectedStrength ? selectedStrength : "Select a Skill Strength" } onSelect = {handleSelectStrength} >
                    {!strengths? 'Error, cannot find strength values': strengths.map((strengths) => {
                        return <Dropdown.Item aria-label={`${strengths} button`} value={strengths} eventKey={strengths} key={strengths}> {strengths}</Dropdown.Item>
                    })}
                </DropdownButton>
            </Dropdown>
            <br/>
            <Form.Label>Expiry Date</Form.Label>
            <DatePicker selected={expiryDate} onChange={(date) => setExpiryDate(date)} dateFormat="dd/MM/yyyy" aria-label="date picker"/>
            <Button variant="primary" type="add" disabled={!selectedNewSkill} onClick={onFormAdd} > Add Skill </Button>
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
                <select id="selectSkillSelect" aria-label='assigned skills table section'>
                    {!tableData? 'No Assigned Skills': tableData.map((skill) => {
                        try{
                            return <option value={skill.skillId}>{skill.skillId}</option>
                        } catch(error) {
                            console.log(error)
                            return 'Skills Loading'
                        }
                    })}
                </select>
                <Button variant="primary" type="remove" onClick={onFormRemove} aria-label="remove skill button"> Remove Skill </Button>
                <Table striped bordered hover aria-label="assigned skills table">
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

export default StaffSkills;