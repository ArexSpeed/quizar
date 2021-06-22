import { connectToDatabase } from 'util/mongodb'

export default async (req, res) => {

  const { db } = await connectToDatabase();
  switch (req.method) {
    case 'GET': {
      const data = await db.collection("categories").find().sort({_id: 1}).toArray();
      res.json(data);

      break;
    }
    case 'POST': {
      try {
        const payload = req.body;
        console.log(payload, 'body')
        const category = await db.collection('categories').insertOne(
          {
            name: payload.name,
          }
        );
        res.status(200).json({ status: 'created', category});
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }

};