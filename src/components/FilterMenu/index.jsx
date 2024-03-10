import React, { useState } from 'react';

import styles from './filterMenu.module.css';
import FilterOption from '../FilterOption';
import { BRANDS } from '../../constants/constants';
import {Slider} from 'antd';

const [brands, setBrands] = useState([]);
const [price, setPrice] = useState(0);
const [nameOfProduct, setNameOfProduct] = useState('');

const FilterMenu = () => {
  return (
    <div className={styles.menu}>
      {/* brand */}
      <FilterOption
        colors={
                    {
                      primary: '#82868a',
                      secondary: '#47484a',
                      tertiary: 'white',
                    }
                }
        placeholder="Введите название бренда"
        tagsList={BRANDS}
      />
      {/* Product */}
      <input type="text" />
      {/* Price */}
      <input type="text" onChange={} />
      <button className={styles.submitBtn}>Применить фильтры</button>
    </div>
  );
}

export default FilterMenu;
