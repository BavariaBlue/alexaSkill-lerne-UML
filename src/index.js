'use strict';

const Alexa = require('alexa-sdk');
const appId = 'amzn1.ask.skill.b68a737d-c970-4e3f-bd2f-0a3327f28277';
var currentQuestionId = 0;

// Load quiz data sync:
var fs = require('fs');
var quizData = JSON.parse(fs.readFileSync('./quizData.json', 'utf8'));

// Load async:
/*
var fs = require('fs');
var obj;
fs.readFile('file', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});
*/

// Test output to console
var jsQuizObject = JSON.stringify(quizData, null, 4);
console.log(jsQuizObject); // Logs output to dev tools console.

// get length of questions array 
var quizDataLength = Object.keys(quizData.questions).length;
console.log('Loaded question arrray length: ' + quizDataLength);

var handlers = {
    'LaunchRequest': function()
    {
        console.log('LaunchRequest aufgerufen');

        if (Object.keys(this.attributes).length === 0)
        {
            console.log('Skill das erste Mal aufgerufen');
            this.attributes.Score = {
                    'gamesPlayed': 0,
                    'gamesWon': 0,
                    'percentage': 0
                },
                this.response.speak('Willkommen zum Lerne U M L Skill. Sage öffne Quiz oder öffne Wörterbuch').listen(' Sage öffne Quiz oder öffne Wörterbuch');
        }
        else
        {
            // var currentGamesPlayed = this.attributes.Score.gamesPlayed;
            // var currentGamesWon = this.attributes.Score.gamesWon;
            // var percentage = this.attributes.Score.percentage;
            console.log('Skill zum n-ten Mal aufgerufen');
            this.response.speak('Willkommen zurück zum Lerne U M L Skill. Sage öffne Quiz oder öffne Wörterbuch oder Öffne Score').listen(' Sage öffne Quiz oder öffne Wörterbuch oder Öffne Score');
        }
        this.emit(':responseReady');
    },

    // User says "Öffne Quiz"
    'OpenQuizIntent': function()
    {
        console.log('OpenQuizIntent wurde gestartet mit Array: ' + quizDataLength);
        currentQuestionId = Math.floor(Math.random() * (quizDataLength));

        /* short: 
        var rand = myArray[Math.floor(Math.random() * myArray.length)]; */

        console.log('currentQuestionId = ' + currentQuestionId + 'Länge Array = ' + quizDataLength);
        var currentQuestion = quizData.questions[currentQuestionId].question;
        console.log("currentQuestion = " + currentQuestion);
        this.response.speak('Okay, ich stelle dir eine Frage. ' + currentQuestion + ". " +
            'Antworte  mit wahr oder falsch.').listen(' Antworte immer mit wahr oder falsch');
        this.emit(':responseReady');
    },

    // User gives an answer to the quiz -> wahr or falsch are slots
    'AnswerQuizIntent': function()
    {
        console.log('AnswerQuizIntent wurde gestartet');
        var userAnswer = this.event.request.intent.slots.answerQuizSlot.value;
        var correctAnswer = quizData.questions[currentQuestionId].answer;
        console.log('Wird currrentQuestionsID mitgenommen?: ' + currentQuestionId);
        console.log('Muss antworten mit: ' + correctAnswer);
        console.log('Hat geantwortet mit:' + userAnswer);

        if (userAnswer === correctAnswer)
        {
            console.log('AnswerQuizIntent korrekte Antwort');
            this.attributes.gamesWon++;
            this.response.speak('Nice Job! Du liegst richtig. ' + ' Was möchtest du nun tun?').listen(' Sage öffne Wörterbuch, Quiz oder Score');
        }
        else
        {
            console.log('AnswerQuizIntent falsche Antwort');
            var tellTruth = quizData.questions[currentQuestionId].correction;
            this.response.speak('Sorry, die korrekte Antwort lautet ' + tellTruth + '. Was möchtest du nun tun?').listen(' Sage öffne Wörterbuch, Quiz oder Score');
        }
        this.attributes.gamesPlayed++;
        this.emit(':responseReady');
    },

    // Routing from OpenQuizIntent, AnswerQuizIntent and OpenScoreIntent
    /*'AskQuestion': function() {
        console.log('AskQuestion ist aufgerufen');
        currentQuestionId = 1;
        // Math.floor(Math.random() * (quizData.length);
        var currentQuestion = quizData[currentQuestionId].question;
        this.response.listen(currentQuestion, 'Antworte immer mit wahr oder falsch');
    },*/

    // User says "Öffne Score" 
    'OpenScoreIntent': function()
    {
        console.log('OpenScoreIntent wurde aufgerufen');
        var currentGamesPlayed = this.attributes.Score.gamesPlayed;
        var currentGamesWon = this.attributes.Score.gamesWon;
        var score = currentGamesPlayed + currentGamesWon * 3;
        var currentPercentage = this.attributes.Score.percentage = (currentGamesWon / currentGamesPlayed) * 100;
        this.response.speak('Dein aktueller Score liegt bei ' + score + ' Punkten. Du hast ' + currentPercentage + ' Prozent deiner Spiele gewonnen.' +
            'Hier ist schon deine nächste Frage');
        this.emit(':responseReady');
        //this.emit('OpenQuizIntent');
    },

    // Stop
    'AMAZON.StopIntent': function()
    {
        this.response.speak('Ok, schön die Ohren steif halten, lieber Studierender.');
        this.emit(':responseReady');
    },

    // Cancel
    'AMAZON.CancelIntent': function()
    {
        this.response.speak('Ok, mach es gut, fleißiger Studierender.');
        this.emit(':responseReady');
    },

    // Save state
    'SessionEndedRequest': function()
    {
        console.log('session ended!');
        this.emit(':saveState', true);
    }

};

exports.handler = function(event, context, callback)
{
    var alexa = Alexa.handler(event, context, callback);
    alexa.appId = appId;
    alexa.dynamoDBTableName = 'LerneUMLScore';
    alexa.registerHandlers(handlers);
    alexa.execute();
};
