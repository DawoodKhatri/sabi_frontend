import React from "react";
import styles from "../../styles/loading.module.css"

const Loading = () => {
  return <div className={`${styles.main} w-100 h-100 position-fixed d-flex`}>
    <div className={`${styles.spinner} spinner-grow text-purple m-auto`}></div>
  </div>;
};  

export default Loading;
