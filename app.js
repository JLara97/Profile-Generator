const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const pdf = require("html-pdf");
const generateHTML = require("./generateHTML");

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

function getUserProfile(url) {
    return axios.get(url);
  }
   
function getUserStars(url) {
    return axios.get(url);
  }

  function createPdf(file) {
      const html = fs.readFileSync(file, 'utf-8');
      const options = { format: 'Letter'};

      pdf.create(html, options).toFile('./index.pdf', function(err, res) {
          if (err) return console.log(err);
      })
  }

async function promptUser() {
    const userInput = await inquirer.prompt(questions);

    const queryUser = `https://api.github.com/users/${userInput.username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`

    const queryStar = `https://api.github.com/users/${userInput.username}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&per_page=100`

    axios.all([getUserProfile(queryUser), getUserStars(queryStar)])
    .then(axios.spread(function (profile, stars) {
        const html = generateHTML(userInput, profile, stars);
        fs.writeFile("index.html", html, function(err) {
            if (err) {
              throw err;
            }});
    }));

    createPdf('index.html');
}

promptUser();
