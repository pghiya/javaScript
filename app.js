//Add code here

//Declaration of variables with global scope
 var scores, roundScore, activePlayer, gamePlaying;

 //Function which will be called when application loads to fetch inital configuration
 init()

 function init() {
    //initialization of variables
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true; //state variable

    //By querySelector display property of dice is set none (hidden at beginning)
    document.querySelector('.dice').style.display = 'none';

    //Setting all feilds displaying scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Remove winner and show default player's   	
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

    //Remove the winner
    document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
    
    //Make both the players inactive
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
    
    //By default player 1 should be active 
	document.querySelector('.player-0-panel').classList.add('active');
}

 //Adding event on roll button when action = click, this will be listened and is called as event listener
 document.querySelector('.btn-roll').addEventListener('click', function() {
    //state variable
    if (gamePlaying) {
        //Use of Math functions to generate random number
        //Random will generate any number >= 0 && < 1
        //So convert them in our dice number we multiply it by 6 but it can be decimal so used floor method and added 1
        var dice = Math.floor(Math.random() * 6) + 1;

        var diceBlock = document.querySelector('.dice');
        diceBlock.style.display = 'block';
        diceBlock.src = 'dice-' + dice + '.png';

        //Check if rolled number is != 1, if yes update the round score
        if(dice !=1){
            roundScore += dice; //Add consecutive dice roll using short hand operator
            document.querySelector('#current-'+activePlayer).textContent = roundScore; // Set the round score for the active player
        }else{
            nextPlayer();
        }
    }
});

//Function to toggle the active player if user rolls dice =1
function nextPlayer(){
    //Use of ternary operator to switch active player
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //Reset the current score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Toggle/swtich between active player from player 1-2 or vice versa.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Set display none or hide dice when dice roll = 1
    document.querySelector('.dice').style.display = 'none';
}

//Adding event on hold button when action = click, this will be listened and is called as event listener
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        //Add current score to Global score
        scores[activePlayer] += roundScore;

        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        //Condition to check if player has won
        if(scores[activePlayer]>25){
            var otherPlayer = activePlayer == 0? 1:0;
            gamePlaying = false;

            document.querySelector('#name-'+activePlayer).textContent = '🎉Winner🎉';
            document.querySelector('#name-'+otherPlayer).textContent = '☹️Loser☹️';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        }else{
            nextPlayer();
        }
    }
});

//Adding event on New game when action = click, this will be listned and initialize game
document.querySelector('.btn-new').addEventListener('click',init);