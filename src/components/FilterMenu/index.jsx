import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import styles from './filterMenu.module.css';
import { DefaultInput, InputWithOptions } from '../FilterOptions';
import { BRANDS } from '../../constants/constants';

function FilterMenu({ setFilters }) {
  const [brandParam, setBrandParam] = useState('');
  const [priceParam, setPriceParam] = useState(0);
  const [nameParam, setNameParam] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    const paramsNotEmpty = brandParam || priceParam || nameParam;
    const params = {};
    if (nameParam) params.product = nameParam;
    if (priceParam) params.price = +priceParam;
    if (brandParam) params.brand = brandParam;
    setFilters(paramsNotEmpty ? params : null);
  };
  return (
    <form onSubmit={onFormSubmit} className={styles.menu}>
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
        setOption={setBrandParam}
      />
      <DefaultInput
        placeholderStr="Введите название товара"
        paramName="product"
        setParam={setNameParam}
      />
      <DefaultInput
        placeholderStr="Введите цену"
        paramName="price"
        setParam={setPriceParam}
      />
      <button type="submit" className={styles.submitBtn}>
        Применить фильтры
        {' '}
        <SearchOutlined />
      </button>
    </form>
  );
}

export default FilterMenu;
