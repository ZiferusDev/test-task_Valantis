import React from 'react';

import styles from './logo.module.css';
import logo from '../../static/Logotype.svg';
import brandName from '../../static/BrandName.svg';

function Logo() {
  return (
    <div className={styles.logo}>
      <img draggable={false} className={styles.logotype} alt="Logotype" src={logo} />
      <img draggable={false} className={styles.logotype} alt="Valatis" src={brandName} />
    </div>
  );
}

export default Logo;
