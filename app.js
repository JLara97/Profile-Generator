const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const electron = require("electron");

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

function writeToFile(fileName, data) {
 
}

function init() {
    
}

init();