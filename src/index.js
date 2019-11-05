import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import axios from "axios";
import Searchresults from'./components/searchresults'
import SearchForm from "./components/searchform"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,
        Switch,
        Link
      } from "react-router-dom";
import { createBrowserHistory } from 'history';
import NavBar from './components/navBar'

const history = createBrowserHistory();


class App extends React.Component{

        constructor(props) {
                super(props);
                this.state = {
                        numfound: "",
                        results: [],
                        start: 0,
                        searchString: "",
                        field: ""

                };
                
        
            
                
        }

        onFormChange(name, value) {
                
                this.setState({[name] : value});
                

        }

        reset() {
                this.setState(
                        {numfound: "",
                        results: [],
                        start: 0,
                        searchString: "",
                        field: ""
                        }
                )
                
        }

        getResults () {

                var newSearchString = this.state.field + this.state.searchString;
                const searchString = "http://54.188.0.222:8983/solr/tutorial/select?q=" + newSearchString;
                console.log(searchString)
                axios.get(searchString)
                  .then(res => {
                    
                    this.setState({ numfound: String(res.data.response.numFound) });
                    this.setState({ results: res.data.response.docs });
                    
                  })

                

        }

        onComponentDis


        render (props) {
                
                return(
                        <div className="container-fluid">
                               <div className="Row">
                                        <div className="col">
                                                <NavBar onStartOver={this.reset.bind(this)}/>
                                        </div>
                                </div>
                                <SearchForm onSubmit={this.getResults.bind(this)} onChange={this.onFormChange.bind(this)} />
                                
                                <Searchresults numfound={this.state.numfound} results={this.state.results}/>
                        </div>
                )
        }
}

ReactDOM.render(
        <App />,
        document.getElementById('root')
      );
      