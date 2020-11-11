import React, { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import Header from '../components/header.jsx'

class About extends Component{
	render(){return(<div>
					<h2 style={{textAlign: 'center', marginBottom: '10px'}}> About Page </h2>
					<Header></Header>

		</div>
	)}
}

export default About;
