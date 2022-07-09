import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SignIn from './pages/signIn';
import Home from './pages/home';
import Navbar from './components/Navbar';
import { useState, useEffect, useMemo } from 'react';
import { UserContext } from './utils/UserContext';
import personService from './services/persons';
import loginService from './services/login';
import CheckboxListSecondary from './pages/coffee';
import Register from './pages/register';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useMemo(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBeepUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      if (user) {
        console.log('user exists');
      }
      personService.setToken(user.token);
    } else {
      console.log('fail');
    }
  }, []);

  useEffect(() => {
    if (
      !window.localStorage.loggedBeepUser &&
      location.pathname !== '/register'
    ) {
      navigate('/signin');
    }
  }, [window.localStorage.loggedBeepUser, location.pathname]);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBeepUser', JSON.stringify(user));
      console.log(window.localStorage);
      personService.setToken(user.token);
      setUser(user);
      navigate('/home');
    } catch (exception) {
      console.log('Wrong username or password');
    }
  };

  return (
    <div className="App py-[4rem] bg-stone-100 min-h-screen">
      <UserContext.Provider value={{ user }}>
        {window.localStorage.loggedBeepUser && (
          <Navbar setUser={setUser} user={user} />
        )}
        <Routes>
          <Route path="/" element={<></>} />
          <Route
            path="/signin"
            element={<SignIn handleSubmit={handleLogin} />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/coffee" element={<CheckboxListSecondary />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
