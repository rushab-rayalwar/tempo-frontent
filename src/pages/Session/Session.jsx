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

function generateRandomCoordinates() {
    let top, left;
    do {
        top = Math.random() * 90 + 5;  // 10% to 90%
        left = Math.random() * 90 + 5; // 10% to 90%
    } while (top > 25 && top < 75 && left > 25 && left < 75); // Avoid the center 40% area
    return { top, left };   
}

const layoutTransition = { type: "spring", stiffness: 50, damping: 20 };

export default function Session() {

    const intervalId = useRef(null);
    const timeAccumulatedBeforePause = useRef(0);

    const [timerString, setTimerString] = useState('00:00:00');
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [blobs, setBlobs] = useState([]);
    const [history, setHistory] = useState(DUMMY_HISTORY);

    // Generate background blobs on start
    useEffect(() => {
        if (isRunning && blobs.length === 0) {
            const newBlobs = Array.from({ length: 15 }).map((_, i) => {
                const { top, left } = generateRandomCoordinates();
                const diameter = Math.random() * 5 + 2; // 4rem to 9rem
                // const duration = Math.random() * 8 + 10; // 10s to 18s
                const duration = Math.random() * 3 + 10; // 10s to 18s

                // const delay = Math.random() * 6; // 0s to 6s
                const delay = Math.random() * 5; // 0s to 6s

                // const blur = Math.random() * 2 + 2; // 2rem to 4rem
                const blur = Math.random() * 1 + 0.2 ; // 2rem to 4rem

                
                // Random floating displacement
                const dx = (Math.random() - 0.5) * 40; // -20vw to 20vw
                const dy = (Math.random() - 0.5) * 40; // -20vh to 20vh
                
                return {
                    id: i,
                    top,
                    left,
                    diameter,
                    duration,
                    delay,
                    blur,
                    dx: `${dx}vw`,
                    dy: `${dy}vh`
                };
            });
            setBlobs(newBlobs);
        }
    }, [isRunning, blobs.length]);

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
        setIsRunning(false);
        setTimeElapsed(0);
        timeAccumulatedBeforePause.current = 0;
        setBlobs([]);
    }
    
    function toggleTimer() {
        setIsRunning(prev=>!!!prev);
    }

    function finishSession() {
        if (timeElapsed === 0) return;
        setIsRunning(false);
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = `Today, ${timeStr}`;
        const newSession = {
            id: Date.now(),
            sessionName: "Guitar Practice",
            date: dateStr,
            duration: timerString,
            notes: "Session finished and recorded successfully."
        };
        setHistory(prev => [newSession, ...prev]);
        resetTimer();
    }

    return (
        <> 
            <div className={`${styles.sessionPageContainer} ${isRunning ? styles.running : styles.stopped}`}>
                {/* Render background blobs */}
                {blobs.map((b) => (
                    <div
                        key={b.id}
                        className={styles.sessionBlob}
                        style={{
                            top: `${b.top}%`,
                            left: `${b.left}%`,
                            height: `${b.diameter}rem`,
                            width: `${b.diameter}rem`,
                            filter: `blur(${b.blur}rem)`,
                            animationDuration: `${b.duration}s`,
                            animationDelay: `${b.delay}s`,
                            animationPlayState: isRunning ? 'running' : 'paused',
                            '--dx': b.dx,
                            '--dy': b.dy,
                        }}
                    />
                ))}

                <motion.div 
                    layout
                    transition={layoutTransition}
                    className={styles.timerContainer}
                >
                    <motion.div 
                        layout 
                        transition={layoutTransition} 
                        className={styles.sessionName}
                    >
                        Guitar
                    </motion.div>
                    <motion.div 
                        layout 
                        className={styles.timer}
                        animate={{ scale: isRunning ? 1.5 : 1.0 }}
                        transition={layoutTransition}
                    >
                        {timerString}
                    </motion.div>
                    <motion.div 
                        layout 
                        transition={layoutTransition} 
                        className={styles.controlsRow}
                    >
                        <motion.button
                            layout
                            transition={layoutTransition}
                            onClick={resetTimer}
                            className={`${styles.controlButton} ${styles.secondaryBtn}`}
                            title="Reset Timer"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fa-solid fa-rotate-left"></i>
                        </motion.button>

                        <motion.button
                            layout
                            transition={layoutTransition}
                            onClick={toggleTimer}
                            className={`${styles.controlButton} ${styles.playPauseBtn}`}
                            title={isRunning ? "Pause" : "Start"}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isRunning ? (
                                <i className="fa-solid fa-pause"></i>
                            ) : (
                                <i className="fa-solid fa-play" style={{ marginLeft: "3px" }}></i>
                            )}
                        </motion.button>

                        <motion.button
                            layout
                            transition={layoutTransition}
                            onClick={finishSession}
                            className={`${styles.controlButton} ${styles.secondaryBtn}`}
                            title="Finish Session"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fa-solid fa-check"></i>
                        </motion.button>
                    </motion.div>
                </motion.div>

                <AnimatePresence>
                    {!isRunning && (
                        <motion.div
                            initial={{ y: "100vh", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100vh", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 50, damping: 20 }}
                            className={styles.historyContainer}
                        >
                            <div className={styles.historyHeader}>
                                <h3 className={styles.historyTitle}>Session History</h3>
                                <span className={styles.historyStats}>{history.length} completed</span>
                            </div>
                            <div className={styles.historyList}>
                                {history.map((session) => (
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