import React from 'react'

import styles from "./logo.module.css"
// Разделил svg логотипа на 2 части. В будущем, при применении медиа-запросов так будет удобнее. 
import logo from "../../../static/Logotype.svg"
import brandName from "../../../static/BrandName.svg"

export default function Logo(props) {
  return (
    <div className={styles.logo}>
      <img draggable={false} className={styles.logotype} alt="Logotype" src={logo} /> 
      <img draggable={false} className={styles.logotype} alt="Valatis" src={brandName} />
    </div>
  )
}
