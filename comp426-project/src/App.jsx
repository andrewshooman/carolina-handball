import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Search from './pages/Search.jsx';
import Leaderboard from './pages/Leaderboard.jsx';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Main Entry point function
const routing = (
	<BrowserRouter>
	  <div>
		  <Switch>
		  <Route path="/about" component={About} />
		  <Route path="/search" component={Search} />
		  <Route path="/leaderboard" component={Leaderboard} />
		  <Route path="/" component={Home} />
		</Switch>
	  </div>
	</BrowserRouter>
  )

// Rendering the entire react application
ReactDOM.render(routing, document.getElementById('root'));