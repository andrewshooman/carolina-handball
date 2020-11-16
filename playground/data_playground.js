import replay1_data from "./data/replay1_data.js";

let enteredData;
let foundNames = [];
let tmpGlobalincrement = 1;
export function searchName(replay_group, searchTerm) {
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
export const renderPlayerSearch = function() {
    return `<div class="box" style="display: flex">
    <span style="display: inline-flex; flex-grow: 1; align-items: center;">
    <span class="has-text-weight-bold">Result:</span>&nbsp;${searchName(replay1_data[0].players, enteredData)}</span>
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

export const renderTeamSearch = function() {
    console.log(searchName(replay1_data[0].teams, enteredTeam))
    return `<div class="box" style="display: flex">
    <span style="display: inline-flex; flex-grow: 1; align-items: center;">
    <span class="has-text-weight-bold">Result:</span>&nbsp;${searchName(replay1_data[0].teams, enteredTeam)}</span>
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

export const renderLeaderboard = function() {
    return `<div class="container">
    <div class='content'>
    <div class="box">
    <table class="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th><abbr title="Position">Pos</abbr></th>
        <th>Team</th>
        <th><abbr title="Games Played">GP</abbr></th>
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
    </div>
    </div>
    </div>
    <br>
    `
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

$("#root").append(renderLeaderboard());

function loadTeamsIntoLeaderboard() {
    console.log(replay1_data)
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
loadTeamsIntoLeaderboard();

