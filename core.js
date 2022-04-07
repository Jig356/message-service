var cache = [];
var cacheIndex = 0;

var elem = document.getElementById("javascriptError")
elem.parentNode.removeChild(elem);

// dev-tools checker

window.onresize = function() {}


// terminal checker
document.addEventListener("keydown", checkKeyPress, false);

function checkKeyPress(key) {

    // data

    let input = document.getElementById("input")
    let output = document.getElementById("output")

    // F12
    if (key.keyCode == "123") {

    }

    // Enter

    if (key.keyCode == "13") {
        if (input.innerHTML !== "") {
            response = terminal_run(input.innerHTML)
            if (input.innerHTML != "clear") {
                terminal_animate("\nuser@terminal.shadowlona-dev.de:-$ " + response);
                //output.innerHTML += "\nuser@terminal.shadowlona-dev.de:-$ " + response
            }
            cacheIndex = cache.length + 1;
            if (cache.includes(input.innerHTML)) {
                cache = cache.filter(e => e !== input.innerHTML);
            }
            cache.push(input.innerHTML);
        }
        setTimeout(function() {
            input.innerHTML = "";
        }, 10);
    }

    // Esc

    if (key.keyCode == "27") {

    }

    // Arrow up

    if (key.keyCode == "38") {
        cacheIndex--;
        if (cache[cacheIndex] == undefined) {
            cacheIndex = cache.length - 1;
        }
        input.innerHTML = cache[cacheIndex];
    }

    // Arrow down

    if (key.keyCode == "40") {
        cacheIndex++;
        if (cache[cacheIndex] == undefined) {
            cacheIndex = 0;
        }
        input.innerHTML = cache[cacheIndex];
    }
}

function terminal_run(input) {
    let response = "";
    socket.emit('input', input)
    if (input == "help") {
        response = "\n----- Command Help -----\nMAYO\nstatus\nclear\nexit\negg\n "
    } else if (input == "MAYO") {
        window.location.replace("https://www.youtube.com/watch?v=qzEuVvge3eU")
    } else if (input == "status") {
        response = "\n----- Status -----\nIn build\n "
    } else if (input == "clear") {
        output.innerHTML = "";
    } else if (input == "exit") {
        window.location.replace("https://shadowlona.dev/");
    } else {
        response = "\nSending data\n"
    }
    return input + response;
}
var animateText = " ";

function terminal_animate(input) {
    animateText += input;
}

var t = setInterval(() => {
    if (animateText.length > 1) {
        let character = animateText[1];
        output.innerHTML += character;
        animateText = animateText.substring(1);
    }
}, 20);

terminal_animate('input')

var options = {
    rejectUnauthorized:false
}
var socket;
socket = io.connect('89.58.0.199:3000', options);

socket.on('input', foreignInput)

function foreignInput(data) {
    terminal_animate('\n' + data)
}
