import React from "react";
import preloader from "../../Media/6.gif";
import styles from "../../Styles/preloader.module.css";

export const Preloader = () => { 
    return (
        <div className={styles.Preloader}>
            <img src={preloader} alt="#"></img>
        </div>
    )
};