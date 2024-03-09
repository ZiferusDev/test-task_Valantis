import React from 'react'
import { Pagination, ConfigProvider} from 'antd';

import styles from "./pagination.module.css"

const MyPagination = ({ handleFunc, itemsAmount, pageSize }) => {
  return (
    <div className={styles.pagination}>
        {
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#A52838",
                colorText: "black",
                lineHeight: "1",
                fontFamily: "Circe",

                controlOutline: "#A52838",
                controlItemBgActiveDisabled: "#959595",
                colorBorder: "#959595",

                colorPrimaryHover: "#cb1829",
                colorTextPlaceholder: "#A52838",
              },
              components: {
                Pagination: {
                  itemActiveBg: "transparent",
                  itemSize: 50,
                },
              },
            }}
          >

            <Pagination 
              itemBg = {"red"}
              defaultCurrent={1} 
              total={itemsAmount} // Динамически сюда надо будет прокидывать общее количество товаров
              pageSize={pageSize} // По сколько элементов на странице скипается
              showSizeChanger={false} 
              onChange={handleFunc}
            />

          </ConfigProvider>
        }
      </div>
  )
}

export default MyPagination