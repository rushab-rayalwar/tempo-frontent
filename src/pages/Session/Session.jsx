// third party imports
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// local imports
import styles from './Session.module.css';

const DUMMY_HISTORY = [
    { 
        id: 1, 
        sessionName: "Guitar Practice", 
        date: "Today, 10:30 AM", 
        duration: "00:45:00", 
        notes: "Worked on fingerpicking patterns and major scales." 
    },
    { 
        id: 2, 
        sessionName: "Guitar Practice", 
        date: "Yesterday, 4:15 PM", 
        duration: "01:12:00", 
        notes: "Practiced chord transitions and learned a new song riff." 
    },
    { 
        id: 3, 
        sessionName: "Songwriting", 
        date: "Oct 24, 2:00 PM", 
        duration: "00:30:00", 
        notes: "Drafted lyrics for the chorus of the new track." 
    },
    { 
        id: 4, 
        sessionName: "Guitar Practice", 
        date: "Oct 22, 9:00 AM", 
        duration: "00:50:00", 
        notes: "Metronome practice at 120bpm. Clean tone." 
    },
];

export default function Session() {

    const intervalId = useRef(null);
    const timeAccumulatedBeforePause = useRef(0);

    const [timerString, setTimerString] = useState('00:00:00');
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // handles interval
    useEffect(
        ()=>{
            if(!isRunning){
                if(intervalId.current) {
                    clearInterval(intervalId.current)
                    intervalId.current = null;
                };
                timeAccumulatedBeforePause.current = timeElapsed;
            } else {
                let startTime = Date.now();
                if(!intervalId.current){
                    intervalId.current = setInterval(
                        ()=>{
                            setTimeElapsed(
                                prev=>{
                                    return timeAccumulatedBeforePause.current + Date.now()-startTime;
                                }
                            )
                        },[1000]
                    )
                }
            }

            return ()=>{
                if(intervalId.current) clearInterval(intervalId.current);
            }

        }, [isRunning]
    )

    // formats time for every update
    useEffect(
        ()=>{
            formatTime(timeElapsed);
        },[timeElapsed]
    )

    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimerString( `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` );
    }

    function resetTimer() {
        setTimeElapsed(0);
        timeAccumulatedBeforePause.current = 0;
    }
    
    function toggleTimer() {
        setIsRunning(prev=>!!!prev);
    }

    return (
        <> 
            <div className={`${styles.sessionPageContainer} ${isRunning ? styles.running : styles.stopped}`}>
                <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 100, damping: 16 }}
                    className={styles.timerContainer}
                >
                    <motion.div layout className={styles.sessionName}>Guitar</motion.div>
                    <motion.div 
                        layout 
                        className={styles.timer}
                        animate={{ scale: isRunning ? 1.5 : 1.0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 16 }}
                    >
                        {timerString}
                    </motion.div>
                    <motion.button
                        layout
                        onClick={toggleTimer}
                        className={`${styles.toggleButton} ${isRunning ? styles.stopBtn : ''}`}
                        transition={{ type: "spring", stiffness: 100, damping: 16 }}
                    >
                        {isRunning ? 'Stop' : 'Start'}
                    </motion.button>
                </motion.div>

                <AnimatePresence>
                    {!isRunning && (
                        <motion.div
                            initial={{ y: "100vh", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100vh", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 16 }}
                            className={styles.historyContainer}
                        >
                            <div className={styles.historyHeader}>
                                <h3 className={styles.historyTitle}>Session History</h3>
                                <span className={styles.historyStats}>4 completed</span>
                            </div>
                            <div className={styles.historyList}>
                                {DUMMY_HISTORY.map((session) => (
                                    <div key={session.id} className={styles.historyCard}>
                                        <div className={styles.cardTop}>
                                            <span className={styles.cardName}>{session.sessionName}</span>
                                            <span className={styles.cardDuration}>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <polyline points="12 6 12 12 16 14"></polyline>
                                                </svg>
                                                {session.duration}
                                            </span>
                                        </div>
                                        <div className={styles.cardDate}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                            </svg>
                                            {session.date}
                                        </div>
                                        <p className={styles.cardNotes}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                <polyline points="14 2 14 8 20 8"></polyline>
                                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                            </svg>
                                            {session.notes}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}