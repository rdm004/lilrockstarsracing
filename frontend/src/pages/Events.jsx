import React, { useState, useEffect } from 'react';
import './Events.css';
import EventReportTable from '../components/EventReportTable';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [reportTimestamp, setReportTimestamp] = useState('');
    const [showReport, setShowReport] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const BASE_URL = 'https://lilrockstarsracing-test.onrender.com/api';

    useEffect(() => {
        fetch(`${BASE_URL}/events/all`)
            .then(res => {
                const contentType = res.headers.get("content-type");
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Expected JSON but received " + contentType);
                }
                return res.json();
            })
            .then(data => {
                setEvents(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    const nextEvent = events.length > 0 ? events[0] : null;

    const handleRunReport = () => {
        setShowReport(true);
        const now = new Date().toLocaleString();
        setReportTimestamp(`Report generated on ${now}`);
    };

    return (
        <div className="events-page">
            {error && (
                <div className="error-banner">❌ Error loading events: {error}</div>
            )}

            {nextEvent && (
                <div className="next-event-banner">
                    Next Event: <span className="next-link">{nextEvent.name}</span>
                </div>
            )}

            <div className="events-list">
                {Array.isArray(events) && events.length > 0 ? (
                    events.map((evt) => {
                        const isNext = nextEvent && evt.eventId === nextEvent.eventId;
                        const eventDate = evt.date ? new Date(evt.date) : null;
                        const formattedDate = eventDate && !isNaN(eventDate)
                            ? eventDate.toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })
                            : 'Date unavailable';

                        return (
                            <div
                                key={evt.eventId || `${evt.name}-${evt.date}`}
                                className={`event-card ${isNext ? 'upcoming' : 'other'}`}
                            >
                                <h3 className={`event-title ${isNext ? 'upcoming' : ''}`}>
                                    {evt.name || 'Unnamed Event'}
                                </h3>
                                <p className="event-date">Date: {formattedDate}</p>
                                <p className="event-location">
                                    Location: {evt.location || 'TBA'}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    !error && <p className="no-events">No events found.</p>
                )}
            </div>

            {/* 📊 Event Report */}
            <div className="event-report-section" style={{ marginTop: '4rem' }}>
                <h3>📋 Event Registration Report</h3>
                <button onClick={handleRunReport}>📊 Run Report</button>

                {reportTimestamp && (
                    <p style={{ fontStyle: 'italic', marginTop: '0.5rem', color: '#555' }}>
                        {reportTimestamp}
                    </p>
                )}

                {showReport && (
                    <>
                        <input
                            type="text"
                            placeholder="🔍 Search by event name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ marginTop: '1rem', padding: '0.5rem', width: '300px' }}
                        />
                        <EventReportTable searchTerm={searchTerm} />
                    </>
                )}
            </div>
        </div>
    );
}