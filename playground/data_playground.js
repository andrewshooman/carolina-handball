import dataset from "../data/arrayed_json/NAFALLR1S1.js";

let foundNames = [];
let tmpGlobalincrement = 1;
function searchName(replay_group, searchTerm) {
    foundNames = [];
    let i = 0;
    let searchNameAns = replay_group
        .reduce((accumulator, value) => {
            if (value.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                let id_obj = {
                    name: value,
                    termStart: value.name.toLowerCase().indexOf(searchTerm.toLowerCase())
                }
                foundNames[i] = " " + value.name;
                i++;
                accumulator.push(id_obj);
            }
            return accumulator;
        }, [])
    return searchNameAns.map(c => c.name);
}

function renderTeamLeaderboard() {
    return `<div class="buttons has-addons is-centered">
    <button class="button is-primary" id="lbteams">Teams</button>
    <button class="button" id="lbplayers">Players</button>
    </div>
    <table class="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Team</th>
        <th><abbr title="Games Played">GMP</abbr></th>
        <th><abbr title="Games Won">W</abbr></th>
        <th><abbr title="Games Lost">L</abbr></th>
        <th><abbr title="Win Percentage">WL%</abbr></th>
        <th><abbr title="Goals For">GF</abbr></th>
        <th><abbr title="Goals Against">GA</abbr></th>
        <th><abbr title="Goals Per Game">GPG</abbr></th>
        <th><abbr title="Assists Per Game">APG</abbr></th>
        <th><abbr title="Saves Per Game">SVPG</abbr></th>
        <th><abbr title="Shots Per Game">SHPG</abbr></th>
        <th><abbr title="Shooting Percentage">SH%</abbr></th>
      </tr>
    </thead>
    <tbody id="tbody">
    </tbody>
    </table>
    `
}

function renderPlayerLeaderboard() {
    return `<div class="buttons has-addons is-centered">
    <button class="button" id="lbteams">Teams</button>
    <button class="button is-primary" id="lbplayers">Players</button>
    </div>
    <table class="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Team</th>
        <th><abbr title="Games Played">GMP</abbr></th>
        <th><abbr title="Win Percentage">WL%</abbr></th>
        <th><abbr title="Average Score">Score</abbr></th>
        <th><abbr title="Demolition Differential">DMD</abbr></th>
        <th><abbr title="Goals Per Game">GPG</abbr></th>
        <th><abbr title="Assists Per Game">APG</abbr></th>
        <th><abbr title="Saves Per Game">SVPG</abbr></th>
        <th><abbr title="Shots Per Game">SHPG</abbr></th>
        <th><abbr title="Shooting Percentage">SH%</abbr></th>
        <th><abbr title="Goal Participation">GP%</abbr></th>
      </tr>
    </thead>
    <tbody id="tbody">
    </tbody>
    </table>`
}

function renderTeamTableEntry(team) { 
    return `<tr>
    <th>${tmpGlobalincrement}</th>
    <td>${team.name}</td>
    <td>${team.cumulative.games}</td>
    <td>${team.cumulative.wins}</td>
    <td>${team.cumulative.games - team.cumulative.wins}</td>
    <td>${team.cumulative.win_percentage.toFixed(1)}</td>
    <td>${team.cumulative.core.goals}</td>
    <td>${team.cumulative.core.goals_against}</td>
    <td>${team.game_average.core.goals.toFixed(2)}</td>
    <td>${team.game_average.core.assists.toFixed(2)}</td>
    <td>${team.game_average.core.saves.toFixed(2)}</td>
    <td>${team.game_average.core.shots.toFixed(2)}</td>
    <td>${team.game_average.core.shooting_percentage.toFixed(2)}</td>
  </tr>`
}

function renderPlayerTableEntry(player) { 
    return `<tr>
    <th>${tmpGlobalincrement}</th>
    <td>${player.name}</td>
    <td>${player.team}</td>
    <td>${player.cumulative.games}</td>
    <td>${player.cumulative.win_percentage.toFixed(1)}</td>
    <td>${(player.cumulative.core.score/player.cumulative.games).toFixed(1)}</td>
    <td>${player.cumulative.demo.inflicted - player.cumulative.demo.taken}</td>
    <td>${player.game_average.core.goals.toFixed(2)}</td>
    <td>${player.game_average.core.assists.toFixed(2)}</td>
    <td>${player.game_average.core.saves.toFixed(2)}</td>
    <td>${player.game_average.core.shots.toFixed(2)}</td>
    <td>${player.game_average.core.shooting_percentage.toFixed(2)}</td>
    <td>${getGoalParticipation(player)}</td>
  </tr>`
}

function renderSelectorBox() {
    return `<div class="container">
    <div class='content'>
    <div class="box">
        <h4 class="subtitle is-4">Leaderboard</h3>
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
        <br>
    </div>
    </div>
    </div>
    <br>`
}

function handleTeamsButtonClick() {
    tmpGlobalincrement = 1;
    $("#table").empty();
    $("#table").append(renderTeamLeaderboard());
    for (let i = 0; i < dataset[0].teams.length; i++) {
        // the following if compensates for incomplete series'
        // such a series can appear in the data due to joining before
        // everyone is ready or a player lost connection during the match
        if (dataset[0].teams[i].cumulative.games > 2) {
            $("#tbody").append(renderTeamTableEntry(dataset[0].teams[i]))
            tmpGlobalincrement++;
        }
    }
}

function handlePlayersButtonClick() {
    tmpGlobalincrement = 1;
    $("#table").empty();
    $("#table").append(renderPlayerLeaderboard());
    for (let i = 0; i < dataset[0].players.length; i++) {
        // the following if compensates for admin/accidential joins
        if (dataset[0].players[i].cumulative.games > 1) {
            $("#tbody").append(renderPlayerTableEntry(dataset[0].players[i]))
            tmpGlobalincrement++;
        }
    }
}

function getGoalParticipation(player) { 
    let goalsParticipatedIn = player.cumulative.core.goals + player.cumulative.core.assists;
    let team = searchName(dataset[0].teams, player.team);
    // another compensational if
    let index = 0;
    for (let i = 0; i < team.length; i++) {
        if (team[i].cumulative.games < 2) {
            index++;
        }
    }
    return ((goalsParticipatedIn / team[index].cumulative.core.goals) * 100).toFixed(2);
}

// search stuff
let enteredData;
function renderPlayerSearch() {
    return `<div class="box" style="display: flex">
    <span style="display: inline-flex; flex-grow: 1; align-items: center;">
    <span class="has-text-weight-bold">Result:</span>&nbsp;${searchName(dataset[0].players, enteredData)}</span>
    <strong>${foundNames}</strong>
</div>`
}
document.getElementById('pNameInput').addEventListener('keyup', event => {
    const $searchresults = $('#pName-results');
    $( '#pName-results *' ).replaceWith();
    if (event.code === 'Enter') {
        if (event.currentTarget.value != '') {
            enteredData = event.currentTarget.value;
            $searchresults.append(renderPlayerSearch);
        }
    }
})
let enteredTeam;
function renderTeamSearch() {
    console.log(searchName(dataset[0].teams, enteredTeam))
    return `<div class="box" style="display: flex">
    <span style="display: inline-flex; flex-grow: 1; align-items: center;">
    <span class="has-text-weight-bold">Result:</span>&nbsp;${searchName(dataset[0].teams, enteredTeam)}</span>
    <strong>${foundNames}</strong>
</div>`
}
document.getElementById('tNameInput').addEventListener('keyup', event => {
    const $searchresults = $('#tName-results');
    $( '#tName-results *' ).replaceWith();
    if (event.code === 'Enter') {
        if (event.currentTarget.value != '') {
            enteredTeam = event.currentTarget.value;
            $searchresults.append(renderTeamSearch);
        }
    }
})

// leaderboard stuff
function loadTeamsIntoLeaderboard() {
    $("#root").append(renderSelectorBox());
    $(document).on("click", "#lbteams", handleTeamsButtonClick)
    $(document).on("click", "#lbplayers", handlePlayersButtonClick)
}
loadTeamsIntoLeaderboard();