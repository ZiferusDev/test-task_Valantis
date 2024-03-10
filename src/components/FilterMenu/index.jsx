import React, { useState } from 'react';
import { Slider } from 'antd';

import styles from './filterMenu.module.css';
import InputWithTags from '../FilterOptions';
import { BRANDS } from '../../constants/constants';

function FilterMenu() {
  const [brandsParam, setBrandsParam] = useState([]);
  const [priceParam, setPriceParam] = useState(false);
  const [nameParam, setNameParam] = useState('');

  const handleClick = () => {
    // Фильтров нет
    if (!brandsParam.length && priceParam === false && !nameParam) return null;

    const paramsToReturn = {};
    if (brandsParam) paramsToReturn.brand = brandsParam;
    if (priceParam) paramsToReturn.price = priceParam;
    if (nameParam) paramsToReturn.product = nameParam;
    return paramsToReturn;
  };

  return (
    <div className={styles.menu}>
      {/* brand */}
      <InputWithTags
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
      <input
        type="text"
        placeholder="Введите название товара"
        onChange={(event) => {
          setNameParam(event.target.value);
        }}
      />
      {/* Price */}
      <input
        type="text"
        placeholder="Введите цену"
        onChange={(event) => {
          setPriceParam(event.target.value);
        }}
      />
      <button type="submit" onClick={handleClick} className={styles.submitBtn}>Применить фильтры</button>
    </div>
  );
}

export default FilterMenu;
