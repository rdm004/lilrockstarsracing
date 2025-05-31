import React from 'react';
import '../components/pages.css'; // or split styles as needed

const About = () => (
    <>
        <div className="rules-page-layout">
            <main className="rules-container">
                <section className="introduction">
                    <p>We are an independent series inspired by the original Juicebox Division. While we share a common goal,
                        <strong>some rules may differ</strong> as we are two separate groups.</p>
                </section>

                <section className="rules-section">
                    <h2>Eligibility & Divisions</h2>
                    <p><strong><u>Age Requirement:</u></strong> 7 and under (as of January 1, 2025)</p>
                    <p><strong><u>Ages 3–5:</u></strong> Radio Flyer Ultimate Go-Kart (24V only)</p>
                    <p><strong><u>Ages 6–7:</u></strong> "Snack Pack" Radio Flyer Extreme Drift Go-Kart (36V only)</p>
                    <p className="indented"><em>Note: The <strong>"Snack Pack"</strong> division is exclusive to the Rockstars Series and is
                        <strong>not recognized</strong> by the Juicebox Division for events outside our series.</em></p>
                    <p><strong><u>Driver Age Policy:</u></strong> A driver’s age as of <strong>January 1, 2025</strong> determines their
                        division for the entire year.</p>
                    <p className="indented"><em>Example:</em> If your child is <strong>4 years old</strong> as of January 1, 2025, they will remain in
                        the <strong>3-5 division</strong> for the full season.</p>
                    <p><strong>Changing divisions mid-season will impact points standings.</strong></p>
                </section>

                <section className="rules-section">
                    <h2>Tech & Equipment Rules</h2>
                    <p className="warning"><span style={{ color: 'red' }}>🚨NO MODIFICATIONS!🚨</span></p>
                    <p><strong>Must use original equipment from the manufacturer!</strong></p>
                    <p>(This rule applies to performance-related components. Modifications such as custom bodies, body bracing,
                        fairings, steering wheels, or decals are allowed.)</p>
                    <h3><u>Allowed Modifications:</u> These Items can assist for better fit and control.</h3>
                    <ul className="indent-bullets">
                        <li>Grip tape</li>
                        <li>Velcro</li>
                        <li>Pedal extenders</li>
                    </ul>
                    <h3><u>Prohibited Modifications:</u></h3>
                    <ul className="indent-bullets">
                        <li><strong>Motors and drive gears:</strong> Must remain stock.</li>
                        <li><strong>Batteries:</strong> Must match the manufacturer’s designated voltage.</li>
                        <li><strong>Plastic tires only:</strong> No rubber bands, bed liner spray, or additional traction aids.</li>
                    </ul>
                </section>

                <section className="rules-section">
                    <h2>Safety Requirements</h2>
                    <ul className="no-bullets">
                        <li><strong><u>Helmets:</u></strong> Required (Bicycle helmets are the minimum standard).</li>
                        <li><strong><u>Footwear:</u></strong> Closed-toe shoes must be worn at all times.</li>
                        <li><strong><u>Racing suits:</u></strong> Optional but encouraged.</li>
                    </ul>
                </section>

                <section className="rules-section">
                    <h2>Race Procedures</h2>
                    <ul className="no-bullets">
                        <li><strong><u>Starting positions:</u></strong> Determined by a pill draw.</li>
                        <li><strong><u>Ages 3–5:</u></strong> 7-wide start from a standing position.</li>
                        <li><strong><u>Ages 6–7 ("Snack Pack"):</u></strong> Rolling start, 2x2 formation, in first gear. Shift to
                            third gear when the <strong><span style={{ color: 'green' }}>green flag</span></strong> drops.</li>
                    </ul>
                </section>

                <section className="rules-section">
                    <h2>Registration & Conduct</h2>
                    <p><strong><u>Pre-Registration:</u></strong> Event registration will have a cut-off time, announced with
                        event details.</p>
                    <p>If you do not have Facebook, you may register <strong>by phone:</strong> (910) 237-1343.</p>
                    <h3>Penalties & Disqualifications</h3>
                    <p><strong><u>Tech Inspection:</u></strong> Any driver who fails tech inspection will not receive awards and must
                        correct the issue before the next event.</p>
                    <p><strong><u>Intentional cheating:</u></strong> Will result in immediate disqualification and removal from the
                        series.</p>
                    <p className="warning"> <strong><span style={{ color: 'red' }}>🚫 Cheating will NOT be tolerated!🚫</span></strong></p>
                    <p>If you modify your child's kart for an unfair advantage, you are part of the problem,
                        not the solution!</p>
                </section>
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

export default About;
