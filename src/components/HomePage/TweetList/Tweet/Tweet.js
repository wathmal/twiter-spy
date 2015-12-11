import React, { PropTypes, Component } from 'react';
import withStyles from '../../../../decorators/withStyles';
import style from './Tweet.scss';

@withStyles(style)
class Tweet extends Component {

  static propTypes = {
  };

  constructor() {
    super();
    twemoji.size = '36x36';
  }

  parseEmoji(text){
    const emojify= twemoji.parse(text);
    return twemoji.parse(text);
  }

  render() {
    // console.log(this.props.hasOwnProperty('retweeted_status'));
    let body;
    if (this.props.hasOwnProperty('retweeted_status')) {
      body = <Tweet {...this.props.retweeted_status} />;
    }
    else {
      body = <p dangerouslySetInnerHTML={{__html: this.parseEmoji(this.props.text)}}></p>;

    }

    return (
      <div className="list-group-item">
        <div className="media">
          <div className="media-left media-top">
            <a href="#">
              <img className="media-object  img-rounded" src= {this.props.user.profile_image_url} alt={this.props.user.screen_name} />
            </a>
          </div>
          <div className="media-body">
            <div className="media-heading">
              <h6>{'@'+this.props.user.screen_name}</h6>
            </div>
            {body}
          </div>
        </div>
      </div>
    );
  }
}

export default Tweet;
