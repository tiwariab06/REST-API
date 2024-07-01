const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
// route for Home page
app.get("/", (req, res) => {
  res.send("This is the Home Page");
});

//route for getting all users first name in html
app.get("/users", (req, res) => {
  const html_data = `
    <ul>
     ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html_data);
});

// route for GETTING ALL USERS in json format
app.get("/api/users", (req, res) => {
  res.json(users);
});

// get users with particular id
// :id used is for dynamically getting id
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id == id);
  const html_dt = `<h1>${user.first_name}</h1>`;
  res.send(html_dt);
});

// creating a middleware to handle post requests
app.use(express.urlencoded({ extended: false }));

app.post("/users", (req, res) => {
  const data = req.body;
  users.push({ ...data, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
    res.json({ status: "sucess", id: users.length });
  });
});
//patch request
app.patch("/users", (req, res) => {
  const body = req.body;
  const id = Number(body.id);
  const last = body.last_name;
  const index = users.findIndex((user) => user.id == id);
  users[index].last_name = last;
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
    res.json({ status: "sucess" });
  });
});
//delete request
app.delete("/users", (req, res) => {
  const body = req.body;
  const id = Number(body.id);
  const index = users.findIndex((user) => user.id == id);
  users.splice(index, index);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, result) => {
    res.json({ status: "sucess" });
  });
});
