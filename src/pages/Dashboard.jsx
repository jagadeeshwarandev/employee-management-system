import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
export default function Dashboard(){
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
useEffect(() => {

    fetch("http://localhost/employee-api/public/employees")
        .then(response => response.json())
        .then(data => {
            setEmployees(data)
        })

}, [])
const totalEmployees = employees.length

const totalDepartments =
    new Set(
        employees.map(
            employee => employee.department
        )
    ).size

const averageSalary =
    employees.length > 0
        ?
        Math.round(
            employees.reduce(
                (total, employee) =>
                    total + Number(employee.salary),
                0
            ) / employees.length
        )
        :
        0

return(
<div>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
        <span className="navbar-brand">
            Employee Management System
        </span>

        <div>
            <button
                className="btn btn-outline-light me-2"
                onClick={() => navigate("/employees")}
            >
                Employees
            </button>

            <button
                className="btn btn-danger"
                onClick={() => navigate("/")}
            >
                Logout
            </button>
        </div>
    </div>
</nav>

<div className="container mt-5">

    <h2 className="mb-4">
        Dashboard
    </h2>

    <div className="row">

        <div className="col-md-4">
            <div className="card shadow text-center">
                <div className="card-body">
                    <h5>Total Employees</h5>
                    <h2>{totalEmployees}</h2>
                </div>
            </div>
        </div>

        <div className="col-md-4">
            <div className="card shadow text-center">
                <div className="card-body">
                    <h5>Departments</h5>
                    <h2>₹{totalDepartments}</h2>
                </div>
            </div>
        </div>

        <div className="col-md-4">
            <div className="card shadow text-center">
                <div className="card-body">
                    <h5>Average Salary</h5>
                    <h2>₹{averageSalary}</h2>
                </div>
            </div>
        </div>

    </div>

    <div className="mt-4 d-flex justify-content-center ">

        <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/employees")}
        >
            Manage Employees
        </button>

    </div>

</div>

</div>
)
}