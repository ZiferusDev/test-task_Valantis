import {React, useState, useEffect} from 'react';
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { message } from 'antd';
import { getProductsData, getFilteredUniqueIDs} from '../../API/myMiddleware';


// components / styles
import ProductItem from '../ProductItem';
import NoData from '../UI/NoData';
import Pending from '../UI/Pending';
import FilterMenu from '../FilterMenu';
import MyPagination from '../MyPagination';

import styles from "./listOfProducts.module.css";

const testArr = [ // убрать
  {
      "brand": null,
      "id": "1789ecf3-f81c-4f49-ada2-83804dcc74b0",
      "price": 16700,
      "product": "Золотое кольцо с бриллиантами"
  },
  {
      "brand": null,
      "id": "2b7c7643-6852-4562-8a72-7666c72b3518",
      "price": 12500,
      "product": "Золотое кольцо с топазом и бриллиантами"
  },
  {
      "brand": null,
      "id": "9f2722a8-dac6-4f71-b877-1731d30ae6db",
      "price": 8500,
      "product": "Золотое кольцо с бриллиантами и изумрудом"
  },
  {
      "brand": null,
      "id": "6543564e-ccc0-46f4-9af9-ab2d4bb16451",
      "price": 26600,
      "product": "Золотое колье с бриллиантами и ониксом Pasquale Bruni"
  },
  {
      "brand": null,
      "id": "da6e21f9-3fa9-4fd0-bdd7-91d3399236a1",
      "price": 34440,
      "product": "Золотое кольцо с бриллиантами и жемчугом"
  },
  {
      "brand": "Piaget",
      "id": "91a4056d-462d-4469-b97d-1d442d1e2fbc",
      "price": 23363,
      "product": "Золотое колье с рубинами и бриллиантами"
  },
  {
      "brand": null,
      "id": "00d56be6-b59e-4ac2-a98b-4bfad34241c4",
      "price": 159800,
      "product": "Золотые серьги с бриллиантами и сапфирами"
  },
  {
      "brand": null,
      "id": "096cdfe7-d54d-4f97-9866-59558962260d",
      "price": 74600,
      "product": "Золотые серьги с бриллиантами"
  },
  {
      "brand": null,
      "id": "e9e80af7-9ca7-497d-90b8-fbfeb4d085ba",
      "price": 63000,
      "product": "Золотое кольцо с бриллиантами и гранатом"
  },
  {
      "brand": null,
      "id": "611eb9c1-52a4-4a18-9e16-f0933cdf0b30",
      "price": 90000,
      "product": "Золотые серьги с бриллиантами и  Аметистами"
  }
]

export default function ListOfProducts() {

  const [isReqPending, setIsReqPending] = useState(true);
  const [isReqNeeded, setIsReqNeeded] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [productsToRender, setProductsToRender] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPageForReq, setLastPageForReq ] = useState(1);
  const [limit, setLimit] = useState(100);

  const [showFilters, setShowFilters] = useState(false);

  function handlePage (newPage, pageSize) { 
    setPage(newPage);
    // Подтягиваем по 100 элементов, на странице 50. Если часть данных об этой странице подгружена, будем их отображать без лишних запросов
    // Есть ещё вариант с тем, чтобы отправлять разом несколько запросов и просто потихоньку заполнять товарами память или sessionStorage
    // Выглядит более эффективно, если пользователю нужно далеко зайти по страницам.
    // Этот вариант же больше на случай, когда пользователь изучает каждую страницу
    
    if(newPage - lastPageForReq === 1) {
      console.log("Используем уже подтянутые данные");
      setProductsToRender(productsList.slice(50, 100));
    } else if (newPage === lastPageForReq) {
      console.log("Данную страницу мы уже подгружали")
      setProductsToRender(productsList.slice(0, 50));
    } else {
      setIsReqNeeded(true);
      console.log("Обновляем список товаров");
    }
  }



  useEffect( () => {
    setIsReqPending(true);
    setLastPageForReq(page);
    getProductsData((page - 1)*50, limit).then(data => {
      setProductsList(data);
      setProductsToRender(data.slice(0, 50));
      setIsReqPending(false);
      setIsReqNeeded(false);
    })

    message.info("UseEffect сработал, запрос улетел");

  }, [isReqNeeded]) // МАССИВ ЗАВИСИМОСТЕЙ
  
  return (

    <div className={styles.listOfProducts}>
      <div className={styles.head}>
        <div className={styles.heading}> Каталог </div>
        <button className={styles.filterBtn} onClick={() => {setShowFilters(!showFilters)}}>
            { showFilters ? <UpOutlined /> : <DownOutlined /> } 
            Все фильтры
        </button>
        {
          showFilters ? <FilterMenu /> : <div></div>
        }
      </div>

      <div className={styles.products}>
          { 
            isReqPending ? <Pending /> :
            productsToRender.length
            ?
              productsToRender.map(item =>
                  <ProductItem
                      id = {item.id}
                      product = {item.product}
                      price = {item.price}
                      brand = {item.brand}
                      key = {item.id}
                  />
              )
            : <NoData />
          }
      </div>
      
      <MyPagination 
        handleFunc = {handlePage}
        itemsAmount = {10000} // Тут должно быть какое-то свойство с общим количеством товаров
        pageSize = {50}
      />

    </div>
  )
}
