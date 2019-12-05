import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,
    Route
  } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/main.js"
import PlaceHolder from "./components/placeholder";
import Available from "./components/available";
import ItemDisplay from "./components/itemDisplay";



ReactDOM.render(
    //wrap components in router so we can access the URL query string, so that we can save state there rather than in component state
    <Router>
    <Route path="/search" component={Main} />
    <Route path="/item/:id" component={ItemDisplay}/>
    <Route path="/placeholder" component={PlaceHolder}/>
    <Route path="/available" component={Available}/>
    </Router>,
    document.getElementById('root')
  );
  