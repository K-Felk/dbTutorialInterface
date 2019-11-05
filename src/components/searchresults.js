import React from 'react';
import Itemdisplay from './resultdisplay';

class Searchresults extends React.Component {
    

  

      renderItem(props) {
        
        return(
          <Itemdisplay
          title = {props.Title}
          creator = {props.Creator}
          description = {props.Description}
          format = {props.Format}
          publication = {props.Publication}
          callnumber = {props.CallNumber}
          standardnumber = {props.StandardNumber}
          key = {props.ID}
          />
        )


      }

      render() {
        let numStatement;
        const results = this.props.results;
        if (this.props.numfound === "") {
          numStatement = "";

        } else {
          numStatement = "found " + this.props.numfound + " results";
        }

          return(
            <div className="Row">
              <div className="Col">
                <p>{numStatement}</p>

                
                {results.length > 0 ? results.map(result => this.renderItem(result)) : ""}
                </div>
            </div>
          );
      }
    

}

export default Searchresults;