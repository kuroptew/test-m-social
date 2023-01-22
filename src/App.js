import useLocalStorage from "./hooks/useLocalStorage"

import FormUser from "./components/FormUser/FormUser"

import "./style/style.scss"

const KEY_USER = "latestUser"

function App() {
  const [user, setUser] = useLocalStorage(KEY_USER, {})

  return (
      <div className="container">
        <h1 className="title">Здравствуйте, <span>{user.name || "Человек"}</span></h1>
        <FormUser user={user} setUser={setUser}/>
      </div>
  )
}

export default App
