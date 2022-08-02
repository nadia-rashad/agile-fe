import React from 'react';
import { Link } from "react-router-dom";

function Home() {

    return(
        <div>
        <h1>Homepage</h1>
        <ul>
        <li>
          <Link to="/staff/my_details">Staff my details page</Link>
        </li>
        </ul>

        </div>
    )

}

export default Home;