import React from 'react';

import styles from './noData.module.css';

import noDataPic from '../../static/noDataPic.svg';

function NoData() {
  return (
    <div className={styles.div}>
      <h1 className={styles.title}> Товары не найдены </h1>
      <img className={styles.pic} src={noDataPic} alt="" />
    </div>
  );
}

export default NoData;
