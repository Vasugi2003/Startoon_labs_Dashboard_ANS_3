const express = require('express');
const {connectdb} = require('./config/db');
const userController = require('./controllers/userController');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

connectdb()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.post('/api/users', userController.insertUser);
app.get('/api/users', userController.getAllUsers);
app.get('/api/users/:id', userController.getUser);
app.put('/api/users/:id', userController.updateUser);
app.delete('/api/users/:id', userController.deleteUser);

const port = 9000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
