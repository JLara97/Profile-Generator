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
    console.log(userInput);
    const queryUrl = `https://api.github.com/users/${userInput.username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`

    axios.get(queryUrl).then(function(res) {
        const html = generateHTML(userInput, res);
        writeFileAsync("index.html", html);
    })
}

promptUser();