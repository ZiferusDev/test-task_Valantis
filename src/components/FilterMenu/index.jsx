import React from 'react';

import styles from './filterMenu.module.css';
import { DefaultInput, InputWithOptions } from '../FilterOptions';
import { BRANDS } from '../../constants/constants';

function FilterMenu({ setFilter }) {
  return (
    <div className={styles.menu}>
      <InputWithOptions
        colors={
                    {
                      primary: '#82868a',
                      secondary: '#47484a',
                      tertiary: 'white',
                    }
                }
        placeholderStr="Выберите бренд"
        paramName="brand"
        optionsList={BRANDS}
        setOption={setFilter}
      />
      <DefaultInput
        placeholderStr="Введите название товара"
        paramName="product"
        setParam={setFilter}
      />
      <DefaultInput
        placeholderStr="Введите цену"
        paramName="price"
        setParam={setFilter}
      />
    </div>
  );
}

export default FilterMenu;
