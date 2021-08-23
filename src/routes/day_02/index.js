import React, { Component } from 'react';
import styles from './assets/index.less';
import { Map, Markers } from 'react-amap';
const mapKey = '35f764e76a1e04e9cbfe3c124bcca69f'; //需要到高德官网申请

const randomMarker = (len) =>
  Array(len)
    .fill(true)
    .map((e, idx) => ({
      position: {
        longitude: 100 + Math.random() * 30,
        latitude: 30 + Math.random() * 20,
      },
    }));

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.markers = randomMarker(10);
    this.mapCenter = { longitude: 115, latitude: 40 };
    this.markersEvents = {
      created: (allMarkers) => {
        console.log('All Markers Instance Are Below');
        console.log(allMarkers);
      },
      click: (MapsOption, marker) => {
        console.log('MapsOptions:');
        console.log(MapsOption);
        console.log('marker:');
        console.log(marker);
      },
      dragend: (MapsOption, marker) => {
        /* ... */
      },
    };
  }

  render() {
    return (
      <div className={styles.map}>
        <h2>多点标记</h2>
        <Map amapkey={mapKey} center={this.mapCenter} zoomEnable={true} zoom={2}>
          <Markers markers={this.markers} events={this.markersEvents} useCluster />
        </Map>
      </div>
    );
  }
}
