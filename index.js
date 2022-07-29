#!/usr/bin/env/ node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
let playerName;
let correctAnswersCount = 0;
let numberOfQuestions = 2;

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants To Be A JavaScript Millionaire? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
      ${chalk.bgBlue('HOW TO PLAY')} 
      I am a process on your computer.
      If you get any question wrong I will be ${chalk.bgRed('killed')}
      So get all the questions right...
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: `What is the first element in the array? ['A', 'B', 'C'].length = 0\n`,
        choices: ['0', 'A', 'C', 'undefined'],
    });

    return handleAnswer(answers.question_1 === 'undefined');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
        choices: ['4', '"4"', '"1111"', '69420'],
    });

    return handleAnswer(answers.question_2 === '"1111"');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer. Next question is coming...\n` });
        await sleep();
        correctAnswersCount++;
        check_win();
    } else {
        spinner.error({ text: `Game over, you lose ${playerName}!` });
        process.exit(1);
    }
}

function check_win() {
    if (correctAnswersCount == numberOfQuestions) {
        console.clear();
        figlet(`Congrats, ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
            console.log(gradient.pastel.multiline(data) + '\n');

            console.log(
                chalk.green(
                    `Programming isn't about what you know; it's about making the command line look cool`
                )
            );
            process.exit(0);
        });
    }
}

console.clear();
await welcome();
await askName();
await question1();
await question2();


