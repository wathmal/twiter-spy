/**
 * Created by wathmal on 11/28/15.
 */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../../decorators/withStyles';
import Tweet from './Tweet/Tweet';
import Pager from './Pager/Pager';

class TweetList extends Component {
  static propTypes = {
    tweets: PropTypes.object,
  };

  constructor() {
    super();
  }

  render() {
    const Tweets = [];
/*    this.props.tweets.forEach(tweet => {
      Tweets.push(<Tweet {...tweet} />);
    });*/
    for (let key in this.props.tweets) {
      // console.log(this.props.tweets[key].tweet);
      Tweets.push(<Tweet {...this.props.tweets[key].tweet} />);

    }

    return (
      <div className="col-md-6 col-md-offset-6">
        <Pager />
        <ul className="list-group">
          {Tweets}
        </ul>
      </div>
    );
  }
}

export default TweetList;
