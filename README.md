🌟 Lil Rockstars Racing - Capstone Project
Welcome to the Lil Rockstars Racing full-stack application! This project is a complete racing event management portal, built to serve both end-users and administrators.

🎓 Project Purpose
This web application allows:
•	Parents to create accounts, register racers, and sign up for events
•	Admins to manage event registrations and media
•	General Visitors to browse public content such as photos and events

🚀 Tech Stack
Layer	Tech
Frontend	          HTML, CSS, JavaScript, React
Backend	              Java, Spring Boot
Database	          Supabase (PostgreSQL)
Hosting	              Vercel (Frontend), Supabase (Backend DB)
Domain  	          Cloudflare
Auth	              JWT, Spring Security

🔎 Features
Public Pages
•	Home - Static landing page
•	About, Contact - Static info pages
•	Media - React photo gallery (pulls from Supabase)
•	Events - Upcoming events list (pulls from Supabase)
•	Admin - Upcoming events list (pulls from Supabase)


Admin Dashboard
•	View upcoming events
•	Secure login via email/password (JWT auth)
Console CLI Test Tool
•	TestRunner.java allows testing functionality via the command line:
o	Create Event
o	Create Person (Admin or Parent)
o	Create Racer
o	Register Racer for Event
o	View Events
o	View Racers
o	View Registrations
o	Approve Registrations (Admin)

🌐 Deployment & Testing
•	React frontends deployed to Vercel: https://your-project.vercel.app
•	Spring Boot backend runs locally or can be deployed
•	Static assets in /public folder accessible via Vercel
Testing Tools:
•	Spring Boot Test Console via TestRunner
•	Browser DevTools & Supabase Console

📦 Folder Structure
frontend/
├── public/               # Static HTML/CSS/JS
├── media-react/         # React app for photo gallery
├── events-react/        # React app for public events
├── admin-react/         # React app for admin dashboard

backend/
├── src/
│   └── main/java/com/lilrockstars/backend/
│       ├── config/
│       ├── controllers/
│       ├── dto/
│       ├── entities/
│       ├── repositories/
│       ├── service/
│       └── TestRunner.java

🎓 Author
•	Ryan Merrill

🎯 Live Site (Sample)
•	https://your-project.vercel.app

🛠️ Setup (Local)
Backend
cd backend
./mvnw spring-boot:run
Frontend (e.g. media-react, events-react, & admin-react)
cd frontend/media-react
npm install
npm run dev

cd frontend/events-react
npm install
npm run dev

cd frontend/admin-react
npm install
npm start



 

