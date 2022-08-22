import './components/styles/styles.css';
import React, {useState, useEffect} from 'react';
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
import Navbar from './components/Navbar';
import Login from './components/Login';
import useToken from './components/useToken';
import * as api from './api';



function App() {

  const { token, setToken } = useToken();
  const { user, setUser } = useToken();
  const [userDetails, setUserDetails] = useState({details: {}});

  useEffect(()=> {
    getStaffDetails(user);
  }, [user])
 
    if(!token && !user) {
      return <Login setToken={setToken} setUser={setUser} />
    } 

    async function getStaffDetails (staffId) {
      await api.fetchCurrentStaff(staffId).then((res)=> {
          setUserDetails({details: res.data[0]});
      })
    }

    
      return (
        <div>

        <Navbar />
      <div className="container">
      <Router>
         <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/manager/view_edit_staff_skills' element={<ViewEditStaffSkills/>} />
          <Route exact path='/manager/add_category' element={<AddCategories/>} />
          <Route exact path='/manager/add_skill' element={<AddSkill/>} />
          <Route exact path='/manager/add_staff' element={<AddStaff/>} />
          <Route exact path='/manager/view_edit_categories' element={<ViewEditCategories/>} />
          <Route exact path='/manager/view_edit_skills' element={<ViewEditSkills/>} />
          <Route exact path='/manager/view_edit_staff' element={<ViewEditStaff/>} />
          <Route exact path='/staff/view_edit_skill' element={<StaffViewEditSkill/>} />
          <Route exact path='/staff/add_skill' element={<StaffAddSkill/>} />
          <Route exact path='/staff/my_details' element={<StaffDetails userDetails={userDetails}/>} />
        </Routes>
      </Router>
      </div>
    </div>
    );
   } 


export default App;
