/**
 * Created by wathmal on 11/3/15.
 */
var promise = require('promise');

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



function StatsService(){};

// function to get total amount of money sponsored
StatsService.getTotalAmountOfSponsoredMoney= function(callback){
    // query to get total amount of money sponsored
    students.aggregate(
        [

            {$match: {isSponsored: true}},
            // this will decompose the sponsor array
            {$unwind: "$sponsors"},
            {
                $group: {
                    _id: null,
                    sum: {$sum: "$sponsors.amount"}
                }
            }

        ], function (err, res) {
            var result= {description: "the amount disbursed as scholarships since inception", amount: "$"+res[0].sum.toString()};

            //return res;
            //stats.push({description: "the amount disbursed as scholarships since inception", amount: "$"+res[0].sum.toString()})
            //stats.push(res[0].sum);
            callback(result);

        }
    );
};

// function to get total number of students with sponsors
StatsService.getTotalNumberOfStudentsWithSponsors= function(callback){
    students.find({isSponsored: true}).count().exec(function(err, res){
        var result= {description: "the number of current students with sponsors in our portfolio", amount: res.toString()};
        //stats.push(res);
        //stats.push({description: "the number of current students with sponsors in our portfolio", amount: res.toString()})

        callback(result);
    });
};

// function to get total number of students
StatsService.getTotalNumberOfStudents= function(callback){
    // query to get total number of students
    students.find({},{_id: 0}).count().exec(function(err, res){
        var result= {description: "the number of current students in our portfolio", amount: res.toString()};
        //stats.push(res);

        //return stats;
        //stats.push({description: "the number of current students in our portfolio", amount: res.toString()})
        //callback(stats);
        callback(result);

    });
};

    // function to get all static stats
StatsService.getAllStaticStats= function(callback){
    statistics.find().exec(function(err, res){

        callback(res);
    })
};

StatsService.prototype.show= function(hi){console.log(hi);}

// this method will return a promise
StatsService.prototype.getStats= function() {


    // return a new promise
    return new Promise(function(fulfill, reject){


        // eliminate module caching
        var stats= [];

        /*// query to get total amount of money sponsored
        students.aggregate(
            [

                {$match: {isSponsored: true}},
                // this will decompose the sponsor array
                {$unwind: "$sponsors"},
                {
                    $group: {
                        _id: null,
                        sum: {$sum: "$sponsors.amount"}
                    }
                }

            ], function (err, res) {

                //console.log(res);
                //return res;
                stats.push({description: "the amount disbursed as scholarships since inception", amount: "$"+res[0].sum.toString()})
                //stats.push(res[0].sum);

            }
        );


        // query to get total number of students with sponsors
        students.find({isSponsored: true}).count().exec(function(err, res){
            //stats.push(res);
            stats.push({description: "the number of current students with sponsors in our portfolio", amount: res.toString()})
            //console.log(stats);
        });


        // query to get total number of students
        students.find().count().exec(function(err, res){
            //stats.push(res);
            //console.log(stats);
            //return stats;
            stats.push({description: "the number of current students in our portfolio", amount: res.toString()})
            //callback(stats);
            fulfill(stats);


        });*/

        // hierarchical async db function calls
        StatsService.getTotalAmountOfSponsoredMoney(function(res){
            stats.push(res);

            StatsService.getTotalNumberOfStudentsWithSponsors(function(res){
               stats.push(res);

                StatsService.getTotalNumberOfStudents(function(res){
                    stats.push(res);

                    StatsService.getAllStaticStats(function(res){
                        // concat the static stats
                        //show('aneeeeeeeeeeee');
                        fulfill(stats.concat(res));
                    })

                })
            });
        });
    });




};

module.exports= new StatsService();

/*
* module
* exporting as an anonymous object
* */