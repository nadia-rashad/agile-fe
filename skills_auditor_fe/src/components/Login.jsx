import React from 'react';
import '../components/styles/styles.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as api from '../api';
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';



function Login({setToken}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onInputEmail = ({target:{value}}) => setEmail(value);
    const onInputPassword = ({target:{value}}) => setPassword(value);

    const notify = () => toast('Successful Login');
   
    const onFormSubmit = async (e) => {
        e.preventDefault()
  
        const credentials = {
          email: email,
          password: password
        }

      await api.checkUserCredentials(credentials).then((res) => {

        setToken(res.data);

        notify();
        
        }
       )
      }

      useEffect(() => {
        // const loggedInUser = localStorage.getItem("user");
        // if (loggedInUser) {
        //   const foundUser = JSON.parse(loggedInUser);
        //   setLoggedInUser(foundUser);
        // }
      }, []);

    return(
        <div className='container'>

          {/* {Object.keys(loggedInUser).length > 0 ? <p>hello {loggedInUser.firstName}</p> : */}
          
     <Form onSubmit={onFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={onInputEmail}/>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={onInputPassword} />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
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
{/* } */}
       </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }


export default Login;