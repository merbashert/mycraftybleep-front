import React, {useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import RandomPage from './components/RandomPage.js'
import FabricPage from './components/FabricPage.js'
import NeedlePage from './components/NeedlePage.js'

// let baseUrl = '';
// if (process.env.NODE_ENV === 'development') {
//     baseUrl = 'http://localhost:8888'
// } else {
//     console.log('this is for heroku');
// }

const App = props => {
    let content = (
        <Router>
        <div>
        <nav>
        <ul>
        <li>
        <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/fabric">Fabric</Link>
        </li>
        <li>
        <Link to="/random">Random</Link>
        </li>
        <li>
        <Link to="/needles">Needles</Link>
        </li>
        </ul>
        </nav>

        <Switch>
        <Route path="/fabric">
        <FabricPage />
        </Route>
        <Route path="/random">
        <RandomPage />
        </Route>
        <Route path="/needles">
        <NeedlePage />
        </Route>
        </Switch>
        </div>
        </Router>
    );
    return content;
}


export default App
