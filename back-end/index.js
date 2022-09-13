require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const userRouter = require("./routes/userRoute");
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${process.env.ORIGIN_PORT}`,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  })
);
connectDB();

app.get("/", (req, res) => {});

app.use("/api/auth", userRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
