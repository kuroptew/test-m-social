import styles from "./Checkbox.module.scss"

const Checkbox = ({labelName, id, required, description, checked, onChange}) => {
  return (
    <div className={styles["checkbox__wrapper"]}>
      {description && <p className={styles["checkbox__description"]}>{description}</p>}
      <div className={styles["checkbox__wrapper_right"]}>
        <input
          className={styles["checkbox__input"]}
          type="checkbox"
          required={required}
          id={id}
          checked={checked}
          onChange={e => {
            onChange(e)
          }}
        />
        <span className={styles["box"]}></span>
        <label
          className={styles["checkbox__label"]}
          htmlFor={id}
        >
          {labelName}
        </label>
      </div>
    </div>
  )
}

export default Checkbox