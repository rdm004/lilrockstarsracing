// src/pages/MediaGallery.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import '../components/MediaGallery.css';

const MediaGallery = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedia = async () => {
            const { data, error } = await supabase
                .from('media')
                .select('media_id, caption, file_path');

            if (error) {
                console.error('❌ Error loading media:', error.message);
                setError('Failed to load images.');
                return;
            }

            const BASE_STORAGE_URL = "https://kwgkwmkvoweyhxxpjuhw.supabase.co/storage/v1/object/public";
            const formatted = data.map(img => ({
                media_id: img.media_id,
                caption: img.caption,
                url: `${BASE_STORAGE_URL}/${img.file_path}`.replace(/([^:]\/)\/+/g, '$1')
            }));

            setImages(formatted);
        };

        fetchMedia();
    }, []);

    return (
        <div className="gallery-container">
            <h2 className="gallery-title">Photo Gallery</h2>

            {error && <p className="error">{error}</p>}

            <div className="image-grid">
                {images.map((img) => (
                    <div key={img.media_id} className="image-card">
                        <img src={img.url} alt={img.caption} className="gallery-image" />
                        <p className="image-caption">{img.caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaGallery;
