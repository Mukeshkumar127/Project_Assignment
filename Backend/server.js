const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.get('/hero', (req,res) => {
    res.send('MUKESH');
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
