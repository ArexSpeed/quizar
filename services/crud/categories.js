import { connectToDatabase } from 'util/mongodb'

export const getCategories = async () => {
  const { db } = await connectToDatabase();
  const categories = await db.collection('categories').find().sort({_id: 1})
 
  return categories;
};