import React from 'react';
import styles from './header.module.css';

import Logo from '../Logo';

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
}

export default Header;
