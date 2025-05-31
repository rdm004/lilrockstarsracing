// src/pages/MediaGallery.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import '../components/MediaGallery.css';

const MediaGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchMedia = async () => {
            const { data, error } = await supabase.from('media').select('media_id, caption, url');
            if (error) {
                console.error('Error loading media:', error);
            } else {
                setImages(data);
            }
        };

        fetchMedia();
    }, []);

    return (
        <div className="gallery-container">
            <h2 className="gallery-title">Photo Gallery</h2>
            <div className="image-grid">
                {images.map((img) => (
                    <div key={img.media_id} className="image-card">
                        <img src={img.url} alt={img.caption || 'Media'} className="gallery-image" />
                        <p className="image-caption">{img.caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaGallery;

