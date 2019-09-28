'use strict';

const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require('fs');
const PATH = require("path");
const outFile = PATH.resolve(__dirname + '/../output.txt');

async function runExercises() {
	try{
        await 
        exercise1();
		exercise2();
		await exercise3();
	} catch(err) {
		console.log(err);
	}
}


/**
Task 1 
Print numbers from 1 to 100 with a random word
*/
async function exercise1() {

	for(let i = 1; i <= 100; i++) {
        let word = await getRandomWordSync();
		await writeToFile(`${i}: ${word}`);
    }
}

/**
Task 2 
Modified function for
Print numbers from 1 to 100
multiples of three, print "Fizz"
multiples of five, print "Buzz"
multiples of three and five, print "FizzBuzz"
*/
async function exercise2() {
	for(let i = 1; i <= 100; i++) {
		let word = await getRandomWordSync();
        if(i%3 === 0) word = 'Fizz';
        if(i%5 === 0) word = 'Buzz';
        if(i%15 === 0) word = 'FizzBuzz';
        await writeToFile(`${i}: ${word}`);
	}
}

/**
 * Task 3
 */
function exercise3() {

	for(let i = 1; i <= 100; i++) {
		getRandomWord({ withErrors: true })
		.then(function(word) {
			writeToFile(`${i}: ${word}`);
		})
		.catch(function(err) {
			writeToFile(`${i}: It shouldn't break anything!`);
		})
	}
}

/**
 * Write each line into text file
 * @param {*} line 
 */
function writeToFile(line) {
    
    line+= '\n';
	fs.appendFile(outFile, line, function (err) {
		if (err) throw err;
	});
}

runExercises();
