const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;

const CONTACTS = [
  {
    name: "Jon",
    value: "9452525",
    id: Math.random() * 10000,
    marked: false,
  },
];

app.use(express.json())

app.get("/api/contacts", (req, res) => {
  res.status(200).json(CONTACTS);
});
app.post("/api/contacts", (req, res) => {
    const contact = {...req.body}
    CONTACTS.push(contact)
    res.status(201).json(contact)
});




app.use(express.static(path.join(__dirname, "client")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server is start !!!!!!");
});
