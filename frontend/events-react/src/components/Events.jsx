import React, { useState, useEffect } from 'react';
import './Events.css';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    const [reportData, setReportData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const BASE_URL = 'https://lilrockstarsracing-test.onrender.com/api';

    // 🎯 Load Events for Cards
    useEffect(() => {
        console.log("✅ Fetching from:", `${BASE_URL}/events/all`);

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
                console.log("✅ Events loaded:", data);
                setEvents(data);
            })
            .catch(err => {
                console.error("❌ Fetch error:", err);
                setError(err.message);
            });
    }, []);

    const nextEvent = events.length > 0 ? events[0] : null;

    // 📊 Fetch Admin Report
    const fetchReport = async () => {
        try {
            const res = await fetch(`${BASE_URL}/admin/event-report`);
            const data = await res.json();
            setReportData(data);
            setFiltered(data);
            setErrorMsg('');
        } catch (err) {
            console.error('❌ Error fetching report:', err);
            setErrorMsg('❌ Could not load report data.');
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filteredData = reportData.filter((row) =>
            Object.values(row).some(
                (val) => val && val.toString().toLowerCase().includes(term)
            )
        );
        setFiltered(filteredData);
    };

    return (
        <div className="events-page">
            {error && (
                <div className="error-banner">
                    ❌ Error loading events: {error}
                </div>
            )}

            {nextEvent && (
                <div className="next-event-banner">
                    Next Event:&nbsp;
                    <span className="next-link">{nextEvent.name}</span>
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

            {/* 📊 Report & Search Section */}
            <div style={{ marginTop: '4rem' }}>
                <h3>📋 Full Event Report</h3>
                <button onClick={fetchReport}>Run Report</button>

                {reportData.length > 0 && (
                    <>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ marginTop: '1rem', padding: '0.5rem', width: '300px' }}
                        />

                        <table border="1" cellPadding="8" style={{ marginTop: '1rem', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                {Object.keys(filtered[0] || {}).map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {filtered.map((row, idx) => (
                                <tr key={idx}>
                                    {Object.values(row).map((val, i) => (
                                        <td key={i}>{val?.toString()}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                )}

                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            </div>
        </div>
    );
}













// WORKING EVENT.JSX
// import React, { useState, useEffect } from 'react';
// import './Events.css';
//
// export default function Events() {
//     const [events, setEvents] = useState([]);
//     const [error, setError] = useState(null);
//
//     // ✅ Hardcoded base URL to bypass Vercel rewrites entirely
//     const BASE_URL = 'https://lilrockstarsracing-test.onrender.com/api';
//
//     useEffect(() => {
//         console.log("✅ Fetching from:", `${BASE_URL}/events/all`);
//
//         fetch(`${BASE_URL}/events/all`)
//             .then(res => {
//                 const contentType = res.headers.get("content-type");
//                 if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//                 if (!contentType || !contentType.includes("application/json")) {
//                     throw new TypeError("Expected JSON but received " + contentType);
//                 }
//                 return res.json();
//             })
//             .then(data => {
//                 console.log("✅ Events loaded:", data);
//                 setEvents(data);
//             })
//             .catch(err => {
//                 console.error("❌ Fetch error:", err);
//                 setError(err.message);
//             });
//     }, []);
//
//     const nextEvent = events.length > 0 ? events[0] : null;
//
//     return (
//         <div className="events-page">
//             {error && (
//                 <div className="error-banner">
//                     ❌ Error loading events: {error}
//                 </div>
//             )}
//
//             {nextEvent && (
//                 <div className="next-event-banner">
//                     Next Event:&nbsp;
//                     <span className="next-link">{nextEvent.name}</span>
//                 </div>
//             )}
//
//             <div className="events-list">
//                 {Array.isArray(events) && events.length > 0 ? (
//                     events.map((evt) => {
//                         const isNext = nextEvent && evt.eventId === nextEvent.eventId;
//                         const eventDate = evt.date ? new Date(evt.date) : null;
//                         const formattedDate = eventDate && !isNaN(eventDate)
//                             ? eventDate.toLocaleDateString(undefined, {
//                                 month: 'long',
//                                 day: 'numeric',
//                                 year: 'numeric',
//                             })
//                             : 'Date unavailable';
//
//                         return (
//                             <div
//                                 key={evt.eventId || `${evt.name}-${evt.date}`}
//                                 className={`event-card ${isNext ? 'upcoming' : 'other'}`}
//                             >
//                                 <h3 className={`event-title ${isNext ? 'upcoming' : ''}`}>
//                                     {evt.name || 'Unnamed Event'}
//                                 </h3>
//                                 <p className="event-date">Date: {formattedDate}</p>
//                                 <p className="event-location">
//                                     Location: {evt.location || 'TBA'}
//                                 </p>
//                             </div>
//                         );
//                     })
//                 ) : (
//                     !error && <p className="no-events">No events found.</p>
//                 )}
//             </div>
//         </div>
//     );
// }