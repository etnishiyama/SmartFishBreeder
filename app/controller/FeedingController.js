'use strict';

var FeedingModel = require('../model/FeedFishModel'),
    raspberryStepper = require('../raspberry/StepperMotor');

exports.getAllFeedings = function () {
    FeedingModel.find().exec()
        .then(function (docs) {
            res.json({
                success: true,
                result: docs
            })
        })
        .catch(function (err) {
            console.log(err);
        });
};

exports.createNewFeeding = function (req, res, next) {
    var newFeedingEntry = new FeedingModel({
        speed: req.body.speed,
        steps: req.body.steps
    });
    newFeedingEntry.time = new Date(req.body.timestamp * 1000);

    newFeedingEntry.save()
        .then(function (doc) {
            raspberryStepper.updateFeeding();
            res.json({
                success: true,
                result: doc
            })
        })
        .catch(function (err) {
            console.log(err);
        })
};