const User = require('../models/user.model');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.allUsers = async function(req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users from database');
  }
}

exports.createUser = async function(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send('Tous les champs sont requis');
      return;
    }

    if (!emailRegex.test(req.body.email)) {
      res.status(400).send('Adresse e-mail invalide');
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      admin: req.body.admin || false,
    });

    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting user into database');
  }
}

exports.getOneUser = async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving user from database');
  }
}

exports.updateUser = async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: `User with id ${req.params.id} not found` });
    }

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.admin !== undefined) {
      user.admin = req.body.admin;
    }

    user.updated_at = new Date();
    const updatedUser = await user.save();
    res.json({ message: `User with id ${updatedUser._id} updated` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  } 
}

exports.deleteUser = async function(req, res, next) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    console.log(`Deleted user with id ${req.params.id}`);
    res.status(200).send(`User with id ${req.params.id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting user from database');
  }
}