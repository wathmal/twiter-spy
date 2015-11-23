/**
 * Created by wathmal on 11/17/15.
 */
import React, { PropTypes, Component } from 'react';
import Tweet from './Tweet';
class TweetList extends Component {
    static propTypes= {
        tweets: PropTypes.array,
    };

    render() {
        const tweets= this.props.tweets.map(tweet => {
           return (<Tweet text={tweet.text} username={tweet.screenname} />);
        });

        return (<div>{tweets}</div>);
    }
}

export default TweetList;