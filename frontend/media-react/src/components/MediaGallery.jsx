import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './MediaGallery.css';

const MediaGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const imageFiles = [
            'awards24.png',
            'background-image.png',
            'cars1.png',
            'cars2.jpeg',
            'cars3.png',
            'checker-flags.jpg',
            'checker-flags.png',
            'juiceboxpink.png',
            'juicebox.png',
            'logo.jpg',
            'rockstarslogo.png',
            'snackpack.png'
        ];

        const imageUrls = imageFiles.map((filename) => {
            return {
                name: filename,
                url: supabase.storage.from('lrr').getPublicUrl(filename).data.publicUrl,
            };
        });

        console.log('Generated image URLs:', imageUrls);
        setImages(imageUrls);
    }, []);

    return (
        <div className="gallery-container">
            <h2 className="gallery-title">Photo Gallery</h2>
            <div className="image-grid">
                {images.map((img) => (
                    <div key={img.name} className="image-card">
                        <img src={img.url} alt={img.name} className="gallery-image" />
                        <p className="image-caption">{img.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaGallery;