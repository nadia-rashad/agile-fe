import React, {useEffect} from 'react';
import '../components/styles/styles.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as api from '../api';
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Home from './Home';


function Login({setToken, setUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onInputEmail = ({target:{value}}) => setEmail(value);
    const onInputPassword = ({target:{value}}) => setPassword(value);
    const [authenticated, setauthenticated] = useState(null);

    const notify = () => toast('Successful Login');

    useEffect(() => {
      const loggedInUserToken = localStorage.getItem("token");
      if (loggedInUserToken) {
        setauthenticated(loggedInUserToken);
      }
    }, []);
   
    const onFormSubmit = async (e) => {
        e.preventDefault()
  
        const credentials = {
          email: email,
          password: password
        }

      await api.checkUserCredentials(credentials).then((res) => {
        setToken(res.data.token);
        setUser(res.data.details);
        localStorage.setItem('token', JSON.stringify(res.data.token) )
        localStorage.setItem('user', JSON.stringify(res.data.details))

        notify();
      
        }
       ).catch(err => {
        toast("Unsuccessful login, please try again")
       })
      }

    return(
        <div className='container'>

          <h1 aria-label="page header">Skills Auditor</h1>

          {!authenticated ?  
<>
          <h2 aria-label='login header'>Login</h2>

          
     <Form onSubmit={onFormSubmit} aria-label="login form" id='login_form' >
      <Form.Group className="mb-3" controlId="formBasicEmail"  >
        <Form.Label>Email address</Form.Label>
        <Form.Control aria-label='Text feild to enter email' type="email"  onChange={onInputEmail} data-testid='username_input'/>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control aria-label='Text feild to enter password' type="password" data-testid='password_input' onChange={onInputPassword}/>
      </Form.Group>
     
      <Button aria-label='Button to login' variant="primary" type="submit" data-testid='submit' disabled={!email || !password}>
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
    </>
: <Home/>}
       </div>
    )
}

export default Login;