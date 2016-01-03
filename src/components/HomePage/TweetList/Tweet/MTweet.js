import React, { PropTypes, Component,  } from 'react';
import twitter from 'twitter-text';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';


import withStyles from '../../../../decorators/withStyles';
import style from './Tweet.scss';
const dateFormat = require('dateformat');


@withStyles(style)
class MTweet extends Component {

  static propTypes = {

  };
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightTheme, {
        avatar: {
          width: '50!important'
        }
      }),
    };
  }

  constructor() {
    super();
    twemoji.size = '36x36';
  }


  parseEmoji(text) {
    let twitterText = twitter.autoLink(text.toLowerCase());
    return twemoji.parse(twitterText);
  }

  toUpper(text) {
    return text.toUpperCase();
  }


  render() {
    const date= new Date(this.props.created_at);

    const dateString = dateFormat(date, "yyyy-mm-dd hh:MM TT");
    const body = <p dangerouslySetInnerHTML={{__html: this.parseEmoji(this.props.text)}}></p>;

    // console.log(this.props.hasOwnProperty('retweeted_status'));
    const isAReply = this.props.in_reply_to_status_id !== null;
    const isACheckIn = this.props.geo !== null;


    return (
      <Card>
        <CardHeader
          title={this.toUpper(this.props.user.name)}
          subtitle={dateString}
          avatar={this.props.user.profile_image_url}/>

        <CardText style={{padding: '0 16px 0 16px', fontSize: '20px', fontWeight:'400', lineHeight: '22px'}}>{body}</CardText>
        <CardActions className="pull-right" style={{paddingTop: '0', paddingBottom: '0'}}>

          <IconButton iconStyle={{color: '#4CAF50'}} iconClassName="mdi mdi-reply" />
          <IconButton iconStyle={{color: '#2196F3'}} iconClassName="mdi mdi-map-marker" />
          <IconButton iconClassName="mdi mdi-dots-vertical" />

        </CardActions>
      </Card>
    );
  }
}

export default MTweet;
