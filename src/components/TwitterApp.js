/**
 * Created by wathmal on 11/15/15.
 */

import React, { Component } from 'react';

class TwitterApp extends Component {
    constructor() {
        super();
        this.state= {tweets: []};
    }

    componentDidMount(){

    }
    render() {
        return (<div>hello app handler</div>);
    }
}

export default TwitterApp;