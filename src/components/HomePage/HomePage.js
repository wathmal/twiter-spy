/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './HomePage.scss';
import withStyles from '../../decorators/withStyles';
import TweetList from './TweetList/TweetList';

import TweetStore from './../../stores/TweetStore';
import HomePageActionCreators from './../../actions/HomePageActionCreators';
@withStyles(styles)
class LoginPage extends Component {

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
  }

  getHomePageState() {
    return {
      recentTweets: TweetStore.getRecentTweets(),
    };
  }

  _onChange() {
    this.setState(this.getHomePageState());
  }
  render() {
    const title = 'twitter spy';
    this.context.onSetTitle(title);

    return (
      <div className="HomePage">
        <div className="container">
          <TweetList tweets= {this.state.recentTweets} />
        </div>
      </div>
    );
  }

}

export default LoginPage;
