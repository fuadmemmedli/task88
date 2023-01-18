const express = require("express");
// const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 8080;
posts  = [
    {
      id: "asc-a123-cxaz-123-acasdas",
      description: "lorem ipsum dolor",
      createdOn: "17.01.2023",
      user: {
        id: "ajn2-sa23m-cmkd2-csmc",
        name: "Suleyman",
        surname: "Dadashov",
        email: "suleyman@code.edu.az"   
       }
    },
    {
        id: "asc-a123-cxaz-123-acasdas",
        description: "lorem ipsum dolor",
        createdOn: "17.01.2023",
        user: {
          id: "ajn2-sa23m-cmkd2-csmc",
          name: "Suleyman",
          surname: "Dadashov",
          email: "suleyman@code.edu.az"   
         }
      },
      {
        id: "asc-a123-cxaz-123-acasdas",
        description: "lorem ipsum dolor",
        createdOn: "17.01.2023",
        user: {
          id: "ajn2-sa23m-cmkd2-csmc",
          name: "Suleyman",
          surname: "Dadashov",
          email: "suleyman@code.edu.az"   
         }
      },
      {
        id: "asc-a123-cxaz-123-acasdas",
        description: "lorem ipsum dolor",
        createdOn: "17.01.2023",
        user: {
          id: "ajn2-sa23m-cmkd2-csmc",
          name: "Suleyman",
          surname: "Dadashov",
          email: "suleyman@code.edu.az"   
         }
      },

];

let isLoggedIn = false;

app.use(express.json());
// app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("Welcome to our api");
});

app.post("/api/login", (req, res) => {
  isLoggedIn = true;
  res.send({ message: "success" });
});

app.use((req, res, next) => {
  if (!isLoggedIn) {
    res.status(401).send({ message: "You must login!" });
    return;
  }
  next();
});

app.get(
  "/api/posts",
  (req, res, next) => {
    if (!isLoggedIn) {
      res.status(401).send({ message: "You must login!" });
      return;
    }
    next();
  },
  (req, res) => {
    let { type } = req.query;
    if (type) {
      res.send({
        message: "success",
        posts: posts.filter(
          (p) => p.type.toLowerCase().trim() === type.toLowerCase().trim()
        ),
      });
      return;
    }

    res.send({ message: "success", posts });
  }
);

app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  let product = posts.find((p) => p.id === id);

  if (posts) {
    res.send({
      message: "success",
      posts,
    });
  } else res.status(204).send();
});

app.post("/api/posts", (req, res) => {
  console.log(req.body);
  const { name, type, price } = req.body || {};
  if (!name || !type || !price) {
    res.status(400).send({ message: "Name, type and price are required!" });
    return;
  }
  let newPosts = {
    name,
    type,
    price,
    id: uuidv4(),
  };
  posts.push(newPosts);

  res
    .status(201)
    .send({ message: "Posts successfully added!", posts: newPosts });
});

app.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { name, type, price } = req.body;
  let posts = posts.find((p) => p.id === id);
  if (!posts) return res.status(204).send();
  if (!name && !type && !price)
    return res.status(400).send({ message: "Name or type or price required!" });
  if (name) posts.name = name;
  if (type) posts.type = type;
  if (price) posts.price = price;
  res.send({ message: " posts successfully updated!", posts });
});

app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  let postsIndex = posts.findIndex((p) => p.id === id);
  if (postsIndex === -1) return res.status(204).send();
  let deletedPosts = posts.splice(postsIndex, 1);
  res.send({
    message: "posts successfully deleted!",
    posts: deletedPosts,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});