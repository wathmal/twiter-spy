/**
 * Created by wathmal on 10/30/15.
 */

// libs needed by falcor
var falcor = require('falcor');
var falcorExpress = require('falcor-express');
var jsonGraph = require('falcor-json-graph');
var Router = require('falcor-router');
var _ = require('lodash');
var statsService= require('./mongo/stats-service');
var promise= require('promise');

var express= require('express');
var app= express();
var $atom = jsonGraph.atom;

/*

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/edulanka');
var db = mongoose.connection;

// schemas
var students= mongoose.model('students', {
    name: String,
    gender: String,
    isSponsored: Boolean,
    phone: String,
    address: String,
    sponsors: [{start: String, end: String, amount: Number}]
});
var statistics= mongoose.model('statistics', {
    description: String,
    amount: String
});


// function to calculate stats retrived by the db
var calculateStats= function (studs) {
    var sponsoredAmount= 0;
    var totalSponsoredStudents = 0;
    var totalSchoolYears= 0;
    var totalStudents=0;

    studs.forEach(function (stud) {
        totalStudents++;

        if(stud.isSponsored){
            totalSponsoredStudents++;
        }

        stud.sponsors.forEach(function(sponsor){
            sponsoredAmount += sponsor.amount;
        })
    });

    return [
        {description: "the amount disbursed as scholarships since inception", amount: "$"+sponsoredAmount.toString()},
        {description: "the number of current students with sponsors in our portfolio", amount: totalSponsoredStudents.toString()},
        {description: "the number of current students in our portfolio", amount: totalStudents.toString()}

    ];
};
*/


// load index.html
app.use(express.static('.'));

// allow cross origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// express way
app.get('/stats/', function(req, res){

    // get static stats


    // get dynamic stats and concat with static stats
    students.find(function (err, studs) {
        //res.json(studs);

        //var stats= [];
        statistics.find({},{_id: 0},function (err, statss) {
            //stats= statss;
            var stats= calculateStats(studs).concat(statss);
            console.log(stats);
            res.json(
                stats
            );
        });



    });
    //res.json({status: "doneeee na ne haha"});
});


/* falcor model */
// statistics on ram
/*
var stats= [
    {
        description: 'the amount disbursed as scholarships since inception',
        amount: '$1249'
    },
    {
        description: 'the number of current students with sponsors in our portfolio',
        amount: '6'
    },
    {
        description: 'the number of current students in our portfolio',
        amount: '10'
    },
    {
        amount: '100%',
        description: 'percentage of your sponsorship received by the student'
    }
];
*/

// falcor model
/*var model = new falcor.Model({

    cache: {
        // consider these as atomic data as maximum 10 will be retrieved
        statistics: {$type: "atom", value: stats}

    }
});*/

// falcor model.json file building
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res){

    // data source
    //return model.asDataSource();

    return new Router([
        {

            route: "statistics",
            get: function(pathSet){

                //return {path: ["statistics"],value: $atom(stats)};
                /*return statsService.getStats(function(res){
                    console.log(res);
                    //return {path: ["statistics"],value: $atom(res)};
                });*/
                console.log(pathSet);
                return statsService.getStats().
                    then(function(stats){
                        //console.log(stats);
                        return {path: ["statistics"],value: $atom(stats)};
                    })
            }
        },
        {

            route: 'students[{integers}]["name", "amount"]',
            get: function(pathSet){
                console.log(pathSet);
                return {path: ['students',0,'name'], value: 'ala'};
            }
        }
    ]);


}));

/* end of falcor model*/


module.exports= app;