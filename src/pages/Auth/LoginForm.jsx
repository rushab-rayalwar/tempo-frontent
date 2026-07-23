// third party imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

// local imports
import styles from "./Auth.module.css";
import { loginThunk } from "../../features/auth/authThunk";

export default function LoginForm(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

        if (!formData.email.trim()) {
            validationErrors.email = "Email field cannot be empty";
        }
        if (!formData.password) {
            validationErrors.password = "Password field cannot be empty";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // 2. Submission
        setIsSubmitting(true);
        setErrors({});

        try {
            let response = await dispatch(loginThunk({
                email: formData.email,
                password: formData.password
            })).unwrap();

            // Redirect to session page on success
            navigate('/session');
        } catch (errPayload) {
            const apiErrors = errPayload?.errors || ["Something went wrong!"];
            const fieldErrors = {};

            apiErrors.forEach((err) => {
                const errLower = err.toLowerCase();
                let matched = false;
                if (errLower.includes("email") || errLower.includes("user")) {
                    fieldErrors.email = err;
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

            <button disabled={isSubmitting}>
                {
                    !isSubmitting ? 
                    "Login" :
                    <><div className={styles.spinner}></div> <span>Login</span></>
                }
            </button>

            {errors.general && (
                <span className={styles.errorText} style={{ textAlign: "center", alignSelf: "center", marginTop: "0rem" }}>
                    {errors.general}
                </span>
            )}

            <footer className={styles.footer}>
                New here ? <Link to="/register">Create an Account</Link>
            </footer>
        </motion.form>
    )
}
