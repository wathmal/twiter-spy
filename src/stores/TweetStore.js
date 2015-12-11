/**
 * Created by wathmal on 12/6/15.
 */

import AppDispatcher from '../core/Dispatcher';
import AppConstants from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';

const CHANGE_TEXT = 'change';

let _recentTweets = {};

/*
 * imagine these as setters for store only accessible by the store
 * */
function loadTweets(data) {
  _recentTweets = data;
}

class TweetStore extends EventEmitter {


  constructor() {
    super();
  }

  getRecentTweets() {
    return _recentTweets;
  }

  emitChange() {
    this.emit(CHANGE_TEXT);
  }

  addChangeListener(callback, context) {
    this.on(CHANGE_TEXT, callback, context);
  }

}

const tweetStore = new TweetStore();

tweetStore.dispatchToken = AppDispatcher.register(function(payload) {
  const action = payload.action;

  switch (action.actionType) {

  case AppConstants.RECEIVE_TWEETS:
    loadTweets(action.data);
    tweetStore.emitChange();
    break;

  default:
    return true;
  }
});

export default tweetStore;
