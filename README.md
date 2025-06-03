# Nx Workspace

This repository contains a minimal Nx workspace.

## Setup

1. Copy `.env.example` to `.env` and update the values as needed.
2. Install dependencies with `bun install`.

## Running the apps

Start the API server:

```bash
npx nx serve api
```

Start the web client (after building):

```bash
npx nx build web
npx nx serve web
```

