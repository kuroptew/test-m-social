import React from 'react';
import styles from "../Checkbox/Checkbox.module.scss";


const Checkbox = ({labelName, id, required, description}) => {
  return (
    <div className={styles["checkbox__wrapper"]}>
      <label
        className={styles["checkbox__label"]}
        htmlFor={id}
      >{labelName}
      </label>
      <div className={styles["checkbox__wrapper_right"]}>
        <input
          className={styles["checkbox__input"]}
          type="checkbox"
          required={required}
          id={id}
        />
          <span className={styles["box"]}></span>
          <p className={styles.description}>{description}</p>
      </div>
    </div>
);
};

export default Checkbox;