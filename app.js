const express = require('express');
var jwt = require('jsonwebtoken');
const { hashPassword, verifyPassword, verifyToken } = require('./auth.js');

const app = express();

app.use(express.json());

const port = 5000;

const welcome = (req, res) => {
  res.send('Welcome to my favourite movie list');
};

app.get('/', welcome);

const movieHandlers = require('./movieHandlers');

app.get('/api/users/:id', movieHandlers.getUsersById);
app.get('/api/users', movieHandlers.getUsers);
app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);
app.post(
  '/api/login',
  movieHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
app.post('/api/users', hashPassword, movieHandlers.postUser);

app.use(verifyToken);
app.put('/api/users/:id', hashPassword, movieHandlers.updateUsers);
app.post('/api/movies', movieHandlers.postMovie);
app.put('/api/movies/:id', movieHandlers.updateMovie);
app.delete('/api/movies/:id', movieHandlers.deleteMovie);
app.delete('/api/users/:id', movieHandlers.deleteUser);
app.post('/api/movies', verifyToken, movieHandlers.postMovie);

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
