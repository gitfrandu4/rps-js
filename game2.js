

var ganaciones	= ["papel-piedra" , "piedra-tijeras" , "tijeras-papel"];
var opciones = ["papel", "piedra", "tijeras"];
var contador = 0;
var timerCount = 3

var j1 = ""
var j2 = ""

function newGame() {
    document.getElementById("game-info").innerHTML = "<h2>¡Comienza la partida!</h2>"
    document.getElementById("btn-new-game").setAttribute('style', 'display:none');

    var timer = setInterval(function(){
        document.getElementById("timer").innerHTML = '<h3>'+ timerCount + '...</h3>'
        timerCount--
        if(timerCount < 0){
            document.getElementById("timer").setAttribute('style', 'display:none');
            document.getElementById("emoji").setAttribute('style', 'display:');
            clearInterval(timer)
            setTimeout(play1, 500)
        }
    }, 1000)
}

function play1() {

    document.getElementById("game-info").innerHTML = "Turno del jugador 1"
    
    gameOptions = document.getElementById("game-options-p1")

    var options = gameOptions.getElementsByClassName("game-option-img");
    for (var i = 0; i<options.length; i++){
        options[i].classList.replace('img-disable', 'img-active');
        // console.log(options[i])
        options[i].addEventListener("click", function(){
            j1 = this.id;
            play2();
        }, false);
    }
}

function play2() {
    // Desactiva J1
    gameOptions = document.getElementById("game-options-p1")
    var options = gameOptions.getElementsByClassName("game-option-img");
    for (var i = 0; i<options.length; i++){
        options[i].classList.replace('img-active', 'img-disable');
        // console.log(options[i])
        options[i].removeEventListener("click", function(){
            alert("Fin J1")
        }, false);
    }

    // Activa J2
    document.getElementById("emoji").setAttribute('style', 'transition: transform .60s; transform: scaleX(-1);');
    document.getElementById("game-info").innerHTML = "Turno del jugador 2"
    
    gameOptions = document.getElementById("game-options-p2")

    var options = gameOptions.getElementsByClassName("game-option-img");
    for (var i = 0; i<options.length; i++){
        options[i].classList.replace('img-disable', 'img-active');
        // console.log(options[i])
        options[i].addEventListener("click", function(){
            j2 = this.id;
            endGame();
        }, false);
    }
}

function endGame(){

    document.getElementById("emoji").setAttribute('style', 'display:none');

    // Desactiva J2
    gameOptions = document.getElementById("game-options-p2")
    var options = gameOptions.getElementsByClassName("game-option-img");
    for (var i = 0; i<options.length; i++){
        options[i].classList.replace('img-active', 'img-disable');
        // console.log(options[i])
        options[i].removeEventListener("click", function(){
            alert("Fin J1")
        }, false);
    }

    document.getElementById("game-info").innerHTML = "¡Fin de la partida!"
    document.getElementById("btn-new-game").setAttribute('style', 'display:\'\'');

    console.log(j1 + " " + j2)
}