# Sky Movie - API Service

RESTful API backend service for the Sky Movie platform, built to handle authentication, movie metadata, and caching for high-traffic scenarios.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (Layered / Modular Architecture)
- **Database:** MongoDB (Mongoose)
- **Caching & Rate Limiting:** Redis
- **Security:** JWT (HttpOnly/Secure cookies, Access/Refresh tokens), Express-Rate-Limit, Helmet, CORS
- **Infrastructure:** Docker, Nginx, Cloudflare CDN

## Core Features & Architecture

- **Stateless Auth:** Dual-token JWT architecture (Short-lived Access Token & Long-lived Refresh Token in HttpOnly cookies).
- **Caching Layer:** Redis cache layer for high-frequency queries (movies list, genres, trending items) to minimize MongoDB load.
- **Security Practices:** Strict CORS policy, IP/User-based rate limiting on sensitive routes, and NoSQL injection protection.
- **Stateless Storage:** External URL referencing for media files (posters, video sources) to avoid local server disk coupling.

## System Architecture

```text
[ User Browser / Client ]
           │
           ▼
   [ Cloudflare CDN ]
           │
           ▼
 [ Nginx Reverse Proxy ]
           │
           ▼
    [ Express API ] ──► [ Redis Cache ]
           │
           ▼
      [ MongoDB ]
      
Setup & Running Locally
Prerequisites
Node.js >= 18

MongoDB & Redis (or Docker)

Step 1: Clone Repository
Bash
git clone [https://github.com/your-username/sky-movie-api.git](https://github.com/your-username/sky-movie-api.git)
cd sky-movie-api
Step 2: Environment Variables
Create a .env file in the root directory based on .env.example:

Bash
cp .env.example .env
Step 3: Run Application
Option A: Using Docker Compose (Recommended)

Bash
docker-compose up -d
Option B: Manual Setup

Bash
npm install
npm run dev
The API service will be available at http://localhost:5000.