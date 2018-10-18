const fs = require('fs');
const hashset = require('hashset');


// Swear Filter

//Init
var contents = fs.readFileSync("bad-words.json");
var badWordsJson = JSON.parse(contents);
var badWordDict = new hashset();
for(var word of badWordsJson.bad_words) {
	badWordDict.add(word);
}

exports.badWordFilter = function (dirtyString) {

    var dirtyWords = dirtyString.split(" ");
   	var cleanString = "";
    
    for (var i = 0; i < dirtyWords.length; i++) {
    	var dirtyWord = dirtyWords[i];
    	var longestDirty = 0;
    	for (var j = 0; j < dirtyWord.length; j++) {
    		if (badWordDict.contains(dirtyWord.substring(0, j+1))) {
    			longestDirty = j+1;
    		}	
   	 	}

   	 	if (longestDirty > 0) {
    			var cleanSubWord = dirtyWord.substring(longestDirty, dirtyWord.length);
    			dirtyWord = "*".repeat(longestDirty) + cleanSubWord;
    		}

    		cleanString += dirtyWord;
    		if(i < dirtyWords.length - 1)
    			cleanString += " ";
    }

    return cleanString;
}

// Popular
//Init
var q = [];

var wordLifetime = 60 * 1000; //milliseconds

exports.logWord = function (word) {

	q.push({word: word, time: (new Date()).getTime()});
}

exports.popular = function () {

	var currentTime = (new Date()).getTime();
	var youngWords = [];
	var foundOldestKeeper = false;
	var mostPopularWordCnt = 0;
	var mostPopularWord = "";

	//Trim older words
	for (var i = 0; i < q.length; i++) {

		if (foundOldestKeeper) {
			youngWords[q[i].word] = youngWords.hasOwnProperty(q[i].word) ? youngWords[q[i].word] + 1 : 1;
			if(youngWords[q[i].word] >= mostPopularWordCnt) {
				mostPopularWord = q[i].word;
				mostPopularWordCnt = youngWords[q[i].word];
			}

		} else if(q[i].time - currentTime < wordLifetime) {
			
			// Found oldest word to keep
			foundOldestKeeper = true;
			youngWords[q[i].word] = 1;
			mostPopularWord = q[i].word;
			mostPopularWordCnt = 1;
		}
	}

	return mostPopularWord;

}

//Stats
exports.clientStats = function (signOnTime) {

	// get total seconds between the times
	var delta = Math.abs(signOnTime - new Date()) / 1000;

	// calculate (and subtract) whole days
	var days = Math.floor(delta / 86400);
	delta -= days * 86400;

	// calculate (and subtract) whole hours
	var hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;

	// calculate (and subtract) whole minutes
	var minutes = Math.floor(delta / 60) % 60;
	delta -= minutes * 60;

	// what's left is seconds
	var seconds = delta % 60;  // in theory the modulus is not required

	return days + "D " + hours + "H " + minutes + "M " + seconds + "S"; 

}




