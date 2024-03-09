import React from 'react'
import styles from "./productItem.module.css"

export default function ProductItem(props) { 
    return (
        // Потом будет роутинг, сейчас надо якорь :)
        <div className={styles.card}>
            <div className={styles.info}>id: {props.id}</div>
            <div className={styles.info}>Товар: {props.product}</div>
            <div className={styles.info}>Цена: {props.price} ₽</div>
            <div className={styles.info}>Бренд: {props.brand ? props.brand : "Не указан"} {props.brand}</div>
        </div>
    )
}