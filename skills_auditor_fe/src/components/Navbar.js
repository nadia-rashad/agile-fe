import './Navbar.css';
import { useState } from "react";

export default function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState({});

    const handleLogout = () => {
      setLoggedInUser({});
      setEmail("");
      setPassword("");
      localStorage.clear();
    };

    console.log(loggedInUser);


    return (
        <nav className="navigation">
        <a href="/" className="brand-name">
          Skills Auditor
        </a>
        <button className="hamburger" onClick={() => {
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
                {!isLoggedIn ?   <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul> : 
          <ul>
            <li>
              <a href="/staff/my_details">Staff My details</a>
            </li>
            <li>
              <a href="/staff/add_skill">Staff Add Skill</a>
            </li>
            <li>
              <a href="/staff/view_edit_skill">Staff view edit skill</a>
            </li>
            <li>
              <a href="/manager/view_edit_staff_skills">manager view edit staff skill</a>
            </li>
            <li>
              <a href="/manager/add_category">Manager add category</a>
            </li>
            <li>
              <a href="/manager/add_skill">Manager add skill</a>
            </li>
            <li>
                <a href='/manager/add_staff'>Manager add staff</a>
            </li>
            <li>
                <a href='/manager/view_edit_categories'>Manager view edit categories</a>
            </li>
            <li>
                <a href='/manager/view_edit_skills'>Manager view edit skills</a>
            </li>
            <li>
                <a href='/manager/view_edit_staff'>Manager view edit staff</a>
            </li>
            <li>
              <a href="/" onClick={handleLogout}>LogOut</a>
            </li>
          </ul>
        }
        </div>
      </nav>
      )
  }