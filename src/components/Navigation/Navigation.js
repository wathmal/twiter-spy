/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import HomePageActionCreators from './../../actions/HomePageActionCreators';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';


@withStyles(styles)
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,

  };

  constructor(){
    super();
    this.handleSearch =  this.handleSearch.bind(this);
  }

  handleSearch(e){
    e.preventDefault();
    // var input= React.findDOMNode(this.refs.searchInput).value;
    let input = this.refs.searchInput.getValue();
    console.log(input);
    if(input !== null) {
      HomePageActionCreators.searchTweets(input, 0);
    }
  }



  render() {
    return (
      <Toolbar>
        <ToolbarGroup float="left">
          <FontIcon className="mdi mdi-twitter" style={{fontSize: '22', paddingRight: '24'}} />
          <ToolbarTitle text="twitter spy" />
          <ToolbarSeparator />
        </ToolbarGroup>


        <ToolbarGroup float="right">
          <RaisedButton label="search tweets" secondary={true} onTouchTap={this.handleSearch} />


        </ToolbarGroup>
        <ToolbarGroup float="right">
          <TextField ref="searchInput" hintText="any text here ..." />
        </ToolbarGroup>

        <ToolbarGroup float="right">

          <RaisedButton label="from" disabled={false} />
          <DropDownMenu value={1}>
            <MenuItem value={1} primaryText="search all" />
            <MenuItem value={2} primaryText="on specific date" />
            <MenuItem value={3} primaryText="on date range" />
          </DropDownMenu>
          <RaisedButton label="to" disabled={true} />



        </ToolbarGroup>


      </Toolbar>
    );
  }

}

export default Navigation;
