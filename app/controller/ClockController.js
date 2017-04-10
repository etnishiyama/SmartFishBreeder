var clock = require('../model/ClockModel');

exports.insertClockin = function(req, res) {
    var newClock = new clock(req.body);

    newClock.save(function(err, doc) {
        if(err) {
            console.log(err.stack);
            res.status(500).end("Error: " + err.message);
        } else {
            res.json({
                success: true,
                result: doc
            });
        }
    })
};

exports.getAllClockins = function(req, res) {
    clock.find(function (err, docs) {
        if(err) {
            console.log(err.stack);
            res.status(500).end("Error: " + err.message);
        } else {
            res.json({result: docs});
        }
    })
};