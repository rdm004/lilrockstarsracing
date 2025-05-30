import { supabase } from './supabaseClient';

export const fetchEventReport = async () => {
    const { data, error } = await supabase
        .from('event') // ✅ this is the table name
        .select(`
    event_id,
    name,
    date,
    location,
    registration(count)
  `)
        .order('date', { ascending: true });

    if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
    }

    return data.map(evt => ({
        id: evt.event_id,
        name: evt.name,
        date: evt.date,
        location: evt.location,
        registrationCount: evt.registration?.[0]?.count || 0,
    }));
};