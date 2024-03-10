import React from 'react';
import styles from './app.module.css';
import ListOfProducts from '../ListOfProducts';
import Header from '../Header';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <ListOfProducts />
    </div>
  );
}

export default App;
