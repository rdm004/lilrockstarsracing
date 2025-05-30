import { supabase } from './supabaseClient';

export const fetchEventReport = async () => {
    const { data, error } = await supabase
        .from('event')
        .select(`
      id,
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
        id: evt.id,
        name: evt.name,
        date: evt.date,
        location: evt.location,
        registrationCount: evt.registration?.[0]?.count || 0,
    }));
};