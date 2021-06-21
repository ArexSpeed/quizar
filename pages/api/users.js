import { connectToDatabase } from 'util/mongodb';
import create from 'services/users/create';

export default async (req, res) => {
  const { client, db } = await connectToDatabase();
  const isConnected = await client.isConnected();
  const data = await db.collection("users").find().sort({_id: 1}).toArray();
  console.log(isConnected, 'connect');
  switch (req.method) {
    case 'GET': {
      const data = await db.collection("users").find({"user": query.user}).sort({_id: 1}).toArray();
      res.json(data);

      break;
    }
    case 'POST': {
      try {
        const payload = req.body;
        console.log(payload, 'body')
        const data = await create(payload);
        res.status(200).json({ status: 'created', data});
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }

  res.json(data);
};