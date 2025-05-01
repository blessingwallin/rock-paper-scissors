let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

function assignComputerMove() {
    let computerMove = '';
    let randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        let computerMove = assignComputerMove();
        playGame('rock', computerMove);
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        let computerMove = assignComputerMove();
        playGame('paper', computerMove);
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        let computerMove = assignComputerMove();
        playGame('scissors', computerMove);
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        let computerMove = assignComputerMove();
        playGame('rock', computerMove);
    } else if (event.key === 'p') {
        let computerMove = assignComputerMove();
        playGame('paper', computerMove);
    } else if (event.key === 's') {
        let computerMove = assignComputerMove();
        playGame('scissors', computerMove);
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        showConfirmation();
    }
});

function playGame(playerMove, computerMove) {
    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You win!';
        } else {
            result = 'You lose.';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win!';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        } else {
            result = 'Tie.';
        }
    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        } else {
            result = 'You win!';
        }
    }

    if (result === 'You win!') {
        score.wins += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    } else {
        score.losses += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    let paragraphResults = document.querySelector('.results');
    paragraphResults.innerHTML = `You
        <img src="rps_images/${playerMove.toLowerCase()}Icon.png" class="moveIcon">
        <img src="rps_images/${computerMove.toLowerCase()}Icon.png" class="moveIcon">
        Computer
        <br>
        <br>
        <br>
        ${result}`;

    let paragraphScores = document.querySelector('.scores');
    paragraphScores.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(() => {
            const firstMove = assignComputerMove();
            const secondMove = assignComputerMove();
            playGame(firstMove, secondMove);
        }, 1000);
        isAutoPlaying = true;
        document.querySelector('.auto-play-button').innerHTML = 'Stop Playing';
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
        document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
    }
}

document.querySelector('.auto-play-button')
    .addEventListener('click', () => {
        autoPlay();
    })


function showConfirmation() {
    document.querySelector('.reset-confirm').innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
        No
        </button>
        `;

    document.querySelector('.js-reset-confirm-yes')
        .addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
        });
    
    document.querySelector('.js-reset-confirm-no')
        .addEventListener('click', () => {
        hideResetConfirmation();
        });
    }

function resetScore() {

    score.wins = 0;
    score.ties = 0;
    score.losses = 0;
    localStorage.removeItem('score');
    
    let paragraphResults = document.querySelector('.results');
    paragraphResults.innerHTML = '' ;

    let paragraphChoices = document.querySelector('.choices');
    paragraphChoices.innerHTML = '' ;

    let paragraphScores = document.querySelector('.scores');
    paragraphScores.innerHTML = '' ;
}

function hideResetConfirmation() {
    document.querySelector('.reset-confirm')
      .innerHTML = '';
  }

document.querySelector('.resetButton')
    .addEventListener('click', () => {
        showConfirmation()
    })
