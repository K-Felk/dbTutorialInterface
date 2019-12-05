import React from "react";
import Alert from "./alert"
import { Link } from "react-router-dom";


class ShowItem extends React.Component{

    render() {
        return(
            <div className="col-sm-9" role="main" aria-label="Detailed Record">
                <Alert isVisible={this.props.isVisible} alertMsg={this.props.alertMsg}/>
                <Link to="" className="backLink" onClick={this.props.back} > back to Result List</Link>
                
                <h1 className="itemTitle">{this.props.title}</h1>

                <dl>
                    <dt>Author/Creator</dt>
                    <dd>{this.props.creator}</dd>
                    <dt>Publication Information</dt>
                    <dd>{this.props.publication}}</dd>
                    <dt>Publication Date</dt>
                    <dd>{this.props.date}</dd>
                    <dt>Description</dt>
                    <dd>{this.props.description}</dd>
                    <dt>Publication Type</dt>
                    <dd>{this.props.format}</dd>
                </dl>



                </div>


        );
    }



}

export default  ShowItem;