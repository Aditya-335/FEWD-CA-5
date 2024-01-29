import './Form.css';
import { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [alerts, setAlerts] = useState({
        firstName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [focusState, setFocusState] = useState({
        firstName: false,
        email: false,
        phoneNumber: false,
        password: false,
        confirmPassword: false,
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFocus = (name) => {
        setFocusState((prevFocusState) => ({ ...prevFocusState, [name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAlerts = {};

        // Check for first name
        if (formData.firstName.trim() === "") {
            newAlerts.firstName = "Please enter your first name.";
        } else if (formData.firstName.trim().length < 3 || formData.firstName.trim().length > 30) {
            newAlerts.firstName = "First name must be between 3 and 30 characters long.";
        } else {
            newAlerts.firstName = "";
        }
        

        // Check for email
        if (formData.email.trim() === "") {
            newAlerts.email = "Please enter your email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newAlerts.email = "Please enter a valid email address.";
        } else {
            newAlerts.email = "";
        }

        // Check for phone number
        if (formData.phoneNumber.trim() === "") {
            newAlerts.phoneNumber = "Please enter your phone number.";
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newAlerts.phoneNumber = "Please enter a valid phone number.";
        } else {
            newAlerts.phoneNumber = "";
        }

        // Check for password
        if (formData.password.trim() === "") {
            newAlerts.password = "Please enter your password.";
        } else if (formData.password.trim().length < 10) {
            newAlerts.password = "Password must be at least 10 characters long.";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            newAlerts.password = "Password must contain at least one special character.";
        } else {
            newAlerts.password = "";
        }

        // Check for confirm password
        if (formData.confirmPassword.trim() === "") {
            newAlerts.confirmPassword = "Please confirm your password.";
        } else if (formData.confirmPassword !== formData.password) {
            newAlerts.confirmPassword = "Passwords do not match.";
        } else {
            newAlerts.confirmPassword = "";
        }

        // Update state with validation messages
        setAlerts(newAlerts);

        // Check if all fields are valid
        if (
            newAlerts.firstName === "" &&
            newAlerts.email === "" &&
            newAlerts.phoneNumber === "" &&
            newAlerts.password === "" &&
            newAlerts.confirmPassword === ""
        ) {
            setRegistrationSuccess(true);
        }
    };

    return (
        <>
            <div className='App'>
                {registrationSuccess && (
                    <div className='success' style={{
                        backgroundColor: 'blue', color: 'white', padding: '10px', marginTop: '10px',width:'350px', borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        Registration Successful!
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label>
                         Name:
                        <input
                            type='text'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            onFocus={() => handleFocus('firstName')}
                            style={{ borderColor: focusState.firstName ? 'navy' : '#ccc' }}
                        />
                        <div className='alert'>{alerts.firstName}</div>
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            onFocus={() => handleFocus('email')}
                            style={{ borderColor: focusState.email ? 'navy' : '#ccc' }}
                        />
                        <div className='alert'>{alerts.email}</div>
                    </label>
                    <br />
                    <label>
                        Phone Number:
                        <input
                            type='tel'
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone Number"
                            onFocus={() => handleFocus('phoneNumber')}
                            style={{ borderColor: focusState.phoneNumber ? 'navy' : '#ccc' }}
                        />
                        <div className='alert'>{alerts.phoneNumber}</div>
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            onFocus={() => handleFocus('password')}
                            style={{ borderColor: focusState.password ? 'navy' : '#ccc' }}
                        />
                        <div className='alert'>{alerts.password}</div>
                    </label>
                    <br />
                    <label>
                        Confirm Password:
                        <input
                            type='password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            onFocus={() => handleFocus('confirmPassword')}
                            style={{ borderColor: focusState.confirmPassword ? 'navy' : '#ccc' }}
                        />
                        <div className='alert'>{alerts.confirmPassword}</div>
                    </label>
                    <br />
                    <button
                        type='submit'
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '10px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </>
    );
}

export default Contact;
