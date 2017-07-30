'use strict';
module.exports = function(app) {
  var eventsController = require('./controllers/eventsController');


  // event Routes
  app.route('/events')
    .get(eventsController.list_all_events)
    .post(eventsController.create_event);
    
};