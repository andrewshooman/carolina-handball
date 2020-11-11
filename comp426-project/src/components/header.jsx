import React from "react"
import { NavLink } from 'react-router-dom';
import style from '../styles/styles.css'

const header = () => {

    return (
        <div>
        <li> <NavLink to="/about">About page</NavLink></li>
		<li> <NavLink to="/search">Search page</NavLink></li>
        <li> <NavLink to="/home">Home</NavLink></li>
        </div>
    )
    
}


// export default our component
export default header;