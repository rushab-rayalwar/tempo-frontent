// third party imports
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

// local imports
import styles from "./Auth.module.css";

const blobs1 = [
    {
        "diameter": 6.783817782639588,
        "top": 10.819710870187194,
        "left": 3.767638666745558,
        "delay": 1.5526320294308718,
        "duration": 6.553521398121942,
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
];

export default function AuthLayout(){
    return (
        <>
            <div className={styles.loginPageContainer}>
                {
                    blobs1.map( (b,i)=>{
                        return (<div className={styles.bgBlob} key={i}
                            style={{
                                top: `${b.top}%`,
                                left: `${b.left}%`,
                                height: `${b.diameter}rem`,
                                width: `${b.diameter}rem`,
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
                            transition = {{opacity:{duration:3, type:"ease"}}}
                            initial = {{opacity:0}}
                            animate = {{opacity:1}}
                        >   
                            Tempo
                        </motion.div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
