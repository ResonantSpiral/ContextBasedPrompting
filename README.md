# Event-Based E-Card Generator

This repository contains an Nx workspace with a Bun-powered API, a small React
web client and a shared helper library. The goal is to generate event e-cards by
combining user data with current weather information and storing the result in
MongoDB.

## Prerequisites

- Node.js and Bun installed
- Nx available globally or via `npx`
- Access to a MongoDB instance

## Setup

1. Copy `.env.example` to `.env` and set `PORT`, `MONGODB_URI` and `DB_NAME`.
2. Install dependencies with `bun install`.

## Running the API

```bash
npx nx serve api
```

This launches a POST `/events` endpoint that stores events with a generated
prompt.

## Running the Web App

```bash
npx nx build web
npx nx serve web
```

Build first, then the web client serves a simple form for creating events.

## Helper Library

The `event-helpers` library fetches forecast data from Open-Meteo and builds the
event prompt text. The API uses this before inserting documents into MongoDB.

