import React from 'react'
import {LoadingOutlined} from "@ant-design/icons";
import styles from "./pending.module.css";

const Pending = () => {
  return (
    <div className={styles.pendingScreen}>
      <LoadingOutlined />
      <p className={styles.label}>Подождите...</p>
    </div>
  )
}

export default Pending