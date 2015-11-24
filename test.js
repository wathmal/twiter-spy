/**
 * Created by wathmal on 11/3/15.
 */

var stats= require('./mongo');

stats.getStats(function(res){
    console.log(res);
});