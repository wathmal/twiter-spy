/**
 * Created by wathmal on 11/28/15.
 */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../../decorators/withStyles';
import Tweet from './Tweet/MTweet';
import Pager from './Pager/Pager';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import TweetStore from './../../../stores/TweetStore';
import HomePageActionCreators from './../../../actions/HomePageActionCreators';


class TweetList extends Component {
  static propTypes = {
    tweets: PropTypes.array,
  };

  constructor() {
    super();
  }
  componentDidMount() {

  }

  loadMoreTweets(e){
    e.preventDefault();

    // HomePageActionCreators.nextPage();
    const searchText = TweetStore.getSearchText();
    let page = TweetStore.getPageNo();
    if(searchText === ''){
      HomePageActionCreators.receiveTweets(++page);
    }
    else{
      HomePageActionCreators.searchTweets(searchText, ++page);

    }

    console.log(TweetStore.getSearchText());
    console.log(TweetStore.getPageNo());

  }

  render() {
    const Tweets = [];
    this.props.tweets.forEach(tweet => {
      if(tweet._source.hasOwnProperty('retweeted_status')) {
        Tweets.push(<Tweet key={tweet['_source']['retweeted_status']['id_str']} {...tweet['_source']['retweeted_status']} />);
      }
      else{
        Tweets.push(<Tweet key={tweet['_source']['id_str']} {...tweet['_source']} />);
      }

    });
    /*for (let key in this.props.tweets) {
      // console.log(this.props.tweets[key].tweet);
      Tweets.push(<Tweet {...this.props.tweets[key].tweet} />);

    }*/


    return (
      <div className="tweet-list">
        <div className="tweet-list-container">
          {Tweets}


        </div>
        <div className="tweet-list-panel text-center" style={{paddingTop: '20px', paddingBottom: '20px'}}>

          <RaisedButton secondary={true} label="load more" labelPosition="after" onTouchTap={this.loadMoreTweets} />
        </div>
      </div>
    );
  }
}

export default TweetList;
