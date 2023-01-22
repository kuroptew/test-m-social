import useLocalStorage from "./hooks/useLocalStorage"

import FormUser from "./components/FormUser/FormUser"

import "./style/style.scss"


function App() {
  const keyChange = "latestChange"
  const keyUser = "latestUser"

  const [user, setUser] = useLocalStorage(keyUser, {})
  const [date, setDate] = useLocalStorage(keyChange, "")

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Здравствуйте, <span>{user.name || "Человек"}</span></h1>
        <FormUser user={user} date={date} setUser={setUser} setDate={setDate}/>
      </div>
    </div>)
}

export default App
