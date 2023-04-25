import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./pages/TodoApp"
import WeatherApp from "./pages/WeatherApp"

import Home from "./pages/Home"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todoApp" element={<TodoApp />}/>
        <Route path="/weatherApp" element={<WeatherApp />}/>

        <Route path="/" element={<Home />}/>

      </Routes>
    </BrowserRouter>
  );
}
export default App;
