import './components/styles/styles.css';
import React from 'react';
import Home from './components/Home';
import StaffAddSkill from './components/staff/StaffAddSkill';
import StaffViewEditSkill from './components/staff/StaffViewEditSkill';
import StaffDetails from './components/staff/StaffDetails';
import ViewEditStaffSkills from './components/manager/ViewEditStaffSkills';
import ViewEditCategories from './components/manager/ViewEditCategories';
import AddCategories from './components/manager/AddCategory';
import AddSkill from './components/manager/AddSkill';
import AddStaff from './components/manager/AddStaff';
import ViewEditSkills from './components/manager/ViewEditSkills';
import ViewEditStaff from './components/manager/ViewEditStaff';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar'

function App() {

  return (
    <div>
    <Navbar />
    <div className="container">
    <Router>
       <Routes>
        <Route  exact path='/home' element={<Home/>}/>
            <Route exact path='/manager/view_edit_staff_skills' element={<ViewEditStaffSkills/>} />
            <Route exact path='/manager/add_category' element={<AddCategories/>} />
            <Route exact path='/manager/add_skill' element={<AddSkill/>} />
            <Route exact path='/manager/add_staff' element={<AddStaff/>} />
            <Route exact path='/manager/view_edit_categories' element={<ViewEditCategories/>} />
            <Route exact path='/manager/view_edit_skills' element={<ViewEditSkills/>} />
            <Route exact path='/manager/view_edit_staff' element={<ViewEditStaff/>} />


     <Route exact path="/" element={<Home/>} />
     <Route exact path='/staff/view_edit_skill' element={<StaffViewEditSkill/>} />
     <Route exact path='/staff/add_skill' element={<StaffAddSkill/>} />
     <Route exact path='/staff/my_details' element={<StaffDetails/>} />

         </Routes>
       </Router>
    </div>
  </div>
  );
}

export default App;
