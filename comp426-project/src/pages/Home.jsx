import React, { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';


class Home extends Component{
	render(){return(<div>
		<h2 style={{textAlign: 'center', marginBottom: '10px'}}> Hello React Express World </h2>
	
		<li> <NavLink to="/about">About page</NavLink></li>
		<li> <NavLink to="/search">Search page</NavLink></li>

		</div>
	)}
}

export default Home;
