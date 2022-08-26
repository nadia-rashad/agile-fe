import '../styles/styles.css';
import './StaffAddSkill.css';
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

function StaffAddSkill(){
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const [assignedSkills, setAssignedSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]); // comes from api call - this is all skills in the db
    const [strengths, setStrengths] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [selectedSkill, setSelectedSkill] = useState(''); //what's been selected in the dropdown
    const [selectedSkillId, setSkillId] = useState(0); // id of the skill selected
    const [selectedStrength, setStrength] = useState('');
    const [tableData, setTableData] = useState([]);

    useEffect( () => {
        async function fetchAllSkills() {
            await api.fetchAllSkills().then((res) => {
                setAllSkills(res.data);
            })
        }
        fetchAllSkills();

        async function fetchAssignedSkills() {
            await api.fetchAssignedSkills(loggedInUser).then((res) => {
                setAssignedSkills(res.data);
            })
        }
        fetchAssignedSkills();

        

        setStrengths(SkillStrength);

    }, [])

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
        setSelectedSkill(s);

        await api.fetchSkillId(s).then((res) => {
            setSkillId(res.data[0].id);
        })
       
    }

    const handleSelectStrength = async (s) => {
        setStrength(s);
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    const onFormSubmit = async (s) => {
        s.preventDefault()

        const newSkillToAssign = {
            skill_id: selectedSkillId,
            staff_id: loggedInUser,
            expiry_date: expiryDate,
            strength: selectedStrength
        }

        await api.assignSkill(newSkillToAssign).then((res) => {
            if(res.status === 201 ){
                toast("Skill assigned successfully");
                setSelectedSkill('');
            }
            else {
                toast(res.data.message);
            }
        })
    }
    
    return (
        <div  className="container">
            <Form onSubmit={onFormSubmit} >
            <Form.Label>Assign Skills</Form.Label>
            <br/>
            <Form.Label>Skills</Form.Label>
            <Dropdown>
                <DropdownButton title={selectedSkill ? selectedSkill : "Select a Skill" } onSelect={handleSelectSkill}>
                    {!allSkills? 'No Skills to display':  allSkills.map((skills) => {
                        return <Dropdown.Item value={skills.description} eventKey={skills.description} key={skills.id}  >{skills.description}</Dropdown.Item>
                    })}
                </DropdownButton>
            </Dropdown>
            <br/>
            <Form.Label>Strength</Form.Label>
            <Dropdown>
                <DropdownButton title = { selectedStrength ? selectedStrength : "Select a Skill Strength" } onSelect = {handleSelectStrength} >
                    {!strengths? 'Error, cannot find strength values': strengths.map((strengths) => {
                        return <Dropdown.Item value={strengths} eventKey={strengths} key={strengths}> {strengths}</Dropdown.Item>
                    })}
                </DropdownButton>
            </Dropdown>
            <br/>
            <Form.Label>Expiry Date</Form.Label>
            <DatePicker selected={expiryDate} onChange={(date) => setExpiryDate(date)} dateFormat="dd/MM/yyyy"/>
            <Button variant="primary" type="submit" disabled={!selectedSkill} onClick={refreshPage} > Add Skill </Button>
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
                <Table striped bordered hover >
                    <thead>
                        <tr>
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
                                    <td key={`name${i}`}>{skill.skillName}</td>
                                    <td key={`category${i}`}>{skill.skillCategory}</td>
                                    <td key={`strength${i}`}>{skill.skillStrength}</td>
                                    <td key={`date${i}`}>{skill.expiryData}</td>
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

export default StaffAddSkill;