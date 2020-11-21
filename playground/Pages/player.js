const handleCloseModal = function(event) {
    $('#playerCard').replaceWith(`<div id="playerCard" class="modal">`)
    $('#teamCard').replaceWith(`<div id="teamCard" class="modal">`)
}

const handleOpenPlayerModal = function(player) {
    $('#playerCard').replaceWith(`
    <div id="playerCard" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p id="playername" class="modal-card-title">Player Name</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <div>
            <h2 id="country">Country of Origin: <img width="18px" height="18px" src="flag icons/france.png"></h2>
            <h2 id="status">Status: <img width="18px" height="18px" src="icons/Green Status.png"></h2>
            <h2 id="team">Current Team:</h2>
            <img>
            </div>
            <div id="stats">
            <table class="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
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
            </table>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success">Favorite Player</button>
        </footer>
        </div>
    </div>`)
}

const handleOpenTeamModal = function(team) {
    $(`#teamCard`).replaceWith(`
    <div id="teamCard" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p id="teamname" class="modal-card-title">Team Name</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div>
            <h2 id="status">Status: <img width="18px" height="18px" src="icons/Green Status.png"></h2>
            <h2 id="players">Current Players: </h2>
            <div>
              <p>Player 1 <span class="heart" id="player"}><a><i class="far fa-heart" id="heartplayer" style="float: right" state="unliked"></a></i></span></p>
              <p>Player 2 <span class="heart" id="player"}><a><i class="far fa-heart" id="heartplayer" style="float: right" state="unliked"></a></i></span></p>
              <p>Player 3 <span class="heart" id="player"}><a><i class="far fa-heart" id="heartplayer" style="float: right" state="unliked"></a></i></span></p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Favorite Team</button>
        </footer>
      </div>
    </div>`)
}

$(document).ready(() => {
    $('#mainBody').on('click', '.testPlayer', handleOpenPlayerModal)
    $('#mainBody').on('click', '.testTeam', handleOpenTeamModal)
    $('#mainBody').on('click', '.delete', handleCloseModal)
    $('#mainBody').on('click', '.modal-background', handleCloseModal)
})