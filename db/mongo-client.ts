import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db('stayswift');
export { client, db };
