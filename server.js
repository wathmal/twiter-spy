/**
 * Created by wathmal on 10/30/15.
 */

var app= require('./app');


var server= app.listen(3001, function () {
    var host= server.address().address;
    var port= server.address().port;

    console.log('app is running at http://%s:%s', host, port);
});