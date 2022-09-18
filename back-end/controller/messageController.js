const Message = require("../model/messageModel");
const getMessages = async (req, res, next) => {
  try {
    const { sender, reciver } = await req.body;

    const allMessages = await Message.find({
      $or: [
        {
          users: [sender, reciver],
        },
        {
          users: [reciver, sender],
        },
      ],
    });
    // console.log(allMessages);
    if (allMessages.length !== 0) return res.json(allMessages);
  } catch (err) {
    next(err);
  }
};
const sendMessages = async (req, res, next) => {
  try {
    const { message, sender, reciver } = await req.body;

    const newMessage = await Message.create({
      message: message,
      sender: sender,
      users: [sender, reciver],
    });

    if (newMessage) {
      return res.json({ msg: "Message added successfully", status: true });
    } else {
      return res.json({ msg: "error occurs", status: false });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getMessages, sendMessages };
