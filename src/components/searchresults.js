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
        var numStatement;
        var searchStatement;
        const results = this.props.results;
        if (this.props.numfound === "") {
          
          numStatement = "";

        } else {
          
          numStatement = "found " + this.props.numfound + " results";
        }

        if (this.props.searchString === "") {
          searchStatement = "";
        } else {
          searchStatement = "Searched for: " + this.props.searchString;
        }

          return(
            <div className="Row">
              <div className="Col">
                <p>{searchStatement}</p>
                <p>{numStatement}</p>

                
                {results.length > 0 ? results.map(result => this.renderItem(result)) : ""}
                </div>
            </div>
          );
      }
    

}

export default Searchresults;