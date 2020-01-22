//dotenv should be required on the top, invoking the config method from the package
require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      cors = require('cors'),
      //when using dotenv, variables are declared in the .env file and can be accessed here from the process.env object
      {SERVER_PORT, CONNECTION_STRING} = process.env,
      ctrl = require('./controller'),
      app = express();

app.use(cors());
app.use(express.json());

//massive is required at the top, and then invoked, passing in the db url that you are using. In the promise function, set the db instance to set the db in the app.
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected');
})

app.get('/api/movies', ctrl.getMovies);
app.post('/api/movie', ctrl.addMovie);
app.put('/api/movie/:id', ctrl.updateMovie);
app.delete('/api/movie/:id', ctrl.deleteMovie);

const port = SERVER_PORT;
app.listen(port, () => console.log(`Server running on ${port}`));