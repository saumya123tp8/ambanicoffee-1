# Ambani Coffee an Ecommerce application

A full-stack cafe ordering and management application built with React (client) and Node.js (server).

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Using the Application](#using-the-application)
- [Admin Access](#admin-access)
- [Features](#features)
- [Tech Stack](#tech-stack)

---

## Prerequisites

Make sure you have the following installed before getting started:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

---

## Project Structure

```
{initial_root}/
├── client/          # React frontend
├── routes/          # API route handlers
├── models/          # Database models
├── controllers/     # Business logic
├── config/          # App configuration
├── server.js        # Entry point
└── package.json
```

---

## Installation

You need to install dependencies in **two places** — the root (server) and the client folder.

### Step 1 — Install server dependencies

```bash
cd {initial_root}
npm i
```

### Step 2 — Install client dependencies

```bash
cd {initial_root}\client
npm i
```

> Run both `npm i` commands before attempting to start the app.

---

## Running the Application

From the **root directory**, run the following command to start both the server and client together:

```bash
cd {initial_root}
npm run dev
```

The app will be available at:

| Service | URL |
|---------|-----|
| Frontend (React) | `http://localhost:3000` |
| Backend (API) | `http://localhost:8080` |

> Ports may vary depending on your `.env` configuration.

---

## Using the Application

### As a Customer

1. Open the app in your browser at `http://localhost:3000`
2. Browse the menu across categories
3. Add items to your cart
4. Register or log in to place an order
5. Complete checkout and track your order status

### As an Admin

1. Navigate to `http://localhost:3000/login`
2. Log in with the admin credentials below
3. Access the **Admin Dashboard** from the navigation menu
4. Manage products, orders, users, and store settings

---

## Admin Access

Use the following credentials to log in as an administrator:

| Field    | Value             |
|----------|-------------------|
| Email    | `admin@admin.com` |
| Password | `123456`          |

> ⚠️ **Important:** Change the admin password immediately after your first login in a production environment.

### Admin Capabilities

- **Dashboard** — View sales overview, recent orders, and key stats
- **Products** — Add, edit, or remove menu items and categories
- **Orders** — View and update order statuses (pending → processing → delivered)
- **Users** — View registered customers and manage accounts
- **Stores** — Manage active store locations and their details

---

## Features

### Customer-facing
- Browse menu by category
- Add items to cart and checkout
- User registration and login
- Order history and tracking

### Admin
- Full product and category management
- Order management with status updates
- User management
- Multi-store location management
- Sales dashboard

---

## Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React, React Router     |
| Styling   | CSS3, responsive layout |
| Backend   | Node.js, Express        |
| Database  | MongoDB / Mongoose      |
| Auth      | JWT (JSON Web Tokens)   |

---

## Troubleshooting

**`npm run dev` fails to start**
- Make sure you have run `npm i` in both `{initial_root}` and `{initial_root}\client`
- Check that no other process is using the required ports


---

## License

This project is for educational/personal use.
