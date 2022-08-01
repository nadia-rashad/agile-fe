import './App.css';
import * as api from './api';
import React from 'react';
import Home from './components/Home';
import StaffAddSkill from './components/staff/StaffAddSkill';
import StaffViewEditSkill from './components/staff/StaffViewEditSkill';
import StaffDetails from './components/staff/StaffDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
        <Router>
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path='/staff/view_edit_skill' element={<StaffViewEditSkill/>} />
        <Route exact path='/staff/add_skill' element={<StaffAddSkill/>} />
        <Route exact path='/staff/my_details' element={<StaffDetails/>} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
