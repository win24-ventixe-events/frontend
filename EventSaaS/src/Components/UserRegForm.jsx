import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function UserRegForm() {
    const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        displayName: Yup.string().required("Display Name is Required"),
        email: Yup.string()
                .required("Email Is Required")
                .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Email is Wrong Format"),
        password: Yup.string()
                    .required("Password Is Required")
                    .matches(/^.{8,}$/, "Atleast 8 Characters Long")
                    .matches(/^(?=.*[A-Z]).*$/, "Atleast One Uppercase Char")
                    .matches(/^(?=.*[a-z]).*$/,"Atleast one lowercase")
                    .matches(/^(?=.*[^A-Za-z0-9]).*$/,"Atleast One Symbol")
                    .matches(/^(?=.*\d).*$/, "Atleast One Number"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords Must Match")
                                    .required("Field is required"),

    })

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            await validationSchema.validate(form, {abortEarly: false});
            
            const response = await fetch("https://localhost:7223/api/User", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server returned error:", errorData);
            return;
        }

            navigate("/events");

        } catch (err) {
        if (err.name === "ValidationError" && Array.isArray(err.inner)) {
            const newErrors = {};
            err.inner.forEach(({ path, message }) => {
            newErrors[path] = message;
        });
        setErrors(newErrors);
        
        } else {
            console.error("Unexpected error:", err);
        }
    }
    };

    return (
        <div className="form-container wrapper">
            <img
                src="../assets/images/Logo.svg"
                alt="Logo"
                className="public-image"
            />      
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
            <label htmlFor="displayName">Display Name</label>
            <input
                type="text"
                id="displayName"
                name="displayName"
                value={form.displayName}
                onChange={handleChange}
            />
            {errors.displayName && <span className="error">{errors.displayName}</span>}
            </div>

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

            <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>

            <button className='btn main-btn' type="submit">
                Register
            </button>
        </form>
        </div>
    )
}

export default UserRegForm