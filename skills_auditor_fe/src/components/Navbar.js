import './Navbar.css';
import { useState, useEffect } from "react";

export default function Navbar(props) {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({});
    const MANAGER_SYSTEM_ROLE = 1; 

    const handleLogout = () => {
      localStorage.clear();
    };
   
    useEffect(()=> {
     setLoggedInUser(props.userDetails.details);
      
      }, [props.userDetails.details])

 

    return (
      <div>      
        <nav aria-label='Page Header' className="navigation" >
        <a aria-label='Link to homepage' href="/" className="brand-name">
          Skills Auditor
        </a>

              
        <button aria-label='Button to open navigation pane' className="hamburger" onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button> 

        <div
         className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>

          {loggedInUser?.system_role_id === MANAGER_SYSTEM_ROLE ?      
          
          <ul>
            <li>
              <a href="/manager/view_edit_staff_skills" aria-label='Link to view and edit skills assigned to employees'>Staff Skills</a>
            </li>
            <li>
              <a href="/manager/add_category" aria-label='Link to add a new category'>Add Category</a>
            </li>
            <li>
              <a href="/manager/add_skill" aria-label='Link to add a new skill'>Add Skill</a>
            </li>
            <li>
                <a href='/manager/add_staff' aria-label='Link to add a new employee'>Add Staff</a>
            </li>
            <li>
                <a href='/manager/view_edit_categories' aria-label='Link to view and edit skill categories'>Edit Categories</a>
            </li>
            <li>
                <a href='/manager/view_edit_skills' aria-label='Link to view and edit skill'>Edit Skills</a>
            </li>
            <li>
                <a href='/manager/view_edit_staff' aria-label='Link to view and edit staff details'>Edit Staff</a>
            </li>
            <li>
              <a aria-label='Click here to logout' onClick={handleLogout} href='/'>Log Out</a>
            </li>
        
          </ul>
          
          
          :     
          
          <ul>
            <li>
              <a href="/staff/my_details">My Details</a>
            </li>
            <li>
              <a href="/staff/skills">Assigned Skills</a>
            </li>
            <li>
              <a onClick={handleLogout} href='/'>Log out</a>
            </li>
          </ul>
          
          }

        </div>
      </nav>
      </div>
    
      )
  }