import Input from "./components/Input/Input";
import {useState} from "react";

import './style/style.scss'
import Checkbox from "./components/Checkbox/Checkbox";
import Select from "./components/Select/Select";

import cities from './assets/cities.json'

import getSortedAndFilteredCities from "./utils/getSortedAndFiltred";

function App() {
  const [user, setUser] = useState({})
  const date = new Date()

  const optionsCities = getSortedAndFilteredCities(cities)

  return (<div className="App">
    <div className="container">
      <h1 className="title">Здравствуйте, <span>{user.name || 'Человек'}</span></h1>
      <form className="form" action="">
        <div className="form__row">
          <Input
            labelName="Имя"
            id="input-name"
            type="text"
            description="Должен содержать не менее 2 символов и только кириллица."
            placeholder="Введите имя"
            required={true}
          />
          <Input
            labelName="Фамилия"
            id="input-surname"
            type="text"
            description="Должен содержать не менее 2 символов и только кириллица."
            placeholder="Введите фамилию"
            required={true}
          />
          <Select
            options={optionsCities}
            defaultValue={'Выберите город'}
            value={cities[0]}
            onChange={() => {
            }}
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
            required={false}
          />
          <Input
            labelName="Пароль еще раз"
            id="input-password-repeat"
            type="password"
            description="Проверка на совпадение с паролем."
            placeholder="Повторите пароль"
            required={true}
          />
        </div>
        <div className="form__row">
          <Input
            labelName="Номер телефона"
            id="input-tel"
            type="tel"
            description="Маска с международным форматом “+ 7 (999) 999-99-99”."
            required={false}
          />
          <Input
            labelName="Электронная почта"
            id="input-email"
            type="email"
            description="Проверка на валидность email."
            placeholder=""
            required={false}
          />
          <Checkbox
            labelName="Я согласен"
            id="input-agree"
            description="принимать актуальную информацию на емейл"
            required={false}/>
        </div>
        <div className="form__row_submit">
          <button type="submit" className="btn__submit">Изменить</button>
          <span>последние изменения {date.getFullYear()}</span>
        </div>
      </form>
    </div>
  </div>);
}

export default App;
