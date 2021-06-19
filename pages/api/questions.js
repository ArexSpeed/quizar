import { connectToDatabase } from 'util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const query = req.query;

  const data = await db.collection("questions").find({"category": query.category}).sort({_id: 1}).toArray();

  return res.json(data);
};