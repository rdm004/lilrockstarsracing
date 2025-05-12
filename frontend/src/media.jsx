import React from 'react';
import { createRoot } from 'react-dom/client';
import MediaGallery from './components/MediaGallery';

const root = createRoot(document.getElementById('media-root'));
root.render(<MediaGallery />);