import React from 'react';
import axios from "axios";
import Searchresults from "./searchresults"
import SearchForm from "./searchform"
import NavBar from './navBar'
import SideBar from './sidebar'
import qs from 'query-string';
import Footer from "./footer.js"


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
                        alertIsVisible: false,
                        subject: "",
                        discipline: "",
                        
                };
                
        
                this.clearState = this.clearState.bind(this);
                this.handleChange = this.handleChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
                this.advance = this.advance.bind(this);
                this.back = this.back.bind(this);
                this.subjectSearch = this.subjectSearch.bind(this);
                this.disciplineSearch = this.disciplineSearch.bind(this);
        }


        //user triggered a subject Search by clicking a subject link
        subjectSearch(event) {
                
                this.clearState();
                this.setState({query: "*"});
                this.setState({subject: event.target.value}, this.push);

        }
        //user triggered a discipline search
        disciplineSearch(event) {
                
                this.clearState();
                this.setState({query: "*"});
                this.setState({discipline: event.target.value}, this.push);

        }
        //clear state-this is neccessary to sync when the URL indicates the search has been cleared, and 
        //also when someone hits the "start over" link
        clearState() {
                
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
                this.setState({subject: ""});
                this.setState({discipline: ""})
                
        }
        //if we have more than ten results, page to the next ten
        advance(event) {
                //apparently, you can pass a callback function to setState if you want soemthing to happen 
                //*after* state is successfully set.  setstate is apparently asynchronous-the program won't
                //wait for it to be done to execute code after it.
                const adv = this.state.start + 10;
                this.setState({start: adv}, this.handleSubmit);
                
                
                      
        }
        //go backwards to the previous ten results
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
                
                
                
                if (this.state.subject !== "") {
                        queryString += "subject=" + this.state.subject + "&";

                }

                if (this.state.discipline !== "") {
                        queryString += "discipline=" + this.state.discipline + "&";

                }

                
                queryString += "start=" + this.state.start;
                console.log(queryString);
                return queryString;

        }
        //construct a URL form current state, push to history, then
        //force a page reload so that the app will read the new URL,
        //update state, and execute the back-end solr query
        //see componentdidmount.
        //had to put this part in it's own function, 
        //so I can sequence page reloads after 
        //certain setState statements as a callback function.
        push() {
                var query = "/search" + this.constructURL();
                        
                     
                this.props.history.push(query); 


                window.location.reload(false);
                
        }

        //handle form submissions and forawrd/backward link clicks
        handleSubmit(event) {
                //if this functon is triggered by form submission, we need to prevent the default form behavior, which is to
                //reload the page
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
                

                // If the submit button is triggering this 
                //we also need to reset the position marker, so we start the result display at item one.
                if (event !== undefined) { 
                        this.setState({subject: ""});
                        this.setState({start: 0}, this.push);
                }   else {
                        this.push();
                }          

        }


        //updates global state from the search form options.  Note that the url, not the global state, is the final determiner 
        //of state.  This is purposeful, so that we preserve back button functionality and the ability to bookmark searches.
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
        //get search results from the solr backend, set state variables for results to force a re-render and show results
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
                        
                        //parse the query string from the URL so we can access values
                        const parsed = qs.parse(this.props.location.search);

                        //set the current state from the URL.  This makes the url the definitive source of state, and ensures that if someone 
                        //tries to link directly to a search, they can.  Also start building the query string for the solr search
                        var solrQuery = "";
                        if (parsed.field === "Keyword") {
                                solrQuery = "Text:";
                        } else {
                                solrQuery = parsed.field + ":"
                        }

                        solrQuery = solrQuery + parsed.query;

                        this.setState({field: parsed.field});
                        this.setState({query: parsed.query});


                        if (parsed.subject !== undefined) {
                                this.setState({subject: parsed.subject});
                                solrQuery += " AND Subject:\"" + parsed.subject + "\"";

                        }

                        if (parsed.discipline !== undefined) {
                                this.setState({discipline: parsed.discipline});
                                solrQuery += " AND Discipline:\"" + parsed.discipline + "\"";

                        }

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
                                                                solrQuery += "Format:Book";
                                                        break;
                                                        case "fmtebooks":
                                                                solrQuery += "Format:eBook";
                                                        break;
                                                        case "fmtarticle":
                                                                solrQuery += "Format:Article";
                                                        break;
                                                        case "fmtvideo":
                                                                solrQuery += "Format:Streaming Video"; 
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
                                                        solrQuery += "Format:Book";
                                                break;
                                                case "fmtebooks":
                                                        solrQuery += "Format:eBook";
                                                break;
                                                case "fmtarticle":
                                                         solrQuery += "Format:Article";
                                                break;
                                                case "fmtvideo":
                                                        solrQuery += "Format:Video"; 
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
                                                                solrQuery += " AND (Format:eBook OR Format:Streaming)";
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
                                                        solrQuery += " AND (Format:eBook OR Format:Streaming)";
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
                        //if the query string is empty, then reset state to be clear
                        this.clearState();
                        

                }
        }
        


        render (props) {
                
                var searchStatement = "";

                if (this.state.results.length > 0 ) {

                        searchStatement += "Searched for " + this.state.query + " in " + this.state.field;

                        if (this.state.subject !== "") {
                                searchStatement += " and " + this.state.subject + " in subject";
                        }
                        if (this.state.discipline !== "") {
                                searchStatement += " and " + this.state.discipline + " in discipline";
                        }
                }
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
                                                results={this.state.results}
                                                scholarly={this.state.scholarly} 
                                                format={this.state.format} 
                                                startDate={this.state.startDate} 
                                                endDate={this.state.endDate}
                                                onChange={this.handleChange}
                                                subjectSearch={this.subjectSearch}
                                                disciplineSearch={this.disciplineSearch} 
                                        />
                                <Searchresults 
                                                start={this.state.start}
                                                back ={this.back}
                                                advance={this.advance}
                                                alertMsg={this.state.alertmsg}
                                                isVisible={this.state.alertIsVisible}
                                                numfound={this.state.numfound}
                                                searchStatement={searchStatement}
                                                results={this.state.results} 
                                                searchString={this.state.query}/>
                                </div>
                                <div className="row">
                                     <Footer/>   
                                </div>
                        </div>
                )
        }
}

export default Main;