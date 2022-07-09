import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/signIn';
import Home from './pages/home';
import Navbar from './components/Navbar';
import { useState } from 'react';

import personService from './services/persons';
import loginService from './services/login';

function App() {

  const [user, setUser] = useState(null)


  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBeepUser', JSON.stringify(user)
      )
      personService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log('Wrong username or password')
    }
  }



  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn handleSumbit={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
