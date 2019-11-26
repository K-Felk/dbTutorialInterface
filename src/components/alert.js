import React from 'react';


class Alert extends React.Component{
    render(props) {
        if (this.props.isVisible === true) {
            return(<div role="alert" className="alert alert-danger fade show">{this.props.alertMsg}</div>);
        } else {
            return("");
        }
    }


}
export default Alert;