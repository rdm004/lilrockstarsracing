// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [parents, setParents] = useState([]);
    const [selectedParent, setSelectedParent] = useState(null);
    const [racers, setRacers] = useState([]);

    // Load all registrations
    useEffect(() => {
        axios.get('http://localhost:8080/api/registration/all')
            .then(res => setRegistrations(res.data))
            .catch(err => console.error('Error loading registrations', err));
    }, []);

    const updateStatus = (id, status) => {
        axios.put(`http://localhost:8080/api/registration/${id}/status`, null, {
            params: { status }
        })
            .then(() => {
                setRegistrations(prev => prev.map(reg => reg.registrationId === id ? { ...reg, status } : reg));
            })
            .catch(err => console.error('Status update failed', err));
    };

    const loadParents = () => {
        axios.get('http://localhost:8080/api/person/parents')
            .then(res => setParents(res.data))
            .catch(err => console.error('Failed to load parents', err));
    };

    const loadRacersForParent = (parentId) => {
        axios.get(`http://localhost:8080/api/racers/parent/${parentId}`)
            .then(res => {
                setRacers(res.data);
                setSelectedParent(parentId);
            })
            .catch(err => console.error('Failed to load racers', err));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold">Registrations</h2>
                {registrations.map(reg => (
                    <div key={reg.registrationId} className="p-4 border mb-2 rounded shadow">
                        <p><strong>Event:</strong> {reg.eventName}</p>
                        <p><strong>Racer:</strong> {reg.racerName}</p>
                        <p><strong>Status:</strong> {reg.status}</p>
                        <div className="space-x-2 mt-2">
                            <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => updateStatus(reg.registrationId, 'APPROVED')}>Approve</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => updateStatus(reg.registrationId, 'DENIED')}>Deny</button>
                            <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => updateStatus(reg.registrationId, 'CANCELLED')}>Cancel</button>
                        </div>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-xl font-semibold">Parents & Racers</h2>
                <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={loadParents}>
                    Load Parents
                </button>

                {parents.map(parent => (
                    <div key={parent.id} className="mb-4">
                        <p className="font-bold">{parent.firstName} {parent.lastName} ({parent.email})</p>
                        <button className="text-blue-500 underline" onClick={() => loadRacersForParent(parent.id)}>
                            View Racers
                        </button>
                        {selectedParent === parent.id && (
                            <ul className="list-disc pl-6 mt-2">
                                {racers.map(r => (
                                    <li key={r.racerId}>{r.firstName} {r.lastName} - Age {r.age}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default AdminDashboard;