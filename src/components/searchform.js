import React from 'react';
import logo from './gvsu_logo_sm.png';


class SearchForm extends React.Component{
    //this is an uncontrolled form, so we don't need a constructor.  the submit passes all the paramaters to the top-level routing function, which is 
    //exactly what we want.  This means state is preserved in the URL, so searches can be bookmarked, the back button will work, etc.
    //took me FOREVER to figure out how to do this, the react documentation on this is not terribly helpful.
    
      
    render(props) {
        //setting a defaultValue on an uncontrolled select element does not seem to work, so I am using conditional rendering to preserve the users
        //search parameters.
        

        return(
            
                <div className="col searchform">
                    <form onSubmit={this.props.onSubmit}>
                        <div className="formContainer">
                        <img className="searchImg" src={logo} alt="GVSU Logo" />
                       <fieldset className="searchForm">
                        <legend className="searchLegend">Grand Valley State University:  Search Library Resources</legend>
                        <select className="searchSelect" name="field" value={this.props.field} onChange={this.props.onChange}>
                            <option value="Keyword">Keyword</option>
                            <option value="Creator">Author</option>
                            <option value="Title">Title</option>
                        </select>
                                <input className="searchInput" type="text" value={this.props.query} onChange={this.props.onChange} name="query"/>
                        
                    <input name="submitSearch" className="btn btn-primary btn-sm" type="submit" value="Search" />

                    
                    </fieldset>
                     </div>
                    </form>


                </div>
            

        )
    }
}
export default SearchForm;
