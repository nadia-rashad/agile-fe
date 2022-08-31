import '../styles/styles.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as api from '../../api.js';
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

function ViewEditCategories() {
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    const [selectedCategory, setSelectedCategory] = useState({id: '', description: ''});

    const onInputDescription = ({target:{value}}) => {
        setDescription(value)
    };

    useEffect(()=> {
        async function fetchCategories() {
            await api.fetchAllCategories().then((res) => {
                setCategories(res.data);
            })
        }

        setDescription(selectedCategory.description)

        fetchCategories();
        
    }, [selectedCategory.description])

    const handleSelectedCategory= async (categoryName)=>{
        setSelectedCategoryName(categoryName);
    }

    const handleOnClickCategory = (e) => {
        const categoryId = Number(e.target.id)

            const categoryDetails = categories.filter(cat => cat.id === categoryId)
            setSelectedCategory(categoryDetails[0]);
    }

    const onFormSubmit = async (event) => {
        event.preventDefault()
  
        const updatedCategoryDetails = {
            id: selectedCategory.id,
            description: description
        }

        await api.updateCategoryDetails(updatedCategoryDetails).then((res) => {
            if(res.status === 200){
                toast("Category sucessfully edited")
                setTimeout( window.location.reload(false), 10000);
            }
            else {
                toast(res.data.message)
            }
        })
    }

    return (
        <div  className="container">
            <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3">
                <Form.Label >Categories</Form.Label>
                <br></br>
                    <Dropdown>
                    <DropdownButton title={!selectedCategoryName ? "Select a category to edit" : selectedCategoryName} onSelect={handleSelectedCategory} >

                    {!categories? 'No categories to display':  categories.map((cat) => {
                        return <Dropdown.Item key={cat.id} id={cat.id} eventKey={`${cat.description}`} onClick={handleOnClickCategory}>
                            {cat.description}
                            </Dropdown.Item>
                        }) 
                    }
                    </DropdownButton>
                    </Dropdown> 
                <br></br>

                <Form.Label >Category Name</Form.Label>
                <Form.Control type="text" onChange={onInputDescription} value={description} />
            </Form.Group>

            <br></br>
            <Button variant="primary" type="submit" disabled={!description} >
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

export default ViewEditCategories;