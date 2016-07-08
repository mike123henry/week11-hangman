var prompt = require('prompt');
var Word = require('./word.js');
var gameFile = require('./game.js');
prompt.start();

game = {
	//wordBank : ["heart and soul", "relax", "burning up", "manic monday", "into the groove", "invisible touch", "rebel yell"],
	wordsWon : 0,
	guessesRemaining : 10, //per word
	currentWrd : null, //the word object
	startGame : function (wrd){
		//make sure the user has 10 guesses
		this.resetGuessesRemaining();
		this.lettersAlreadyGuessed = "";
		//get a random word from the array
		this.currentWrd = new Word.Word(gameFile.wordsForGames.wordBank[Math.floor(Math.random()* gameFile.wordsForGames.wordBank.length)]);

		this.currentWrd.populateLetterObjectArray(); //populate currentWrd (made from Word constructor function) object with letters

		this.keepPromptingUser();

	},
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {
			//trap for repeat letters ad more then one character entered
			if (result.guessLetter.length>1 || self.lettersAlreadyGuessed.includes(result.guessLetter)) {
				console.log('\nUSER ERROR!!!\n');
				console.log('Please enter one letter only and only a letter that has not been used already');
				console.log('  The letter or space you guessed is: ' + result.guessLetter);
				console.log('Letters already guessed are '+self.lettersAlreadyGuessed);
				self.keepPromptingUser();
			}else{

		    // result is an object like this: { guessLetter: 'f' }
		    console.log('  The letter or space you guessed is: ' + result.guessLetter);

		    self.lettersAlreadyGuessed += result.guessLetter;
		    //this checks if the letter was found and if it is then it sets that specific letter in the word to be found
		    var howManyLettersInWordMatched = self.currentWrd.checkIfLetterFound(result.guessLetter);

		    //if the user guessed incorrectly minus the number of guesses they have left
		    if (howManyLettersInWordMatched == 0){
		    	console.log('You guessed wrong!');
		    	self.guessesRemaining--;
		    }else{
		    	console.log('You guessed right!');

		    	//check if you win only when you are right
	    		if(self.currentWrd.didWeFindTheWord()){
			    	console.log('You Won!!!');
			    	return; //end game
			    }
		    }

		    console.log('Guesses remaining: ', self.guessesRemaining);
		    console.log(self.currentWrd.wordRender());
		    console.log('here are the letters you guessed already: ');
		    console.log(self.lettersAlreadyGuessed);

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	console.log('Game over bro it was ', self.currentWrd.word);
		    	console.log('Get with the program man');
		    }else{
		    	console.log(self.currentWrd.wordRender());
		    }
		}
		});

	}


};

game.startGame();