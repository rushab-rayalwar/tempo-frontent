// third party imports
import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";

// local imports
import styles from "./LoginPage.module.css";

export default function LoginPage(){

    const [isSubmitting, setIsSubmitting] = useState();

    // const blobs = useMemo(
    //     ()=>{

    //         let blobs = [];

    //         for(let i=0; i<6; i++){
    //             let diameter = 2 + Math.random()*6;
    //             let top, left; // in percentage
    //             if(i<=2){
    //                 left = 35 - Math.random()*35;
    //                 top =(45 - Math.random()*44);
    //             } else {
    //                 left = 55 + Math.random()*35;
    //                 top = 55 + Math.random()*44;
    //             }
    //             let delay = 2*Math.random(); // seconds
    //             let duration = 5 + Math.random()*2;
    //             let blur = Math.random();
    //             blobs.push({diameter, top, left, delay, duration, blur})
    //         }

    //         console.log('bobs', blobs);

    //         return blobs;
    //     },
    //     []
    // )

    const blobs1 = useRef(
        [
            {
                "diameter": 6.783817782639588,
                // "diameter": 3.283817782639588,
                // "top": 30.819710870187194,
                "top": 10.819710870187194,
                "left": 3.767638666745558,
                // "left": 5.767638666745558,
                "delay": 1.5526320294308718,
                // "duration": 5.553521398121942,
                "duration": 6.553521398121942,
                // "blur": 0.3521277049083331
                "blur": 1.0521277049083331
            },
            {
                "diameter": 2.3543878977218764,
                "top": 25.22122463243957,
                "left": 15.937358266677197,
                "delay": 0.48160594015147407,
                "duration": 5.358507205581609,
                "blur": 0.65965539704374
            },
            {
                "diameter": 6.304168587453359,
                "top": 2.8021536356910772,
                "left": 16.750124474719534,
                "delay": 0.855841048529951,
                "duration": 5.6012578535832915,
                // "blur": 0.40986531672814075
                "blur": 0.40986531672814075
            },
            {
                "diameter": 6.999319580369778,
                "top": 73.8452121827921,
                "left": 86.43804996402467,
                "delay": 1.630948062489758,
                "duration": 6.531747736674607,
                "blur": 0.9363554601997509
            },
            {
                "diameter": 5.081041700563541,
                "top": 74.13480939507836,
                "left": 72.12385678668073,
                "delay": 0.007350820088131149,
                "duration": 6.356157944613942,
                "blur": 0.2253156590046168
            },
            {
                "diameter": 7.227893545195902,
                "top": 58.296607006720336,
                "left": 85.91228013383311,
                "delay": 0.6803401791112746,
                "duration": 5.199672836695961,
                "blur": 0.22847473448346378
            }
        ]
    );

    return (
        <>
            <div className={styles.loginPageContainer}>
                {
                    
                    blobs1.current.map( (b,i)=>{
                        
                        return (<div className={styles.bgBlob} key={i}
                            style={{
                                top: `${b.top}%`,
                                left: `${b.left}%`,
                                height: `${b.diameter}rem`,
                                width: `${b.diameter}rem`,
                                // animationDelay: `${b.delay}s`,
                                animationDuration: `${b.duration}s`,
                                filter: `blur(${b.blur}rem)`
                            }}
                        ></div>);
                    })
                }
                <div className={styles.formContainer}>
                    <div className={styles.titleContainer}>
                        <motion.div
                            className={styles.title}
                            // initial = {{opacity:0, y:"-10%"}}
                            // animate = {{opacity:1, y:"10%"}}
                            transition = {{opacity:{duration:1, type:"ease"}, y:{ type:"spring", damping:6, stiffness:45 }}}
                        >   
                            Tempo
                        </motion.div>
                        {/* <div className={styles.tagLine}>Find Your Rhythm</div> */}
                    </div>
                    <form className={styles.form} method='post'>
                        <input placeholder="Email" name='email'></input>
                        <input placeholder="Password" type="password" name='password'></input>
                        <button disabled={isSubmitting}>
                            {
                                !isSubmitting ? 
                                "Login" :
                                <div className={styles.spinner}></div>
                            }
                            {/* <div className={styles.spinnerContainer}>
                                <div className={styles.spinner}></div>
                                <div>Logging In</div>
                            </div> */}
                        </button>
                        <footer className={styles.footer}>
                            New here ? <span>Create an Account</span>
                        </footer>
                    </form>
                </div>
            </div>
            
        </>
    )
}