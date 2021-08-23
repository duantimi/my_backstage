import React, { Component } from 'react';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.htView = React.createRef();
  }
  componentDidMount() {
    var dataModel = new ht.DataModel();
    window.dm = dataModel;
    var graphView = new ht.graph.GraphView(dataModel);
    var view = graphView.getView();
    view.style.width = '100%';
    view.style.height = '100%';
    this.htView.current.appendChild(view);
    graphView.enableToolTip();
    graphView.deserialize('/public/storage4/scenes/card.json');
  }
  render() {
    return <div ref={this.htView} style={{ width: '500px', height: '500px' }} />;
  }
}
