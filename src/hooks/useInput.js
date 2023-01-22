import {useState, useEffect} from "react"

import getDeclination from "../utils/getDeclination";

const useValidation = (value, validations, messageEmpty) => {
  const [isEmpty, setEmpty] = useState(true)
  const [minLengthError, setMinLengthError] = useState(false)
  const [cyrillicError, setCyrillicError] = useState(false)
  const [latinError, setLatinError] = useState(false)
  const [equalError, setEqualError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [inputValid, setInputValid] = useState(false)

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          if (value.length < validations[validation]) {
            setMinLengthError(true)
            setErrorMessage(`Введите минимум ${validations[validation]} ${getDeclination(validations[validation])}`)
          } else {
            setMinLengthError(false)
          }
          break
        case "isCyrillic":
          const regExpCyrillic = /^[А-ЯЁа-яё\s]+$/
          if (regExpCyrillic.test(String(value))) {
            setCyrillicError(false)
          } else {
            setCyrillicError(true)
            setErrorMessage("Введите только кириллицу")
          }
          break
        case "isLatin":
          const regExpLatin = /^[A-Za-z\s]+$/
          if (regExpLatin.test(String(value))) {
            setLatinError(false)
          } else {
            setLatinError(true)
            setErrorMessage("Введите только латинские буквы")
          }
          break
        case "isEqual":
          if (value === validations[validation]) {
            setEqualError(false)
          } else {
            setEqualError(true)
            setErrorMessage("Пароли не совпадают")
          }
          break
        case "isMail":
          const regExpEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
          if (regExpEmail.test(String(value))) {
            setEmailError(false)
          } else {
            setEmailError(true)
            setErrorMessage("Неверный адрес почты")
          }
          break
        case "isEmpty":
          if (value.trim().split(" ").join("")) {
            setEmpty(false)
          } else {
            setEmpty(true)
            setErrorMessage(messageEmpty)
          }
          break
      }
    }
  }, [value])

  useEffect(()=>{
    if(isEmpty || minLengthError || cyrillicError || latinError || emailError || equalError) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }

  }, [isEmpty, minLengthError, cyrillicError, latinError, emailError, equalError])

  return {
    isEmpty,
    minLengthError,
    errorMessage,
    cyrillicError,
    latinError,
    equalError,
    emailError,
    inputValid
  }
}

const useInput = (initialValue, validations, messageEmpty) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)
  const valid = useValidation(value, validations,  messageEmpty)

  const onChange = (e) => {
    if (e.target.type === "checkbox"){
      setValue(e.target.checked)
    } else {
      setValue(e.target.value)
    }
  }

  const onBlur = (e) => {
    setDirty(true)
  }

  return {
    value,
    setValue,
    isDirty,
    setDirty,
    onChange,
    onBlur,
    ...valid
  }
}

export default useInput