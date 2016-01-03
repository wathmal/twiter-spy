/**
 * Created by wathmal on 11/14/15.
 */

import mongoose from 'mongoose';
import tweetModel from '../models/tweet.js';
import Promise from 'promise';
import logger from './../utils/logger';

const MONGO_DUP_KEY_ERR_CODE= 11000;
class TweetService {


  constructor(username){

    this.tweetModel= new tweetModel(username);
    this.username = username;
    // console.log(this.username);
    // console.log(this.tweetModel);
    /*try{
     mongoose.connect('mongodb://localhost/twitter');
     }
     catch (e){
     console.log(e);
     }*/
  }

  insetInToCollection(tweets){
    // reverse order the tweets
    // latest the last
    // console.log(this.username);
    return new Promise((fulfill, reject) =>{
      this.tweetModel.create(tweets, (err, docs) => {
        if(err){
          // console.log(err);
          reject(err);
        }
        else{
          // console.log(`inserted ${docs.length}`);
          //
          // console.log(tweets);
          if(docs.constructor === Array){
            logger.info(`inserted ${docs.length} tweets to @${this.username}`);
          }
          else{
            logger.info(`inserted 1 tweet to @${this.username}`);
          }
          fulfill(docs);
        }
      })
    });

  }

  getLastTweetId() {

    return new Promise( (fulfill, reject) =>{
      this.tweetModel.findOne().sort({id: -1}).exec(function (err, doc) {
        //console.log(doc.id);
        if(doc != null) {
          fulfill(doc.id);
        }
        else{
          // send null, so it knows that no tweets are there
          fulfill(doc);
        }
      });
    })

  }

  getFirstTweetId() {
    return new Promise( (fulfill, reject) =>{
      this.tweetModel.findOne().sort({id: 1}).exec(function (err, doc) {
        //console.log(doc.id);
        if(doc != null) {
          fulfill(doc.id);
        }
        else{
          // send null, so it knows that no tweets are there
          fulfill(doc);
        }
      });
    })
  }

  getTweetsFromCollection(from, to) {
    return new Promise( (fulfill, reject) => {
      this.tweetModel.find({},{_id: 0}).sort({id: -1}).skip(from).limit(to).exec(function (err, docs) {

        if(docs != null) {
          fulfill(docs);
        }
        else{
          // send null, so it knows that no tweets are there
          // fulfill(null);
          reject(err);
        }
      });
    })
  }

  searchTweets(query, from, to) {
    return new Promise( (fulfill, reject) => {
      this.tweetModel.find({'$text':{'$search':query}},{_id: 0}).sort({id: -1}).skip(from).limit(to).exec(function (err, docs) {

        if(docs != null) {
          fulfill(docs);
        }
        else{
          // send null, so it knows that no tweets are there
          // fulfill(null);
          reject(err);
        }
      });
    })
  }


}

export default TweetService;
