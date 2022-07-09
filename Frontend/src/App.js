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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!window.localStorage.loggedBeepUser) {
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
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
