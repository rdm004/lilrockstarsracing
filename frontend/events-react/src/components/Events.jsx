import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import './Events.css';

export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/events')
            .then(r => {
                if (!r.ok) throw new Error(r.statusText);
                return r.json();
            })
            .then(data => {
                // filter out past events
                const upcoming = data
                    .map(e => ({ ...e, date: new Date(e.date) }))
                    .filter(e => e.date >= new Date())
                    .sort((a, b) => a.date - b.date);
                setEvents(upcoming);
            })
            .catch(console.error);
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
                                    {evt.date.toLocaleDateString(undefined, {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
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