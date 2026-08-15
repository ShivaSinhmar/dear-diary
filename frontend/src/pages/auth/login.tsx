import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:3001/api/auth/login",
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            navigate("/");

        } catch (error) {
            console.log("Login failed");
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>

            <p>
                Don't have an account?
                <Link to="/signup">
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default Login;