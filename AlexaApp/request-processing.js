var config = require('./config');
var responseHandler = require('./response-handler');
var standardIntents = require('./standard-intents');
var request = require('request');

// Export functions
exports.onLaunch = onLaunch;
exports.onIntent = onIntent;

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
    if ("AskActivityIntent" === intentName) {
        handleAskActivityRequest(intent, session, callback);
    } else if ("SaveEventIntent" === intentName) {
        handleSaveEventRequest(intent, session, callback);
    } else if ("AskEventsIntent" === intentName) {
        handleGetEventsRequest(intent, session, callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        standardIntents.handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        standardIntents.handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        standardIntents.handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        standardIntents.handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

function handleAskActivityRequest(intent, session, callback) {
    request(config.settings.apiUrl + '/random_park', function (error, response, body) {
        console.log(response);
        if (response && response.statusCode == 200) {
            var park = JSON.parse(body);
            var speechOutput = "I suggest you visit " + park.name + " in " + park.suburb + ". ";
            speechOutput = !park.facilities ? speechOutput : speechOutput + "This park includes facilities for " + park.facilities + ". ";
            callback(session, responseHandler.buildSpeechletResponse(config.settings.alexaCardTitle, speechOutput, speechOutput, false));
        } else {
            console.log(response);
            var speechOutput = "I'm sorry - I couldn't find anything at this moment";
            callback(session, responseHandler.buildSpeechletResponse(config.settings.alexaCardTitle, speechOutput, speechOutput, false));
        }
    });
}

function handleSaveEventRequest(intent, session, callback) {
    var eventResponse = intent.slots.Answer.value;
    request.post(config.settings.apiUrl + '/events', { form: { name: eventResponse } },
        function (error, response, body) {
            if (response && response.statusCode == 200) {
                var speechOutput = "Thanks for creating an event!";
                callback(session, responseHandler.buildSpeechletResponse(config.settings.alexaCardTitle, speechOutput, speechOutput, false));
            } else {
                console.log(error);
                var speechOutput = "I'm sorry - Something went wrong";
                callback(session, responseHandler.buildSpeechletResponse(config.settings.alexaCardTitle, speechOutput, speechOutput, false));
            }
        });
}

function handleGetEventsRequest(intent, session, callback) {
    request(config.settings.apiUrl + '/events', function (error, response, body) {
        if (response && response.statusCode == 200) {
            var events = JSON.parse(body);
            var eventDescriptions = events.filter(e => e.name).map((e, i) => "Event " + (i + 1) + ". " + e.name);
            console.log(eventDescriptions);
            var speechOutput = "Here are the meetup events on the calendar today. " + eventDescriptions.join(". ");
            callback(session, responseHandler.buildSpeechletResponse(config.settings.alexaCardTitle, speechOutput, speechOutput, false));
        } else {
            console.log(error);
            var speechOutput = "I'm sorry - Something went wrong";
            callback(session, responseHandler.buildSpeechletResponse(config.settings.alexaCardTitle, speechOutput, speechOutput, false));
        }
    });
}

function getWelcomeResponse(callback) {
    var speechOutput = "Hi.  How can I help you today?";
    callback({}, responseHandler.buildSpeechletResponse(config.settings.alexaCardTitle, speechOutput, speechOutput, false));
}