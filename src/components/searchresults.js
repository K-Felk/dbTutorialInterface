import React from 'react';
import Itemdisplay from './resultdisplay';
import Alert from './alert'

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
          id = {props.ID}
          
          />
        
        )


      }

      render() {
        var numStatement;
        var searchStatement;
        const results = this.props.results;
        
        const bound = this.props.start + results.length;
        const start = this.props.start + 1;
        

        var total = 0; 

        if (this.props.numfound === "") {
          
          numStatement = "";

        } else {
          
          numStatement = "Showing " + start + " to " + bound + " of " + this.props.numfound + " results";
          total = parseInt(this.props.numfound, 10);
        }

        

        if (this.props.searchString === "") {
          searchStatement = "";
        } else {
          searchStatement = "Searched for: " + this.props.searchString;
        }

          return(
            
              <div className="col-sm-9">
                <Alert isVisible={this.props.isVisible} alertMsg={this.props.alertMsg}/>
                <p>{searchStatement}</p>
                <p>{numStatement}</p>

                
                {results.length > 0 ? results.map(result => this.renderItem(result)) : ""}

                {this.props.start > 0? <button className="prev" type="button" onClick={this.props.back} >Previous</button> : ""}
                {total > 10 && this.props.start +10 < total? <button type="button" className="next" onClick={this.props.advance} >Next</button> : ""}
              </div>
            
          );
      }
    

}

export default Searchresults;