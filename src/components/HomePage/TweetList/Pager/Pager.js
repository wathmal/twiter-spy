/**
 * Created by wathmal on 11/28/15.
 */
import React, { PropTypes, Component } from 'react';
import HomePageActionCreators from './../../../../actions/HomePageActionCreators';


class Pager extends Component {

  constructor() {
    super();
    this.page = 0;
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePrevButton = this.handlePrevButton.bind(this);
  }

  componentDidMount() {
    HomePageActionCreators.receiveStatistics(this.page);
  }

  handleNextButton(e) {
    e.preventDefault();
    if (this.page - 1 >= 0) {
      HomePageActionCreators.receiveStatistics(--this.page);
    }
  }

  handlePrevButton(e) {
    e.preventDefault();
    HomePageActionCreators.receiveStatistics(++this.page);
  }
  render() {
    return (
      <nav>
        <ul className="pager">
          <li className="previous"><a onClick={this.handlePrevButton} href="#"><span aria-hidden="true">&larr;</span> older</a></li>
          <li className="next"><a onClick={this.handleNextButton} href="#">newer <span aria-hidden="true">&rarr;</span></a></li>
        </ul>
      </nav>
    );
  }
}

export default Pager;
