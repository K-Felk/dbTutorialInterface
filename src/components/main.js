import React from 'react';
import axios from "axios";
import Searchresults from "./searchresults"
import SearchForm from "./searchform"
import NavBar from './navBar'
import qs from 'query-string';

class Main extends React.Component{

        constructor(props) {
                super(props);
                this.state = {
                        numfound: "",
                        results: [],
                        start: 0,
                        query: "",
                        searchString: "",
                        field: "",
                        
                };
                
        
                this.clearState = this.clearState.bind(this);
                
        }


        
        clearState() {
                console.log("reset");
                this.setState({numfound: ""});
                this.setState({results: []});
                this.setState({searchString: ""});
                this.setState({field: ""});    
        }

        getResults () {
                
                

                const searchString = "http://54.188.0.222:8983/solr/tutorial/select?q=" + this.state.field + ":" + this.state.searchString;
                console.log(searchString)
                axios.get(searchString)
                  .then(res => {
                    
                    this.setState({ numfound: String(res.data.response.numFound) });
                    this.setState({ results: res.data.response.docs });
                    
                  })
                
                

        }
        //we have to access url params when the component mounts.  Tried this elsewhere in the class and it fails.  God knows why.
        componentDidMount() {
                
                
                
                //if the query is non-empty, get search results
                if (this.props.location.search !== "") {
                        console.log(this.props.location.search)
                        const parsed = qs.parse(this.props.location.search);
                        var field = "";
                        if (parsed.field === "Keyword") {
                                field = "";
                        } else {
                                field = parsed.field + ":"
                        }
                        
        
                        const searchString = "http://54.188.0.222:8983/solr/tutorial/select?q=" + field + parsed.query;
                        //for some reason, I'm finding setting state directly within componentDidMount does not work
                        //but it does when callbacks (like the one from the axios get call) are used.  React is so fucking strange.
                        axios.get(searchString)
                                .then(res => {
                    
                                this.setState({ numfound: String(res.data.response.numFound) });
                                this.setState({ results: res.data.response.docs });
                                this.setState({searchString: parsed.query})
                                this.setState({field: parsed.field})
                    
                        })


                        
                } else {
                        this.clearState();
                        

                }
        }
        


        render (props) {

                
                return(
                        <div className="container-fluid">
                               <div className="Row">
                                        <div className="col">
                                                <NavBar handleClick={this.clearState}/>
                                        </div>
                                </div>
                                <SearchForm field={this.state.field} searchString={this.state.searchString}/>
                                
                                <Searchresults numfound={this.state.numfound} results={this.state.results} searchString={this.state.searchString}/>
                        </div>
                )
        }
}

export default Main;