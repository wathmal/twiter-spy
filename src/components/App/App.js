/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.scss';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Footer from '../Footer';
import injectTapEventPlugin from 'react-tap-event-plugin';


@withContext
@withStyles(styles)
class App extends Component {


  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  constructor() {
    super();
    injectTapEventPlugin();

  }
  render() {
    return !this.props.error ? (
      <div>
        <Header />
        {this.props.children}
      </div>
    ) : this.props.children;
  }

}

export default App;
