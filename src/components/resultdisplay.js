import React from 'react';


function Itemdisplay(props) {
        //console.log(props)

        var description = "";
        const link = "item/props.id";

        var details = "";

        if (props.creator !== undefined) {
            details = "By: " + props.creator;
        } else {
            details = props.publication;
        }

        if (props.description instanceof Array) {
            for (var b = 0; b < props.description.length; b++){
                description += props.description[b];
            }

        } else {
            description = props.description;
        }

        var icon = "";

        // eslint-disable-next-line default-case
        switch (props.format) {
            case "book":
                icon = <span className="pubtype-icon pt-book" title="book"> </span>;
            break;
            case "ebook":
                icon = <span className="pubtype-icon pt-ebook" title="ebook"> </span>;
            break;
            case "dvd/video":
                    icon = <span className="pubtype-icon pt-videoRecording" title="Video Recording"> </span>
            break;
            case "article":
                    icon = <span className="pubtype-icon pt-academicJournal" title="Academic Journal"> </span>;
            break;
            case "map":
                icon= <span className="pubtype-icon pt-map" title="Map"> </span>
            break;
            case "audio music":
                icon=<span className="pubtype-icon pt-audio" title="Audio"> </span>
            break;
        }


        return(
           <div className="card">
                <div className="card-body">
            <div className="card-title"><a href={link}>{props.title}/ {props.creator}</a></div>
        <div className="record-icon">{icon}<p className="caption">{props.format}</p></div>
        <div className="details">{details}</div>
            <p className="card-text">{description}</p>
            </div>
            </div>

            
  
        )
    
  }

  export default Itemdisplay;