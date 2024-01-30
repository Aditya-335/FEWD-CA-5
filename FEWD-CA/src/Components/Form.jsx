import './Form.css'; // Importing CSS styles
import { useEffect, useState } from 'react'; // Importing useState and useEffect hooks
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation

// Functional component for contact form
function Contact() {
    const navigate = useNavigate(); // Initializing useNavigate hook for navigation

    // State variables for form data, validation alerts, focus state, and registration success
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [alerts, setAlerts] = useState({
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [focusState, setFocusState] = useState({
        firstName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    // Event handler to update form data on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Event handler to update focus state on input focus
    const handleFocus = (name) => {
        setFocusState((prevFocusState) => ({ ...prevFocusState, [name]: true }));
    };

    // Event handler to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const newAlerts = {}; // Object to store validation alerts

        // Validation checks for form fields

        // Check for first name
        if (formData.firstName.trim() === "") {
            newAlerts.firstName = "Please enter your name.";
        } else if (formData.firstName.trim().length < 3 || formData.firstName.trim().length > 30) {
            newAlerts.firstName = "Name must be between 3 and 30 characters long.";
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

        // If all fields are valid, set registration success to true
        if (
            newAlerts.firstName === "" &&
            newAlerts.email === "" &&
            newAlerts.password === "" &&
            newAlerts.confirmPassword === ""
        ) {
            setRegistrationSuccess(true);
        }
    };

    // Effect hook to log form data when registration success state changes
    useEffect(() => {
        console.log(formData);
    }, [registrationSuccess]);

    // Event handler to navigate back to home page
    const handleBack = () => {
        navigate("/");
    };

    // JSX rendering of the contact form
    return (
        <>
            {/* Back button for navigation */}
            <button className='Home' onClick={handleBack}>Back</button>
            {/* Main form section */}
            <div className='App'>
                {/* Success message on successful registration */}
                {registrationSuccess && (
                    <div className='success' style={{
                        backgroundColor: 'blue', color: 'white', padding: '10px', marginTop: '10px',width:'340px', borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        Registration Successful!
                    </div>
                )}
                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Input fields for name */}
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
                    {/* Input fields for email */}
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
                    {/* Input fields for password */}
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
                    {/* Input fields for confirming password */}
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
                    {/* Submit button */}
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

export default Contact; // Exporting Contact component
