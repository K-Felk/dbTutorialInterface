import React from 'react';
import PropTypes from 'prop-types';


  class SideBar extends React.Component {



    render(props) {
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
              name: 'fmtmap',
              key: 'format4',
              label: 'Maps',
            },
            {
              name: 'fmtaudio',
              key: 'format5',
              label: 'Audio Recording',
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
                </form>

            
            </div>

        )
    }
    

}

export default SideBar;

