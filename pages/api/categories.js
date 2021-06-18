import { connectToDatabase } from 'util/mongodb'
//import { cors } from 'util/cors';

export default async (req, res) => {

  const { db } = await connectToDatabase();
  const data = await db.collection("categories").find().sort({_id: 1}).toArray();

  res.json(data);
};