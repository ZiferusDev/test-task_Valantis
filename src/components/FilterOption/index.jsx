import React, { useState } from 'react';
import { ConfigProvider, Select } from 'antd';

import styles from './filterOption.module.css';

// !!! Можно попробовать переименовать в filterOptions и экскпортить отсюда виды возмодных опций для фильтрации

/*  // Это просто для себя, чтобы понимать, что этот компонент ждёт
type IColors {
    primary: string;
    secondary: string;
    tertiary: string;
}

type props {
    colors: IColors
    placeholder: string;
    tagsList: string[];
}

*/

function FilterOption({ tagsList, colors, placeholder }) {
  const [tags, setTags] = useState([]);

  const handleTags = (newTags) => { // newTags: array
    setTags(newTags);
    console.log('Выбраны теги: ', newTags);
  };

  const filteredOptions = tagsList.filter((o) => !tags.includes(o)); // убираем выбранные категории из списка предложенных

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: 'transparent',
          colorPrimaryBorderHover: 'transparent',

          fontFamily: 'Circe',
          colorBgContainer: colors.primary,
          colorText: colors.tertiary,

          colorBgElevated: colors.primary,
          controlItemBgHover: colors.secondary,

        },
        components: {
          Select: {
            // Не нашёл, как исправить:
            // В оповещении "empty description" текст должен быть белым, но он, почему-то, остаётся чёрным + alpha 0.25
            selectorBg: colors.primary,
            multipleItemBg: colors.secondary,
            clearBg: colors.primary,
            colorTextDescription: colors.tertiary,
            colorTextPlaceholder: colors.tertiary,
            colorTextTertiary: 'red', // Пусть красный останется
            colorTextQuaternary: colors.tertiary, // Стрелка, ClearButton
            colorTextDisabled: colors.tertiary,

            colorPrimaryHover: 'transparent',
            controlOutline: colors.secondary,
          },
        },
      }}
    >
      <Select
        mode="multiple"
        placeholder={placeholder}
        value={tags}
        allowClear
        maxTagCount={3}
        onChange={handleTags}
        options={filteredOptions.map((item) => ({
          value: item,
          label: item,
        }))}

        style={{
          width: '60%',
        }}
      />
    </ConfigProvider>
  );
}

export default FilterOption;
