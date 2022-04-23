import { Router } from 'express';
import { connection } from '../db/index.js'
const router = Router();

router.post('/addTask', async (req, res) => {
    connection.query("insert into tasks(name) values(?)",[req.body.name],(err, results, fields) => {
      if(err) {
        return res.status(500).json({message: `Something wrong !, ${err}`})
      }
      return res.status(201).json({message: 'Message Was Saved !'})
    });
})

router.put('/editTask', async (req, res) => {
  connection.query(`update tasks set name = ? where id=?`,[req.body.name, req.body.id],(err, results, fields) => {
    if(err) {
      return res.status(500).json({message: 'Something wrong !'})
    }
    return res.status(201).json({names: results})
  })
})

router.delete('/deleteTask', async (req, res) => {
  connection.query(`delete from tasks where id=?`,[req.body.id],(err, results, fields) => {
    if(err) {
      return res.status(500).json({message: 'Something wrong !'})
    }
    return res.status(201).json({names: results})
  })
})

router.get('/getAllTasks', async (req, res) => {
  connection.query(`select * from tasks`,(err, results, fields) => {
    if(err) {
      return res.status(500).json({message: 'Something wrong !'})
    }
    return res.status(201).json({names: results})
  })
})

export default router;