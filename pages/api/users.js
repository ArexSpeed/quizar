import { connectToDatabase } from 'util/mongodb';
import create from 'services/users/create';
import { ObjectID } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

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
    case 'PUT': {
      try {
        const query = req.query.id;
        const payload = req.body;
        const id = ObjectID(query);
        console.log(query, 'query user');
        console.log(payload, 'payload put')
        const filter = { _id: id};
          const updateDoc = {
            $set: {
              name: payload.name,
              email: payload.email, 
              image: payload.imageUrl
            },
          };
        
        const options = { upsert: true };
        const data = await db.collection("users").updateOne(filter, updateDoc, options);
        //console.log(data, 'find user');
        res.status(200).json({status: 'edit user', data});
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }

};