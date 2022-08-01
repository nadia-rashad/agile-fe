import './App.css';
import * as api from './api';
import React from 'react';
import { Router } from '@gatsbyjs/reach-router';
import Home from './components/Home';
import StaffAddSkill from './components/staff/StaffAddSkill';
import StaffViewEditSkill from './components/staff/StaffViewEditSkill';
import StaffDetails from './components/staff/StaffDetails';

function App() {

  return (
    <div className="App">
        <Router>
         <Home path="/" />
         <StaffAddSkill path='/staff/add_skill'/>
         <StaffViewEditSkill path='/staff/view_edit_skill'/>
         <StaffDetails path='/staff/my_details'/>
        </Router>
    </div>
  );
}

export default App;
