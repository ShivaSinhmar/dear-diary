import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        userName: "",
        email: "",
        password: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:3001/api/auth/signup",
                form,
                {
                    withCredentials: true
                }
            );

            navigate("/");

        } catch (error) {
            console.log("Signup failed");
        }
    };

    return (
        <div>

            <h1>Create Account</h1>

            <form onSubmit={handleSignup}>

                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="userName"
                    placeholder="Username"
                    value={form.userName}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button type="submit">
                    Sign Up
                </button>

            </form>

            <p>
                Already have an account?
                <Link to="/login">
                    Login
                </Link>
            </p>

        </div>
    );
};

export default Signup;