/**
 * Created by wathmal on 12/6/15.
 */

import AppDispatcher from '../core/Dispatcher';
import AppConstants from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';

const CHANGE_TEXT = 'change';

let _filteredTweets = [];
let _searchText= '';
let _fromDate = null;
let _toDate= null;
let _pageNo = 0;
/*
 * imagine these as setters for store only accessible by the store
 * */
function loadTweets(data) {
  _filteredTweets = data;
}

function setSearchText(text) {
  _searchText = text;
}

function setPageNo(no) {
  _pageNo = no;
}

function setFromDate(date) {
  _fromDate = date;
}

function setToDate(date) {
  _toDate = date;
}

class TweetStore extends EventEmitter {


  constructor() {
    super();
  }

  getFilteredTweets() {
    return _filteredTweets;
  }

  getSearchText() {
    return _searchText;
  }

  getPageNo() {
    return _pageNo;
  }

  getFromDate() {
    return _fromDate;
  }

  getToDate() {
    return _toDate;
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
/*
  case AppConstants.RECEIVE_SEARCHED_TWEETS:
    loadSearchedTweets(action.data);
    // console.log(action.data);
    tweetStore.emitChange();
    break;*/

  case AppConstants.SET_SEARCH_TEXT:
    setSearchText(action.data);
    tweetStore.emitChange();
    break;

  case AppConstants.SET_PAGE_NO:
    setPageNo(action.data);
    tweetStore.emitChange();
    break;

  case AppConstants.SET_FROM_DATE:
    setFromDate(action.data);
    tweetStore.emitChange();
    break;

  case AppConstants.SET_TO_DATE:
    setToDate(action.data);
    tweetStore.emitChange();
    break;
  default:
    return true;
  }
});

export default tweetStore;
