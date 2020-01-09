import React from 'react';


class Alert extends React.Component{
    render(props) {
        
        return(<div role="alert" className="alert alert-danger fade show">{this.props.alertMsg}</div>);
        
    }


}
export default Alert;