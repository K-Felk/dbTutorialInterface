import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,
    Route
  } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/main.js"
import PlaceHolder from "./components/placeholder";



ReactDOM.render(
    //wrap components in router so we can access the URL query string, so that we can save state there rather than in component state
    <Router>
    <Route path="/search" component={Main} />
    <Route path="/placeholder" component={PlaceHolder}/>
    </Router>,
    document.getElementById('root')
  );
  