const handleCloseModal = function(event) {
    $('.playerCard').replaceWith(`<div id="playerCard" class="modal playerCard">`)
    $('.teamCard').replaceWith(`<div id="teamCard" class="modal teamCard">`)
}

const handleOpenPlayerModal = function(testplayer) {
  // console.log(testplayer)
  // console.log(testplayer.target.id)
  //   console.log(testplayers.find(p => p.name == testplayer.target.id))
    let player = testplayers.find(p => p.name == testplayer.target.id)
  //   playername = player.name.split(' ').join('')
  //   playername = playername.replace(/\s+/g, '')
  //   console.log(playername)
    $('.playerCard').replaceWith(`
    <div id="${player.name}Card" class="modal is-active playerCard">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p id="${player.name}Name" class="modal-card-title">${player.name}</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <div>
            <h2 id="${player.name}Country" class="${player.country}">Country of Origin: ${player.country} <img width="18px" height="18px" src="flag icons/france.png"></h2>
            <h2 id="${player.name}Status" class="${player.status}">Status: ${player.status ? "Active" : "Inactive"} <img width="18px" height="18px" src="icons/${player.status ? 'Green Status.png' : 'Red Status.jpg'}"></h2>
            <h2 id="${player.name}Team" class="${player.team}">Current Team: Renault Vitality <img width="18px" height="18px" src="icons/Green Status.png"></h2>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button id="${player.name}Favorite" class="button is-success">Favorite Player</button>
        </footer>
        </div>
    </div>`)
}

const handleOpenTeamModal = function(testteam) {
    // console.log("Team!")
    let team = testteams.find(t => t.name == testteam.target.id)
    $(`.teamCard`).replaceWith(`
    <div id="${team.name}Card" class="modal is-active teamCard">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p id="${team.name}Name" class="modal-card-title">${team.name}</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div>
            <h2 id="${team.name}Status">Status: <img width="18px" height="18px" src="icons/${team.status ? 'Green Status.png' : 'Red Status.jpg'}"></h2>
            <h2 id="${team.name}Players">Current Players: </h2>
            <div>
              <p> - ${team.players[0]} <span class="heart" id="${team.players[0]}Name"}><a><i class="far fa-heart" id="heartplayer" style="float: right" state="unliked"></a></i></span></p>
              <p> - ${team.players[1]} <span class="heart" id="${team.players[1]}Name"}><a><i class="far fa-heart" id="heartplayer" style="float: right" state="unliked"></a></i></span></p>
              <p> - ${team.players[2]} <span class="heart" id="${team.players[2]}Name"}><a><i class="far fa-heart" id="heartplayer" style="float: right" state="unliked"></a></i></span></p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Favorite Team</button>
        </footer>
      </div>
    </div>`)
}

const renderPlayerCard = function(player) {
  return `<div id="${player.name}Card" class="box card">
  <article class="media">
  <header class="content">
      <p id="${player.name}Name" class="card-title">${player.name}</p>
  </header>
  <section class="content">
      <div>
      <h2 id="${player.name}Country" class="${player.country}">Country of Origin: ${player.country} <img width="18px" height="18px" src="flag icons/france.png"></h2>
      <h2 id="${player.name}Status" class="${player.status}">Status: ${player.status ? "Active" : "Inactive"}<img width="18px" height="18px" src="icons/${player.status ? 'Green Status.png' : 'Red Status.jpg'}"></h2>
      <h2 id="${player.name}Team" class="${player.team}">Current Team: <img width="18px" height="18px" src="icons/Green Status.png"> Renault Vitality</h2>
      </div>
  </section>
  <footer class="card-foot">
      <button id="${player.name}Favorite class="button is-success">Favorite Player</button>
  </footer>
  </article>
</div>`
}

const loadPlayersIntoDOM = function(players) {
  // console.log("hello!")
  for (let i=0; i<players.length; i++) {
    console.log(players[i])
    let playerCard = renderPlayerCard(players[i])
    $('#mainBody').append(playerCard)
    // console.log("Wow!?")
  }
}

$(document).ready(() => {
    $('#mainBody').on('click', '.testPlayer', handleOpenPlayerModal)
    $('#mainBody').on('click', '.testTeam', handleOpenTeamModal)
    $('#mainBody').on('click', '.delete', handleCloseModal)
    $('#mainBody').on('click', '.modal-background', handleCloseModal)
})

$(function() {
  loadPlayersIntoDOM(testplayers)
})