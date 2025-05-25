import React, { useState, useEffect } from 'react';
import './Events.css';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const BASE_URL = process.env.REACT_APP_API_BASE_URL;

        fetch(`${BASE_URL}/api/events/all`)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
                return r.json();
            })
            .then(data => {
                console.log('✅ Raw data from API:', data);

                const sorted = data
                    .map(e => ({
                        ...e,
                        date: new Date(e.date)
                    }))
                    .sort((a, b) => a.date - b.date);

                console.log('📅 Parsed and sorted events:', sorted);
                setEvents(sorted);
            })
            .catch(err => {
                console.error('❌ Fetch error:', err);
                setError('Could not load events. Please try again later.');
            });
    }, []);

    const nextEvent = events[0] || null;

    return (
        <div className="events-page">
            {error && <p className="error">{error}</p>}

            {nextEvent && (
                <div className="next-event-banner">
                    Next Event:&nbsp;
                    <span className="next-link">{nextEvent.name}</span>
                </div>
            )}

            <div className="events-list">
                {events.map(evt => {
                    const isNext = nextEvent && evt.eventId === nextEvent.eventId;
                    return (
                        <div
                            key={evt.eventId}
                            className={`event-card ${isNext ? 'upcoming' : 'other'}`}
                        >
                            <h3 className={`event-title ${isNext ? 'upcoming' : ''}`}>
                                {evt.name}
                            </h3>
                            <p className="event-date">
                                Date:&nbsp;
                                {evt.date instanceof Date
                                    ? evt.date.toLocaleDateString(undefined, {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })
                                    : 'Invalid date'}
                            </p>
                            <p className="event-location">Location:&nbsp;{evt.location}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}