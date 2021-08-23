import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class personnel extends Component {
  render() {
    return (
      <div>
        personnel：人事部门
        <p>
          <Link to="/my/c">我们的技术：</Link>
        </p>
        <p>
          <Link to="/topology">拓扑图</Link>
        </p>
      </div>
    );
  }
}
