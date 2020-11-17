import React, { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import Header from '../components/header.jsx'
import Lbbox from '../components/lbselectorbox.jsx'
import $ from 'jquery';


class Leaderboard extends Component {
	render() {
		return (
			<div>
				<Header></Header>
				<Lbbox></Lbbox>
			</div>
		)
	}
	componentDidMount() {
		let array = [];
		$.post("/getdefaultarray", {}, function (data) {
			if (data != undefined) {
				array = data;
				console.log(data);
			}
			else { console.log("cant find data") }
		});
		$(document).on("click", "#lbteams", handleTeamsButtonClick)
		$(document).on("click", "#lbplayers", handlePlayersButtonClick)
		function handleTeamsButtonClick() {
			$("#table").empty();
			$("#table").append(renderTeamLeaderboard());
			for (let i = 0; i < replay1_data[0].teams.length; i++) {
				// the following if compensates for incomplete series'
				// such a series can appear in the data due to joining before
				// everyone is ready or a player lost connection during the match
				if (replay1_data[0].teams[i].cumulative.games > 2) {
					$("#tbody").append(renderTeamTableEntry(replay1_data[0].teams[i]))
					tmpGlobalincrement++;
				}
			}
		}
		function handlePlayersButtonClick() {
			$("#table").empty();
			$("#table").append(renderPlayerLeaderboard());
			for (let i = 0; i < replay1_data[0].players.length; i++) {
				// the following if compensates for admin/accidential joins
				if (replay1_data[0].players[i].cumulative.games > 1) {
					$("#tbody").append(renderPlayerTableEntry(replay1_data[0].players[i]))
					tmpGlobalincrement++;
				}
			}
		}
	}

}

export default Leaderboard;
