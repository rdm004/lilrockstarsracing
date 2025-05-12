import React from 'react';
import './MediaGallery.css'; // Optional CSS file
const images = [
    '/website-images/cars1.png',
    '/website-images/cars2.jpeg',
    '/website-images/cars3.png',
];

const MediaGallery = () => {
    return (
        <section className="media-gallery">
            <h1 className="media-title">Race Highlights</h1>
            <div className="media-grid">
                {images.map((src, i) => (
                    <img key={i} src={src} alt={`Race ${i + 1}`} className="gallery-img" />
                ))}
            </div>
        </section>
    );
};

export default MediaGallery;