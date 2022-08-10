import '../styles/styles.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as api from '../../api.js';
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

function AddCategory(){

    const [description, setDescription] = useState('');
    const onInputDescription = ({target:{value}}) => {
        setDescription(value)
    };
    
    const onFormSubmit = async (e) => {
        e.preventDefault()
  
        const categoryDetails = {
          description: description
        }

       await api.addCategory(categoryDetails).then((res) => {
        if(res.status === 201){
            toast("Category added")
            setDescription('')
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
                <Form.Label >Category Name</Form.Label>
                <Form.Control type="text" onChange={onInputDescription} value={description} />
            </Form.Group>

            <br></br>
            <Button variant="primary" type="submit" disabled={!description}>
                Add Category
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

export default AddCategory;