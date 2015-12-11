/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles)
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <a className="navbar-brand" href="#">
          <img src={require('./brand.png')}/>
        </a>
        <ul className="nav navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">dashboard <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">about</a>
          </li>
        </ul>
        <form className="form-inline navbar-form pull-right">
          <input className="form-control" type="text" placeholder="search" />
            <button className="btn btn-success-outline" type="submit">search</button>
        </form>
      </nav>
    );
  }

}

export default Navigation;
