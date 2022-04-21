
import express from 'express'
import taskRouter from './routes/task.js'
import userRouter from './routes/user.js'
import path,{dirname } from 'path'
import { fileURLToPath } from 'url';
import { connection } from './db/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const PORT = 3001;

app.use(express.json({ extended: true }))
app.use('/api', taskRouter)
app.use('/api', userRouter)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const startApp = async () => {
  try {
    connection.connect((err) => {
      if (err) return console.error("error: " + err.message);
      else console.log("conection to MySQL is successful");
   });
  
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`)
    })
  }
  catch (err) {
    console.log(err)
  }
}

startApp()

app.get('/', (req, res) => {
  res.send('Welcome')
})