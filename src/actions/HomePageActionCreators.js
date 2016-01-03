/**
 * Created by wathmal on 12/6/15.
 */
import AppDispatcher from '../core/Dispatcher';
import AppConstants from '../constants/ActionTypes';
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
    client.search({
      index: 'twitter',
      type: 'wathmals',
      from: from,
      size: MAX_TWEETS_PER_PAGE,
      body: {
        query: {
          match_all: {}
        },
        "sort": {"id": {"order": "desc"}}
      }
    }).then(function (resp) {
      var hits = resp.hits.hits;
      AppDispatcher.handleAction({
        actionType: AppConstants.RECEIVE_TWEETS,
        data: hits,
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

    client.search({
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
    }).then(function (resp) {
      var hits = resp.hits.hits;
      AppDispatcher.handleAction({
        actionType: AppConstants.RECEIVE_TWEETS,
        data: hits,
      });
    }, function (err) {
      console.trace(err.message);
    });
  }



}
export default HomePageActionCreators;
