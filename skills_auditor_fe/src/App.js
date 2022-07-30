import logo from './logo.svg';
import './App.css';
import * as api from './api';
import React, { useEffect, useState } from 'react'

function App() {

  const [staff, getStaff] = useState([])

useEffect(() => {
 api.fetchStaff().then(res => {
  getStaff(res.data);
 }).catch((err) => {
 })
}, [])


  return (
    <div className="App">
      <header className="App-header">

        <p>Firstname of staff member in array is: {staff[0].firstName}</p>

      </header>
    </div>
  );
}

export default App;
