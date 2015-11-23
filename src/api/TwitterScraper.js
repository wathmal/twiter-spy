/**
 * Created by wathmal on 11/14/15.
 */

import Twitter from 'twitter';
import TweetStore from './TweetStore';
import Promise from 'promise';

const API_MAX= 10;
const MAX_TOTAL_TWEETS= 32;

class TwitterScraper {

    constructor(username, store) {
        this.client = new Twitter({
            consumer_key: 'mrrX1Bm7y7vIkBBMGwNA',
            consumer_secret: 'YuFKEO040WJqaTY4tnIq0NP6DdLVUv7Kk6a7gsbEP8',
            access_token_key: '372841707-bMaiAUiDuVPtBDWy459KQaRtVVU67UozNFCqW787',
            access_token_secret: 'erLSPM6mD372EKODNczd7C63dvUcGrOuAl8Xkz0bS0'
        });
        this.username= username;
        this.store= store;
        this.count= 0;
    }

    // you have to fetch the latest id from database
    // main method governing all other actions
    // later we'll see if there is another ways of doing these eg: run();
    getRecentTweets() {

        this.store.getLastTweetId().then(since_id => {
            console.log(since_id);

            if(since_id != null){
                this.getTweetsWithSinceId(this.username, since_id);
            }

            else {
                /*
                * user is not in the database
                * add user and then fetch all the possible tweets from api
                * */
                this.getAllTweets(this.username);
            }

        });

    }

    getTweetsWithSinceId(username, since_id) {
        const params = {
            screen_name: username,
            trim_user : true,
            include_rts: true,
            since_id: since_id
        };
        this.client.get('statuses/user_timeline', params, (error, tweets, response) => {
            if (!error) {
                console.log(`length of tweets received = ${tweets.length}`);
                // write to the database
                // check if the tweet with same id is received
                if(tweets[tweets.length-1].id === since_id){
                    tweets.pop();
                }

                this.store.insetInToCollection(tweets).then(docs => {
                    // console.log('added');
                });

            }
            else {
                console.log(error);
            }
        });
    }

    getAllTweets(username) {
        const params = {
            screen_name: username,
            trim_user : true,
            include_rts: true,
            count: API_MAX
        };
        this.client.get('statuses/user_timeline', params, (error, tweets, response) => {
            if (!error) {
                console.log(`length of tweets received = ${tweets.length}`);
                // write to the database
                this.store.insetInToCollection(tweets).then(docs => {
                    // count how many tweets are retrieved in getAllTweets()
                    this.count += docs.ops.length;

                    // get all previous tweets
                    let interval= setInterval(()=> {
                        this.getPreviousTweets(username, interval);
                    },6000);

                });
            }
            else {
                console.log(error);
            }
        });
    }

    getPreviousTweets(username, interval) {
        console.log(`tweets in db : ${this.count}`);
        if(this.count >= MAX_TOTAL_TWEETS){
            clearInterval(interval);
            //this.count = 0;
        }
        else {
            this.store.getFirstTweetId().then(max_id => {
                if (max_id != null) {
                    this.getTweetsWithMaxId(username, max_id);
                }
            });
        }
    }

    getTweetsWithMaxId(username, max_id){
        console.log(max_id);
        const params = {
            screen_name: username,
            trim_user : true,
            include_rts: true,
            max_id: max_id,
            count: API_MAX
        };
        this.client.get('statuses/user_timeline', params, (error, tweets, response) => {
            if (!error) {
                console.log(`length of tweets received = ${tweets.length}`);
                // check if the tweet with same id is received
                if(tweets[0].id === max_id) {
                    tweets.shift();
                }
                // write to the database
                this.store.insetInToCollection(tweets).then(docs => {
                    // console.log('added');
                    // count how many tweets are retrieved in getAllTweets()
                    this.count += docs.ops.length;
                });

            }
            else {
                console.log(error);
            }
        });
    }
}

export default TwitterScraper;