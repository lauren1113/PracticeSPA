const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// HERE BEGINS DATABASE CONFIGURATION
const path = require("path");
const lowdb = require("lowdb");
const lodashId = require("lodash-id");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(path.join(__dirname, "db.json"));
const db = lowdb(adapter);

db._.mixin(lodashId);
db.defaults({ posts: [] }).write();
// HERE ENDS DATABASE CONFIGURATION

const PORT = process.env.PORT || 8675;
const app = express();

app.use(bodyParser.json()).use(morgan("dev"));

app.get("/", (req, res) => {
  console.log(process.env.USER);
  console.log(process.env.PORT);
  res.send("HELLO WORLD");
});

app
  .route("/posts")
  .get((request, response) => {
    const posts = db.get("posts").value();
    response.send;
  })
  .post((request, response) => {
    let contents = "";
    request.on("data", chunk => (contents += chunk));
    request.on("end", () => {
      const post = db
        .get("posts")
        .insert({ body: contents })
        .write();
      response.send(post);
    });
  });

app
  .route("/posts/:id")
  .get((request, response) => {
    const id = request.params.id;
    let contents = "";

    request.on("data", chunk => (contents += chunk));

    request.on("end", () => {
      const post = db
        .get("posts")
        .updateById(id, { body: contents })
        .write();

      if (post) {
        response.send(post);
      } else {
        response.status(404).send("Not Found");
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
        .updateById(id, { body: contents })
        .write();

      if (post) {
        response.send(post);
      } else {
        response.status(404).send("Not Found");
      }
    });

    response.status(404).send("Not Found"));
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
      notFound(response);
    }
  });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
