
// var app= require('./app');
import app from './app';
let server= app.listen(3000, function () {
    var host= server.address().address;
    var port= server.address().port;

    console.log('app is running at http://%s:%s', host, port);
});
