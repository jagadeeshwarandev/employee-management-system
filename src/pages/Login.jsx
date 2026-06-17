import { useState } from "react"
import { useNavigate } from "react-router-dom"
import bgImage from "../assets/bg.jpg"
export default function Login() {
    const [email,setEmail] =useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    function handleLogin(){
    navigate ("/dashboard")
    }
return (
    <div
        className="container-fluid d-flex justify-content-center align-items-center vh-100"
        style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}
    >
        <div className="card shadow p-4" style={{ width: "400px" }}>
            <h2 className="text-center mb-4">
                Employee Management
            </h2>

            <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="d-flex justify-content-center">
                <button
                    className="btn btn-primary"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    </div>
);
}