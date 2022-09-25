require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const userRouter = require("./routes/userRoute");
const avatarRoute = require("./routes/avatarRoute");
const messageRoute = require("./routes/messageRoute");
const chatRoute = require("./routes/chatRoute");
const { Server } = require("socket.io");
const uniqid = require("uniqid");
const cors = require("cors");
app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {});

app.use("/api/auth", userRouter);
app.use("/setavatar", avatarRoute);
app.use("/chat", chatRoute);
app.use("/api", messageRoute);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN_PORT,
  },
});

io.on("connection", (socket) => {
  socket.on("send-msg", (data) => {
    const dataToSend = {
      _id: uniqid(),
      message: data.message,
      sender: data.sender,
      users: [data.sender, data.reciver],
      _v: 0,
    };
    socket.broadcast.emit("recive-msg-reciver", dataToSend);
    socket.emit("recive-msg-sender", dataToSend);
  });
});
