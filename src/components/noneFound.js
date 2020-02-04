import React from 'react';


class NotFound extends React.Component{
    render(props) {
        
        return(<div role="alert" className="alert alert-info fade show">
            <span className="notFoundHeading">There were no matches for your search</span><br/>
            You can try:
            <ul>
                <li>Varying your search terms</li>
                <li>Using different limiters</li>
            </ul>


        </div>);
        
    }


}
export default NotFound;