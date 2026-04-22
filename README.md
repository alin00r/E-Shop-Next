# Noor Stor (Next.js + Mongoose + NextAuth)

Simple e-commerce demo built with Next.js (Pages Router), Node.js API routes, Mongoose, and NextAuth (Google + GitHub providers).

## Requirements

- Node.js 18+
- npm
- MongoDB (local or cloud)

## Install

```bash
npm install
```

Set your connection string:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/noor_stor
```

For authentication, add these values to `.env.local` as well:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-long-random-secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...
```

For local development, put all values in `.env.local` at the project root.

## Run in development

```bash
npm run dev
```

## URLs

- App: http://localhost:3000
- Login: http://localhost:3000/login
- NextAuth API: http://localhost:3000/api/auth/signin
- API (list/create): http://localhost:3000/api/products
- API (buy): http://localhost:3000/api/products/:id/buy
- API (totals): http://localhost:3000/api/purchases/total
- API news list/create: http://localhost:3000/api/news
- API news item: http://localhost:3000/api/news/:id

## Authentication and Access Rules

- Guests (no session) can browse products, but only the first 4 products are returned.
- Guests cannot create, edit, or delete products.
- Guests cannot clear purchased totals.
- News toast is only visible for authenticated users.
- Signed-in users can access full product management (add, edit, delete) and purchase cleanup actions.

## Implemented Features

- Product CRUD through Node.js API routes with Mongoose and session-based authorization.
- Google and GitHub sign-in using NextAuth with a custom login page.
- Session-aware product pages (guest-limited list vs full signed-in access).
- Buy product endpoint plus running total purchased amount.
- Purchased totals clear action restricted to authenticated users.
- News CRUD through API routes, with DB-backed news pages and authenticated-only toast display.

## Build

```bash
npm run build
```

## Screenshots

![Home Page](docs/screenshots/home.png)

![Products Page](docs/screenshots/products.png)

![Product Details Page](docs/screenshots/product-details.png)

![Add Product Page](docs/screenshots/add-product.png)

![Contact Page](docs/screenshots/contact.png)
