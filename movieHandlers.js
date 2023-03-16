const database = require('./database');

const getMovies = (req, res) => {
  database
    .query('select * from movies')
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const getUsers = (req, res) => {
  database
    .query('select * from users')
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};
const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database.query('select * from users where id = ?', [id]).then(([users]) => {
    if (users[0] != null) {
      res.status(200).json(users[0]);
    } else {
      res.status(404).send('Not Found');
    }
  });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      'INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)',
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('il y a une erreur');
    });
};

const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      'update users set firstname = ?, lastname = ?, email = ?, city =?, language = ? where id = ?',
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.status(200).send('All good');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error editing the User');
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('select * from movies where id = ?', [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};
const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      'INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the movie');
    });
};

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      'update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?',
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.status(200).send('All good');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error editing the movie');
    });
};

module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUsersById,
  postMovie,
  postUser,
  updateMovie,
  updateUsers,
};
