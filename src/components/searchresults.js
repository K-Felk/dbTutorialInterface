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
          location = {props.Location}
          subjects
          
          />
        
        )


      }

      render() {
        var numStatement;
       
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

        var alert = "";

        if (this.props.alertMsg !== "") {
          alert = <Alert role="alert" alertMsg={this.props.alertMsg}/>
        } 

        

        

          return(
            
              <div className="col-sm-9" role="main" aria-label="Search Results" aria-live="polite">
                <a name="results"></a>
                {alert}
                <div role="status" aria-live="polite">
                <p>{this.props.searchStatement}</p>
                <p>{numStatement}</p>
                </div>

                
                {results.length > 0 ? results.map(result => this.renderItem(result)) : ""}

                <div className="nextprev">

                {this.props.start > 0? <button className="prev" type="button" onClick={this.props.back} >Previous</button> : ""}
                {total > 10 && this.props.start +10 < total? <button type="button" className="next" onClick={this.props.advance} >Next</button> : ""}
                </div> 
             </div>
            
          );
      }
    

}

export default Searchresults;