// src/pages/Contact.jsx
import React from 'react';
import '../components/pages.css'; // if you've extracted page-specific styles

export default function Contact() {
    return (
        <>
            <header className="hero">
                <div className="overlay">
                    <h1 className="hero-title">Building Champions One Lap at a Time!</h1>
                </div>
            </header>

            <div className="background-image">
                <main className="contact-page">
                    <div className="contact-container">
                        <section className="contact-info">
                            <h2>We'd Love to Hear From You!</h2>
                            <p>Have questions about our races, events, or want to join our series? Reach out to us through the following:</p>

                            <div className="contact-item">
                                <strong>Email:</strong>{' '}
                                <a href="mailto:info@lilrockstarsracing.com">info@lilrockstarsracing.com</a>
                            </div>

                            <p>Want to reach out directly to the Lil Rockstars Series Promoter?</p>

                            <div className="contact-item">
                                <strong>Email:</strong>{' '}
                                <a href="mailto:admin@lilrockstarsracing.com">admin@lilrockstarsracing.com</a>
                                <br /><br />
                                <strong>Phone:</strong> (910) 237-1343
                            </div>

                            <p>If you are having issues with our site, please contact our Webmaster:</p>
                            <div className="contact-item">
                                <strong>Email:</strong>{' '}
                                <a href="mailto:webmaster@lilrockstarsracing.com">webmaster@lilrockstarsracing.com</a>
                            </div>
                        </section>

                        <aside className="contact-aside">
                            <p>For more timely updates, and additional information, please visit our Facebook page and follow us!</p>
                            <div className="aside-item">
                                <a
                                    href="https://www.facebook.com/profile.php?id=100091910351052"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="facebook-button"
                                >
                                    <img src="/website-images/fbicon.png" alt="Facebook Icon" /> Lil Rockstars
                                </a>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>

            <footer className="footer">
                <div className="footer-text">
                    <p>2025 Lil Rockstars Racing. All rights reserved.</p>
                    <p id="construction">Website Still Under Construction</p>
                </div>
            </footer>
        </>
    );
}
