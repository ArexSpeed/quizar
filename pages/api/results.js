import { connectToDatabase } from 'util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const query = req.query;
  switch (req.method) {
    case 'GET': {
      const data = await db.collection("results").find({"user": query.user}).sort({_id: 1}).toArray();
      res.json(data);

      break;
    }
    case 'POST': {
      try {
        const payload = req.body;
        console.log(payload, 'body')
        const data = await db.collection("results").insertOne(payload);
        res.status(200).json({ status: 'updated', data});
      } catch (error) {
        res.status(422).json({ status: 'not_updated', error });
      }
      break;
    }

    default:
      res.status(400);
  }
  
};