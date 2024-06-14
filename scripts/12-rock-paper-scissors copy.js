let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

// similiar to folloing:

/*if (!score) {
    score = {
        wins:0,
        losses:0,
        ties:0

    };
}
*/

updatescoreElement()


console.log(localStorage.getItem('score'));

function updateresultElement() {
    document.querySelector('.js-result').innerHTML = `${result}`;
};

function pickcomputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >=0 && randomNumber <1/3){
        computerMove = 'rock'
    } else if (randomNumber >=1/3 && randomNumber <2/3){
        computerMove = 'paper'
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove ='scissors'
    }
    // return statement will close the function immediately, no other code will be ran afterwards
    // return statement get a value out of the function
    return computerMove;

}

function updatescoreElement() {              document.querySelector('.js-score').innerHTML= `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}


let isAutoPlaying = false;
let intervalID;

function autoplay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(function() {
            const playerMove = pickcomputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying =true;
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
    }
}

// use keyboard to play the game
document.body.addEventListener('keydown', (event)=> {
    if (event.key==='r') {
        playGame('rock');
    } else if (event.key ==='p'){
        playGame('paper');
    } else if (event.key ==='s'){
        playGame('scissors')
    }
});

function playGame (playerMove) {
    const computerMove = pickcomputerMove();

    let result ='';

    if (playerMove==='scissors'){
        if (computerMove === 'rock'){
            result = 'You Lose'
        } else if (computerMove === 'paper') {
            result = 'You Win'
        } else if (computerMove === 'scissors') {
            result = 'Tie'
        }
        
    } else if (playerMove ==='paper'){

        if (computerMove === 'rock'){
            result = 'You Win'
        } else if (computerMove === 'paper') {
            result = 'Tie'
        } else if (computerMove === 'scissors') {
            result = 'You Lose'
        }

    } else if (playerMove === 'rock'){

        if (computerMove === 'rock'){
            result = 'Tie'
        } else if (computerMove === 'paper') {
            result = 'You Lose'
        } else if (computerMove === 'scissors') {
            result = 'You Win'
        }

    }

    if (result ==='You Win'){
        score.wins +=1;
    } else if (result ==='You Lose'){
        score.losses +=1;
    } else if ( result === 'Tie') {
        score.ties += 1;
    }

    // localstorage only take strings as input, therefore json.stringigy implemented
    localStorage.setItem('score', JSON.stringify(score));

    updatescoreElement();

    document.querySelector('.js-move').innerHTML = `you picked <img src ="images/${playerMove}-emoji.png" class="move-icon">  computer picked <img src ="images/${computerMove}-emoji.png" class="move-icon">`;

    document.querySelector('.js-result').innerHTML = result;




}