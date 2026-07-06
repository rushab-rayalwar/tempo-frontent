// third party imports
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// local imports
import styles from "./Auth.module.css";

export default function LoginForm(){

    const [isSubmitting] = useState(false);

    return (
        <motion.form 
            className={styles.form}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <input placeholder="Email" name='email'></input>
            <input placeholder="Password" type="password" name='password'></input>
            <button disabled={isSubmitting}>
                {
                    !isSubmitting ? 
                    "Login" :
                    <div className={styles.spinner}></div>
                }
            </button>
            <footer className={styles.footer}>
                New here ? <Link to="/register">Create an Account</Link>
            </footer>
        </motion.form>
    )
}
