module.exports = {
    getMovies: (req, res) => {
        //get the db that was set in index.js
        const db = req.app.get('db');

        //use dot notation to access the SQL query, then invoke it. Use promises to package and send a response based on the success of the query.
        db.get_movies().then(movies => {
            res.status(200).send(movies)
        })
        .catch(err => res.status(500).send(err));
    },
    addMovie: (req, res) => {
        const {name, rating} = req.body,
              db = req.app.get('db');

        //pass in arguments like they are a function if using $1 and $2 as placeholders in the SQL query.
        db.add_movie(name, rating).then(movie => {
            res.status(200).send(movie);
        })
        .catch(err => res.status(500).send(err));
    },
    updateMovie: (req, res) => {
        const {id} = req.params,
              {name} = req.body,
              db = req.app.get('db');

        //pass in an object with values as arguments if using ${} syntax for the placeholders in the SQL query
        db.update_movie({name: name, id: id})
        .then(movies => {
            db.get_movies().then(movies => {
                res.status(200).send(movies)
            })
        })
    },
    deleteMovie: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.delete_movie(id).then(movie => {
            res.status(200).send('Movie Deleted')
        })
        .catch(err => res.status(500).send(err))
    }
}