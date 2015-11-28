/**
 * Created by wathmal on 11/28/15.
 */
import React, { PropTypes, Component } from 'react';

class Pager extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <nav>
        <ul className="pager">
          <li className="previous"><a href="#"><span aria-hidden="true">&larr;</span> Older</a></li>
          <li className="next disabled"><a href="#">Newer <span aria-hidden="true">&rarr;</span></a></li>
        </ul>
      </nav>
    );
  }
}

export default Pager;
