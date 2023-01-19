import MyInput from "./components/MyInput/MyInput";
import {useState} from "react";

import './style/style.scss'

function App() {
  const [user, setUser] = useState('Человек')
  const date = new Date()


  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Здравствуйте, <span>{user}</span></h1>
        <form className="form" action="">
          <div className="form__row">
            <MyInput
              labelName="Имя"
              id="input-name"
              type="text"
              description="Должен содержать не менее 2 символов и только кириллица."
              placeholder="Введите имя"
              required={true}
            />
            <MyInput
              labelName="Фамилия"
              id="input-surname"
              type="text"
              description="Должен содержать не менее 2 символов и только кириллица."
              placeholder="Введите фамилию"
              required={true}
            />
          </div>
          <div className="form__row">
            <MyInput
              labelName="Пароль"
              id="input-password"
              type="password"
              description="Должен содержать не менее 6 символов и только латинские буквы."
              placeholder="Введите пароль"
              required={false}
            />
            <MyInput
              labelName="Пароль еще раз"
              id="input-password-repeat"
              type="password"
              description="Проверка на совпадение с паролем."
              placeholder="Повторите пароль"
              required={true}
            />
          </div>
          <div className="form__row">
            <MyInput
              labelName="Номер телефона"
              id="input-tel"
              type="tel"
              description="Маска с международным форматом “+ 7 (999) 999-99-99”."
              required={false}
            />
            <MyInput
              labelName="Электронная почта"
              id="input-email"
              type="email"
              description="Проверка на валидность email."
              placeholder=""
              required={false}
            />
            <MyInput
              labelName="Я согласен"
              id="input-agree"
              type="checkbox"
              description="принимать актуальную информацию на емейл"
              placeholder=""
              required={false}
            />
          </div>
          <div className="form__row_submit">
            <button type="submit" className="btn__submit">Изменить</button>
            <span>последние изменения {date.getFullYear() }</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
