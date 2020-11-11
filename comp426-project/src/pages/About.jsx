import React, { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

class About extends Component{
	render(){return(<div>
					<h2 style={{textAlign: 'center', marginBottom: '10px'}}> About Page </h2>
					<li> <NavLink to="/home">Home</NavLink></li>

		</div>
	)}
}

export default About;
