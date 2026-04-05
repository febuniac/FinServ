# FinSecure Platform

Enterprise-grade financial services platform powering real-time payments, account management, and regulatory compliance for 2M+ active users.

## Architecture
- **src/api/** — REST API endpoints (Express.js)
- **src/services/** — Business logic layer
- **src/middleware/** — Auth, rate limiting, logging
- **src/models/** — Database models (PostgreSQL)
- **src/utils/** — Shared utilities

## Tech Stack
- Node.js 20 LTS / Express.js 4.x
- PostgreSQL 15 + Redis 7
- JWT + OAuth2.0 auth
- Stripe Connect + ACH payments
- PCI-DSS Level 1 compliant

## Quick Start
```bash
npm install
cp .env.example .env
docker-compose up -d
npm run migrate && npm run dev
```
