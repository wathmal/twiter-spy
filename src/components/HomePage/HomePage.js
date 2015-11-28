/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './HomePage.scss';
import withStyles from '../../decorators/withStyles';
import TweetList from './TweetList/TweetList';
@withStyles(styles)
class LoginPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'twitter spy';
    this.context.onSetTitle(title);

    const tweet = {screenname: 'wathmal', image: 'https://pbs.twimg.com/profile_images/574199826545405952/eb7Ci0y8.png', text: 'i am awesomeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!'};
    const tweets = [tweet, tweet, tweet];

    return (
      <div className="HomePage">
        <div className="container">
          <TweetList tweets= {tweets} />
        </div>
      </div>
    );
  }

}

export default LoginPage;
