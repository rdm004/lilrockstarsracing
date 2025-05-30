// src/api/reportService.js
import { supabase } from './supabaseClient';

export const fetchEventReport = async () => {
    const { data, error } = await supabase
        .from('events')
        .select(`
      id,
      name,
      date,
      location,
      registrations(count)
    `)
        .order('date', { ascending: true });

    if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
    }

    return data.map(evt => ({
        id: evt.id,
        name: evt.name,
        date: evt.date,
        location: evt.location,
        registrationCount: evt.registrations[0]?.count || 0,
    }));
};