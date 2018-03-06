'use strict';

const Alexa = require('alexa-sdk');
const appId = 'amzn1.ask.skill.b68a737d-c970-4e3f-bd2f-0a3327f28277';
var currentQuestionId = 0;
var currentQuestion = "";
var quizDataLength = 0;
//var dictionaryDataLength = 0;

// Load quiz data sync:
var fs = require('fs');
var quizData = JSON.parse(fs.readFileSync('./data/quizData.json', 'utf8'));
var dictionaryData = JSON.parse(fs.readFileSync('./data/dictionaryData.json', 'utf8'));

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
quizDataLength = Object.keys(quizData.questions).length;
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

        console.log('currentQuestionId = ' + currentQuestionId + ' Länge Array = ' + quizDataLength);
        currentQuestion = quizData.questions[currentQuestionId].question;
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
        console.log('Hat geantwortet mit: ' + userAnswer);
        
        // normalize input -> "inkorrekt" -> falsch or "richtig" -> "wahr"
        var correctArray = ["korrekt", "richtig", "wahr"];
        var incorrectArray = ["falsch", "unwahr", "inkorrekt"];
        if (correctArray.indexOf(userAnswer) !== -1){
            userAnswer = "wahr";
            console.log("userAnswer was set 'wahr'. ");
        } 
        else if (incorrectArray.indexOf(userAnswer) !== -1) {
            userAnswer = "falsch";
            console.log("userAnswer was set 'falsch'. ");
        }
        else {
            console.log("user said: " + userAnswer + " which will throw an error.");
        }

        if (userAnswer === correctAnswer)
        {
            console.log('AnswerQuizIntent korrekte Antwort');
            this.attributes.Score.gamesWon++;
            this.response.speak('Nice Job! Du liegst richtig. ' + ' Was möchtest du nun tun?').listen(' Sage öffne Wörterbuch, Quiz oder Score');
        }
        // said wahr != falsch --> correct
        else if (userAnswer == "wahr" && correctAnswer == "falsch")
        {
            console.log('AnswerQuizIntent combination: said "wahr", but is "falsch"');
            var correct = quizData.questions[currentQuestionId].correction;
            this.response.speak('Sorry, die korrekte Antwort lautet ' + correct + '. Was möchtest du nun tun?').listen(' Sage öffne Wörterbuch, Quiz oder Score');
        }
        // said falsch != wahr --> repeat question
        else {
            console.log('AnswerQuizIntent combination: said "falsch", but is "wahr"');
            this.response.speak('Sorry, die Aussage: ' + currentQuestion + ', ist wahr. Was möchtest du nun tun?').listen(' Sage öffne Wörterbuch, Quiz oder Score');
        }        
        this.attributes.Score.gamesPlayed++;
        this.emit(':responseReady');
    },

    // User says "Öffne Score" 
    'OpenScoreIntent': function()
    {
        console.log('OpenScoreIntent wurde aufgerufen');
        var currentGamesPlayed = this.attributes.Score.gamesPlayed;
        var currentGamesWon = this.attributes.Score.gamesWon;
        var score = currentGamesPlayed + currentGamesWon * 3;
        // TODO: currentGamesPlayed may be 0 (user starts skill, doesn't play quiz, only dictionary!)
        var currentPercentage;
        if  (currentGamesPlayed === 0)
        {
            currentPercentage = 0;
        }
        else {
            currentPercentage = this.attributes.Score.percentage = Math.round((currentGamesWon / currentGamesPlayed) * 100);   
        }
        this.response.speak('Dein aktueller Score liegt bei ' + score + ' Punkten. Du hast ' + currentPercentage + ' Prozent deiner Spiele gewonnen. ' +
            'Was möchtest du nun tun?').listen(' Sage öffne Quiz, um deinen Score zu verbessern. ');
        // hier ist schon deine nächste Frage
        this.emit(':responseReady');
        //this.emit('OpenQuizIntent');
    },

    // User says "Öffne Wörterbuch"
    'OpenDictionaryIntent': function()
    {
        console.log('OpenDictionaryIntent wurde gestartet');
        this.response.speak('Okay, welchen Term soll ich dir definieren. Sage immer die Floskel: Definiere, und deinen Term. ').listen('Sage zum Beispiel: Definiere Klassendiagramm. ');
        this.emit(':responseReady');
    },
    'AnswerDictionaryIntent' : function ()
    {
        console.log('AnswerDictionaryIntent wurde gestartet');
        var userQuestion = this.event.request.intent.slots.answerDictionarySlot.value;
        console.log("Loaded userQuestion: " + userQuestion);

        // probably wrong :)
        var currentDefinitionId = dictionaryData.definitions.indexOf(userQuestion);
        console.log("currentDefinitionId = " + currentDefinitionId )

        // Nil?
        if (userQuestion != ""){
            console.log("userQuestion found in dictionaryData. Loading definition: ");
            this.response.speak('Okay, die Definition von: ' + userQuestion + ', lautet: '
             + dictionaryData.definitions[currentDefinitionId].definition + ' ').listen(' Was möchtest du nun tun? ');
        } 
        else {
            console.log("userQuestion" + userQuestion + "not found in dictionaryData.json");
            this.response.speak('Sorry. Für den Term ' + userQuestion + ' . gibt es derzeit keine Definition ').listen(' ');
            // TODO: QS: write all missing definitions in json file!
        }
        this.emit(':responseReady');

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
        // delete this.attributes.gamesPlayed;
        // delete this.attributes.gamesWon;
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