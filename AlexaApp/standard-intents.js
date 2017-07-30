var responseHandler = require('./response-handler');

// Export functions
exports.handleRepeatRequest = handleRepeatRequest;
exports.handleGetHelpRequest = handleGetHelpRequest;
exports.handleFinishSessionRequest = handleFinishSessionRequest;

function handleRepeatRequest(intent, session, callback) {
    callback(session.attributes,
        responseHandler.buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
}

function handleGetHelpRequest(intent, session, callback) {
    
    if (!session.attributes) {
        session.attributes = {};
    }

    var speechOutput = "TODO: Add some help text here.",
        repromptText = "TODO: Add some help text here.";
    var shouldEndSession = false;
    callback(session.attributes,
        responseHandler.buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    callback(session.attributes,
        responseHandler.buildSpeechletResponseWithoutCard("Goodbye!", "", true));
}