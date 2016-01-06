/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './HomePage.scss';
import withStyles from '../../decorators/withStyles';
import TweetList from './TweetList/TweetList';

import TweetStore from './../../stores/TweetStore';
import HomePageActionCreators from './../../actions/HomePageActionCreators';
import TweetStats from './TweetStats/TweetStats';

@withStyles(styles) class LoginPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    // this.model = new Falcor.Model({source: new FalcorDataSource('/model.json')});
    this.state = this.getHomePageState();
  }


  componentDidMount() {
    /*    this.model
     .get(['tweets', {from: 0, to: 9}, ['tweet']], ['search', {from: 0, to: 9}, ['tweet']])
     .then(response => {
     console.log(response);
     this.setState({tweets: response.json.tweets});
     });*/
    TweetStore.addChangeListener(this._onChange, this);
    HomePageActionCreators.receiveTweets(0);
  }

  getHomePageState() {
    return {
      recentTweets: TweetStore.getFilteredTweets(),
      totalTweets: TweetStore.getTotalTweets(),
      totalStatuses: TweetStore.getTotalStatuses(),
      totalReplies: TweetStore.getTotalReplies(),
      totalRetweets: TweetStore.getTotalRetweets(),
    };
  }

  _onChange() {
    this.setState(this.getHomePageState());
  }

  render() {
    const title = 'twitter spy';
    this.context.onSetTitle(title);

    return (
      <div className="homepage">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-5 col-md-offset-3">
              <TweetList tweets={this.state.recentTweets}/>

            </div>
            <div className="col-md-4">
              <TweetStats totalTweets={this.state.totalTweets} totalStatuses={this.state.totalStatuses}
                          totalReplies={this.state.totalReplies} totalRetweets={this.state.totalRetweets}/>
            </div>
          </div>

        </div>
      </div>
    );
  }

}

export default LoginPage;
