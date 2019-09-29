'use strict';

const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require('fs');
const PATH = require("path");
const task1FileSync = PATH.resolve(__dirname + '/../task1sync.txt');
const task2FileSync = PATH.resolve(__dirname + '/../task2sync.txt');
const task1FileAsync = PATH.resolve(__dirname + '/../task1async.txt');
const task2FileAsync = PATH.resolve(__dirname + '/../task2async.txt');

async function runExercises() {
  try {
    task1(); task2();
    await task1Async(); task2Async();
  } catch (err) {
    console.log(err);
  }
}

/**
 * Task 1
 * Modified function to catch errors for sync method
 */
function task1() {

  fs.writeFileSync(task1FileSync, '');
  var randomWord = '';

  for (let i = 1; i <= 100; i += 1) {
    try {
      randomWord = getRandomWordSync({ withErrors: true });
      fs.appendFile(task1FileSync, `${i}: ${randomWord}\n`, writeErr => {
        // if error in appending process, throw error directly
        if (writeErr) throw writeErr;
      });
    } catch (err) {
      fs.appendFile(task1FileSync, `${i}: It shouldn't break anything!\n`, writeErr => {
        // if there's an error in write process, throw error
        if (writeErr) throw writeErr;
      });
    }
  }
}

/**
 * Task 2 
 * Fizz Buzz approch with catching errors for sync method
 */
function task2() {

  fs.writeFileSync(task2FileSync, '');
  var randomWord = '';

  for (let i = 1; i <= 100; i += 1) {
    // Try to receive a word after invoking getRandomWordSync with errors on
    try {
      randomWord = getRandomWordSync({ withErrors: true });

      let fizzBuzz = '';
      if (i % 5 === 0 && i && i % 3 === 0) {
        fizzBuzz = `${i}: FizzBuzz`;
      } else if (i % 3 === 0) {
        fizzBuzz = `${i}: Fizz`;
      } else if (i % 5 === 0) {
        fizzBuzz = `${i}: Buzz`;
      } else {
        fizzBuzz = `${i}: ${randomWord}`;
      }
      fs.appendFile(task2FileSync, `${fizzBuzz}\n`, writeErr => {
        // if error in write process, throw error
        if (writeErr) throw writeErr;
      });
    } catch (err) {
      //  if unsuccessful, print out provided error message
      fs.appendFile(task2FileSync, `${i}: It shouldn't break anything!\n`, writeErr => {
        // if error in write process, throw error
        if (writeErr) throw writeErr;
      });
    }
  }
}

/**
 * Modified version of task1 function for async with error handling
 */
async function task1Async() {

  fs.writeFile(task1FileAsync, `It shouldn't break anything!\n`, function (err) {
    if (err) throw err;
  });

  let promiseChain = Promise.resolve();

  for (let i = 1; i <= 100; i += 1) {

    promiseChain = promiseChain
      .then(() => getRandomWord({ withErrors: true }))
      .then(word => {
        // write word to the file
        fs.appendFile(task1FileAsync, `${i}: ${word}\n`, writeErr => {
          // if error then throw error directly
          if (writeErr) throw writeErr;
        });
      })
      .catch(err => {
        // if there's an error write it to the file
        fs.appendFile(task1FileAsync, `${i}: It shouldn't break anything!\n`, writeErr => {
          if (writeErr) throw writeErr;
        });
      });
  }
}

/**
 * Modified version of task2 function for async
 */
async function task2Async() {

  fs.writeFile(task2FileAsync, `It shouldn't break anything!\n`, function (err) {
    if (err) throw err;
  });

  let promiseChain2 = Promise.resolve();

  for (let i = 1; i <= 100; i += 1) {

    promiseChain2 = promiseChain2
      .then(() => getRandomWord({ withErrors: true }))
      .then(word => {
        let fizzBuzz = '';
        if (i % 5 === 0 && i && i % 3 === 0) {
          fizzBuzz = `${i}: FizzBuzz`;
        } else if (i % 3 === 0) {
          fizzBuzz = `${i}: Fizz`;
        } else if (i % 5 === 0) {
          fizzBuzz = `${i}: Buzz`;
        } else {
          fizzBuzz = `${i}: ${word}`;
        }
        fs.appendFile(task2FileAsync, `${fizzBuzz}\n`, writeErr => {
          // if error in write process, throw error
          if (writeErr) throw writeErr;
        });
      })
      .catch(err => {
        fs.appendFile(task2FileAsync, `${i}: It shouldn't break anything!\n`, writeErr => {
          // if error in write process, throw error
          if (writeErr) throw writeErr;
        });
      });
  }
}

runExercises();
