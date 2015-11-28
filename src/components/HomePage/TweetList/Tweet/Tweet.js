import React, { PropTypes, Component } from 'react';
import withStyles from '../../../../decorators/withStyles';

class Tweet extends Component {

  static propTypes = {
    screenname: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div className="list-group-item">
        <li className="media">
          <div className="media-left">
            <a href="#">
              <img className="media-object" width="64" src= {this.props.image} alt={this.props.screenname} />
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{this.props.screenname}</h4>
            {this.props.text}
          </div>
        </li>
      </div>
    );
  }
}

export default Tweet;
