// third party imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

// local imports
import styles from "./Auth.module.css";
import { registerThunk } from "../../features/auth/authThunk";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        // Clear errors as user types
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ""
            }));
        }
        if (name === "password" || name === "confirmPassword") {
            if (errors.confirmPassword) {
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: ""
                }));
            }
        }
        if (errors.general) {
            setErrors((prev) => ({
                ...prev,
                general: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validation
        const validationErrors = {};
        
        if (!formData.name.trim()) {
            validationErrors.name = "Name field cannot be empty";
        }
        if (!formData.email.trim()) {
            validationErrors.email = "Email field cannot be empty";
        }
        if (!formData.password) {
            validationErrors.password = "Password field cannot be empty";
        }
        if (!formData.confirmPassword) {
            validationErrors.confirmPassword = "Confirm password field cannot be empty";
        }

        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // 2. Submission
        setIsSubmitting(true);
        setErrors({});

        try {
            await dispatch(registerThunk({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })).unwrap();

            // Redirect to login page on success
            navigate("/login");
        } catch (errPayload) {
            const apiErrors = errPayload?.errors || ["Something went wrong!"];
            const fieldErrors = {};

            apiErrors.forEach((err) => {
                const errLower = err.toLowerCase();
                let matched = false;
                if (errLower.includes("email")) {
                    fieldErrors.email = err;
                    matched = true;
                }
                if (errLower.includes("name")) {
                    fieldErrors.name = err;
                    matched = true;
                }
                if (errLower.includes("password")) {
                    fieldErrors.password = err;
                    matched = true;
                }
                if (!matched) {
                    fieldErrors.general = err;
                }
            });

            setErrors(fieldErrors);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.form 
            // className={`${styles.form} glass`}
            className={`${styles.form}`}
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <input 
                placeholder="Name" 
                name='name'
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}

            <input 
                placeholder="Email" 
                name='email'
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}

            <input 
                placeholder="Password" 
                type="password" 
                name='password'
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}

            <input 
                placeholder="Re-enter Password" 
                type="password" 
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}

            <button disabled={isSubmitting}>
                {
                    !isSubmitting ? 
                    "Register" :
                    <div className={styles.spinner}></div>
                }
            </button>

            {errors.general && (
                <span className={styles.errorText} style={{ textAlign: "center", alignSelf: "center", marginTop: "0rem" }}>
                    {errors.general}
                </span>
            )}

            <footer className={styles.footer}>
                Already have an account? <Link to="/login">Login</Link>
            </footer>
        </motion.form>
    );
}
