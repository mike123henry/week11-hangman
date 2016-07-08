 function Letter(let) {
    console.log('let = '+let);
    //make a charac property and set it to what you think makes sense
    this.charac = let;

    //make an appear property and set it to what makes sense
    this.appear = false;

    //make a letterRender property and set it to a function that does what you think makes sense
    this.letterRender = function(){
        console.log('letterRender is running');
        if (this.appear === true){
            return this.charac;
        }else{
            return "_"
        }
    }
};


//export the Letter constructor here
exports.Letter = Letter;
