
// :id used is for dynamically getting id
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = users.find((user) => user.id == id);
  res.send(data);
});
