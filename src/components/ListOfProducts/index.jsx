import { React, useState, useEffect } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { getProductsData, getFilteredUniqueIDs } from '../../API/api';

// components / styles
import ProductItem from '../ProductItem';
import NoData from '../NoData';
import Pending from '../Pending';
import FilterMenu from '../FilterMenu';
import MyPagination from '../MyPagination';

import styles from './listOfProducts.module.css';

function ListOfProducts() {
  const [isReqPending, setIsReqPending] = useState(true);
  const [isReqNeeded, setIsReqNeeded] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [productsToRender, setProductsToRender] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPageForReq, setLastPageForReq] = useState(1);
  const [filters, setFilters] = useState(null);
  const limit = 100;

  const [showFilters, setShowFilters] = useState(false);

  function handlePage(newPage) {
    setPage(newPage);
    // Подтягиваем по 100 элементов, на странице 50.
    // Если часть данных об этой странице подгружена, будем их отображать без лишних запросов

    if (newPage - lastPageForReq === 1) {
      setProductsToRender(productsList.slice(50, 100));
    } else if (newPage === lastPageForReq) {
      setProductsToRender(productsList.slice(0, 50));
    } else {
      setIsReqNeeded(!isReqNeeded);
    }
  }

  useEffect(() => {
    setIsReqPending(true);
    setLastPageForReq(page);
    getProductsData((page - 1) * 50, limit, filters).then((data) => {
      setProductsList(data);
      setProductsToRender(data.slice(0, 50));
      setIsReqPending(false);
    });
  }, [isReqNeeded, filters]);

  return (

    <div className={styles.listOfProducts}>
      <div className={styles.head}>
        <div className={styles.heading}> Каталог </div>
        <button className={styles.filterBtn} onClick={() => { setShowFilters(!showFilters); }}>
          { showFilters ? <UpOutlined /> : <DownOutlined /> }
          Все фильтры
        </button>
        {
          showFilters ? <FilterMenu /> : <div />
        }
      </div>

      <div className={styles.products}>
        {
            isReqPending ? <Pending />
              : productsToRender.length
                ? productsToRender.map((item) => (
                  <ProductItem
                    productData={item}
                    key={item.id}
                  />
                ))
                : <NoData />
          }
      </div>

      <MyPagination
        handleFunc={handlePage}
        itemsAmount={10000}
        pageSize={50}
      />

    </div>
  );
}

export default ListOfProducts;
