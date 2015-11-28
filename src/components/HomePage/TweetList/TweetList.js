/**
 * Created by wathmal on 11/28/15.
 */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../../decorators/withStyles';
import Tweet from './Tweet/Tweet';
import Pager from './Pager/Pager';

class TweetList extends Component {
  static propTypes = {
    tweets: PropTypes.array,
  };

  constructor() {
    super();
  }

  render() {
    const Tweets = [];
    this.props.tweets.forEach(tweet => {
      Tweets.push(<Tweet {...tweet} />);
    });

    return (
      <div className="col-md-6 col-md-offset-3">
        <ul className="list-group">
          {Tweets}
        </ul>
        <Pager />
      </div>
    );
  }
}

export default TweetList;
