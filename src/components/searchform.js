import React from 'react';
import logo from './gvsu_logo_sm.png';


class SearchForm extends React.Component{
    //this is an uncontrolled form, so we don't need a constructor.  the submit passes all the paramaters to the top-level routing function, which is 
    //exactly what we want.  This means state is preserved in the URL, so searches can be bookmarked, the back button will work, etc.
    //took me FOREVER to figure out how to do this, the react documentation on this is not terribly helpful.
    
      
    render(props) {
        //setting a defaultValue on an uncontrolled select element does not seem to work, so I am using conditional rendering to preserve the users
        //search parameters.
        var options = "";
        const  val= this.props.field;
        switch (val) {
            case "Creator":
                options = <select className="searchSelect" name="field"><option value="Keyword">Keyword</option><option value="Creator" selected>Author</option><option value="Title">Title</option></select>
                break;
            case "Title":
                options = <select className="searchSelect" name="field"><option value="Keyword">Keyword</option><option value="Creator">Author</option><option selected value="Title">Title</option></select>
                break;
            default:
                options = <select className="searchSelect" name="field"><option value="Keyword" selected>Keyword</option><option value="Creator">Author</option><option value="Title">Title</option></select>
        }      
    

        return(
            <div className="Row">
                <div className="col searchform">
                    <form>
                        <div className="formContainer">
                        <img className="searchImg" src={logo} alt="GVSU Logo" />
                       <fieldset className="searchForm">
                        <legend className="searchLegend">Grand Valley State University:  Search Library Resources</legend>
                            {options} 
                                <input className="searchInput" type="text" defaultValue={this.props.searchString} name="query"/>
                        
                    <input name="submitSearch" className="btn btn-primary btn-sm" type="submit" value="Search" />

                    
                    </fieldset>
                     </div>
                    </form>


                </div>
            </div>

        )
    }
}

export default SearchForm;