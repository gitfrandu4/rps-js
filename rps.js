let ganaciones	= ["papel-piedra" , "piedra-tijeras" , "tijera-papel"];
let opciones = ["papel", "piedra", "tijera"];
let contador = 0;
let timerCount = 3;

let j1 = ""
let j2 = ""

let winner

let gameOptions_p1 = document.getElementById("game-options-p1");
let gameOptions_p2 = document.getElementById("game-options-p2");
let options_p1 = gameOptions_p1.getElementsByClassName("game-option-img");
let options_p2 = gameOptions_p2.getElementsByClassName("game-option-img");

let gameInfo = document.getElementById("game-info");
let btnNewGame = document.getElementById("btn-new-game");

let timer = document.getElementById("timer");

/**
 * newGame() - Starts the rock, paper, scissors game
 */
function newGame() {

    gameInfo.innerHTML = "<h2>¡Comienza la partida!</h2>";
    btnNewGame.setAttribute('style', 'display:none');

    clear()
    countDownTimer();
}

/**
 * clear() - clears winner info of last match
 */
function clear(){

    gameInfo.classList.remove("alert", "alert-success", "alert-warning")

    // Clear Player1 buttons info
    for (var i = 0; i<options_p1.length; i++){
        options_p1[i].classList.replace('img-active', 'img-disable');  
        options_p1[i].classList.remove('img-winner', 'img-loser', 'img-tie');
    }

    // Clear Player2 buttons info
    for (var i = 0; i<options_p1.length; i++){
        options_p2[i].classList.replace('img-active', 'img-disable');  
        options_p2[i].classList.remove('img-winner', 'img-loser', 'img-tie');
    }
}

/**
 * countDownTimer() - Starts a regressive timer of 3*700ms and
 * then starts player1's turn
 */
function countDownTimer() {
    // timer loop
    var timerLoop = setInterval(function(){
        timer.setAttribute('style', 'display:');
        timer.innerHTML = timerCount 
        timerCount--
        if(timerCount < 0){
            timerCount = 3
            timer.setAttribute('style', 'display:none'); // off timer
            clearInterval(timerLoop) // timer loop ends
            setTimeout(player1, 100) // starts player1's turn
        }
    }, 700)
}

/**
 * player1() - Player 1 actions 
 */
function player1() {

    gameInfo.innerHTML = "Turno del jugador 1"

    // ======== Adds event listener to player1 buttons ========
    for (var i = 0; i<options_p1.length; i++){
        options_p1[i].classList.replace('img-disable', 'img-active');
        // console.log(options[i])
        options_p1[i].addEventListener("click", setPlay1, false);
    }
}

/**
 * setPlay1() - saves player1's choice and starts player2's actions
 */
function setPlay1() {
    j1 = this.id;
    // starts player2's turn
    player2();
}

/**
 * player2() - Player 2 actions 
 */
function player2() {

    // ======== Remove event listener to player1 buttons ========
    for (var i = 0; i<options_p1.length; i++){
        options_p1[i].classList.replace('img-active', 'img-disable');
        // console.log(options[i])
        options_p1[i].removeEventListener("click", setPlay1, false);
    }

    // ======== Adds event listener to player2 buttons ========
    gameInfo.innerHTML = "Turno del jugador 2"
    
    for (var i = 0; i<options_p2.length; i++){
        options_p2[i].classList.replace('img-disable', 'img-active');
        // console.log(options[i])
        options_p2[i].addEventListener("click", setPlay2, false);
    }
}

/**
 * setPlay2() - saves player2's choice and starts endGame actions
 */
function setPlay2() {
    j2 = this.id;
    endGame();
}

/**
 * endGame() - finish game and show results
 */
function endGame(){

    // ======== Removes event listener to player2 buttons ========
    for (var i = 0; i<options_p2.length; i++){
        options_p2[i].classList.replace('img-active', 'img-disable');
        // console.log(options[i])
        options_p2[i].removeEventListener("click", setPlay2, false);
    }

    gameInfo.innerHTML = "¡Fin de la partida!"
    btnNewGame.setAttribute('style', 'display:\'\'');

    setTimeout(winnerInfo, 1000)

    j1 = j1.slice(j1.indexOf("-")+1, j1.length)
    j2 = j2.slice(j2.indexOf("-")+1, j2.length)

    console.log(j1 + " " + j2)

    winner = ganaciones.includes(`${j1}-${j2}`) ? "1":"2" 

    document.getElementById("results-table").innerHTML += `
            <tr><td>${j1.toUpperCase()}</td>
                <td></td>
                <td>${j2.toUpperCase()}</td></tr>`

    document.getElementById("div-table").setAttribute('style', 'display:flex');
}

/**
 * winnerInfo() - change the interface elements to indicate the winner
 */
function winnerInfo(){

    if( j1 === j2 ){
        gameInfo.innerHTML = "¡Empate!"
        gameInfo.classList.add("alert", "alert-warning")

        for (var i = 0; i < options_p2.length; i++) {
          if (options_p1[i].id === `img-${j1}`) options_p1[i].classList.add("img-tie");
          if (options_p2[i].id === `img-${j2}`) options_p2[i].classList.add("img-tie");
        }

    } else {
        gameInfo.innerHTML = `Ganador: Jugador ${winner}`
        gameInfo.classList.add("alert", "alert-success")

        for (var i = 0; i < options_p1.length; i++) {

          if (options_p1[i].id === `img-${j1}`) {
            if(winner==="1") options_p1[i].classList.add("img-winner");
            else options_p1[i].classList.add("img-loser");
          }

          if (options_p2[i].id === `img-${j2}`) {
            if(winner==="2") options_p2[i].classList.add("img-winner");
            else options_p2[i].classList.add("img-loser");
          }
        }
    }
}