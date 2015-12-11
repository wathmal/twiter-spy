/**
 * Created by wathmal on 11/18/15.
 */

import JsonGraph from 'falcor-json-graph';
import Router from 'falcor-router';
import TweetService from './../services/TweetService';
const $atom = JsonGraph.atom;

const username = 'BApikz';

class FalcorRouter extends
  Router.createClass([
    /*
     * Route to get all stats from db
     * */
    {
      // route: 'tweets[{integers:indices}]["text", "screen_name", "image", "created_at", "in_reply_to_status_id"]',
      route: 'tweets[{integers:indices}]["tweet"]',
      get: function(pathSet) {
        // console.log(pathSet);

        const index = pathSet[1];
        return this.tweetService.getTweetsFromCollection(index[0], index[index.length - 1]).then(
          tweets => {
            return pathSet.indices.map(tweetindex => {
              return {path: ['tweets', tweetindex, 'tweet'], value: $atom(tweets[tweetindex - 1])};
            });
          }
        );
      },
    },

    {
      // route: 'tweets[{integers:indices}]["text", "screen_name", "image", "created_at", "in_reply_to_status_id"]',
      route: 'search[{integers:indices}]["tweet"]',
      get: function(pathSet) {
        // console.log(pathSet);

        const index = pathSet[1];
        return this.tweetService.searchTweets('wathmal', index[0], index[index.length - 1]).then(
          tweets => {
            return pathSet.indices.map(tweetindex => {
              return {path: ['search', tweetindex, 'tweet'], value: $atom(tweets[tweetindex - 1])};
            });
          }
        );
      },
    },

  ])
{

  constructor() {
    super();
    // create database connection in here, so the app can use it globally.
    // mongoose.connect('mongodb://dev:educate@ds047514.mongolab.com:47514/educatelanka');
    // mongoose.connect('mongodb://localhost/edulanka');

    this.tweetService = new TweetService(username);
  }

}

export default FalcorRouter;
