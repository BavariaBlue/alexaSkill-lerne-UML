'use strict';

var Alexa = require('alexa-sdk');
var appId = 'amzn1.ask.skill.b68a737d-c970-4e3f-bd2f-0a3327f28277';
var handlers = {
    'LaunchRequest': function () {
        this.emit(':tell','Hallo, nicht fleißiger Studierender, wie geht es dir heute?','ChooseSkillIntent');
    },
    
    // new Intent because after getting e.g. a definition, 
    // user wants new skill and so doesn't need to get a welcome message
    'ChooseSkillIntent' : function () {
        this.response.speak('Welchen Skill möchtest du öffnen?').listen('Du kannst zwischen ' +
        'Wörterbuch, Quiz oder Spiel auswählen.');
        this.emit(':responseReady');
        // skill = subskill
    },
    
    'OpenDictionaryIntent' : function () {
        // utterances: without a dictionary slot -> for beginners
        // currentState: no slot value given. Only for modal code.
        // Asks for slot value and so always opens ConsultDictionaryIntent
        
        // only if it's the first time the skill was invoked in the session:
        /*if(Object.keys(this.attributes).length === 0) { 
            this.emit(':tell:', 'Willkommen zum Wörterbuch-Skill');
            }
            */
            
        // bei jedem Aufruf:
        this.emit(':ask', 'Welchen Begriff möchtest du definiert haben?');
    },
    
    // only consult dictionary, more modal. 
    'ConsultDictionaryIntent' : function() {
        // currentState: 
        // a: beginner user: welcomed via OpenDictionaryIntent, now handling slot value 
        // b: experienced user: welcomed via Launch -> got utterance to open dictionary with slot value.
        var term = this.event.request.intent.slots.wordsInDictionary.value;
        this.response.speak("Die Definition des Terms " + term + " lautet: " + 
        "Veranschaulicht den Zustand eines Systems zu einem bestimmten Zeitpunkt.");
        this.emit(':responseReady');
        
        this.emit(':ask', 'Möchtest du noch eine Definition erfahren?');
        
        // How do I ask for Yes or NO???
        if(this.request.intent.name === 'AMAZON.YesIntent') {
            this.emit('OpenDictionaryIntent');
        }
        else {
            this.emit('ChooseSkillIntent');
        }
    },
    
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function() {
        console.log('session ended!'); 
        this.emit(':saveState', true); 
    }
};

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
