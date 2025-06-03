import { MongoClient } from 'mongodb';
import { buildEventPrompt } from '../../libs/event-helpers';

const port = Number(process.env.PORT) || 3001;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'events_db';

const client = new MongoClient(mongoUri);
await client.connect();
console.log('Connected to MongoDB');

const collection = client.db(dbName).collection('events');

Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    if (req.method === 'POST' && url.pathname === '/events') {
      const event = await req.json();
      const prompt = await buildEventPrompt(event);
      const doc = { ...event, prompt };
      await collection.insertOne(doc);
      return new Response(JSON.stringify({ status: 'ok', prompt }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`API server listening on http://localhost:${port}`);
