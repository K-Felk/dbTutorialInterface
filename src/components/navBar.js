import React from 'react';
import {BrowserRouter as Router,
    Switch,
    Link
  } from "react-router-dom";

function NavBar(props) {
    return(
        <div className="navBar">
        <Router>
            <Link to='/' onClick={props.onStartOver}>Start Over</Link>
        </Router>
        </div>

    )

}

export default NavBar;




