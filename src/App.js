import {useMemo, useState} from "react";

import useLocalStorage from "./hooks/useLocalStorage";
import useInput from "./hooks/useInput";

import './style/style.scss'

import Input from "./components/Input/Input";
import Checkbox from "./components/Checkbox/Checkbox";
import Select from "./components/Select/Select";

import cities from './assets/cities.json'

import getSortedAndFilteredCities from "./utils/getSortedAndFiltred";
import formattedDate from "./utils/formattedDate";
import phoneMask from "./utils/phoneMask";


function App() {
  const keyChange = "latestChange"
  const keyUser = "latestUser"

  const optionsCities = useMemo(() => {
    return getSortedAndFilteredCities(cities)
  }, [cities])

  const [user, setUser] = useLocalStorage(keyUser, {})
  const [date, setDate] = useLocalStorage(keyChange, '')

  const userNameInput = useInput(
    user.name || '',
    {
      minLength: 2,
      isCyrillic: false,
      isEmpty: true
    },
    'Укажите имя')

  const userSurnameInput = useInput(
    user.surname || '',
    {
      minLength: 2,
      isCyrillic: false,
      isEmpty: true
    },
    'Укажите фамилию')

  const userCityInput = useInput(
    user.city || optionsCities[0],
    {})

  const userPasswordInput = useInput(
    user.password || '',
    {
      minLength: 6,
      isLatin: false,
      isEmpty: true
    },
    `Укажите пароль`)

  const userRepeatPasswordInput = useInput(
    user.password || '',
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
    user.email || '',
    {isMail: false, isEmpty: userCheckbox.value},
    'Укажите почту')

  const isInvalidForm = () => {
    const formFillingValid = userNameInput.value && userSurnameInput.value && userPasswordInput.value && !invalidUserRepeatPassword && !(userCheckbox.value && invalidUserEmail)

    return !formFillingValid
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const newUserData = {
      name: userNameInput.value,
      surname: userSurnameInput.value,
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

  const invalidUserName = userNameInput.isDirty && (userNameInput.isEmpty || userNameInput.minLengthError || userNameInput.cyrillicError)
  const invalidUserSurname = userSurnameInput.isDirty && (userSurnameInput.isEmpty || userSurnameInput.minLengthError || userSurnameInput.cyrillicError)
  const invalidUserPassword = userPasswordInput.isDirty && (userPasswordInput.isEmpty || userPasswordInput.minLengthError || userPasswordInput.latinError)
  const invalidUserRepeatPassword =  (userRepeatPasswordInput.isDirty && userRepeatPasswordInput.isEmpty) || (userRepeatPasswordInput.isDirty && !(userRepeatPasswordInput.value === userPasswordInput.value))
  const invalidUserEmail = userCheckbox.value ? (userEmailInput.isEmpty || userEmailInput.emailError) : (!userEmailInput.isEmpty && userEmailInput.emailError)

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Здравствуйте, <span>{user.name || 'Человек'}</span></h1>
        <form className="form" action="">
          <div className="form__row">
            <Input
              isDirty={userNameInput.isDirty}
              labelName="Имя"
              id="input-name"
              type="text"
              description="Должен содержать не менее 2 символов и только кириллица."
              placeholder="Введите имя"
              required={true}
              invalidInput={invalidUserName}
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
              placeholder="Введите фамилию"
              required={true}
              invalidInput={invalidUserSurname}
              value={userSurnameInput.value}
              onChange={userSurnameInput.onChange}
              onBlur={userSurnameInput.onBlur}
              errorMessage={userSurnameInput.errorMessage}
            />
            <Select
              options={optionsCities}
              defaultValue={'Выберите город'}
              value={userCityInput.value}
              onChange={userCityInput.onChange}
              id="select-cities"
              labelName="Ваш город"
            />
          </div>
          <div className="form__row">
            <Input
              labelName="Пароль"
              id="input-password"
              type="password"
              description="Должен содержать не менее 6 символов и только латинские буквы."
              placeholder="Введите пароль"
              required={true}
              invalidInput={invalidUserPassword}
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
              placeholder="Повторите пароль"
              required={true}
              invalidInput={invalidUserRepeatPassword}
              value={userRepeatPasswordInput.value}
              onChange={userRepeatPasswordInput.onChange}
              onBlur={userRepeatPasswordInput.onBlur}
              errorMessage={userRepeatPasswordInput.errorMessage}
            />
          </div>
          <div className="form__row">
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
              placeholder=""
              required={false}
              invalidInput={invalidUserEmail}
              value={userEmailInput.value}
              onChange={userEmailInput.onChange}
              onBlur={userEmailInput.onBlur}
              errorMessage={userEmailInput.errorMessage}
            />
            <Checkbox
              labelName="Я согласен"
              id="input-agree"
              description="принимать актуальную информацию на емейл"
              required={false}
              checked={userCheckbox.value}
              onChange={userCheckbox.onChange}
            />
          </div>
          <div className="form__row_submit">
            <button
              type="submit"
              className="btn__submit"
              onClick={onSubmit}
              disabled={isInvalidForm()}
            >
              Изменить
            </button>
            {date &&
              <span
                className={"submit__text"}>{`последние изменения ${formattedDate(date)}`}</span>}
          </div>
        </form>
      </div>
    </div>);
}

export default App;
