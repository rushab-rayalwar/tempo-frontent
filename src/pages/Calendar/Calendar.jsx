import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// local imports
import styles from './Calendar.module.css';

// Dummy sessions data indexed by date string (YYYY-MM-DD)
const DUMMY_SESSIONS_BY_DATE = {
    '2026-07-18': [
        {
            id: 101,
            sessionName: "Guitar Practice",
            date: "Today, 10:30 AM",
            duration: "00:45:00",
            notes: "Worked on fingerpicking patterns and major scales."
        },
        {
            id: 102,
            sessionName: "Vocal Warmups",
            date: "Today, 4:00 PM",
            duration: "00:20:00",
            notes: "Pitch accuracy exercises and breathing control."
        }
    ],
    '2026-07-17': [
        {
            id: 103,
            sessionName: "Guitar Practice",
            date: "Yesterday, 4:15 PM",
            duration: "01:12:00",
            notes: "Practiced chord transitions and learned a new song riff."
        }
    ],
    '2026-07-15': [
        {
            id: 104,
            sessionName: "Songwriting",
            date: "Jul 15, 2:00 PM",
            duration: "00:30:00",
            notes: "Drafted lyrics for the chorus of the new track."
        }
    ],
    '2026-07-12': [
        {
            id: 105,
            sessionName: "Guitar Practice",
            date: "Jul 12, 9:00 AM",
            duration: "00:50:00",
            notes: "Metronome practice at 120bpm. Clean tone."
        }
    ]
};

// Generate FullCalendar events list to indicate days with sessions
const calendarEvents = Object.keys(DUMMY_SESSIONS_BY_DATE).map((dateStr) => {
    const count = DUMMY_SESSIONS_BY_DATE[dateStr].length;
    return {
        id: dateStr,
        title: `${count} Session${count > 1 ? 's' : ''}`,
        date: dateStr,
        allDay: true,
    };
});

const springTransition = { type: "spring", stiffness: 70, damping: 22 };

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const calendarRef = useRef(null);

    // Trigger FullCalendar updateSize whenever the split container layout changes
    useEffect(() => {
        const timer = setTimeout(() => {
            if (calendarRef.current) {
                calendarRef.current.getApi().updateSize();
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [selectedDate]);

    function handleDateClick(info) {
        const dateStr = typeof info === 'string' ? info : (info.dateStr || (info.event && info.event.startStr));
        if (dateStr) {
            setSelectedDate(dateStr);
        }
    }

    function handleClosePanel() {
        setSelectedDate(null);
    }

    // Format selected date nicely (e.g. "July 18, 2026")
    const formattedSelectedDate = selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : '';

    const sessionsForSelectedDate = selectedDate ? (DUMMY_SESSIONS_BY_DATE[selectedDate] || []) : [];

    return (
        <div className={styles.calendarPageContainer}>
            <div className={styles.mainLayout}>
                {/* Calendar Panel */}
                <motion.div
                    layout
                    transition={springTransition}
                    className={selectedDate ? styles.calendarSectionShrunk : styles.calendarSectionFull}
                >
                    <div className={`${styles.calendarCard} glass`}>
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            headerToolbar={selectedDate ? {
                                left: 'prev,next',
                                center: 'title',
                                right: ''
                            } : {
                                left: 'prev,next today',
                                center: 'title',
                                right: ''
                            }}
                            dayHeaderFormat={selectedDate ? { weekday: 'narrow' } : { weekday: 'short' }}
                            events={calendarEvents}
                            dateClick={handleDateClick}
                            eventClick={handleDateClick}
                            height="100%"
                            handleWindowResize={true}
                        />
                    </div>
                </motion.div>

                {/* Sessions List Side Panel */}
                <AnimatePresence>
                    {selectedDate && (
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={springTransition}
                            className={`${styles.sessionsPanel} glass`}
                        >
                            <div className={styles.panelHeader}>
                                <div>
                                    <h2 className={styles.panelTitle}>{formattedSelectedDate}</h2>
                                </div>
                                <div className={styles.headerRight}>
                                    <span className={styles.statsBadge}>
                                        {sessionsForSelectedDate.length} {sessionsForSelectedDate.length === 1 ? 'session' : 'sessions'}
                                    </span>
                                    <button
                                        onClick={handleClosePanel}
                                        className={styles.closeBtn}
                                        title="Expand Calendar"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className={styles.historyList}>
                                {sessionsForSelectedDate.length > 0 ? (
                                    sessionsForSelectedDate.map((session) => (
                                        <div key={session.id} className={`${styles.historyCard} glass`}>
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
                                    ))
                                ) : (
                                    <div className={styles.emptyState}>
                                        <p>No sessions recorded for this date.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}