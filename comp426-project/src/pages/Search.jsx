import React, { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import Header from '../components/header.jsx'



class Search extends Component{
    
    
	render(){return(<div className="Search">
					<h1 style={{textAlign: 'center', marginBottom: '10px'}}> Sample DB Lookup</h1>
          <Header></Header>
                        <p>Look up name of RL player to get their id</p>
                        <input type="TEXT" id="name" size="40"></input>
                        <input type="button" id="submit" value="Submit"></input>
                        <p id="text"></p>
		</div>
    )}
    
     componentDidMount() {
        $("#submit").click(function() {
      let name=$("#name").val();
      console.log(name)
      $.post("/lookup",{name: name}, function(data){
        if (data != undefined) {document.getElementById('text').innerHTML=data[0]._id;
        console.log(data);
      }
      else{console.log("cant find data")}
      });
    
          });
    }
}

export default Search;
