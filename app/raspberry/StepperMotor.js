'use strict';

var raspberry = require('./PinOut'),
//stepperWiringPi = require('stepper-wiringpi'),
    nodeCron = require('node-cron'),
    cronSchedules = [],
    cronScheduleIndex = 0,
    FeedFishModel = require('../model/FeedFishModel');

//var stepsInRevolution = 8,
// stepperMotor = stepperWiringPi.setup(stepsInRevolution, raspberry.stepMotors.pin1, raspberry.stepMotors.pin2, raspberry.stepMotors.pin3, raspberry.stepMotors.pin4);

exports.updateFeeding = function () {
    clearCronJobs();

    FeedFishModel.find({})
        .exec()
        .then(function (docs) {
            for (var i in docs) {
                setCronJob(docs[i]);
            }
        })
};

function moveStepper(speed, steps) {
    console.log("moveStepper speed: " + speed + " steps: " + steps);
    // stepperMotor.setSpeed(speed);
    // stepperMotor.step(steps);
}

function clearCronJobs() {
    for (var i = 0; i < cronScheduleIndex; i++) {
        cronSchedules[i].stop();
    }
    cronSchedules = [];
    cronScheduleIndex = 0;
}

function setCronJob(feedFish) {
    var timeToChange = feedFish.time;
    var nodeCronTime = timeToChange.getSeconds() + " " + timeToChange.getMinutes() + " " + timeToChange.getHours() + " * * *";
    console.log("Feed fish cron scheduled: " + nodeCronTime);

    cronSchedules[cronScheduleIndex] = nodeCron.schedule(nodeCronTime, function () {
        console.log("Feed fish now... " + new Date());
        moveStepper(feedFish.speed, feedFish.steps);
    });
    cronSchedules[cronScheduleIndex].start();
    cronScheduleIndex++;
}