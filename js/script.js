let doors = [];

// Fetch hämtarn från .json filen objekter

fetch("assets/tarjoukset.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        doors = data.christmasSpecials;
    });

let spelplan = document.getElementById("calendar-body");

// for-loop

for (let i = 1; i <= 24; i++) {
    spelplan.innerHTML += "<div class='calendar-door' id='door" + i + "'>" + i + "</div>";
}

// Gör luckorna klickbara

for (let i = 1; i <= 24; i++) {
    let door = document.getElementById("door" + i);
    door.addEventListener("click", function() {
        doorUnlocked(i);
    });
}

// shuffle

for (let i = 0; i < 24; i++) {
    let allDoors = spelplan.children;
    let random = Math.floor(Math.random() * allDoors.length);
    spelplan.appendChild(allDoors[random]);
}

// öppna dörren funktion.

function doorUnlocked(number) {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();

    if (month != 11 || number > day) {
        alert("Du får inte öppna luckan " + number + " ännu!");
    } else {
        let info = doors[number - 1];
        let door = document.getElementById("door" + number);
        let picture = (number - 1) % 3 + 1;
        door.style.backgroundImage = "url('img/bild" + picture + ".jpg')";

        let messageText = document.getElementById("message-text");

        if (number <= doors.length) {
            messageText.innerHTML = info.label + "<br>Din rabattkod: " + info.code;
        } else {
            messageText.innerHTML = "Ingen rabatt idag, men God Jul!";
        }

        document.getElementById("message").style.display = "block";
    }
}