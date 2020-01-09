import React from "react";
import Alert from "./alert"
import { Link } from "react-router-dom";


class ShowItem extends React.Component{

    componentDidMount() {
        document.title = "Grand Valley State University Libraries: Tutorial Search";
    }

    

    render() {
        
        
        var subjectList = "";
        if (this.props.subjects.length > 0) {
            subjectList = this.props.subjects.map((subject, index) => 
        <li key={index}><Link to={"/search?field=Keyword&query=*&start=0&subject=" + subject  }>{subject}</Link></li>
        
            
            
            );
            
        }   

        

       
        
        
        return(
            <div className="col-sm-9" role="main" aria-label="Detailed Record">
                <Alert isVisible={this.props.isVisible} alertMsg={this.props.alertMsg}/>
                <Link to="" className="backLink" onClick={this.props.back} > back to Result List</Link>
                
                <h1 className="itemTitle">{this.props.title}</h1>

                <dl>
                    <dt>Author</dt>
                    <dd>{this.props.creator}</dd>
                    <dt>Publication Info.</dt>
                    <dd>{this.props.publication}}</dd>
                    <dt>Publication Date</dt>
                    <dd>{this.props.date}</dd>
                    <dt>Description</dt>
                    <dd>{this.props.description}</dd>
                    <dt>Publication Type</dt>
                    <dd>{this.props.format}</dd>
                    <dt>Subjects</dt><dd><ul>{subjectList}</ul></dd>
                </dl>



                </div>


        );
    }



}

export default  ShowItem;