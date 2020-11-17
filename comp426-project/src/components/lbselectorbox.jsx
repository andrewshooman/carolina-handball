import React from "react"
import { NavLink } from 'react-router-dom';
import style from '../styles/styles.css'

const lbselectorbox = () => {

    return (
        <div class="container">
            <div class='content'>
                <div class="box">
                    <h4 class="subtitle is-4">Leaderboard</h4>
                    <div class="control">
                        <div class="select is-primary">
                            <select>
                                <option>Select Event</option>
                                <option>Regional 1 Stage 1 (NA)</option>
                            </select>
                        </div>
                        <div id="table">
                            <div class="buttons has-addons is-centered">
                                <button class="button" id="lbteams">Teams</button>
                                <button class="button" id="lbplayers">Players</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// export default our component
export default lbselectorbox;