import { connectToDatabase } from 'util/mongodb'

export default async (req, res) => {
  const { client, db } = await connectToDatabase();
  const isConnected = await client.isConnected();
  const data = await db.collection("users").find().sort({_id: 1}).toArray();
  console.log(isConnected, 'connect')

  res.json(data);
};