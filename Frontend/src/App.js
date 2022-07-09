import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import CheckboxListSecondary from "./pages/coffee";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/coffee" element={<CheckboxListSecondary />} />
      </Routes>
    </div>
  );
}

export default App;
