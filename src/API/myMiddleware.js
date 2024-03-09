import axios from "axios";
import axiosRetry from "axios-retry";
import md5 from "md5";

// Чтобы слать запросы заново при ошибке на стороне сервера используем axiosRetry
// По ТЗ, конечно, запросы должны слаться, пока не вернётся 200, но 10-ти, в принципе, сейчас хватает
axiosRetry(axios, { 
    retries: 10,
    retryDelay: (retryCount) => {
        console.log("Попытка запроса:", retryCount);
        return retryCount * 1000
    },
    retryCondition: (_error) => true // post-запросы неидемпотентные, без этой строчки retry работать не будет 
});      

const reqUrl = "https://api.valantis.store:41000/";

const password = "Valantis"; // Не здесь оно должно лежать, конечно

const getAuth = (password) => {
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = (today.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = today.getUTCDate().toString().padStart(2, '0');
    return md5(`${password}_${year}${month}${day}`);
} 

const headers = {
    'Content-Type': 'application/json',
    'X-Auth': getAuth(password),
} 

export async function reqToApi(options) {

    return new Promise((resolve, reject) => {   
        axios.post(reqUrl, options, { headers })
            .then(function (response) { // ждём на выходе string[]
                console.log("Запрос выполнен успешно")
                // console.log("Возвращаю:", response.data);
                resolve(response.data)
            })  
            .catch(async function (error) {
                if(error.response) {
                    console.log("Сервер вернул код состояния", error.response.status); 
                } else if(error.request) {
                    console.log("Нет ответа\n", error.request) 
                } else {
                    console.log("Ошибка:", error.message)
                }
            })
    })
}

export async function getUniqueIDs(offset, limit) { // ! Убрать экспорт
    const options = {
        action: "get_ids",
        params: {"offset": offset, "limit": limit}
    };

    return new Promise((resolve, reject) => {
        reqToApi(options).then( function(response) {
            // Вполне вероятно, что я неправ, но как будто повторение id'шников - это повторение ключа в БД, что значит: на сервире всйо плоха :(
            // Закончим с неформальностью: не буду придумывать что-то экстраординарное, будем проверять массив на повторения через коллекцию уник. значений
            // Создаём коллекцию из массива => вынимаем из коллекции итерируемый объект => переводим его в массив
            const uniqueIDs = Array.from(new Set(response.result).values());
            resolve(uniqueIDs);
        });
    }) 
}


export async function getFilteredUniqueIDs(params) {
    
    const options = {
        "action": "filter",
        "params": params
    }

    return new Promise((resolve, reject) => {
        reqToApi(options).then( function(response) {
            const filteredUniqueIDs = Array.from(new Set(response.result).values());
            resolve(filteredUniqueIDs);
        });
    });

}

export async function getProductsData(offset, limit = 100, filters = null) {
    const IDs = filters ? await getFilteredUniqueIDs(filters) : await getUniqueIDs(offset, limit);

    const options = {
        action: "get_items",
        params: {
            "ids": IDs 
        }
    }
    const data = await reqToApi(options);

    const products = data.result;
    if (products.length === limit - offset) return data.result;

    const uniqueIDs = new Set();
    const uniqueProducts = [];
    
    for(const product of products) {
        if(!uniqueIDs.has(product.id)){
            uniqueIDs.add(product.id);
            uniqueProducts.push(product);
        }
    }

    return uniqueProducts;
}