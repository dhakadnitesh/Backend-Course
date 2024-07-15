const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan(':method :status :res[content-length] - :response-time ms :date[clf] :http-version :url', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the homepage!');
});

app.get('/get-users', (req, res) => {
  res.status(200).json({ users: ['user1', 'user2', 'user3'] });
});

app.post('/add-user', (req, res) => {
  res.status(201).send('User added successfully!');
});

app.put('/user/:id', (req, res) => {
  res.status(201).send(`User with id ${req.params.id} updated successfully!`);
});

app.delete('/user/:id', (req, res) => {
  res.status(200).send(`User with id ${req.params.id} deleted successfully!`);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
