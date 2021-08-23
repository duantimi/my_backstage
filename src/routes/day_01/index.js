import React, { Component } from 'react';
import styles from './assets/index.less';
import { Map, Marker, InfoWindow } from 'react-amap';
const mapKey = '35f764e76a1e04e9cbfe3c124bcca69f'; //需要到高德官网申请

export default class Index extends Component {
  render() {
    return (
      <div className={styles.map}>
        <h2>单点标记</h2>
        <Map
          amapkey={mapKey}
          // location={104.065718,30.601788}
          center={[104.065718, 30.601788]}
          zoomEnable={false}
          zoom={16}
        >
          <Marker position={[104.065718, 30.601788]}>
            <div className={styles.signIcon} />
          </Marker>
          {/* <InfoWindow
            position={{ longitude: 104.065718, latitude: 30.601788 }}
            visible={true}
            size={{ width: 364, height: 118 }}
            isCustom
          >
            <div className={styles.styleT}> </div>
            <h2 style={{ fontWeight: 'bold' }}>凯德天府</h2>
            <span style={{ width: '334px' }}>云智慧科技有限公司(成都分公司)</span>
          </InfoWindow> */}
        </Map>
      </div>
    );
  }
}
