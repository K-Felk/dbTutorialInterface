import React from 'react';


function Itemdisplay(props) {
        console.log(props)
        return(
           <div className="card">
                <div className="card-body">
            <div className="card-title">{props.title}/ {props.creator}</div>
            <p className="card-text">{props.description}</p>
            </div>
            </div>

            
  
        )
    
  }

  export default Itemdisplay;