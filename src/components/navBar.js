import React from 'react';
import {BrowserRouter as Router, Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
  

  class NavBar extends React.Component {



    render(props) {
            
            return(
            <div className="navBar" role="navigation">
            <Router>
                <Link to="/search" onClick={this.props.clear}>Start Over</Link>
                <HashLink className="skipLink" to="#results">Skip to results</HashLink>
            </Router>
            </div>

        )
    }
    

}

export default NavBar;




