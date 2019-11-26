import React from 'react';

class PlaceHolder extends React.Component{
    render (props) {
        return(
            <div className="PlaceHolder">
                <h1>Placeholder</h1>
                If this were a real database, the link you clicked would take you to a webpage, e-book, or other electronic resource.
                <p>Use your browser's "back" button to go back to your search results.</p>
            </div>
        )
    }


}

export default PlaceHolder;