/**
 * Created by wathmal on 11/28/15.
 */
import React, { PropTypes, Component } from 'react';
import HomePageActionCreators from './../../../../actions/HomePageActionCreators';


class Pager extends Component {

  constructor() {
    super();/*
    this.page = 0;
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePrevButton = this.handlePrevButton.bind(this);*/
  }

  c/*omponentDidMount() {
    HomePageActionCreators.receiveTweets(this.page);
  }

  handleNextButton(e) {
    e.preventDefault();
    if (this.page - 1 >= 0) {
      HomePageActionCreators.receiveTweets(--this.page);
    }
  }

  handlePrevButton(e) {
    e.preventDefault();
    HomePageActionCreators.receiveTweets(++this.page);
  }*/
  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Pager;
