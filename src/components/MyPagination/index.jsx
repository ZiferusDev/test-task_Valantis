import React from 'react';
import { Pagination, ConfigProvider } from 'antd';

import styles from './pagination.module.css';
import theme from './theme';

function MyPagination({ handleFunc, itemsAmount, pageSize }) {
  return (
    <div className={styles.pagination}>
      <ConfigProvider
        theme={theme}
      >

        <Pagination
          itemBg="red"
          defaultCurrent={1}
          total={itemsAmount}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={handleFunc}
        />

      </ConfigProvider>
    </div>
  );
}

export default MyPagination;
