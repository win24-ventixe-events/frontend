import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '../assets/images/Logo.svg';
import { SyncLoader } from "react-spinners";

function LoginForm() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string()
        .required("Email is required")
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid email format"),
        password: Yup.string()
        .required("Password is required")
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {

            await validationSchema.validate(form, { abortEarly: false });
            setErrors({});
            setLoading(true);

            const response = await fetch("https://accountmanager-dsbubxefbfdaedgz.northeurope-01.azurewebsites.net/api/User/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                })
            });

            if (!response.ok) {
                if (response.status === 401) {
                console.log("Invalid email or password.");
                alert("Invalid username or password")
                setForm({ email: "", password: "" });

                } else {
                const err = await response.json();
                console.log(err.message || "Server error.");
                }
                return;
        }

            const { token } = await response.json();
            localStorage.setItem("jwt", token);

            navigate("/events");

        }  catch (err) {

            if (err.name === "ValidationError" && Array.isArray(err.inner)) {
                const newErrors = {};
                err.inner.forEach(({ path, message }) => {
                newErrors[path] = message;
            });
            setErrors(newErrors);
            } else {
            console.error("Unexpected error:", err);
            } 
        } finally {
            setLoading(false)
        }
    };

    return (
        
            <div className="form-container wrapper">
                <a href="/">
                    <img
                    src={Logo}
                    alt="Logo"
                    className="public-image"
                />
                </a>    
                <h1>Login</h1>
                <form onSubmit={handleSubmit} noValidate>
        
                    <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                    </div>
        
                    <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                    </div>
        
                    <button className="btn main-btn" type="submit">Login</button>
                </form>
                {loading ? <div className='login-spinner'>
                            <SyncLoader color="#F26CF9" size={50} />
                            <p>Signing you in...</p>
                            </div> : "" }
            </div>
        
    );
}

export default LoginForm;