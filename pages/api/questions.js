import { connectToDatabase } from 'util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const data = await db.collection("questions").find().sort({_id: 1}).toArray();

  res.json(data);
};