import React, {useState} from 'react'
import { ConfigProvider, Select } from 'antd'

import styles from "./filterOption.module.css"

// !!! Можно попробовать переименовать в filterOptions и экскпортить отсюда виды возмодных опций для фильтрации

/*  // Это просто для себя, чтобы понимать, что этот компонент ждёт
type IColors {
    primary: string;
    secondary: string;
    tertiary: string;
}

type props {
    colors: IColors 
    placeholder: string;
    tagsList: string[];
}

Все бренды:
const brands = [
Alfieri & St.John, Audemars Piguet, Baraka, Bibigi, Bvlgari, Carrera y Carrera, Cartier, Casa Gi, 
Casato, Chaumet, Chopard, Damiani, De Beers, De Grisogono, Faberge,Franck Muller,Giorgio Visconti,
Imma,Jacob & Co,Mauboussin,Mikimoto,Pasquale Bruni,Piaget,Pomellato,Roberto Coin,Stephen Webster,
Tiffany & Co,Van Cleef & Arpels, ЭПЛ Якутские бриллианты
]

*/

const FilterOption = (props) => {
    const [tags, setTags] = useState([]);

    const handleTags = function (newTags) { // newTags: array
        setTags(newTags);
        console.log("Выбраны теги: ", newTags);
    }

    const filteredOptions = props.tagsList.filter((o) => !tags.includes(o)); // убираем выбранные категории из списка предложенных 
    

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBorder: "transparent",
                    colorPrimaryBorderHover: "transparent",
                    
                    fontFamily: "Circe",
                    colorBgContainer: props.colors.primary,
                    colorText: props.colors.tertiary,

                    colorBgElevated: props.colors.primary,
                    controlItemBgHover: props.colors.secondary,

                },
                components: {
                Select: {
                    // Не нашёл, как исправить:
                    // В оповещении "empty description" текст должен быть белым, но он, почему-то, остаётся чёрным + alpha 0.25
                    selectorBg: props.colors.primary,
                    multipleItemBg: props.colors.secondary,
                    clearBg: props.colors.primary,
                    colorTextDescription: props.colors.tertiary,
                    colorTextPlaceholder: props.colors.tertiary,
                    colorTextTertiary: "red", // Пусть красный останется
                    colorTextQuaternary: props.colors.tertiary, // Стрелка, ClearButton
                    colorTextDisabled: props.colors.tertiary,

                    colorPrimaryHover: "transparent",
                    controlOutline: props.colors.secondary,
                },
                }
            }}
            >
            <Select
                mode="multiple"
                placeholder= {props.placeholder}
                value={tags}
                allowClear
                maxTagCount={3}
                onChange={handleTags}
                options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
                
                style={{
                width: "60%",
                }}
            />
        </ConfigProvider>
    )
}

export default FilterOption