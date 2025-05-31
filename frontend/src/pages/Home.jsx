import React from 'react';
import '../styles/pages.css'; // or split styles as needed

export default function Home() {
    return (
        <>
            <header className="hero">
                <div className="overlay">
                    <h1 className="hero-title">Building Champions One Lap at a Time!</h1>
                </div>
            </header>

            <div className="background-image">
                <main>
                    <div className="welcome-sponsor-heading">
                        <p>
                            <span style={{ color: '#f47c20' }}>'Lil Rockstars Racing'</span> would like to give a special shout out to our '2025 Sponsors', please be sure to visit our sponsor page <span style={{ color: 'red' }}>(Coming Soon!)</span> and show your support for these wonderful organizations!
                        </p>
                    </div>

                    <div className="welcome-container">
                        <section className="welcome">
                            <h2>Welcome</h2>
                            <p>Founded in 2023, the <b><em><u>Lil Rockstars Juicebox / Snackpack Series</u></em></b> began as part of the original Juicebox division in Florida before establishing its roots in Fayetteville, NC.</p>
                            <p>Our journey began with just 25 drivers at our first race. Today, we are proud to have grown to a roster of over 85 racers, ranging in ages from 3 to 7!</p>
                            <p>Our series is about more than just racing. We emphasize the belief that <b><em>“God is #1”</em></b>, no matter where we finish on the track. We also value the importance of family and friendships, celebrating every victory—big or small.</p>
                            <p>And of course, we all strive for the big prize 🏆!</p>
                            <p>Our mission is simple and clear:</p>
                            <p><b><em>Build Champions One Lap at a Time!</em></b></p>
                        </section>
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
