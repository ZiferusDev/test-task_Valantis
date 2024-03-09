import React from 'react'

import styles from "./filterMenu.module.css"
import FilterOption from '../FilterOption'

// Толкает контент вниз, хорошо бы переделать в модалку. Мб чуть позже
const FilterMenu = () => {
    
    const BRANDS = [
        "Alfieri & St.John", "Audemars Piguet", "Baraka", "Bibigi", 'Bvlgari', "Carrera y Carrera", "Cartier", "Casa Gi", 
        "Casato", "Chaumet", "Chopard", "Damiani", "De Beers", "De Grisogono", "Faberge","Franck Muller","Giorgio Visconti",
        "Imma", "Jacob & Co", "Mauboussin","Mikimoto", "Pasquale Bruni", "Piaget", "Pomellato", "Roberto Coin", "Stephen Webster",
        "Tiffany & Co", "Van Cleef & Arpels", "ЭПЛ Якутские бриллианты"
    ];

    return (
        <div className={styles.menu}>
            <FilterOption
                colors = {
                    {
                        primary: "#82868a",
                        secondary: "#47484a",
                        tertiary: "white",
                    }
                }
                placeholder = "Введите название бренда"
                tagsList = {BRANDS}
            />
            <FilterOption
                colors = {
                    {
                        primary: "#82868a",
                        secondary: "#47484a",
                        tertiary: "white",
                    }
                }
                placeholder = "Введите название бренда"
                tagsList = {BRANDS}
            />
            <FilterOption
                colors = {
                    {
                        primary: "#82868a",
                        secondary: "#47484a",
                        tertiary: "white",
                    }
                }
                placeholder = "Введите название бренда"
                tagsList = {BRANDS}
            />
            <button className={styles.submitBtn}>Применить фильтры</button>
        </div>
    )
}

export default FilterMenu