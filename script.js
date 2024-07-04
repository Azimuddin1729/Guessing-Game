// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Get DOM elements
const guessField = document.getElementById('guessField');
const guessSubmit = document.querySelector('.guessSubmit');
const attempt = document.querySelector('.attempt');
const previousGuesses = document.querySelector('.previousGuesses');

// Default value of attempt
attempt.textContent = 7;

let guessCount = 0;
let gameEnded = false;

// Function to check the user's guess
function checkGuess() {
    if (gameEnded) {
        return; // If game has ended (won or lost), do nothing
    }
    const userGuess = Number(guessField.value);

    // Validate user input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        alert('Please enter a valid number between 1 and 100.');
        return;
    }

    guessCount++;

    if (userGuess === randomNumber) {
        endGame(true, `Congratulations! You guessed the correct number.`);
    } else if (guessCount === 7) {
        endGame(false, `Game Over! The number was ${randomNumber}.`);
    } else {
        const highOrLow = userGuess > randomNumber ? 'high' : 'low';
        displayResult(`Wrong guess! Try again. Your guess is too ${highOrLow}.`);
    }

    // Update attempts remaining
    attempt.textContent = 7 - guessCount;
    // Update previous guesses
    previousGuesses.textContent = `Previous guess: ${userGuess}`;
}

// Function to end the game
function endGame(won, message) {
    gameEnded = true;
    displayResult(message);

    // Reset game after a delay
    setTimeout(() => {
        resetGame();
    }, 3000); // Reset after 3 seconds
}

// Function to reset the game
function resetGame() {
    guessCount = 0;
    gameEnded = false;
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempt.textContent = 7;
    previousGuesses.textContent = 'Previous guess:';
    clearResult();
}

// Function to clear the result message
function clearResult() {
    const result = document.querySelector('.result');
    if (result) {
        result.textContent = '';
    }
}

// Function to display the result
function displayResult(message) {
    const result = document.querySelector('.result');
    if (result) {
        result.textContent = message;
    } else {
        const newResult = document.createElement('p');
        newResult.className = 'result';
        newResult.textContent = message;
        document.body.appendChild(newResult);
    }
}
// Event listener for guess submission
guessSubmit.addEventListener('click', checkGuess);