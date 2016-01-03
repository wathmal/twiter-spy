/**
 * Created by wathmal on 1/3/16.
 */
import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';


const PieChart = require("react-chartjs").Pie;


class TweetStats extends Component {

    static propTypes = {};

    constructor() {
        super();
    }

    render() {
      const data = [
        {
          value: 310,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "statuses"
        },
        {
          value: 100,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "replies"
        },
        {
          value: 20,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "retweets"
        }
      ];


      return (
        <div className="tweet-stats">


          <Paper zDepth={1} style={{paddingBottom: '20px'}}>
            <AppBar
              title="search results for &#8220;yow&#8221;"
              style={{marginBottom: '20px'}}
            />

            <div className="tweet-stats-heading text-center">
              <h1>245 FOUND</h1>
            </div>
            <div className="pie-chart-container text-center">

              <PieChart data={data} />
            </div>
            <Divider />

            <div className="tweet-stat-js-filters" style={{height: '100px'}}>

                <DropDownMenu value={1} className="pull-right">
                  <MenuItem value={1} primaryText="yearly"/>
                  <MenuItem value={2} primaryText="monthly"/>
                  <MenuItem value={3} primaryText="weekly"/>
                  <MenuItem value={4} primaryText="daily"/>
                </DropDownMenu>
            </div>

          </Paper>

        </div>
      );
    }
}

export default TweetStats;
