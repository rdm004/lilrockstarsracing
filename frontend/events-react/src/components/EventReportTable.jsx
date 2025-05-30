// src/components/EventReportTable.jsx
import React, { useEffect, useState } from 'react';
import { fetchEventReport } from '../components/';

export default function EventReportTable() {
    const [report, setReport] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEventReport()
            .then(setReport)
            .catch((err) => setError(err.message));
    }, []);

    return (
        <div style={{ marginTop: '3rem' }}>
            <h3>📋 Event Registration Report</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {report.length > 0 ? (
                <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Total Registrations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {report.map((evt) => (
                        <tr key={evt.id}>
                            <td>{evt.name}</td>
                            <td>{new Date(evt.date).toLocaleDateString()}</td>
                            <td>{evt.location}</td>
                            <td>{evt.registrationCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No report data found.</p>
            )}
        </div>
    );
}