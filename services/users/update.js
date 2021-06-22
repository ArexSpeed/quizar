import { connectToDatabase } from 'util/mongodb'
import Joi from 'joi';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string()
});

const checkUserExist = async (email) => {
  console.log('check exists')
  const { db } = await connectToDatabase();
  const existingUserEmail = await db.collection('users').findOne({ "email": email });
  //const existingUserName = await db.collection('users').findOne({ "name": name });
  console.log(existingUserEmail, 'exist email');
 // console.log(existingUserName, 'exist name');
  if (existingUserEmail ) {
    throw new Error('This user is exists');
  }

};

const update = async (payload) => {
  //console.log(payload, 'payload in services/create');
  const { db } = await connectToDatabase();
  const { email, name, password } = await schema.validateAsync(payload);
  await checkUserExist(email);

  const user = await db.collection('users').insertOne(
    {
      email,
      name,
      passwordSalt,
      passwordHash
    }
  );

  return user;
};

export default create;