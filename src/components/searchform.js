import React from 'react';
import logo from './gvsu_logo_sm.png';


class SearchForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.props.onChange(event.target.name, event.target.value)
        
      }
    
      handleSubmit(event) {
        this.props.onSubmit()
        event.preventDefault();
      }
    render(props) {
        return(
            <div className="Row">
                <div className="col searchform">
                    <form onSubmit={this.handleSubmit}>
                        <div className="formContainer">
                        <img className="searchImg" src={logo} alt="GVSU Logo" />
                       <fieldset className="searchForm">
                        <legend className="searchLegend">Grand Valley State University:  Search Library Resources</legend>
                            <select className="searchSelect" name="field"  value={this.state.field} onChange={this.handleChange}>
                                <option value="">Keyword</option>
                                <option value="Creator:">Author</option>
                                
                                <option value="Title:">Title</option>
                                </select> 
                                <input className="searchInput" type="text" value={this.state.searchTerms} name="searchString" onChange={this.handleChange} />
                        
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