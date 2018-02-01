import express from 'express';
import passport from 'passport';

import User from '../models/user';

const router = express.Router();

router.get('/users',  (req, res) => {
  return User.fetchAll()
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(error => {
      return res.status(500).json({ error });
    })
});

router.post('/user',  (req, res) => {
  const user = req.body.user;
  const newUser =  new User(user);
  return newUser.save()
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(error => {
      return res.status(500).json({ error: error.data });
    })
});

router.patch('/user',  (req, res) => {
  const user = req.body.user;
  if(user && user.id) {
    return User
      .forge()
      .where( { id: user.id })
      .fetch()
      .then((found => {
        const saveUser = user;
        delete saveUser.id;
        found.set(saveUser)
          .save()
          .then(result => {
            return res.status(200).json(result);
          })
          .catch(error => {
            return res.status(500).json({ error: error.data });
          });
      }))
      .catch(error => {
        return res.status(404).json({error: error });
      })
  } else {
    return res.status(404).json({error: 'No user found!'});
  }
});

router.post('/deleteUser', (req, res) => {
  const user = req.body.user;
  if(user && user.id) {
    return User
      .forge()
      .where( { id: user.id })
      .destroy()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(error => {
        return res.status(500).json({ error });
      });
  } else {
    return res.status(404).json({error: 'No user found!'});
  }
});

export default router;


