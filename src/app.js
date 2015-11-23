/**
 * Created by wathmal on 10/29/15.
 */

import TwitterScraper from './api/TwitterScraper';
import TweetStore from './api/TweetStore';

var express= require('express');



var app= express();

const username= 'BApikz';


let store= new TweetStore(username);
//let scraper = new TwitterScraper(username, store);
//scraper.getRecentTweets();


store.getTweetsFromCollection(10,10).then(docs => {
    docs.forEach(tweet => {
        console.log(JSON.stringify(tweet.text));
    })
});



/*

app.get('/', function(req, res){

    res.json({status: "doneeee na ne :P"});
});
*/

export default app;