import {useMemo} from "react"

import useInput from "../../hooks/useInput"

import Input from "../UI/Input/Input"
import Select from "../UI/Select/Select"
import Checkbox from "../UI/Checkbox/Checkbox"

import cities from "../../assets/cities.json"

import getSortedAndFilteredCities from "../../utils/getSortedAndFiltredCities"
import formattedDate from "../../utils/formattedDate"
import phoneMask from "../../utils/phoneMask"

import styles from "./FormUser.module.scss"

const FormUser = ({user, date, setUser, setDate}) => {
  const optionsCities = useMemo(() => {
    return getSortedAndFilteredCities(cities)
  }, [])

  const userNameInput = useInput(
    user.name || "",
    {
      minLength: 2,
      isCyrillic: false,
      isEmpty: true
    },
    "Укажите имя")

  const userSurnameInput = useInput(
    user.surname || "",
    {
      minLength: 2,
      isCyrillic: false,
      isEmpty: true
    },
    "Укажите фамилию")

  const userCityInput = useInput(
    user.city || optionsCities[0],
    {})

  const userPasswordInput = useInput(
    user.password || "",
    {
      minLength: 6,
      isLatin: false,
      isEmpty: true
    },
    `Укажите пароль`)

  const userRepeatPasswordInput = useInput(
    user.password || "",
    {
      isEqual: userPasswordInput.value,
      isEmpty: true
    },
    `Укажите пароль повторно`)

  const userPhoneInput = useInput(
    user.phone || '',
    {})

  const userCheckbox = useInput(
    user.agree || false,
    {})

  const userEmailInput = useInput(
    user.email || "",
    {
      isMail: false,
      isEmpty: userCheckbox.value
    },
    "Укажите почту")

  const isInvalidForm = () => {
    const formFillingValid = userNameInput.inputValid && userSurnameInput.inputValid && userPasswordInput.inputValid && !invalidUserEmail && !invalidUserRepeatPassword && (userPasswordInput.value === userRepeatPasswordInput.value)

    return !formFillingValid
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const newUserData = {
      name: userNameInput.value.trim(),
      surname: userSurnameInput.value.trim(),
      city: userCityInput.value,
      password: userPasswordInput.value,
      phone: userPhoneInput.value,
      email: userEmailInput.value,
      agree: userCheckbox.value
    }

    setUser(newUserData)
    console.log(JSON.stringify(newUserData))

    setDate(new Date())
  }

  const invalidUserRepeatPassword = userRepeatPasswordInput.isDirty && (userPasswordInput.value !== userRepeatPasswordInput.value)
  const invalidUserEmail = userCheckbox.value ? (userEmailInput.isEmpty || userEmailInput.emailError) : (!userEmailInput.isEmpty && userEmailInput.emailError)

  return (
    <form>
      <div className={styles["form__row"]}>
        <Input
          isDirty={userNameInput.isDirty}
          labelName="Имя"
          id="input-name"
          type="text"
          description="Должен содержать не менее 2 символов и только кириллица."
          placeholder="Введите Имя"
          required={true}
          invalidInput={userNameInput.isDirty && !userNameInput.inputValid}
          value={userNameInput.value}
          onChange={userNameInput.onChange}
          onBlur={userNameInput.onBlur}
          errorMessage={userNameInput.errorMessage}
        />
        <Input
          labelName="Фамилия"
          id="input-surname"
          type="text"
          description="Должен содержать не менее 2 символов и только кириллица."
          placeholder="Введите Фамилию"
          required={true}
          invalidInput={userSurnameInput.isDirty && !userSurnameInput.inputValid}
          value={userSurnameInput.value}
          onChange={userSurnameInput.onChange}
          onBlur={userSurnameInput.onBlur}
          errorMessage={userSurnameInput.errorMessage}
        />
        <Select
          options={optionsCities}
          value={userCityInput.value}
          onChange={userCityInput.onChange}
          id="select-cities"
          labelName="Ваш город"
        />
      </div>
      <div className={styles["form__row"]}>
        <Input
          labelName="Пароль"
          id="input-password"
          type="password"
          description="Должен содержать не менее 6 символов и только латинские буквы."
          placeholder="Введите Пароль"
          required={true}
          invalidInput={userPasswordInput.isDirty && !userPasswordInput.inputValid}
          value={userPasswordInput.value}
          onChange={userPasswordInput.onChange}
          onBlur={userPasswordInput.onBlur}
          errorMessage={userPasswordInput.errorMessage}
        />
        <Input
          labelName="Пароль еще раз"
          id="input-password-repeat"
          type="password"
          description="Проверка на совпадение с паролем."
          placeholder="Повторите Пароль"
          required={true}
          invalidInput={invalidUserRepeatPassword || (userPasswordInput.value && userRepeatPasswordInput.value && (userPasswordInput.value !== userRepeatPasswordInput.value))}
          value={userRepeatPasswordInput.value}
          onChange={userRepeatPasswordInput.onChange}
          onBlur={userRepeatPasswordInput.onBlur}
          errorMessage={userRepeatPasswordInput.errorMessage}
        />
      </div>
      <div className={styles["form__row"]}>
        <Input
          labelName="Номер телефона"
          id="input-tel"
          type="tel"
          description="Маска с международным форматом “+ 7 (999) 999-99-99”."
          placeholder="+7 (***) ***-**-**"
          required={false}
          value={phoneMask(userPhoneInput.value)}
          onChange={userPhoneInput.onChange}
          onBlur={userPhoneInput.onBlur}
        />
        <Input
          labelName="Электронная почта"
          id="input-email"
          type="email"
          description="Проверка на валидность email."
          required={false}
          invalidInput={invalidUserEmail}
          value={userEmailInput.value}
          onChange={userEmailInput.onChange}
          onBlur={userEmailInput.onBlur}
          errorMessage={userEmailInput.errorMessage}
        />
        <Checkbox
          labelName="принимать актуальную информацию на емейл"
          id="input-agree"
          description="Я согласен"
          required={false}
          checked={userCheckbox.value}
          onChange={userCheckbox.onChange}
        />
      </div>
      <div className={styles["form__row_submit"]}>
        <div>
          <button
            type="submit"
            className={styles["submit__btn"]}
            onClick={onSubmit}
            disabled={isInvalidForm()}
          >
            Изменить
          </button>
          {date &&
            <span
              className={styles["submit__text"]}
            >
              {`последние изменения ${formattedDate(date)}`}
            </span>
          }
        </div>
      </div>
    </form>
  )
}

export default FormUser