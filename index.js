const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");

app.use(express.json());
app.use(cors());

const users = [
  { id: "1", name: "Saad", email: "saadmehmood131@gmail.com" },
  { id: "2", name: "Ahmed", email: "adhmed131@gmail.com" },
  { id: "3", name: "Mohsin", email: "mohsin131@gmail.com" },
];

app.get("/api/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/user/:id", (req, res) => {
  let id = req.params.id;
  try {
    let user = users.find((u) => u.id === id);
    res
      .status(200)
      .send(`The user you are looking for is ${JSON.stringify(user)}`);
  } catch (error) {
    res.status(500).send(`Internal Server Error,${error}`);
  }
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const schema = {
    name: Joi.string().min(4).required(),
  };

  const result = Joi.validate(name, schema);
  console.log(result, "user result here");

  // if (!name || name.length < 4) {
  //   res.status(500).send("Name lenght should be greater tha 4 letters");
  //   return;
  // }
D
  try {
    if (users.filter((u) => u.name === name).length > 0) {
      res.status(500).send(`This User name is already registered`);
    } else {
      const obj = {
        id: users.length + 1,
        name: name,
        email: email,
      };
      users.push(obj);
      res.status(200).send(`User Created Successfully ${JSON.stringify(obj)}`);
    }
  } catch (error) {
    res.status(500).send(`Internal Server Error,${error}`);
  }
});

app.put("/update/:id", (req, res) => {
  let id = req.params.id;
  try {
    const newArr = users.map((item) => {
      if (item.id === id) {
        return { ...item, name: req.body.name, email: req.body.email };
      } else {
        return item;
      }
    });
    res.status(200).send(`User Updated Successfully ${JSON.stringify(newArr)}`);
  } catch (error) {
    res.status(500).send(`Internal Server Error,${error}`);
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  try {
    const index = users
      .map((item) => {
        if (item.id === id) return item.id;
      })
      .indexOf(id);

    let newArr = users.splice(index, 1);
    res.status(200).send(`User Deleted Successfully ${JSON.stringify(newArr)}`);
  } catch (error) {
    res.status(500).send(`Internal Server Error,${error}`);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
