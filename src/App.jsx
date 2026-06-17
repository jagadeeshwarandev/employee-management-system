import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import EmployeeList from "./pages/EmployeeList"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
        path="/"
        element ={<Login />}
        />
        <Route 
        path="/Dashboard"
        element={<Dashboard />}
        />
        <Route 
        path="/employees"
        element={<EmployeeList />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App