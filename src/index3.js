'use strict';
// new index.js for states pattern
// not working!
const Alexa = require("alexa-sdk");
const appId = 'amzn1.ask.skill.b68a737d-c970-4e3f-bd2f-0a3327f28277';

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    // alexa.dynamoDBTableName = 'highLowGuessUsers';
    alexa.registerHandlers(welcomeStudents);
    alexa.execute();
};
const states = {	
    
    BEGINNERMODE: 'BEGINNER_MODE',                  // User opens the selection of Q/W for the absolut first time
    PROFESSIONALMODE: 'PROFESSIONAL_MODE'           // User opens the selection of Q/W at least the second time
   
 };

// route all incoming intent or launch requests to this handler.
const newSessionHandler = {
    // new session means starting the skill
    'New Session': function(){
        this.handler.state = states.BEGINNERMODE
        // searchh in Attributes, if user opened skill for the first time:
        if(Object.keys(this.attributes).length === 0){
            // Great with long introduction.
        }
        else {
            
            // Great with shortcut introduction.
        }
    }
}

// ask for launching a new mode in beginners mode
const launchModeBeginner = Alexa.CreateStateHandler(states.BEGINNERMODE) {
    'LaunchMode'
}



// ich brauche kein state von GeneralStart zu Quiz oder Dictionary,
// da die Intents für Starte Quiz, Score oder Dic in den STARTDIC... definiert sind.
// aber ich brauche START und GUESS für jede Spielart, um zu modulieren und nicht Dialoge zu verwenden
// im newSessionHandler lasse ich alles komplizierte und sage User er soll Quiz starten sagen. Score kann er selbt erfragen.
/*
    STARTQUIZMODE: 'START_QUIZ_MODE',               // user gave request to open quiz via "Öffne Quiz"
    STARTDICTIONARYMODE: 'START_DICTIONARY_MODE',   // user gave request to open dictionary via "Öffne Wörterbuch"
    STARTSCOREMODE: 'START_SCORE_MODE',             // user gave request to open Score via "Öffne Score"

    
    GUESSQUIZMODE: 'START_QUIZ_MODE',               // user is in quiz and has to answer with yes or no to question


*/
