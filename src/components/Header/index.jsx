import React from "react";
import styles from "./header.module.css";

import Logo from "../UI/Logo"

export const Header = () => {
    return (
        <header className={styles.header}>
            <Logo></Logo>
        </header>
    );
};

export default Header