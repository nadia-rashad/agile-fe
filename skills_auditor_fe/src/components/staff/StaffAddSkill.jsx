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


async function fetchAllSkills() {
  const data = await api.fetchAllSkills()

return data;
}

async function fetchAssignedSkills(currentUserId) {
  
   const data = await api.fetchAssignedSkills(currentUserId);
    return data;
}

async function getTableData (assignedSkills) {
    const array = []
    await Promise.all(assignedSkills.map(async (skill) => {
      const contents = await api.fetchSkillTableData(skill.id);
      array.push(contents.data)
    }));

    return array;
  }

function StaffAddSkill(){

    const [userData, setUserData] = useState([]);

    const [assignedSkills, setAssignedSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]); // comes from api call - this is all skills in the db
    const [strengths, setStrengths] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [selectedSkill, setSelectedSkill] = useState(''); //what's been selected in the dropdown
    const [selectedSkillId, setSkillId] = useState(0); // id of the skill selected
    const [selectedStrength, setStrength] = useState('');
    const [skills, setSkills] = useState([]); // skill array of assigned skills
   
    
    useEffect(  () => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (loggedInUser) {
             setUserData(loggedInUser);
        }

       
 
        fetchAllSkills().then((res) =>{
        setAllSkills(res.data)
        });

        fetchAssignedSkills(userData.id).then((res) => {
            setAssignedSkills(res.data)
        });
   
        setStrengths(SkillStrength);

        getTableData(assignedSkills).then((res) => {
            setSkills(res);
          
           })
    }, [])


    //another use effect for assigned skills


    useEffect(()=> {
        getTableData(assignedSkills).then((res) => {
            setSkills(res);
           })
    }, [assignedSkills])

    useEffect(()=> {
        fetchAssignedSkills(userData.id).then((res) => {
            setAssignedSkills(res.data)
        });
    }, [])

    const handleSelectSkill = async (s) => {
        setSelectedSkill(s);

        await api.fetchSkillId(s).then((res) => {
            setSkillId(res.data[0].id);
        })
       
    }

    const handleSelectStrength = async (s) => {
        setStrength(s);
    }

    const onFormSubmit = async (s) => {
        s.preventDefault()

        const newSkillToAssign = {
            skill_id: selectedSkillId,
            staff_id: userData.id,
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

            // fetchAssignedSkills(userData.id).then((res) => {
            //     setAssignedSkills(res.data)
            // });
        })
    }
    
    return (
        <div  className="container">
            <Form onSubmit={onFormSubmit} >
            <Form.Label>Assign Skills</Form.Label>

            <p>Skills</p>
            <Dropdown>
                <DropdownButton title={selectedSkill ? selectedSkill : "Select a Skill" } onSelect={handleSelectSkill}>
                    {!allSkills? 'No Skills to display':  allSkills.map((skills) => {
                        return <Dropdown.Item value={skills.description} eventKey={skills.description} key={skills.id}  >{skills.description}</Dropdown.Item>
                    })}
                </DropdownButton>
            </Dropdown>

            <p>Strength</p>
            <Dropdown>
                <DropdownButton title = { selectedStrength ? selectedStrength : "Select a Skill Strength" } onSelect = {handleSelectStrength} >
                    {!strengths? 'Error, cannot find strength values': strengths.map((strengths) => {
                        return <Dropdown.Item value={strengths} eventKey={strengths} key={strengths}> {strengths}</Dropdown.Item>
                    })}
                </DropdownButton>
            </Dropdown>

            <p>Expiry Date</p>
            <DatePicker selected={expiryDate} onChange={(date) => setExpiryDate(date)} dateFormat="dd/MM/yyyy"/>
            <Button variant="primary" type="submit" disabled={!selectedSkill} > Add Skill </Button>
            <Toaster toastOptions={{
                className: '',
                style: {
                border: '2px solid #713200',
                padding: '16px',
                color: '#713200',
                },
            }}/>

            {<Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Skill name</th>
                        <th>Skill Category</th>
                        <th>Strength</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {!skills? 'No Assigned Skills to display': skills.map((skill, index) => {
                        return <tr key={index}>
                            <td>{skill.skillName}</td>
                            <td>{skill.skillCategory}</td>
                            <td>{skill.skillStrength}</td>
                            <td>{skill.expiryData}</td>
                        </tr>
                    })}
                </tbody>
            </Table>}
            </Form>
        </div>
    )
}

export default StaffAddSkill;