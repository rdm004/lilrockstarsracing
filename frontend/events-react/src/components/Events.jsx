import React, { useState, useEffect } from 'react';

import './Events.css';

export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/events/all')
            .then(r => {
                if (!r.ok) throw new Error(r.statusText);
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
            });
    }, []);

    const nextEvent = events[0] || null;

    return (
        <>

            <div className="events-page">
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
        </>
    );
}