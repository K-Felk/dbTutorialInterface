import React from 'react';


class SearchForm extends React.Component{
    
      
    render(props) {
        
        

        return(
            
                <div className="col searchform" role="search" aria-label="Primary">
                    <form onSubmit={this.props.onSubmit}>
                        <div className="formContainer">
                        
                       <fieldset className="searchForm">
                        <legend className="searchLegend">Grand Valley State University:  Search Library Resources</legend>
                        <select className="searchSelect" name="field" value={this.props.field} onChange={this.props.onChange}>
                            <option value="Keyword">Keyword</option>
                            <option value="Creator">Author</option>
                            <option value="Title">Title</option>
                        </select>
                            <label for="searchBox" className="hidden">Input search terms</label>
                                <input className="searchInput" type="text" role="searchbox" value={this.props.query} onChange={this.props.onChange} name="query"/>
                        
                    <input name="submitSearch" className="btn btn-primary btn-sm searchButton" type="submit" value="Search" />

                    
                    </fieldset>
                     </div>
                    </form>


                </div>
            

        )
    }
}
export default SearchForm;
