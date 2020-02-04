import React from 'react';
import PropTypes from 'prop-types';



  class SideBar extends React.Component {



    render(props) {


        //set up for subject/discipline search 
        var subjectList = "";
        var disciplineList = "";
        
        //first loop through and extract all disciplines
        if (this.props.results.length > 0) { 
          var results = this.props.results
          var subjects = [];
          var disciplines = [];

          //cycle through results, extract all disciplines, put them all in an array
          results.forEach(function (result, index) {

            //cycle throguh results looking for disciplines, add them to the list
            if (result.Discipline !== undefined) {
              if (result.Discipline.includes(";")) {
                var tempString = result.Discipline.split(";");
                disciplines = disciplines.concat(tempString);
              } else {
                disciplines.push(result.Discipline);
              }

            }

            //clean up the list by cutting off trailing and leading whitespace, norm capitalization

            disciplines.forEach(function (discipline, index) {

              
              disciplines[index] = discipline.trim().toLowerCase();
              
            })
            

            if (result.Subject !== undefined) {
              tempString = result.Subject.replace(/"/g,"");
                    
              //we can have one subject or many, determine which and proceed accordingly
              if (tempString.includes(";")) {
                        
                var temp = tempString.split(";");
                subjects = subjects.concat(temp);
              }  else {
                        
                subjects.push(tempString);

              }
            }
          });

          subjects.forEach(function (subject, index) {
            
            if (subject.trim().toLowerCase() === "") {
              delete subjects[index];

            } else {
              subjects[index] = subject.trim().toLowerCase();
            }

          })
        
          //now loop through all subjects, removing duplicates
          var uniqueSubjects = [];
          subjects.forEach(function(subject, index) {
            if (uniqueSubjects.includes(subject) === false) {
              uniqueSubjects.push(subject);
            }
          })

          var uniqueDisciplines = [];
          disciplines.forEach(function(discipline, index) {
            if (uniqueDisciplines.includes(discipline) === false) {
              uniqueDisciplines.push(discipline);
            }
          })
          
          if (uniqueSubjects.length > 0) {
            subjectList = uniqueSubjects.map((subject, index) => 
            <li key={index}><button className="subjects" onClick={this.props.subjectSearch} type="button" value={subject}>{subject}</button></li>
            );
          } 
          if (uniqueDisciplines.length > 0) {
            disciplineList = uniqueDisciplines.map((discipline, index) => 
            <li key={index}><button className="disciplines" onClick={this.props.disciplineSearch} type="button" value={discipline}>{discipline}</button></li>
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
            <div className="col sidebar" role="search" aria-label="Limiting">
                <h2>Refine Results</h2>
                
                <form>
                    <fieldset className="input-group">
                    <legend>Limit to:</legend>
                    <React.Fragment>
                        {
                        scholarly.map(item => (
                            
                             <div key={item.key}>
                                
                                <Checkbox name={item.name} checked={this.props.scholarly.get(item.name)} onChange={this.props.onChange} /><label htmlFor={item.name}>{item.label}</label>
                            </div>
                        ))
                        }
                    </React.Fragment>
                    </fieldset>
                    <fieldset>
                    <legend>Publication Year</legend>
                    <label htmlFor="startDate">Start Year:</label>
                    <input type="number" minLength="4" maxLength="4" name="startDate" value={this.props.startDate} onChange={this.props.onChange}></input>
                    
                    <label htmlFor="endDate">End Year:</label>
                        <input type="number" minLength="4" maxLength="4" name="endDate" value={this.props.endDate} onChange={this.props.onChange}></input>
                      </fieldset>
                    <fieldset className="input-group">
                      <legend>Format:</legend>
                    
                    <React.Fragment>
                        {
                        format.map(item => (
                             <div key={item.key}>
                                
                                <Checkbox name={item.name} checked={this.props.format.get(item.name)} onChange={this.props.onChange} /><label htmlFor={item.name}>{item.label}</label>
                            </div>
                        ))
                        }
                    </React.Fragment>

                    </fieldset>

                    <fieldset>
                      <legend>Search By Subject:</legend>
                    
                    <ul className="subjectList">{subjectList}</ul>
                    </fieldset>
                    <fieldset>
                    <legend>Search By Discipline:</legend>

                    <ul className="disciplineList">{disciplineList}</ul>
                    </fieldset>
                </form>

            
            </div>

        )
    }
    

}

export default SideBar;

