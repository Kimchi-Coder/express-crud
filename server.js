require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Global Middleware
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

// MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connected"));

const subscribersRouter = require("./routes/subscribers");

app.use("/subscribers", subscribersRouter);

const port = process.env.PORT || 1337;
app.listen(port, () => console.log("Server Connected"));
