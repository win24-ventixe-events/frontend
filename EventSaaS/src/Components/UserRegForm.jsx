import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '../assets/images/Logo.svg';
import MainButton from './MainButton';
import { SyncLoader } from "react-spinners";


function UserRegForm() {
    const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    });

    const [verificationCode, setVerificationCode] = useState('');

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isVerificationBoxShown, setIsVerificationBoxShown] = useState (false);

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

    const handleVerificationCodeChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setVerificationCode(value);
    };

    const handleRegistrationSubmit = async e => {
        e.preventDefault();

        try{
            await validationSchema.validate(form, {abortEarly: false});

            setIsLoading(true);

            const verificationResponse = await fetch("https://emailverification-exhdc8dtfth6hufj.northeurope-01.azurewebsites.net/api/Verification/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Code: verificationCode,
                    Email: form.email
                })
            });

            if (!verificationResponse.ok) {
                console.error("Verification failed");
                return;
            }
            
            const response = await fetch("https://accountmanagernew-d4hdhnczdphyf8az.northeurope-01.azurewebsites.net/api/User", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        if (!response.ok) {
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    console.error("Server returned error:", errorData);
                } else {
                console.error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        return;
        }

            navigate("/login");

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
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerification = async (e)=>{
        e.preventDefault();
        try{
            await validationSchema.validate(form, {abortEarly: false});
            setIsLoading(true);
            const verificationResponse = await fetch("https://emailverification-exhdc8dtfth6hufj.northeurope-01.azurewebsites.net/api/Verification/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: form.email,
                })
            });
            console.log(form.email)
            if (!verificationResponse.ok) {
                console.error("sending code failed");
                return;
            }

            setIsVerificationBoxShown(true);
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
        } finally{
            setIsLoading(false)
        }
        
    }

    return (
        <div className="form-container wrapper">
            <img
                src={Logo}
                alt="Logo"
                className="public-image"
            />      
        <h1>Create Account</h1>
        <form onSubmit={handleVerification} noValidate>
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

            <button className={`btn main-btn ${isVerificationBoxShown ? "disabled" : ""}`} type="submit" disabled={isVerificationBoxShown}>
                Register
            </button>
            {isLoading ? (
                <div className="loader-container">
                    <SyncLoader color="#F26CF9" size={15} />
                </div>
            ) : ""}
        </form>
        {isVerificationBoxShown ? <div className="verification-section">
            <div className="form-group">
                <label htmlFor="verificationCode">Verification Code</label>
                <input
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    maxLength="6"
                    pattern="[0-9]{6}"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                />
            </div>   
            <MainButton label="Verify Email" onClick={handleRegistrationSubmit} />
        </div> : 
        <div></div>
        }
        
        </div>
    )
}

export default UserRegForm