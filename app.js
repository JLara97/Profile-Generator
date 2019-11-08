const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const electron = require("electron");
const generateHTML = require("./generateHTML")

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your favorite color?",
        name: "color"
    }
];

async function promptUser() {
    const userInput = await inquirer.prompt(questions);
    const html = await generateHTML(userInput);
    await writeFileAsync("index.html", html);
}

promptUser();