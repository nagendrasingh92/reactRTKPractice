import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./pages/todoApp/TodoApp"
import WeatherApp from "./pages/weather/WeatherApp"
import Home from "./pages/Home"
import UserInfo from './pages/adminPortal/UserInfo';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todoApp" element={<TodoApp />}/>
        <Route path="/weatherApp" element={<WeatherApp />}/>
        <Route path="/userInfo" element={<UserInfo />}/>

        <Route path="/" element={<Home />}/>

      </Routes>
    </BrowserRouter>
  );
}
export default App;
