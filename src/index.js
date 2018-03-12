'use strict';

const Alexa = require('alexa-sdk');
const appId = 'amzn1.ask.skill.b68a737d-c970-4e3f-bd2f-0a3327f28277';
var currentQuestionId = 0;
var currentQuestion = "";
var quizDataLength = 0;

// Load quiz and dictionary data sync:
var fs = require('fs');
var quizData = JSON.parse(fs.readFileSync('./data/quizData.json', 'utf8'));
var dictionaryData = JSON.parse(fs.readFileSync('./data/dictionaryData.json', 'utf8'));

// get length of questions array 
quizDataLength = Object.keys(quizData.questions).length;
console.log('Loaded question arrray length: ' + quizDataLength);

var handlers = {
    'LaunchRequest': function () {
        console.log('LaunchRequest called');

        if (Object.keys(this.attributes).length === 0) {
            console.log('User opened the skill for the first time');
            this.attributes.Score = {
                'gamesPlayed': 0,
                'gamesWon': 0,
                'percentage': 0
            },
                this.response.speak('Willkommen zum Lerne U M L Skill. Sage öffne Quiz oder öffne Wörterbuch').listen(' Sage öffne Quiz oder öffne Wörterbuch');
        }
        else {
            console.log('User called Skill not for the first time');
            this.response.speak('Willkommen zurück zum Lerne U M L Skill. Sage öffne Quiz oder öffne Wörterbuch oder Öffne Score').listen(' Sage öffne Quiz oder öffne Wörterbuch oder Öffne Score');
        }
        this.emit(':responseReady');
    },

    // User says "Öffne Quiz"
    'OpenQuizIntent': function () {
        console.log('OpenQuizIntent called');
        currentQuestionId = Math.floor(Math.random() * (quizDataLength));
        console.log('currentQuestionId = ' + currentQuestionId + ' Length quizArray = ' + quizDataLength);
        currentQuestion = quizData.questions[currentQuestionId].question;
        console.log("currentQuestion = " + currentQuestion);

        this.response.speak('Okay, ich stelle dir eine Frage. ' + currentQuestion + ". " +
            'Antworte  mit wahr oder falsch. ').listen('Antworte immer mit wahr oder falsch. ');
        this.emit(':responseReady');
    },

    // User gives an answer to the quiz -> wahr or falsch are slots
    'AnswerQuizIntent': function () {
        console.log('AnswerQuizIntent called');
        let userAnswer = this.event.request.intent.slots.answerQuizSlot.value;
        let correctAnswer = quizData.questions[currentQuestionId].answer;
        console.log('Must answer with: ' + correctAnswer);
        console.log('Did answer with: ' + userAnswer);

        // normalize input -> "inkorrekt" -> falsch or "richtig" -> "wahr"
        let correctArray = ["korrekt", "richtig", "wahr"];
        let incorrectArray = ["falsch", "unwahr", "inkorrekt"];
        if (correctArray.indexOf(userAnswer) !== -1) {
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

        // user is correct
        if (userAnswer === correctAnswer) {
            console.log('AnswerQuizIntent -> correct answer');
            this.attributes.Score.gamesWon++;
            this.response.speak('Nice Job! Du liegst richtig. ' + ' Was möchtest du nun tun?').listen(' Sage öffne Wörterbuch, Quiz oder Score');
        }
        // user said wahr != falsch --> correction
        else if (userAnswer == "wahr" && correctAnswer == "falsch") {
            console.log('AnswerQuizIntent combination: said "wahr", but is "falsch"');
            let correction = quizData.questions[currentQuestionId].correction;
            this.response.speak('Sorry, die korrekte Antwort lautet ' + correction + '. Was möchtest du nun tun?').listen(' Sage öffne Wörterbuch, Quiz oder Score');
        }
        // said falsch != wahr --> repeat statement
        else {
            console.log('AnswerQuizIntent combination: said "falsch", but is "wahr"');
            this.response.speak('Sorry, die Aussage: ' + currentQuestion + ', ist wahr. Was möchtest du nun tun?').listen(' Sage öffne Wörterbuch, Quiz oder Score');
        }
        this.attributes.Score.gamesPlayed++;
        this.emit(':responseReady');
    },

    // User says "Öffne Score" 
    'OpenScoreIntent': function () {
        console.log('OpenScoreIntent called');
        let currentGamesPlayed = this.attributes.Score.gamesPlayed;
        let currentGamesWon = this.attributes.Score.gamesWon;
        let score = currentGamesPlayed + currentGamesWon * 3;
        let currentPercentage;

        if (currentGamesPlayed === 0) {
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
    // only for beginners
    'OpenDictionaryIntent': function () {
        console.log('OpenDictionaryIntent called');
        this.response.speak('Okay, welchen Term soll ich dir definieren. Sage immer die Floskel: Definiere, und deinen Term. ').listen('Sage zum Beispiel: Definiere Klassendiagramm. ');
        this.emit(':responseReady');
    },

    // User says "definiere ___" or "was ist eine ___" or "was ist ein ___" or "schlage ___ nach" or "erkläre ___"
    // quick routine allowed -> Welcome to Skill -> "Define ___" -> AnswerDictionaryIntent
    'AnswerDictionaryIntent': function () {
        console.log('AnswerDictionaryIntent called');
        let userQuestion = this.event.request.intent.slots.answerDictionarySlot.value;
        console.log("Loaded userQuestion = " + userQuestion);

        // var currentDefinitionId = myArray.map((el) => el.color).indexOf('blue');
        // match userQuestion  with term or synonyms in dictionaryData
        let currentDefinitionId;
        if (dictionaryData.definitions.map((el) => el.term).indexOf(userQuestion) !== -1) {
            currentDefinitionId = dictionaryData.definitions.map((el) => el.term).indexOf(userQuestion);
            // tellDefinition();
        }
        else if (dictionaryData.definitions.map((el) => el.synonym).indexOf(userQuestion) !== -1) {
            currentDefinitionId = dictionaryData.definitions.map((el) => el.synonym).indexOf(userQuestion);
            // tellDefinition();
        }
        else if (dictionaryData.definitions.map((el) => el.synonym1).indexOf(userQuestion) !== -1) {
            currentDefinitionId = dictionaryData.definitions.map((el) => el.synonym1).indexOf(userQuestion);
            // tellDefinition();
        }
        else {
            currentDefinitionId = -1;
            console.log("userQuestion " + userQuestion + " not found in dictionaryData.json");
            this.response.speak('Sorry. Für den Term ' + userQuestion + ' , gibt es derzeit keine Definition. Was möchtest du nun tun').listen(' Sage zum Beispiel: Definiere und einen Term, oder: öffne Quiz. ');
            this.emit(':responseReady');

            // TODO: QS: write all missing definitions in json file
            let missingData = JSON.parse(fs.readFileSync('./tmp/missingDefinitions.json', 'utf8'));

            // if term was not yet mentioned:
            if (missingData.missing.map((el) => el.term).indexOf(userQuestion) === -1) {
                // append new element
                console.log("appending new element...");
                let newMissingObject = new Object();
                newMissingObject.term = userQuestion;
                newMissingObject.count = 1;
                missingData.missing.push(newMissingObject);
                console.log("writing term " + userQuestion + " into /tmp/missingDefinitions.json.");
            }
            // else term is mentioned
            else {
                // add only ++1 to counter
                let currentMissingTermId = missingData.missing.map((el) => el.term).indexOf(userQuestion);
                missingData.missing[currentMissingTermId].count++;

            }
            fs.writeFile('/tmp/missingDefinitions.json', JSON.stringify(missingData));
            let jsMissingObject = JSON.stringify(missingData, null, 4);
            console.log("json now looks like: " + jsMissingObject);
        }
        if (currentDefinitionId !== -1) {
            console.log("ID: currentDefinitionId = " + currentDefinitionId);
            console.log("userQuestion found in dictionaryData. Loading definition: ");
            this.response.speak('Okay, die Definition von: ' + userQuestion + ', lautet: '
                + dictionaryData.definitions[currentDefinitionId].definition + ' Was möchtest du nun tun? ').listen(' Sage zum Beispiel: Definiere und einen Term, oder: öffne Quiz. ');
            this.emit(':responseReady');
            // right now: output tells synonym, not term!
        }
        // error: can't do response.speak in function? add parameter??
    },

    // Stop
    'AMAZON.StopIntent': function () {
        this.response.speak('Ok, schön die Ohren steif halten, lieber Studierender.');
        this.emit(':responseReady');
    },

    // Cancel
    'AMAZON.CancelIntent': function () {
        this.response.speak('Ok, mach es gut, fleißiger Studierender.');
        this.emit(':responseReady');
    },

    // Save state
    'SessionEndedRequest': function () {
        // delete this.attributes.gamesPlayed;
        // delete this.attributes.gamesWon;
        console.log('session ended!');
        this.emit(':saveState', true);
    }
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.appId = appId;
    alexa.dynamoDBTableName = 'LerneUMLScore';
    alexa.registerHandlers(handlers);
    alexa.execute();
};
// Test output to console
// var jsQuizObject = JSON.stringify(quizData, null, 4);
//console.log(jsQuizObject); // Logs output to dev tools console.