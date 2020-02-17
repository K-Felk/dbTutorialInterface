import React from 'react';
import {BrowserRouter as Router, Link } from "react-router-dom";

  

  class NavBar extends React.Component {



    render(props) {
            
            return(
            
            <Router>
                <Link to="/search" onClick={this.props.clear}>Start Over</Link>
                
            </Router>
            

        )
    }
    

}

export default NavBar;




