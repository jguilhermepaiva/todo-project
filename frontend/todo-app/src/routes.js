import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Todo from "./pages/Todo"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/todo" element={<Todo/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
