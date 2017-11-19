import express from 'express';
import jwt from 'jsonwebtoken';
import adminController from '../controllers/centers/index';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the your Favorite API!',
}));

router.get('/:id', adminController.centerDetails);

router.use('/', (req, res, next) => {
  const token = req.body.token || req.query.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err || decoded.user !== undefined) {
      return res.status(401).json({
        title: 'Not Authenticated!!!',
        error: err
      });
    }
    next();
  });
});

router.post('/', adminController.addCenter);

router.put('/:id', adminController.updateCenter);

export default router;
