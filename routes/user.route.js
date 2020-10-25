const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');
const verifyToken = require('../helpers/jwt-auth');
const User = require('../models/user.model');

router.post('/register', register);
router.post('/authenticate', authenticate);
router.get('/', verifyToken, getAll);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;



function register(req, res) {
  User.findOne({ email: req.body.email }, (err, isMatch) => {
    if(err){
      console.log(err)
      return res.status(500).json({ msg: "Server error: Operation was not successful" });

    } else {
      // check if the with this email already exist
      if(isMatch){
        return res.status(400).json({ msg: 'User with this email already exist' });

      } else {
        // Create new user objects
        let user = new User(req.body);

        user.verificationToken = generateToken();
        user.isVerified = false;
        user.password = hash(req.body.password);   // Hash user password

        // Store new user
        user.save((err, data) => {
          if(!err && data){
            return res.status(200).json('Registered successfully');
          } else {
            console.log(err)
            return res.status(500).json({ msg: "Server error: Operation was not successful" }); 
          }
        })
      } 
    }
  });
}

function authenticate(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if(err){
      console.log(err)
      return res.status(500).json({ msg: "Server error: Operation was not successful" }); 
    } else {
      // If user exist and password is matched
      if(user && bcrypt.compareSync(password, user.password)){
        if(!user.isVerified){
          return res.status(400).json({ msg: 'Email address has not been verified, follow the link in your email inbox' });
        } else {
          const token = jwt.sign({ sub: user.id, id: user.id, email: user.email }, config.secret, { expiresIn: '2h' });
          return res.status(200).json({ ...user.toJSON(), token })
        }
      } else {
        return res.status(400).json({ msg: 'Incorrect email or password' });
      }
    }
  });
}

function getAll(req, res) {
  User.find((err, users) => {
    if(!err && users){
      return res.status(200).json(users)
    } else {
      console.log(err)
      return res.status(500).json({ msg: "Server error: Operation was not successful" }); 
    }
  });
}

function deleteUser(req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if(!err && data){
      return res.status(200).json({})
    } else {
      console.log(err)
      return res.status(500).json({ msg: "Server error: Operation was not successful" }); 
    }
  });
}






// helper functions
function hash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function generateToken() {
  return crypto.randomBytes(40).toString('hex');
}