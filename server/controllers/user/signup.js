import bcrypt from 'bcryptjs';
import { User } from '../../models';

const signup = (req, res) => {
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(500).json({
        message: 'password must be greater than 6 characters',
      });
    }
  }
  if (!req.body.password) {
    return res.status(500).json({
      message: 'password is required',
    });
  }

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then((user) => res.status(201).send({
      status: 'success',
      message: 'account created',
      user
    }))
    .catch(error => res.status(500).send({
      message: error.errors[0].message
    }));
};

export default signup;
