import React, { useState } from 'react';
import { ConfigProvider, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from './filterOptions.module.css';
import theme from './theme';

/*  // Это просто для себя, чтобы понимать, что этот компонент ждёт
type IColors {
    primary: string;
    secondary: string;
    tertiary: string;
}

type props {
    colors: IColors
    placeholder: string;
}

*/

export function InputWithOptions({
  paramName,
  setOption,
  optionsList,
  colors,
  placeholderStr,
}) {
  return (
    <ConfigProvider
      theme={theme(colors)}
    >
      <Select
        placeholder={placeholderStr}
        showSearch
        allowClear
        maxTagCount={1}
        onChange={(newOption) => setOption({ filterBy: paramName, value: newOption })}
        options={optionsList.map((item) => ({
          value: item,
          label: item,
        }))}
        style={{ width: '30ch' }}
      />
    </ConfigProvider>
  );
}

export function DefaultInput({
  placeholderStr,
  paramName,
  setParam,
}) {
  const [inputVal, setInputVal] = useState('');
  const handleClick = () => {
    setParam({
      filterBy: paramName,
      value: inputVal,
    });
  };
  return (
    <p className={styles.block}>
      <input
        type="text"
        label={paramName}
        onChange={(e) => setInputVal(e.target.value)}
        placeholder={placeholderStr}
        className={styles.defaultInput}
      />
      <button type="submit" className={styles.submitBtn} onClick={handleClick}>
        <SearchOutlined />
      </button>
    </p>
  );
}
