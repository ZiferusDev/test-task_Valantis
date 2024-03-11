import React from 'react';
import { ConfigProvider, Select } from 'antd';

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
        onChange={(newOption) => setOption(newOption)}
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
  return (
    <input
      type="text"
      label={paramName}
      onChange={(e) => setParam(e.target.value)}
      placeholder={placeholderStr}
      className={styles.defaultInput}
    />
  );
}
