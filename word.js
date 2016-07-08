var letter = require('./letter.js')
//import Letter above with requiring the letter.js file

var Word = function(wrd){
	console.log('wrd = '+wrd);
	//set a property called word and set it equal to what you think it should be
	//mlh take the function input wrd and split it into an array of letters
	this.word = wrd;

	//set a property called lets to an empty array. We will eventually push letter objects in here
	//mlh make an empty array named lets that will get set to the leters from wrd that was split above
	this.lets = [];

	//set a property called found to false
	//mlh initalize to false and get set to true in function below
	this.found = false;

	//make a property called getLets, set it to a function and inside the function loop over the word property and
        //push letter objects into the lets property.
	this.getLets = function(){
		console.log('getLets this.word = '+this.word);
		var b = new letter.Letter("b");
		console.log('b = '+b.charac);
		var wordArray = this.word.split("");
		console.log('getLets wordArray = '+wordArray)
		for (var i = 0; i < wordArray.length; i++) {
			this.lets.push(new letter.Letter(wordArray[i]));
			console.log('for getLets this.lets = '+this.lets[i].charac);
		}
	}
	//returns ture or false whether we found the current word or not
	this.didWeFindTheWord = function() {
		var returnCounter = 0;
		//set the found property to true or false based on whether all the letters have been found or not
		for (var i = 0; i < this.lets.length; i++) {
			if(this.lets[i].appear !== true){
				return false //this first false mean word not complete and return false
			}else if (this.lets[i].appear === true){
				returnCounter ++; //this will count up the trues
			}
		}
		if (returnCounter === this.lets.length){
			return true; //only return true if all the letters have appear set to true
		}else{
			return false; //this should only appen if some of the appear prope\rties are corrupted
		}
	}


	this.checkIfLetterFound = function(guessLetter) {
		console.log('checkIfLetterFound guessLetter = '+guessLetter);
		//set a variable whatToReturn to 0
		var whatToReturn = 0;
		//loop over the lets property and if the letter object's charac property equals the guessletter then
            //set the appear property of the letter object to be true. Also increment whatToReturn.
        console.log('checkIfLetterFound this.lets.length = '+this.lets.length)
        for (var i = 0; i < this.lets.length; i++) {
        	if (this.lets[i].charac === guessLetter) {
        		this.lets[i].appear = true;
        		whatToReturn ++;
        	}
        }

		//return whatToReturn
		return whatToReturn;
	};

	this.wordRender = function() {
		//make a variable named str and set it to empty quotes
		var str = "";
		//loop over this.lets and call the letterRender property of the letter object that you're looping over,
			//and add it to str
			for (var i = 0; i < this.lets.length; i++) {
				str += this.lets[i].letterRender();
			}
		//return str
		return str;
	};
};

//export the Word constructor here at the end
exports.Word = Word;
