/**
 * Created by wathmal on 11/14/15.
 */
import mongoose from 'mongoose';
import tweetModel from './../models/tweet.model.js';
import Promise from 'promise';

class TweetService {

  constructor(username) {
    // console.log(tweetModel(username));
    this.tweetModel = tweetModel(mongoose, username);
    try {
      mongoose.connect('mongodb://localhost/twitter');
      // mongoose.connect('mongodb://wathmal:wadamala@ds059804.mongolab.com:59804/apeksha');
    } catch (e) {
      console.log(e);
    }
  }

  insetInToCollection(tweets) {
    // reverse order the tweets
    // latest the last
    return new Promise((fulfill, reject) => {
      this.tweetModel.collection.insert(tweets.reverse(), function (err, docs) {
        if (err) {
          console.log(err);
          reject(err);
        }
        else {
          console.log(`inserted ${docs.ops.length}`);
          fulfill(docs);
        }
      })
    });

  }

  getLastTweetId() {

    return new Promise((fulfill, reject) => {
      this.tweetModel.findOne().sort({id: -1}).exec(function (err, doc) {
        //console.log(doc.id);
        if (doc != null) {
          fulfill(doc.id);
        }
        else {
          // send null, so it knows that no tweets are there
          fulfill(doc);
        }
      });
    })

  }

  getFirstTweetId() {
    return new Promise((fulfill, reject) => {
      this.tweetModel.findOne().sort({id: 1}).exec(function (err, doc) {
        //console.log(doc.id);
        if (doc != null) {
          fulfill(doc.id);
        }
        else {
          // send null, so it knows that no tweets are there
          fulfill(doc);
        }
      });
    })
  }

  getTweetsFromCollection(from, to) {
    return new Promise( (fulfill, reject) => {
      this.tweetModel.find({}, {_id: 0}).sort({id: -1}).skip(from).limit(to).exec(function (err, docs) {

        if(docs != null) {
          // console.log(docs);
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

  searchTweets(query, from, to){
    return new Promise( (fulfill, reject) => {
      this.tweetModel.find({ $text: { $search: query } }, {_id: 0}).sort({id: -1}).skip(from).limit(to).exec(function (err, docs) {

        if(docs != null) {
          // console.log(docs);
          fulfill(docs);
        }
        else{
          // send null, so it knows that no tweets are there
          // fulfill(null);
          reject(err);
        }
      });
    });
  }


}

export default TweetService;
