import React, { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import Header from '../components/header.jsx'


class Home extends Component{
	render(){return(<div>
		<h2 style={{textAlign: 'center', marginBottom: '10px'}}> Hello React Express World </h2>
	
		<Header></Header>

		</div>
	)}
}

export default Home;
