const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  if (req.method === 'POST') {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;

    if (typeof ID !== 'number' ||
        typeof Name !== 'string' ||
        typeof Rating !== 'number' ||
        typeof Description !== 'string' ||
        typeof Genre !== 'string' ||
        !Array.isArray(Cast) || !Cast.every(item => typeof item === 'string')) {
      return res.status(400).send('bad request. some data is incorrect.');
    }
  }
  next();
});

app.post('/', (req, res) => {
  res.status(200).send('data received ');
  console.log(req.body)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
