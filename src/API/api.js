import axios from 'axios';
import axiosRetry from 'axios-retry';

import generateAuthToken from '../utils/generateAuthToken';

// По ТЗ, конечно, запросы должны слаться, пока не вернётся 200, но 10-ти  сейчас хватает
axiosRetry(axios, {
  retries: 10,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (_error) => true, // без этой строчки retry работать не будет
});

const reqUrl = 'https://api.valantis.store:41000/';

const password = 'Valantis'; // Не здесь оно должно лежать, конечно

const headers = {
  'Content-Type': 'application/json',
  'X-Auth': generateAuthToken(password),
};

const postReqToApi = async (options) => {
  try {
    const response = await axios.post(reqUrl, options, { headers });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('Сервер вернул код состояния', error.response.status);
    } else if (error.request) {
      throw new Error('Нет ответа\n', error.request);
    } else {
      throw new Error('Ошибка:', error.message);
    }
    return error;
  }
};

const getUniqueIDs = async (offset, limit) => {
  const options = {
    action: 'get_ids',
    params: { offset, limit },
  };

  try {
    const data = await postReqToApi(options);
    const uniqueIDs = Array.from(new Set(data.result).values());
    return uniqueIDs;
  } catch (e) {
    throw new Error(e);
  }
};

const getFilteredUniqueIDs = async (filter) => { // ! Экспорт для тестов
  // Проверяем тип параметров для запроса
  const paramsForReq = {};
  if (filter.filterBy === 'price') {
    paramsForReq[filter.filterBy] = Number(filter.value);
  } else {
    paramsForReq[filter.filterBy] = String(filter.value);
  }

  const options = {
    action: 'filter',
    params: paramsForReq,
  };

  try {
    const response = await postReqToApi(options);
    const filteredUniqueIDs = Array.from(new Set(response.result).values());
    return filteredUniqueIDs;
  } catch (error) {
    throw new Error('На этапе фильтрации произошла ошибка:', error);
  }
};

const getProductsData = async (offset, limit = 100, filter = null) => {
  const IDs = filter ? await getFilteredUniqueIDs(filter) : await getUniqueIDs(offset, limit);

  const options = {
    action: 'get_items',
    params: {
      ids: IDs,
    },
  };
  const data = await postReqToApi(options);

  const products = data.result;
  if (products.length === limit - offset) return data.result;

  const uniqueIDs = new Set();
  const uniqueProducts = [];

  for (const product of products) {
    if (!uniqueIDs.has(product.id)) {
      uniqueIDs.add(product.id);
      uniqueProducts.push(product);
    }
  }

  return uniqueProducts;
};

const api = {
  getProducts: getProductsData,
};

export default api;
