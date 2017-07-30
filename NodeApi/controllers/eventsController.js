'use strict';

var mongoose = require('mongoose'),
    Event = mongoose.model('Events');

exports.list_all_events = function (req, res) {
    Event.find({}, function (err, evt) {
        if (err)
            res.send(err);
        res.json(evt);
    });
};

exports.create_event = function (req, res) {
    var new_event = new Event(req.body);
    new_event.save(function (err, evt) {
        if (err)
            res.send(err);
        res.json(evt);
    });
};