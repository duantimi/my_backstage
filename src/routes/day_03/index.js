import React, { Component } from 'react';
import styles from './assets/index.less';
import { Map, Marker, InfoWindow } from 'react-amap';
const mapKey = '35f764e76a1e04e9cbfe3c124bcca69f'; //需要到高德官网申请

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        longitude: 104.065718,
        latitude: 30.601788,
      },
    };
  }

  render() {
    const { center } = this.state;
    return (
      <div className={styles.map}>
        <h2>Markers</h2>
        <Map amapkey={mapKey} center={center} zoomEnable={true} zoom={16}>
          <Marker position={center}>
            <div className={styles.signIcon} />
          </Marker>
          <InfoWindow position={[104.066218, 30.602388]} visible={true} size={{ width: 364, height: 118 }} isCustom>
            <div className={styles.infoWindowBox}>
              <div className={styles.infoWindow} />
              <div>
                <h2 style={{ fontWeight: 'bold', margin: 0 }}>凯德天府</h2>
                <span>云智慧(成都分公司)</span>
              </div>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
