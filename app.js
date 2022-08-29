require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const { validateMovie } = require("./validateMovie");
const { validateUser } = require("./validateUser");

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandler = require("./usersHandler");
//02
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandler.getUsers);
app.get("/api/users/:id", usersHandler.getUsersById);
//03
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/users", validateUser, usersHandler.postUsers);
//04
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.put("/api/users/:id", validateUser, usersHandler.updateUsers);
//05
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", usersHandler.deleteUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
