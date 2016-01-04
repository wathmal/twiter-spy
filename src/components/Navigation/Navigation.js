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
    this.state = {selectedSearchType: 1, fromDateOpen: false};
    this.handleSearchButton =  this.handleSearchButton.bind(this);
    this.handleFromButton = this.handleFromButton.bind(this);
    this.handleToButton = this.handleToButton.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  handleSearchButton(e){
    e.preventDefault();
    // var input= React.findDOMNode(this.refs.searchInput).value;
    let input = this.refs.searchInput.getValue();
    console.log(input);
    if(input !== null) {
      HomePageActionCreators.searchTweets(input, 0);
    }
  }

  handleDropdown(e, index, value){
    e.preventDefault();
    this.setState({selectedSearchType: value});
    console.log(index);

    HomePageActionCreators.setFromDate(null);
    HomePageActionCreators.setToDate(null);

  }

  handleFromButton(e){
    e.preventDefault();
    this.refs.dateFrom.openDialog();
  }

  handleFromDatePicker(e, date){
    console.log(date);
    HomePageActionCreators.setFromDate(date);
  }

  handleToButton(e){
    e.preventDefault();
    this.refs.dateTo.openDialog();
  }

  handleToDatePicker(e, date){
    console.log(date);
    HomePageActionCreators.setToDate(date);
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
          <RaisedButton label="search tweets" secondary={true} onTouchTap={this.handleSearchButton} />


        </ToolbarGroup>
        <ToolbarGroup float="right">
          <TextField ref="searchInput" hintText="any text here ..." />
        </ToolbarGroup>

        <ToolbarGroup float="right">


          <DropDownMenu value={this.state.selectedSearchType} onChange={this.handleDropdown}>
            <MenuItem value={1} primaryText="search all" />
            <MenuItem value={2} primaryText="on specific date" />
            <MenuItem value={3} primaryText="on date range" />
          </DropDownMenu>
          <DatePicker ref="dateFrom" style={{display: 'none'}} onChange={this.handleFromDatePicker} />
          <RaisedButton label="from" disabled={!(this.state.selectedSearchType >= 2)} onTouchTap={this.handleFromButton} />

          <DatePicker ref="dateTo" style={{display: 'none'}} onChange={this.handleToDatePicker} />
          <RaisedButton label="to" disabled={!(this.state.selectedSearchType == 3)} onTouchTap={this.handleToButton} />



        </ToolbarGroup>


      </Toolbar>
    );
  }

}

export default Navigation;
