import React from 'react';
import NavBar from "./navBar";
import SearchForm from "./searchform";
import ItemSideBar from "./itemsidebar";
import ShowItem from "./showItem";
import axios from "axios";
import Footer from "./footer";





class ItemDisplay extends React.Component{

    constructor(props) {
        super(props);


        this.state = {
                
                query: "",
                field: "Keyword",
                alertmsg: "",
                alertIsVisible: false,
                scholarly: false,
                id: "",
                date: "",
                creator: "",
                description: "",
                title: "",
                format: "",
                publication: "",
                callnumber: "",
                standardnumber:"",
                subject: [],      
        }
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.startOver = this.startOver.bind(this);
        this.back =this.back.bind(this);

    }

    startOver() {
        this.props.history.push("/search"); 
        window.location.reload(false);
    }

    submit(event) {

        var queryString = "/search/?";
        queryString += "field=" + this.state.field + "&";
        queryString += "query=" + this.state.query;
        this.props.history.push(queryString); 
        window.location.reload(false);

    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    back(event) {
        event.preventDefault();
        this.props.history.goBack();
    }


    componentDidMount () {
        const id  = this.props.match.params.id

        const URL = "http://54.201.145.110:8983/solr/tutorial/select?q=ID:" + id;

        axios.get(URL)
                  .then(res => {
                      
                    const item = res.data.response.docs[0];
                    //for reasons I can't fathom, I have to put the subject parsing code here, or it simply fails silently.

                    //remove extra quotes, which will screw up our search
                    var tempString = item.Subject.replace(/"/g,"");
                    
                    //we can have one subject or many, determine which and split into an array if many
                    if (tempString.includes(";")) {
                        
                        var temp = tempString.split(";");
                        this.setState({subject: temp});
                    } else {
                        
                        this.setState({subject: [tempString]});

                    }

                    
                    this.setState({ id: String(item.ID) });
                    this.setState({ scholarly:  item.Scholarly});
                    this.setState({ date: item.Date});
                    this.setState({ creator: item.Creator});
                    this.setState({description: item.Description});
                    this.setState({title: item.Title});
                    this.setState({format: item.Format});
                    this.setState({publication: item.Publication});
                    if (item.Callnumber !== undefined) {this.setState({callnumber: item.Callnumber});
                    this.setState({standardnumber: item.StandardNumber});

                }
                           
                  })

    }
    render(){

        return(
            <div className="container">
                <div className="row">
                    <div className="col">

                        <NavBar handleClick={this.startOver}/>

                    </div>
                                        
                </div>
                <div className="row">
                                        
                    <SearchForm field={this.state.field} query={this.state.query} onChange={this.onChange} onSubmit={this.submit}/>
                </div>
                <div className="row">
                    <ItemSideBar />


                
                    <ShowItem 
                    back={this.back}
                    id={this.state.id}
                    publication={this.state.publication}
                    date={this.state.date}
                    callnumber={this.state.callnumber}
                    creator={this.state.creator}
                    description={this.state.description}
                    title={this.state.title}
                    format={this.state.format}
                    standardnumber={this.state.standardnumber}
                    subjects = {this.state.subject}
                    />

                

                </div>
                <div className="row">
                    <Footer/>
                </div>

            </div>


        )
    }


}

export default ItemDisplay;