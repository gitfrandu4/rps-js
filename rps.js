

var ganaciones	= ["papel-piedra" , "piedra-tijeras" , "tijera-papel"];
var opciones = ["papel", "piedra", "tijera"];
var contador = 0;
var timerCount = 3

var j1 = ""
var j2 = ""

/**
 * newGame() - Starts the rock, paper, scissors game
 */
function newGame() {

    document.getElementById("game-info").innerHTML = "<h2>¡Comienza la partida!</h2>";
    document.getElementById("btn-new-game").setAttribute('style', 'display:none');

    clear()
    countDownTimer();
}

function clear(){

    document.getElementById("game-info").classList.remove("alert", "alert-success", "alert-warning")

    // Clear Player1 buttons
    gameOptions = document.getElementById("game-options-p1")
    var options = gameOptions.getElementsByClassName("game-option-img");
    for (var i = 0; i<options.length; i++){
        options[i].classList.replace('img-active', 'img-disable');  
        options[i].classList.remove('img-winner', 'img-loser', 'img-tie');
    }

    // Clear Player2 buttons
    gameOptions = document.getElementById("game-options-p2")
    var options = gameOptions.getElementsByClassName("game-option-img");
    for (var i = 0; i<options.length; i++){
        options[i].classList.replace('img-active', 'img-disable');  
        options[i].classList.remove('img-winner');
        options[i].classList.remove('img-loser');
        options[i].classList.remove('img-tie');
    }
}

/**
 * countDownTimer() - Starts a regressive timer of 3*700ms and
 * then starts player1's turn
 */
function countDownTimer() {

    // timer loop
    var timer = setInterval(function(){
        document.getElementById("timer").setAttribute('style', 'display:');
        document.getElementById("timer").innerHTML = timerCount 
        timerCount--
        if(timerCount < 0){
            timerCount = 3
            document.getElementById("timer").setAttribute('style', 'display:none'); // off timer
            // timer loop ends
            clearInterval(timer)
            // starts player1's turn
            setTimeout(player1, 100)
        }
    }, 700)
}

/**
 * player1() - Player 1 actions 
 */
function player1() {

    document.getElementById("game-info").innerHTML = "Turno del jugador 1"
    
    var gameOptions = document.getElementById("game-options-p1")
    var options = gameOptions.getElementsByClassName("game-option-img");

    // ======== Adds event listener to player1 buttons ========
    for (var i = 0; i<options.length; i++){
        options[i].classList.replace('img-disable', 'img-active');
        // console.log(options[i])
        options[i].addEventListener("click", setPlay1, false);
    }
}

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
    gameOptions = document.getElementById("game-options-p1")
    var options = gameOptions.getElementsByClassName("game-option-img");

    for (var i = 0; i<options.length; i++){
        options[i].classList.replace('img-active', 'img-disable');
        // console.log(options[i])
        options[i].removeEventListener("click", setPlay1, false);
    }

    // ======== Adds event listener to player2 buttons ========
    document.getElementById("game-info").innerHTML = "Turno del jugador 2"
    
    gameOptions = document.getElementById("game-options-p2")

    var options = gameOptions.getElementsByClassName("game-option-img");
    for (var i = 0; i<options.length; i++){
        options[i].classList.replace('img-disable', 'img-active');
        // console.log(options[i])
        options[i].addEventListener("click", setPlay2, false);
    }
}

function setPlay2() {
    j2 = this.id;
    endGame();
}

/**
 * endGame() - finish the game and show results
 */
function endGame(){

    // ======== Removes event listener to player2 buttons ========
    gameOptions = document.getElementById("game-options-p2")
    var options = gameOptions.getElementsByClassName("game-option-img");

    for (var i = 0; i<options.length; i++){
        options[i].classList.replace('img-active', 'img-disable');
        // console.log(options[i])
        options[i].removeEventListener("click", setPlay2, false);
    }

    document.getElementById("game-info").innerHTML = "¡Fin de la partida!"
    document.getElementById("btn-new-game").setAttribute('style', 'display:\'\'');

    setTimeout(winnerInfo, 1000)

    j1 = j1.slice(j1.indexOf("-")+1, j1.length)
    j2 = j2.slice(j2.indexOf("-")+1, j2.length)

    console.log(j1 + " " + j2)

    document.getElementById("results-table").innerHTML += " \
            <tr><td>" + j1 + "</td> \
                <td></td>  \
                <td>" + j2 + "</td></tr>"

    document.getElementById("div-table").setAttribute('style', 'display:flex');
}

function winnerInfo(){

    gameOptions_p1 = document.getElementById("game-options-p1");
    var options_p1 = gameOptions_p1.getElementsByClassName("game-option-img");

    gameOptions_p2 = document.getElementById("game-options-p2");
    var options_p2 = gameOptions_p2.getElementsByClassName("game-option-img");

    if( j1 === j2 ){
        document.getElementById("game-info").innerHTML = "¡Empate!"
        document.getElementById("game-info").classList.add("alert", "alert-warning")

        for (var i = 0; i < options_p2.length; i++) {
          if (options_p1[i].id === `img-${j1}`) options_p1[i].classList.add("img-tie");
          if (options_p2[i].id === `img-${j2}`) options_p2[i].classList.add("img-tie");
        }

    } else {
        var winner = ganaciones.includes(`${j1}-${j2}`) ? "1":"2"
        document.getElementById("game-info").innerHTML = `Ganador: Jugador ${winner}`
        document.getElementById("game-info").classList.add("alert", "alert-success")

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