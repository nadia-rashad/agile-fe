import '../styles/styles.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as api from '../../api.js';
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

function ViewEditSkills() {
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [category, setCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState({});

    const [selectedSkillName, setSelectedSkillName] = useState('');
    const [selectedSkill, setSelectedSkill] = useState({});
    

    const onInputDescription = ({target:{value}}) => {
        setDescription(value)
    };

    useEffect(()=> {
        async function fetchSkills() {
            await api.fetchAllSkills().then((res) => {
                setSkills(res.data);
            }).catch((err) => {
                toast(err.message)
            })
        }

        async function fetchCategories() {
            await api.fetchAllCategories().then((res) => {
                setCategories(res.data);
            }).catch((err) => {
                console.log(err)
            })
        }

        setDescription(selectedSkill.description)
        setCategoryId(selectedSkill.category_id)

        async function fetchCategoryDetails () { 
            await api.fetchCategoryById(selectedSkill.category_id).then((res) => {
            setCategory(res.data[0]);
         }).catch((err) => {
            console.log(err)
        })
        }

        fetchSkills();
        fetchCategories();
        fetchCategoryDetails();
    }, [categoryId, selectedSkill.id, selectedSkill.description, selectedSkill.category_id])

    const handleSelectedSkill= async (skillName)=>{
        setSelectedSkillName(skillName);
    }

    const handleSelectedCategory= async (categoryName)=>{
        const categoryDetails = categories.filter(cat => cat.description === categoryName)
        setCategory(categoryDetails[0]);
    }

    const handleOnClickSkill = (e) => {
        const skillId = Number(e.target.id)

         const skillDetails = skills.filter(skill => skill.id === skillId)
         setSelectedSkill(skillDetails[0]);
      }

    const handleOnClickCategory = (e) => {
        const categoryId = Number(e.target.id)

         const categoryDetails = categories.filter(cat => cat.id === categoryId)
         setCategory(categoryDetails);
      }

    const onFormSubmit = async (event) => {
        event.preventDefault()
  
        const updatedSkillDetails = {
            id: selectedSkill.id,
            description: description,
            category_id: category.id
        }

        try {
            await api.updateSkillDetails(updatedSkillDetails).then((res) => {
                if(Object.keys(res.data).length === 0) {
                    toast("Error updating skill")
                }
                else {
                    toast("Skill successfully updated")
                }
            })
        } catch(err) {
            toast("Unable to update: ", err.message)
        }
    
    }

    return (
    <div  className="container">
    <Form onSubmit={onFormSubmit}>

    <Form.Group className="mb-3">
        <Form.Label >Skills</Form.Label>
        <Dropdown>
            <DropdownButton title={!selectedSkillName ? "Select a skill to edit" : selectedSkillName} onSelect={handleSelectedSkill}>
            {!skills? 'No skills to display':  skills.map((skill) => {
                return <Dropdown.Item key={skill.id} id={skill.id} eventKey={`${skill.description}`} onClick={handleOnClickSkill}>
                {skill.description}
                </Dropdown.Item>
                }) 
            }
            </DropdownButton>
        </Dropdown>
    </Form.Group>
    <br></br>
    <Form.Group>
        <Form.Label >Skill Name</Form.Label>
        <Form.Control type="text" onChange={onInputDescription} value={description} />
    </Form.Group>
    
    <Form.Group> 
        <Form.Label >Skill Category</Form.Label>
        <Dropdown>
            <DropdownButton title={!category ? "Select a category" : category.description} onSelect={handleSelectedCategory}>

            {!categories? 'No categories to display':  categories.map((cat) => {
                    return <Dropdown.Item key={cat.id} id={cat.id} eventKey={cat.description} onClick={handleOnClickCategory}>
                    {cat.description} 
                    </Dropdown.Item>
                }) }
            </DropdownButton>
        </Dropdown> 
        <br></br>
    </Form.Group>

    <br></br> 
    <Button variant="primary" type="submit" disabled={!description}>
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
)}

export default ViewEditSkills;