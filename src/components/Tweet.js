/**
 * Created by wathmal on 11/17/15.
 */
import React, { PropTypes, Component } from 'react';

class Tweet extends Component {
    static propTypes= {
        text: PropTypes.string,
        username: PropTypes.string,
        avatar: PropTypes.string,
    };


    render() {
        return (
        <div>
            <span><b>{this.props.username}</b></span>
            <div>{this.props.text}</div>
        </div>);
    }
}

export default Tweet;