import '../styles/styles.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import * as api from '../../api.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import toast, { Toaster } from 'react-hot-toast';


function AddSkill(){

    const [skillName, setSkillName] = useState('');
    const [categories, setCategories] = useState([])
    const onInputSkillName = ({target:{value}}) => {
        setSkillName(value)};
    const [selectedCategory, setCategory] = useState('');
    const [selectedCategoryId, setCategoryId] = useState(0);

    useEffect(()=> {
        async function fetchCategories() {
            await api.fetchAllCategories().then((res) => {
                setCategories(res.data);
            })
        }
        fetchCategories();
    }, [])


    const handleSelect= async (e)=>{
        setCategory(e);

        await api.fetchCategoryId(e).then((res) => {
            setCategoryId(res.data[0].id);
        })
       
      }


    const onFormSubmit = async (e) => {
        e.preventDefault()

        const newSkillToSubmit = {
            description: skillName ,
            category_id: selectedCategoryId
        }

        await api.addNewSkill(newSkillToSubmit).then((res) => {
            if(res.status === 201 ){
                toast("Skill added successfully");
                setSkillName('');
                setCategory('')
            }
            else {
                toast(res.data.message);
            }
        })
    }
      
    
    return (
        <div  className="container">
            <Form onSubmit={onFormSubmit}>
             <Form.Label >Skill Name</Form.Label>
             <Form.Control type="text" onChange={onInputSkillName} value={skillName} />

           <br></br>
             <Dropdown>
             <DropdownButton title={selectedCategory ? selectedCategory : "Categories"} onSelect={handleSelect} >

             {!categories? 'No Categories to display':  categories.map((categories) => {
                     return <Dropdown.Item value={categories.description} eventKey={categories.description} key={categories.id}  >{categories.description}</Dropdown.Item>
                    }) }
             </DropdownButton>
             </Dropdown> 
             <br></br>

             <Button variant="primary" type="submit" disabled={!skillName && !selectedCategory} >
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

export default AddSkill;