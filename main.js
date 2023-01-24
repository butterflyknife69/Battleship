// об'єкт подання
var view = {
// метод отримує рядкове повідомлення та виводить його у сфері повідомлень!
displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
},
displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
},
displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
}
// Закриваюча дужка view
}
// метод fire
var model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [{ locations: ["0", "0", "0"], hits: ["", "", ""] },
            { locations: ["0", "0", "0"], hits: ["", "", ""] },
            { locations: ["0", "0", "0"], hits: ["", "", ""] }],
// Метод отримує координати пострілу. 
fire: function(guess) {
// код перевірки влучень
    for (var i = 0; i < this.numShips; i++) {
        var ship = this.ships[i];
// Отримуємо масив клітин, займаних кораблем    
        var index = ship.locations.indexOf(guess);
        if (index >= 0){
            ship.hits[index] = "hit";
            view.displayHit(guess);
            view.displayMessage("HIT!");
        if (this.isSunk(ship)){
            view.displayMessage("You sank my battleship!");
            this.shipsSunk++;
        }
        return true;
        }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false; 
// Закриваюча дужка fire: function
},
isSunk: function(ship){
    for (var i = 0; i < this.shipLength; i++){
        if (ship.hits[i] !== "hit"){
            return false;
        }
    }
    return true;
},
// рандомні позиції кораблів
generateShipLocations: function(){
    var locations;
    for (var i = 0; i < this.numShips; i++){
      do{
        locations = this.generateShip();
      }
      while (this.collision(locations));
      this.ships[i].locations = locations; 
    }
},
generateShip: function(){
    var direction = Math.floor(Math.random() * 2);
    var row, col;
    if (direction === 1){
        row = Math.floor(Math.random() * this.boardSize);
        col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else{
        row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        col = Math.floor(Math.random() * this.boardSize);
    }
    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++){
        if (direction === 1){
            newShipLocations.push(row + "" + (col + i));
        } else {
            newShipLocations.push((row + i) + "" + col);
        }
    }
    return newShipLocations;
},
collision: function(locations){
    for (var i = 0; i < this.numShips; i++){
        var ship = model.ships[i];
        for (var j = 0; j < locations.length; j++){
            if (ship.locations.indexOf(locations[j]) >= 0){
                return true; 
            } 
        }
    }
    return false;
}
// Закриваюча дужка   model         
};
// Отримуємо координати пострілу від гравця
function parseGuess(guess){
// беремо букву і перетворимо її на цифру
var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
// Перевіряємо дані на null і переконуємося, що у рядку два символи
    if (guess === null || guess.length !== 2){
        alert("Oops, please enter a letter and a number on the board.");
    } else{
        firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)){
            alert("Oops, that isn't on the board.");
        } else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
            alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
    }
    return null;
}
// до реалізації контролера
var controller ={
    guesses: 0,
    processGuess: function(guess){
        var location = parseGuess(guess);
        if (location){
// Підрахунок та обробка пострілів
        this.guesses++;
        var hit = model.fire(location);
        if (hit && model.shipsSunk === model.numShips){
            view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
        }
        }
    }
};
// Отримання даних від гравця
function init(){
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocations();
}
function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
   }
   function handleKeyPress(e){
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13){
        fireButton.click();
        return false;
    }
   }
   window.onload = init;