import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


  class SideBar extends React.Component {



    render(props) {


        //set up for subject search 
        var subjectList = "";
        
        //first loop through and extract all subject headings
        if (this.props.results.length > 0) { 
          var results = this.props.results
          var subjects = [];

          //cycle through results, extract all subject headings, put them all in an array
          results.forEach(function (result, index) {
            if (result.Subject !== undefined) {
              var tempString = result.Subject.replace(/"/g,"");
                    
              //we can have one subject or many, determine which and proceed accordingly
              if (tempString.includes(";")) {
                        
                var temp = tempString.split(";");
                subjects = subjects.concat(temp)
            }  else {
                        
                subjects.push(tempString)

              }
            }
          });
          //now loop through all subjects, removing duplicates
          var uniqueSubjects = [];
          subjects.forEach(function(subject, index) {
            if (uniqueSubjects.includes(subject) === false) {
              uniqueSubjects.push(subject);

            }


          })

          
          if (uniqueSubjects.length > 0) {
            subjectList = uniqueSubjects.map((subject, index) => 
            <li key={index}><button className="subjects" onClick={this.props.subjectSearch} type="button" value={subject}>{subject}</button></li>
        
            
            
          );
            
        }


        }

        


        //set up for the large number of checkboxes

        const scholarly = [
            {
              name: 'schball',
              key: 'checkBox1',
              label: 'At the library and online',
            },
            {
              name: 'schbonline',
              key: 'checkBox2',
              label: 'Online Only',
            },
            {
              name: 'schbscholarly',
              key: 'checkBox3',
              label: 'Scholarly (peer review) journals',
            },
            
          ];

          const format = [
            {
              name: 'fmtall',
              key: 'format1',
              label: 'All',
            },
            {
              name: 'fmtbooks',
              key: 'format2',
              label: 'Books',
            },
            {
              name: 'fmtebooks',
              key: 'format3',
              label: 'E-books',
            },
            {
              name: 'fmtarticle',
              key: 'format4',
              label: 'Articles',
            },   
            {
              name: 'fmtvideo',
              key: 'format6',
              label: 'Video',
            },
          ];

        const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
            <input type={type} name={name} className="limiter" checked={checked} onChange={this.props.onChange} />
          );

        Checkbox.propTypes = {
            type: PropTypes.string,
            name: PropTypes.string.isRequired,
            checked: PropTypes.bool,
            onChange: PropTypes.func.isRequired,
          }
            
        return(
            <div className="col sidebar">
                <h2>Refine Results</h2>
                
                <form>
                    <fieldset className="input-group">
                    <legend>Limit to:</legend>
                    <React.Fragment>
                        {
                        scholarly.map(item => (
                            
                             <label key={item.key}>
                                
                                <Checkbox name={item.name} checked={this.props.scholarly.get(item.name)} onChange={this.props.onChange} />{item.label}
                            </label>
                        ))
                        }
                    </React.Fragment>
                    
                    <label>Publication Date</label>
                    <input type="number" minLength="4" maxLength="4" name="startDate" value={this.props.startDate} onChange={this.props.onChange}></input>
                    
                    <label>to:</label>
                        <input type="number" minLength="4" maxLength="4" name="endDate" value={this.props.endDate} onChange={this.props.onChange}></input>
                    
                    <span>Format</span>
                    <React.Fragment>
                        {
                        format.map(item => (
                             <label key={item.key}>
                                
                                <Checkbox name={item.name} checked={this.props.format.get(item.name)} onChange={this.props.onChange} />{item.label}
                            </label>
                        ))
                        }
                    </React.Fragment>

                    </fieldset>
                    <h3 className="subjectLabel">Search By Subject:</h3>

                    <ul className="subjectList">{subjectList}</ul>
                </form>

            
            </div>

        )
    }
    

}

export default SideBar;

