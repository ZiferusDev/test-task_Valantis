import React from 'react';
import styles from './productItem.module.css';

function ProductItem({ productData }) {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        id:
        {productData.id}
      </div>
      <div className={styles.info}>
        Товар:
        {productData.product}
      </div>
      <div className={styles.info}>
        Цена:
        {productData.price}
        {' '}
        ₽
      </div>
      <div className={styles.info}>
        Бренд:
        {productData.brand ? productData.brand : 'Не указан'}
      </div>
    </div>
  );
}

export default ProductItem;
