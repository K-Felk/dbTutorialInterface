import React from 'react';
import axios from "axios";
import Searchresults from "./searchresults"
import SearchForm from "./searchform"
import NavBar from './navBar'
import SideBar from './sidebar'
import qs from 'query-string';


class Main extends React.Component{

        constructor(props) {
                

                super(props);
        

                this.state = {
                        numfound: "",
                        results: [],
                        format: new Map(),
                        scholarly: new Map(),
                        start: 0,
                        query: "",
                        field: "Keyword",
                        startDate: "",
                        endDate: "",
                        alertmsg: "",
                        alertIsVisible: false
                        
                };
                
        
                this.clearState = this.clearState.bind(this);
                this.handleChange = this.handleChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
                this.advance = this.advance.bind(this);
                this.back = this.back.bind(this);
        }


        //clear state-this is neccessary to sync when the URL indicates the search has been cleared, and 
        //also when someone hits the "start over" link
        clearState() {
                console.log("reset");
                this.setState({start: 0});
                this.setState({numfound: ""});
                this.setState({results: []});
                this.setState({searchString: ""});
                this.setState({field: "Keyword"});
                this.setState({startDate: ""});
                this.setState({endDate: ""});
                this.setState({format: new Map()});
                this.setState({scholarly: new Map()});  
                this.setState({start: 0});  
                this.setState({query: ""});
        }
        //if we have more than ten results, page to the next ten
        advance(event) {
                //apparently, you can pass a callback function to setState if you want soemthing to happen 
                //*after* state is successfully set.  setstate is apparently asynchronous-the program won't
                //wait for it to be done to execute code after it.
                const adv = this.state.start + 10;
                this.setState({start: adv}, this.handleSubmit);
                
                
                      
        }

        back(event) {
                const adv = this.state.start - 10;
                this.setState({start: adv}, this.handleSubmit);
                
        }

        constructURL() {
                var queryString = "/?";
                queryString += "field=" + this.state.field + "&";
                queryString += "query=" + this.state.query + "&";
                
                
                //translate format options into a string
                
                for (let [k, v] of this.state.format) {

                        if (v === true) {
                                queryString += "format=" + k + "&";
                        }
                                
                }
        

                //translate scholarly options into a string
                
                for (let [k, v] of this.state.scholarly) {
                        
                        if (v === true) {
                                queryString += "scholarly=" + k + "&";
                        }
                        
                }


                if (this.state.startDate !== "") {
                        queryString += "startdate=" + this.state.startDate + "&";
                }

                if (this.state.endDate !== "") {
                        queryString += "enddate=" + this.state.endDate + "&";
                }

                
                queryString += "start=" + this.state.start;
                console.log(queryString);
                //push the new URL into the nav bar
                //clear any evsting alert messages

                return queryString;

        }
        

        handleSubmit(event) {
                //we trigger this in a few different places, so check to see if it was triggered by form submission
                //so we can stop the form's default behavior, which is to reload page
                if (event !== undefined) { 
                        event.preventDefault();
                }               
                //if there are both start and end dates, check to make sure enddate is not before startdate
                if (this.state.startDate !== "" && this.state.endDate !== "") {
                        if (parseInt(this.state.endDate, 10) < parseInt(this.state.startDate, 10)) {
                                
                                this.setState({alertmsg: "End date cannot be before start date"});
                                this.setState({alertIsVisible: true});

                                console.log("alert" + this.state.alertmsg);
                                return;
                        }
                }
                //if the data checks out, clear any alert messages and set the flag to reload the page
                

                
                var query = "/search" + this.constructURL();
                        
                       
                this.props.history.push(query); 


                window.location.reload(false);
                
                             

        }

        handleChange(event) {
                
                //if it's the scholarly checkbox, update that mapping
                if (event.target.name.includes("schb")) {
                        const item = event.target.name;
                        const isChecked = event.target.checked;
                        this.setState(prevState => ({ scholarly: prevState.scholarly.set(item, isChecked) }));

                        
                        //we can't have both the parameter "online only" and "online and in-library" checked at the same time
                        if (item === "schball" && isChecked === true) {
                                
                                this.setState(prevState => ({ scholarly: prevState.scholarly.set("schbonline", false) }));

                        }
                        if (item === "schbonline" && isChecked === true) {
                                this.setState(prevState => ({ scholarly: prevState.scholarly.set("schball", false) }));

                        }
                        
                        
                //if it's the format checkbox, update that
                } else if (event.target.name.includes("fmt")) {
                        const item = event.target.name;
                        const isChecked = event.target.checked;
                        this.setState(prevState => ({ format: prevState.format.set(item, isChecked) }));
                        //if "all" is selected, clear any other format markers
                        if (item === "fmtall" && isChecked === true) {
                                this.setState({format: new Map()});
                                this.setState(prevState => ({ format: prevState.format.set(item, isChecked) }));

                        }
                        //if anything else is selected, clear the "all" marker
                        if (item !== "fmtall" && isChecked === true) {
                                this.setState(prevState => ({ format: prevState.format.set("fmtall", false) }));
                        }

                //update any other state variables
                } else {
                        this.setState({ [event.target.name]: event.target.value });
                }

                

                
                

        }
        //get search results from the solr backend, set state variables with retrieved data
        getResults (query) {
                
                

                const searchString = "http://54.201.145.110:8983/solr/tutorial/select?q=" + query;
                
                axios.get(searchString)
                  .then(res => {
                    
                    this.setState({ numfound: String(res.data.response.numFound) });
                    this.setState({ results: res.data.response.docs });
                    
                  })
                
                

        }
        
        //we have to access url params when the component mounts.  Tried this elsewhere in the class and it fails.  God knows why.
        componentDidMount() {
                
                //if the query is non-empty, get search paramaters, use them to set current state
                //and build the query string for solr
                if (this.props.location.search !== "") {
                        
                        const parsed = qs.parse(this.props.location.search);

                        //set the current state from the URL.  This makes the url the definitive source of state, and also ensures that if someone 
                        //tries to link directly to a search, they can.  Also start building the query string for the solr search
                        var solrQuery = "";
                        if (parsed.field === "Keyword") {
                                solrQuery = "";
                        } else {
                                solrQuery = parsed.field + ":"
                        }

                        solrQuery = solrQuery + parsed.query;


                        this.setState({field: parsed.field});
                        this.setState({query: parsed.query});

                        if (parsed.startdate !== undefined) {
                                
                                this.setState({startDate: parsed.startdate});
                                


                        }

                        if (parsed.enddate !== undefined) {
                                this.setState({endDate: parsed.enddate});

                        }
                        //set the solr query string

                        if (parsed.startdate !== undefined && parsed.enddate !== undefined) {
                                solrQuery += " AND Date:[" + parsed.startdate + " TO " + parsed.enddate + "]";

                        } else if (parsed.startdate === undefined && parsed.enddate !== undefined) {
                                solrQuery += " AND Date:" + parsed.enddate;
                        } else if (parsed.startdate !== undefined && parsed.enddate === undefined) {
                                solrQuery += " AND Date:" + parsed.startdate;
                        }
                        

                        
                        
                        //get the checkbox arrays-if there are multiple values selected, they are included as arrays,
                        //if not, they are single values

                        

                        if (parsed.format !== undefined) {
                                
                                
                                if (parsed.format instanceof Array ) {
                                        solrQuery += " AND (";
                                        var last = parsed.format.length - 1;

                                        for (var i = 0; i < parsed.format.length; i++) {


                                                const name = parsed.format[i];
                                                this.setState(prevState => ({ format: prevState.format.set(name, true) }));
                                                
                                                switch (name) {
                                                        case "fmtbooks":
                                                                solrQuery += "Format:book";
                                                        break;
                                                        case "fmtebooks":
                                                                solrQuery += "Format:ebook";
                                                        break;
                                                        case "fmtmap":
                                                                solrQuery += "Format:map";
                                                        break;
                                                        case "fmtaudio":
                                                                solrQuery += "Format:audio music"; 
                                                        break;
                                                        case "fmtvideo":
                                                                solrQuery += "Format:dvd/video"; 
                                                        break;
                                                        default:

                                                        break;

                                                } 
                                                if (i !== last) {
                                                        solrQuery += " OR ";
                                                }
                                              }
                                              solrQuery += ")";

                                } else {
                                        const name = parsed.format;
                                        this.setState(prevState => ({ format: prevState.format.set(name, true) }));
                                        if (parsed.format !== "fmtall") {
                                                solrQuery += " AND ";
                                        }
                                        switch (name) {
                                                case "fmtbooks":
                                                        solrQuery += "Format:book";
                                                break;
                                                case "fmtebooks":
                                                        solrQuery += "Format:ebook";
                                                break;
                                                case "fmtmap":
                                                         solrQuery += "Format:map";
                                                break;
                                                case "fmtaudio":
                                                        solrQuery += "Format:audio music"; 
                                                break;
                                                case "fmtvideo":
                                                        solrQuery += "Format:dvd/video"; 
                                                break;
                                                default:

                                                break;

                                        } 
                                        
                                }

                                
                                
                                
                        }
                        
                
                        if (parsed.scholarly !== undefined) {
                                
                                if (parsed.scholarly instanceof Array ) {
                                        
                                        for (var b = 0; b < parsed.scholarly.length; b++) {
                                                
                                                const name = parsed.scholarly[b];
                                               
                                                this.setState(prevState => ({ scholarly: prevState.scholarly.set(name, true) }));
                                                
                                                switch (name) {
                                                        case "schbonline":
                                                                solrQuery += " AND (Format:ebook OR Format:streaming)";
                                                        break;
                                                        case "schbscholarly":
                                                                solrQuery += " AND Scholarly:t";
                                                        break;
                                                        default:

                                                        break;
                                                } 
                                               
                                        }
                                        
                                        

                                } else {
                                        const name = parsed.scholarly;
                                        this.setState(prevState => ({ scholarly: prevState.scholarly.set(name, true) }));
                                        switch (name) {
                                                case "schbonline":
                                                        solrQuery += " AND (Format:ebook OR Format:streaming)";
                                                break;
                                                case "schbscholarly":
                                                        solrQuery += " AND Scholarly:t";
                                                break;
                                                default:

                                                break;
                                        } 
                                }

                        }

                        
                        //if we are paging, include that data in the query
                        if (parsed.start !== undefined) {
                                solrQuery += "&start=" + parsed.start;
                                this.setState({start: parseInt(parsed.start)});

                        } else {
                                solrQuery += "&start=0";
                                this.setState({start: 0});   
                        }
                        console.log(solrQuery);

                        //now pass the query to the function that will get the search results
                        
                
                        
                        this.getResults(solrQuery);

                        
                } else {
                        //if the query string is empty, then reset state
                        this.clearState();
                        

                }
        }
        


        render (props) {
                

                
                return(
                        <div className="container">
                               <div className="row">
                                        <div className="col">
                                                <NavBar handleClick={this.clearState}/>
                                        </div>
                                        
                                </div>

                                <div className="row">
                                        
                                <SearchForm field={this.state.field} query={this.state.query} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
                                </div>

                                <div className="row">
                                        <SideBar 
                                                
                                                scholarly={this.state.scholarly} 
                                                format={this.state.format} 
                                                startDate={this.state.startDate} 
                                                endDate={this.state.endDate}
                                                onChange={this.handleChange}
                                        />
                                <Searchresults 
                                                start={this.state.start}
                                                back ={this.back}
                                                advance={this.advance}
                                                alertMsg={this.state.alertmsg}
                                                isVisible={this.state.alertIsVisible}
                                                numfound={this.state.numfound} 
                                                results={this.state.results} 
                                                searchString={this.state.query}/>
                                </div>
                        </div>
                )
        }
}

export default Main;