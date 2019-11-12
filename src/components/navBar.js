import React from 'react';
import {BrowserRouter as Router, Link } from "react-router-dom";
  

  class NavBar extends React.Component {



    render(props) {
            
            return(
            <div className="navBar">
            <Router>
                <Link to="/search" onClick={this.props.handleClick}>Start Over</Link>
            </Router>
            </div>

        )
    }
    

}

export default NavBar;




