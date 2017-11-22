'use strict';
const Alexa = require("alexa-sdk");
// const appId = ''; //'amzn1.echo-sdk-ams.app.your-skill-id';

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    // alexa.dynamoDBTableName = 'highLowGuessUsers';
    alexa.registerHandlers(newSessionHandlers, startDictionaryHandler, consultDictionary, startQuizHandler, startGameHandler);
    alexa.execute();
};

const states = {	
    STARTMODE: 'START_GENERAL_MODE',                    
    
    STARTDICTIONARYMODE: 'START_DICTIONARY_MODE',       // User selected dictionary skill out of skill set or has answered 'new quiz' with yes
    CONSULTDICTIONARYMODE: '_CONSULT_DICTIONARY_MODE',  // Prompt the user to start or restart the dictionary.

    STARTQUIZMODE: '_START_QUIZ_MODE',				    // User selected quiz skill out of skill set or has answered 'new quiz' with yes
    CONSULTQUIZMODE: '_CONSULT_QUIZ_MODE',              // Prompt the user to start or restart the quiz.

    STARTGAMEMODE: '_START_GAME_MODE',				    // User selected game skill out of skill set or has answered 'new quiz' with yes 
    CONSULTGAMEMODE: '_CONSULT_GAME_MODE',              // Prompt the user to start or restart the game.

};

const newSessionHandlers = { 
    'NewSession': function() {
        // check if the skill session is new
        if(Object.keys(this.attributes).length === 0) {
            // this.attributes['endedSessionCount'] = 0;
            this.response.speak('Willkommen zu Lerne UML. Möchtest du das Wörterbuch, das Quiz oder das Spiel öffnen?')
            .listen('Sage zum Beispiel Wörterbuch oder Öffne Wörterbuch, um diesen Skill zu öffnen.');
            //You have played this.attributes['gamesPlayed'].toString() +
            this.emit(':responseReady');
        }
        // change state to __ 
        // this.handler.state = states.STARTMODE;
        this.response.speak('Möchtest du das Wörterbuch, das Quiz oder das Spiel öffnen?')
            .listen('Sage zum Beispiel Quiz oder Öffne Quiz, um diesen Skill zu öffnen.');
            //You have played this.attributes['gamesPlayed'].toString() +
        this.emit(':responseReady');
    },
    "AMAZON.StopIntent": function() {
      this.response.speak("Auf Wiedersehen!");
      this.emit(':responseReady');
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak("Tschüss!");
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        //this.attributes['endedSessionCount'] += 1;
        this.response.speak("Machs gut!");
        this.emit(':responseReady');
    }


};

const startDictionaryHandler = Alexa.CreateStateHandler(states.STARTDICTIONARYMODE, {
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    'AMAZON.HelpIntent': function() {

        const message = 'Gib mir einen Fachterm, den ich dir definieren soll';
        const remessage = 'Welchen Fachterm soll ich definieren?';
        this.handler.states = states.CONSULTDICTIONARYMODE;
        this.response.speak(message).listen(message);
        this.emit(':responseReady');
    },

    'AMAZON.YesIntent': function() {
        //this.handler.state = states.CONSULTDICTIONARYMODE;
        this.response.speak('Großartig! ' + 'Gib mir einen weiteren Term.').listen('Sage zum Beispiel Definiere Aggregation.');
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent': function() {
        console.log("NOINTENT");
        this.response.speak('Ok, ');
        this.emit(':responseReady');
    },

    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.response.speak("Auf Wiedersehen!");
      this.emit(':responseReady');
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.response.speak("Tschüss!");
      this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log("SESSIONENDEDREQUEST");
        //this.attributes['endedSessionCount'] += 1;
        this.response.speak("Machs gut!");
        this.emit(':responseReady');
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        const message = 'Gib mir ein Schlagwort, um es zu definieren oder schließe den Skill mit Alexa Stop';
        this.response.speak(message).listen(message);
        this.emit(':responseReady');
    }

});

const consultDictionary = Alexa.CreateStateHandler(states.CONSULTDICTIONARYMODE, {
    'ConsultDictionaryIntent' : function () {
        const term = this.event.request.intent.slots.wordsInDictionary.value;
        console.log('user asks for: ' + term);
        this.handler.states = STARTDICTIONARYHANDLER;
        this.response.speak('Die Definition des Terms ' + term + 'lautet: ' + 'Test test test test' + 
        + 'Möchtest du einen weiteren Begriff definiert haben, so antworte mit Ja').listen('Ja oder nein.');
        this.emit(':responseReady');
    },
    "AMAZON.StopIntent": function() {
        console.log("STOPINTENT");
      this.response.speak("Auf Wiedersehen!");
      this.emit(':responseReady');
    },
    "AMAZON.CancelIntent": function() {
        console.log("Tschüss");
    },
    'SessionEndedRequest': function () {
        console.log("SESSIONENDEDREQUEST");
        this.attributes['endedSessionCount'] += 1;
        this.response.speak("Machs gut!");
        this.emit(':responseReady');
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        this.response.speak('Sorry, das habe ich nicht verstanden. Versuche, mir einen Term zu sagen.')
        .listen('Versuche, mir einen Term zu sagen.');
        this.emit(':responseReady');
    }
});


const startQuizHandler = Alexa.CreateStateHandler(states.STARTQUIZMODE,  {


});


const startGameHandler = Alexa.CreateStateHandler(states.STARTGAMEMODE,  {


});
// These handlers are not bound to a state
//const myTestHandler = {
//}

