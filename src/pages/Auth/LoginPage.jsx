// third party imports
import { Form } from "react-router-dom"

// local imports
import styles from "./LoginPage.module.css";


export default function LoginPage(){
    return (
        <>
            <div className={styles.loginPageContainer}>
                <div className={styles.formContainer}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>Tempo</div>
                        <div className={styles.tagLine}>Find Your Rhythm</div>
                    </div>
                    <Form className={styles.form}>
                        <input placeholder="Email"></input>
                        <input placeholder="Password"></input>
                        <button>Submit</button>
                    </Form>
                </div>
            </div>
            
        </>
    )
}