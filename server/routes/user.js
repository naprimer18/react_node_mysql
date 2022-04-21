import { Router } from 'express';
import User from '../models/user.js';
const router = Router();

router.post('/addUser', async (req, res) => {
  try {
    console.log("req ", req.body);
    const { login, password } = req.body;
    const isUserRegistered = await User.findOne({login});
    console.log("isUserRegistered ", isUserRegistered);
    if(isUserRegistered) {
      return res.status(400).json({message: 'such user already exists!'})
    }
    const user = new User({login, password});
    user.save();
    return res.status(400).json({message: 'user was registered successfully'})

  } catch (err) {
    res.status(500).json({message: 'Something wrong !'})
  }
})


export default router;