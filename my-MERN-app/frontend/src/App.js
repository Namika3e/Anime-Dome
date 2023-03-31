import Home from "./Home/Home";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Login from "./components/Login/Login";
import Signup from "./components/Signup";
import MainPage from "./MainPage"
import { useAuthContext } from "./components/hooks/useAuthContext";

function App() {

  const { user } = useAuthContext();
  return (
    <>
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home />}/>
        <Route path="/login" element= {!user ? <Login /> : <Navigate to="/api/characters" />} />
        <Route path="/signup" element= {<Signup />}/>
        <Route path="/api/characters" element= {user ? <MainPage/> : <Navigate to="/login"/>} />
        
      </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
