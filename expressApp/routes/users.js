var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const database = req.app.locals.database; 
    const users = await database.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users from database');
  }
});

/* CREATE one user */
router.post('/', async function(req, res, next) {
  try {
    const database = req.app.locals.database; 
    
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send('Tous les champs sont requis');
      return;
    }
    
    if (!emailRegex.test(req.body.email)) {
      res.status(400).send('Adresse e-mail invalide');
      return;
    }
    
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      admin: req.body.admin || false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    
    const result = await database.collection('users').insertOne(newUser);
    // res.status(201).send(`User created with id ${result.insertedId}`);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting user into database');
  }
});

/* READ one user */
router.get('/:id', async function(req, res, next) {
  try {
    const database = req.app.locals.database; 
    console.log(req.params.id)
    const my_id = new ObjectId(req.params.id);
    // const query = { name: "Marc" };
    const query = { _id: my_id };
    const user = await database.collection('users').findOne(query);
    // const user = await database.collection('users').findOne({ _id: req.params.id });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users from database');
  }
});

/* UPDATE one user */
router.put('/:id', async function(req, res, next) {

  const database = req.app.locals.database;
  const my_id = new ObjectId(req.params.id);
  const user = await database.collection('users').findOne({ _id: my_id });
  // Hash the new password if it was provided in the request
  let hashedPassword =user.password;
  if (req.body.password) {
    hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  }

  // Set the updated_at field to the current date
  const updatedAt = new Date();

  // Create an update document with the new user data
  const updateDoc = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      admin: req.body.admin,
      updated_at: updatedAt,
    },
  };

  // Update the user document in the database
  const result = await database.collection('users').updateOne({ _id: my_id }, updateDoc);
  console.log(`Updated ${result.modifiedCount} user(s)`);

  // Return a success response
  // res.status(200).send(`User with id ${my_id} updated`);
  res.json({ message: `User with id ${my_id} updated` });

});

/* DELETE one user */
router.delete('/:id', async function(req, res, next) {
  try{
    const database = req.app.locals.database;
    const my_id = new ObjectId(req.params.id);
    const result = await database.collection('users').deleteOne({ _id: my_id });
    console.log(`Deleted ${result.deletedCount} user(s)`);
    res.status(200).send(`User with id ${my_id} deleted`);
  }catch (err){
    console.error(err);
    res.status(500).send('Error deleting user from database');
  }
});

module.exports = router;
