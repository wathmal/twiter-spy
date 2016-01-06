/**
 * Created by wathmal on 12/6/15.
 */
import AppDispatcher from '../core/Dispatcher';
import AppConstants from '../constants/ActionTypes';
import ESQueryBuilder from './../api/ESQueryBuilder';

import Falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
  host: '188.166.248.79:9200',
  log: 'trace'
});


const model = new Falcor.Model({source: new FalcorDataSource('/model.json')});
const MAX_TWEETS_PER_PAGE = 10;

class HomePageActionCreators {

  static receiveTweets(page) {

    AppDispatcher.handleAction({
      actionType: AppConstants.SET_PAGE_NO,
      data: page,
    });

    const from = 0 + page * MAX_TWEETS_PER_PAGE;
    const to = 9 + page * MAX_TWEETS_PER_PAGE;
    client.search(
      ESQueryBuilder.getRangeSearchQuery()
    ).then(function (resp) {
      /*console.log('total tweets : '+ resp.hits.total);
      console.log('total statuses : '+ resp.aggregations.status_count.doc_count);
      console.log('total replies : '+ resp.aggregations.reply_count.doc_count);
      console.log('total retweets : '+ resp.aggregations.retweet_count.doc_count);*/
      var hits = resp.hits.hits;
      AppDispatcher.handleAction({
        actionType: AppConstants.RECEIVE_TWEETS,
        data: hits,
      });
      AppDispatcher.handleAction({
        actionType: AppConstants.TWEET_STATS,
        stat_data: resp.aggregations,
        total_data: resp.hits.total,
      });
    }, function (err) {
      console.trace(err.message);
    });
    /*model
     .get(['tweets', {from: from, to: to}, ['tweet']])
     .then(response => {
     console.log(response);
     AppDispatcher.handleAction({
     actionType: AppConstants.RECEIVE_TWEETS,
     data: response.json.tweets,
     });
     });*/
  }

  static searchTweets(query, page) {


    const from = 0 + page * MAX_TWEETS_PER_PAGE;

    AppDispatcher.handleAction({
      actionType: AppConstants.SET_SEARCH_TEXT,
      data: query,
    });

    AppDispatcher.handleAction({
      actionType: AppConstants.SET_PAGE_NO,
      data: page,
    });

    /*{
     index: 'twitter',
     type: 'wathmals',
     from: from,
     size: MAX_TWEETS_PER_PAGE,
     body: {
     query: {
     match: {text: query}
     },
     "sort": {"id": {"order": "desc"}}
     }
     }
    * */
    client.search(
      ESQueryBuilder.getRangeSearchQuery()
    ).then(function (resp) {
      var hits = resp.hits.hits;
      AppDispatcher.handleAction({
        actionType: AppConstants.RECEIVE_TWEETS,
        data: hits,
      });
      AppDispatcher.handleAction({
        actionType: AppConstants.TWEET_STATS,
        stat_data: resp.aggregations,
        total_data: resp.hits.total,
      });
    }, function (err) {
      console.trace(err.message);
    });
  }

  static setFromDate(date){
    AppDispatcher.handleAction({
      actionType: AppConstants.SET_FROM_DATE,
      data: date,
    });
  }

  static setToDate(date){
    AppDispatcher.handleAction({
      actionType: AppConstants.SET_TO_DATE,
      data: date,
    });
  }

  static setPageNo(page){
    AppDispatcher.handleAction({
      actionType: AppConstants.SET_PAGE_NO,
      data: page,
    });
  }
}
export default HomePageActionCreators;
