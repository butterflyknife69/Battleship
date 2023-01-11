//Помножуючи випадкове число на 5,ми отримуємо число в діапазоні від 0 до 5, не включаючи 5
//Щоб отримати ціле число скористаємося функцією Math.floor:
var randomLoc = Math.floor(Math.random() * 5);

//три перемінні  позиції кожної клітини корабля.
var location1=randomLoc;
var location2=location1 + 1;
var location3=location2 + 1;

//перемінна для вводу данних користувача. 

var guess;

//перемінна для кількості влучень

var hits = 0;

// перемінна для кількості спроб

var guesses = 0;

// перемінна для зберігання інформації про те, потоплений корабель чи ні.

var isSunk = false;

//У цьому випадку ми перевіряємо, що перемінна isSunk все ще містить false. Як тільки корабель буде потоплений, вона стане true
while (isSunk == false) {
    //ми запитуємо у користувача координати пострілу
    guess = prompt("Ready, aim, fire! (enter a number 0-6):");
//переконаємось, що значення у діапазоні від 0 до 6.
    if (guess < 0 || guess > 6) {
        alert("Please enter a valid cell number!");
        } else {
//кількість пострілів користувача
        guesses = guesses + 1;
        // якщо все вірно збільшити лічильник hits
        if (guess == location1 || guess == location2 || guess == location3) {
            alert("HIT!")
            hits = hits + 1;
//перевіряємо, що у корабель було зроблено три попадання
            if (hits == 3) {
                isSunk = true;
                alert("You sank my battleship!");}
                } else{
                    alert("MISS");
                }
            }
        }    
    //інформація про кількість пострілів та точність
    var stats = "You took " + guesses + " guesses to sink the battleship, " +
    "which means your shooting accuracy was " + (3/guesses);
    alert(stats);