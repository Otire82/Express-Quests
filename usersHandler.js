const database = require("./database");

//02
// const getUsers = (req, res) => {
//     database
//     .query("select * from users")
//     .then(([users]) => {
//         res.json(users);
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send("Error retrieving data from database");
//     });
// };

//Quete06

const getUsers = (req, res) => {
  let initialSql = "select * from users";
  const sqlValues = [];

  if (req.query.language != null) {
    sqlValues.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    });
  }
  if (req.query.city != null) {
    sqlValues.push({
      column: "city",
      value: req.query.city,
    operator: "=",
      });
  }
   database
  .query(
    sqlValues.reduce(
      (sql, { column, operator }, index) =>
        `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
      initialSql
    ),
    sqlValues.map(({ value }) => value)
  )
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

//02
const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

//03
const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

    database
        .query(
            "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
            [firstname, lastname, email, city, language]
        )
        .then(([result]) => {
            res.location(`/api/users/${result.insertId}`);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error saving the user");
        });
}

//04
const updateUsers = (req,res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query("update users set firstname = ?, lastname = ?, email = ?, city =?, language = ? where id = ?",
    [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};

//05
const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the user");
    });
};

module.exports = {
  getUsers,//02
  getUsersById,//02
  postUsers,//03
  updateUsers,//04
  deleteUsers,//05
};