// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt(scoringAlgorithms) {
  console.log("Welcome to the Scrabble score calculator.\n")
  
  console.log("Which scoring algorithm would you like to use?\n");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    let option = scoringAlgorithms[i];
    console.log(i + " - " + option["name"]+": " + option["description"]);
  }
	return Number(input.question("Enter 0, 1, or 2:"));
}

function simpleScore(word) {
  return word.length;
}

function vowelBonusScore(word) {
  let score = 0;
  let vowels = 'aeiou';
  for (let i = 0; i < word.length; i++){
    if (vowels.includes(word[i].toLowerCase())){
      score += 3;
    } else {
      score++;
    }
  }
  return score;
}


function scrabbleScore(word, letterPoints) {
  let score = 0;
  for (let i = 0; i < word.length; i++){
    score += letterPoints[word[i].toLowerCase()];
  }
  return score;
}


const scoringAlgorithms = [
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoreFunction: scrabbleScore
  },
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoreFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1pt",
    scoreFunction: vowelBonusScore
  }
];


function scorerPrompt() {}

function transform (lettersByScore) {
  const scoresByLetter = {};
  for (let score in lettersByScore) {
      let letters = lettersByScore[score];
      for (let i=0; i<letters.length; i++){
        scoresByLetter[letters[i].toLowerCase()] = Number(score);
      }         
  }
  return scoresByLetter;
}


let newPointStructure;

function runProgram(scoringObject) {
  let newPointStructure = transform(oldPointStructure);

  let scorerIdx = initialPrompt(scoringObject);
  let scorer = scoringObject[scorerIdx];
  let word = '';
  console.log(`Using algorithm: ${scorer.name}\n`);

  while(word.toLowerCase() !== "stop") {
    word = input.question("Enter a word to be scored, or 'Stop' to quit: ");
    let score = scorer.scoreFunction(word, newPointStructure);
    console.log(`Score for '${word}': ${score}\n`);
  }
}
runProgram(scoringAlgorithms)

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

