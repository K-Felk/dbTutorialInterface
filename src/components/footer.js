import React from 'react';
import {Link} from "react-router-dom";


class Footer extends React.Component{
    render(props) {
        return(
            <div className="col footer" role="region">
                Powered by <Link to="http://gvsu.edu/library">GVSU Libraries</Link>



            </div>



        );

    }
}
export default Footer;