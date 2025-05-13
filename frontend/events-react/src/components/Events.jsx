import React, { useState, useEffect } from 'react'
import './Events.css'

export default function Events() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/api/events')
            .then(r => r.json())
            .then(data => {
                const today = new Date()
                today.setHours(0,0,0,0)
                const upcoming = data
                    .filter(e => new Date(e.date) >= today)
                    .sort((a,b) => new Date(a.date) - new Date(b.date))
                setEvents(upcoming)
            })
            .catch(console.error)
    }, [])

    const next = events[0] || null

    return (
        <div className="events-page">
            {next && <div className="next-event-banner">Next Event: {next.name}</div>}
            <div className="events-list">
                {events.map(e => (
                    <div key={e.eventId} className="event-card">
                        <h3>{e.name}</h3>
                        <p>{new Date(e.date).toLocaleDateString()}</p>
                        <p>{e.location}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}