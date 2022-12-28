const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://lama:rohit@cluster0.ondqzyk.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: String,
  file: String,
});

const User = mongoose.model("User", userSchema);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/form-submission", async (req, res) => {
  const body = req.body;
  await User.create(body);

  res.status(200).json({ body });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
