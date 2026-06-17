import { useState,useEffect } from "react"

export default function EmployeeList() {

    // const [employees,setEmployees] = useState(
    //     [
    //         {
    //             id:1,
    //             name :"jagadeesh",
    //             department : "Develoepr",
    //             salary:30000
    //         },
    //     ]
    // )
const [employees,setEmployees] = useState([])
    const [name,setName] = useState('')
    const [department,setDepartment] = useState('')
    const [salary,setSalary] = useState('')
    const [editingId, setEditingId] = useState(null)
const [showModal, setShowModal] = useState(false)
const [deleteId, setDeleteId] = useState(null)
function openDeleteModal(id)
{
    setDeleteId(id)
    setShowModal(true)
}
async function confirmDelete()
{
    await deleteEmployee(deleteId)

    setShowModal(false)

    setDeleteId(null)
}
useEffect(() => {

    // fetch(
    //     "https://employee-management-system.great-site.net/employee-api/employee-api/public/employees"
    // )
    // .then(response => response.json())
    // .then(data => {

    //     setEmployees(data)

    // })
    fetchEmployees()

}, [])
    const [search,setSearch] = useState('')
    // function addEmployee(){ 
    //     const newEmployee ={
    //         id : Date.now(),
    //         name : name,
    //         department:department,
    //         salary:salary
    //     }
    //     setEmployees([...employees,newEmployee])
    //     setName('')
    //     setDepartment('')
    //     setSalary('')
    // }
async function fetchEmployees()
{
    const response = await fetch(
        "https://employee-management-system.great-site.net/employee-api/employee-api/public/employees"
    )

    const data = await response.json()

    setEmployees(data)
}
async function addEmployee()
{
    if(
        name.trim() === "" ||
        department.trim() === "" ||
        salary.trim() === ""
    )
    {
        alert("Please fill all fields")
        return
    }
    const response = await fetch(
        "https://employee-management-system.great-site.net/employee-api/employee-api/public/employees",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                department,
                salary
            })
        }
    )

    const data = await response.json()

    console.log(data)

    fetchEmployees()
}
async function deleteEmployee(id)
{
    await fetch(
        `https://employee-management-system.great-site.net/employee-api/employee-api/public/employees/${id}`,
        {
            method: "DELETE"
        }
    )

    fetchEmployees()
}
    function editEmployee(employee){

        setName(employee.name)

        setDepartment(employee.department)

        setSalary(employee.salary)

        setEditingId(employee.id)
    }
async function updateEmployee()
{
    await fetch(
        `https://employee-management-system.great-site.net/employee-api/employee-api/public/employees/${editingId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                department,
                salary
            })
        }
    )

    fetchEmployees()

    setEditingId(null)

    setName("")
    setDepartment("")
    setSalary("")
}
    return (

        <div className="container-fluid mt-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Employee Management System</h2>
                </div>

                <div className="card-body">

                    <div className="row mb-3">

                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Employee Name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Department"
                                value={department}
                                onChange={(e)=>setDepartment(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Salary"
                                value={salary}
                                onChange={(e)=>setSalary(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <button
                                className={`btn ${
                                    editingId
                                    ? 'btn-warning'
                                    : 'btn-success'
                                } w-100`}
                                onClick={
                                    editingId
                                    ? updateEmployee
                                    : addEmployee
                                }
                            >
                                {
                                    editingId
                                    ? 'Update Employee'
                                    : 'Add Employee'
                                }
                            </button>
                        </div>

                    </div>

                    <div className="mb-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Employee"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />

                    </div>

                    <table className="table table-bordered table-striped table-hover">

                        <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th width="180">Action</th>
                            </tr>

                        </thead>

                        <tbody>

                        {
                            employees
                            .filter((employee)=>
                                employee.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            )
                            .map((employee)=>(

                                <tr key={employee.id}>

                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.department}</td>
                                    <td>₹ {employee.salary}</td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => editEmployee(employee)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => openDeleteModal(employee.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                        </tbody>

                    </table>

                </div>

            </div>
            {
            showModal && (

            <div
                className="modal d-block"
                tabIndex="-1"
                style={{
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                Delete Employee
                            </h5>
                        </div>

                        <div className="modal-body">
                            <p>
                                Are you sure you want to delete this employee?
                            </p>
                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            )
            }
        </div>
    )
}