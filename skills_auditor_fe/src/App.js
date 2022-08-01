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
         <StaffAddSkill path='/add_skill'/>
         <StaffViewEditSkill path='/view_edit_skill'/>
         <StaffDetails path='/my_details'/>
        </Router>
    </div>
  );
}

export default App;
