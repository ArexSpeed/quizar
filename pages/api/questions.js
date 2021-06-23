import { connectToDatabase } from 'util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const query = req.query;

  switch (req.method) {
    case 'GET': {
      const data = await db.collection("questions").find({"category": query.category}).sort({_id: 1}).toArray();
      res.json(data);

      break;
    }
    case 'POST': {
      try {
        const payload = req.body;
        //console.log(payload, 'body')
        const question = await db.collection('questions').insertOne(
          {
            category: payload.category,
            content: payload.content,
            answers: [
              {
                valid: true,
                content: payload.correctAnswer
              },
              {
                valid: false,
                content: payload.answer2
              },
              {
                valid: false,
                content: payload.answer3
              },
              {
                valid: false,
                content: payload.answer4
              },
            ]
          }
        );
        res.status(200).json({ status: 'created', question});
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }

};