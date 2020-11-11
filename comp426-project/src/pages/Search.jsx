import React, { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import $ from 'jquery';



class Search extends Component{
    
    
	render(){return(<div className="Search">
					<h1 style={{textAlign: 'center', marginBottom: '10px'}}> Sample DB Lookup</h1>
					<li> <NavLink to="/home">Home</NavLink></li>
                        <p>Look up name of RL player to get their id</p>
                        <input type="TEXT" id="name" size="40"></input>
                        <input type="button" id="submit" value="Submit"></input>
                        <p id="text"></p>
		</div>
    )}
    
    componentDidMount() {
        $("#submit").click(function() {
            console.log("test")
      let name=$("#name").val();
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
