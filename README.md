# Modern E-commerce Platform

A full-stack e-commerce website built with React, Node.js, Express, and MongoDB.

## Features

- Modern and responsive UI design
- Product browsing with filtering and search
- Shopping cart functionality
- User authentication and account management
- Secure checkout process
- Order tracking
- Admin dashboard for product management

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- State Management: Redux Toolkit
- Styling: Tailwind CSS
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Create a .env file in the backend directory with your MongoDB URI and JWT secret
5. Start the development servers:
   - Frontend: `npm run dev`
   - Backend: `npm run dev`

## Project Structure

```
modern-ecommerce/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── services/
│   │   └── styles/
│   └── public/
└── backend/           # Node.js backend application
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── utils/
    └── config/
```
