'use strict';
const Alexa = require("alexa-sdk");
// const appId = ''; //'amzn1.echo-sdk-ams.app.your-skill-id';

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.dynamoDBTableName = 'highLowGuessUsers';
    alexa.registerHandlers();
    alexa.execute();
};

const states = {
	GUESSQUIZMODE: '_GUESSQUIZMODE', 				// User is trying to guess in the quiz.
	
    STARTDICTIONARYMODE: '_START_DICTIONARY_MODE',  // Prompt the user to start or restart the dictionary.
    STARTQUIZMODE: '_START_QUIZ_MODE',				// Prompt the user to start or restart the quiz.
    STARTGAMEMODE: '_START_GAME_MODE'				// Prompt the user to start or restart the game.
};

const newSessionHandlers = { 



};


const startDictionaryHandler = Alexa.CreateStateHandler(states.STARTDICTIONARYMODE, {


});



const startQuizHandler = Alexa.CreateStateHandler(states.STARTQUIZMODE,  {


});


const startGameHandler = Alexa.CreateStateHandler(states.STARTGAMEMODE,  {


});



// These handlers are not bound to a state
const myTestHandler = {
}

