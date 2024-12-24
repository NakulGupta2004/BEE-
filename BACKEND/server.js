const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

let arrData = [];
app.use(cors());
app.use(bodyParser.json());

app.get("/showData", (req, res) => {
  res.json(arrData);
});

app.post("/saveData", (req, res) => {
  const { username, email, password } = req.body;
  const newUser = { username, email, password };
  
  // Check if username already exists
  if (arrData.some(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists!" });
  }
  
  arrData.push(newUser);
  console.log("Data received and stored:", newUser);
  res.json({ message: "Data saved successfully!", user: newUser });
});

app.post("/validateData", (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", { username, password });
  console.log("Current users:", arrData);

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required!" });
  }

  const user = arrData.find(user => user.username === username && user.password === password);
  
  if (user) {
    console.log("User found:", user);
    res.json({ message: "Login successful!", user });
  } else {
    console.log("User not found or invalid credentials");
    res.status(401).json({ message: "Invalid username or password!" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

