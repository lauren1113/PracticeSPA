const { Router } = require("express");
const router = Router();
const db = require("../simpleDb.js");

router
  .route("/") // routes to posts will occur at the app-level!
  .get((request, response) => {
    db.query("SELECT * FROM posts", (error, res) => {
      if (error) {
        response.status(500).json({ error }); // send the SQL error if something goes wrong
      } else {
        response.json(res.rows);
      }
    });
  })
  .post((request, response) => {
    const newPost = request.body;
    db.query(
      `INSERT INTO posts(title, body, author_id) VALUES($1, $2, $3) RETURNING *`,
      (newPost.title, newPost.body, newPost.author_id),
      (error, res) => {
        if (error) {
          response.status(500).json({ error }); // send the SQL error if something goes wrong
        } else {
          response.json(res.rows[0]);
        }
      }
    );
  });

router
  .route("/:id") // equivalent to /posts/:id
  .get((request, response) => {
    const id = request.params.id;
    let contents = "";

    request.on("data", chunk => (contents += chunk));

    request.on("end", () => {
      const post = db
        .get("posts")
        .updateById(id, {
          body: contents
        })
        .write();

      if (post) {
        response.send(post);
      } else {
        response.status(404).send("That ID does not exist");
      }
    });
  })
  .patch((request, response) => {
    const id = request.params.id;
    let contents = "";

    request.on("data", chunk => (contents += chunk));

    request.on("end", () => {
      const post = db
        .get("posts")
        .getById(id, {
          body: contents
        })
        .write();

      if (post) {
        response.send(post);
      } else {
        response.status(404).send("Not Found");
      }
    });

    response.status(500).send("Internal Server Error");
  })
  .delete((request, response) => {
    const id = request.params.id;
    const post = db
      .get("posts")
      .removeById(id)
      .write();

    if (post) {
      response.send(post);
    } else {
      response.status(404).send({ message: "Not Found" });
    }
  });

module.exports = router; // don't forget to export the router!
