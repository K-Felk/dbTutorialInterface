import React from 'react';
import { Link } from "react-router-dom";


function Itemdisplay(props) {
        //console.log(props)

        var description = "";
        const link = "/tutorial/item/" + props.id;

        var details = "";

        if (props.creator !== undefined) {
            details = "By: " + props.creator;
        } else {
            details = props.publication;
        }

        if (props.description !== undefined) {
            if (props.description instanceof Array) {
                for (var b = 0; b < props.description.length; b++){
                    description += props.description[b];
                }
    
            } else {
                description = props.description;
            }
            //if the description is more than 255 characters, truncate it so that the search results are uniform
            if (description.length > 255) {
                description = description.substr(0, 255) + "...";

            }

            
        }
        

        

        var icon = "";

        // eslint-disable-next-line default-case
        switch (props.format) {
            case "Book":
                icon = <span className="pubtype-icon pt-book" title="book"> </span>;
            break;
            case "eBook":
                icon = <span className="pubtype-icon pt-ebook" title="ebook"> </span>;
            break;
            case "Streaming Video":
                    icon = <span className="pubtype-icon pt-videoRecording" title="Video Recording"> </span>
            break;
            case "Journal Article":
                    icon = <span className="pubtype-icon pt-academicJournal" title="Article"> </span>;
            break;
            case "Newspaper Article":
                icon = <span className="pubtype-icon pt-newsPaper" title=" Newspaper Article"> </span>;
            break;
            case "Magazine Article":
                icon = <span className="pubtype-icon pt-magazine" title="Magazine Article"> </span>;
            break;
        }

        var resourceLink = "";

        if (props.format === "eBook"|| props.format === "Streaming Video") {
            resourceLink = <p><Link className="onlineLink" to="/placeholder">Online Access</Link></p>
        }  else if (props.format === "Book") {
        resourceLink = <Link aria-label={props.title} className="available" to="/available">Available {props.callnumber} {props.location}</Link>
        }


        return(
           <div className="card">
                <div className="card-body">
            <div className="card-title"><a href={link}>{props.title}/ {props.creator}</a></div>
        <div className="record-icon">{icon}<p className="caption">{props.format}</p></div>
        <div className="details">{details}</div>
            <p className="card-text">{description}</p>
        {resourceLink}
            </div>
            </div>

            
  
        )
    
  }

  export default Itemdisplay;