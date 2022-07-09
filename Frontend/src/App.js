import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SignIn from './pages/signIn';
import Home from './pages/home';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { UserContext } from './utils/UserContext';
import personService from './services/persons';
import loginService from './services/login';
import CheckboxListSecondary from './pages/coffee';

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loggedIn || navigate('/');
  }, [loggedIn, location.pathname]);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBeepUser', JSON.stringify(user));
      personService.setToken(user.token);
      setUser(user);
      setLoggedIn(true);
      navigate('/home');
    } catch (exception) {
      console.log('Wrong username or password');
    }
  };

  return (
    <div className="App pt-[4rem]">
      <UserContext.Provider value={{ user, loggedIn }}>
        {loggedIn && <Navbar setLoggedIn={setLoggedIn} setUser={setUser} />}
        <Routes>
          <Route path="/" element={<SignIn handleSubmit={handleLogin} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/coffee" element={<CheckboxListSecondary />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
