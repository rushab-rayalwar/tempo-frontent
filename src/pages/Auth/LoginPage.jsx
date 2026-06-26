// third party imports
import { Form } from "react-router-dom"
import { useNavigate } from "react-router-dom";

// local imports
import styles from "./LoginPage.module.css";

export default function LoginPage(){
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        navigate("/session");
    }

    return (
        <>
            <div className={styles.loginPageContainer}>
                <div className={styles.bgBlob}></div>
                <div className={styles.formContainer}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>Tempo</div>
                        <div className={styles.tagLine}>Find Your Rhythm</div>
                    </div>
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <input placeholder="Email"></input>
                        <input placeholder="Password"></input>
                        <button>Submit</button>
                    </Form>
                </div>
            </div>
            
        </>
    )
}