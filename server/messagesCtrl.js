let allMessages = [];

module.exports = {
  getAllMessages: (req, res, then) => {
    res.status(200).json(allMessages);
  },
  createMessage: (req, res, then) => {
    const { username, message } = req.body;
    let newMessage = {
      username,
      message
    }
    allMessages.push(newMessage);
    if(req.session.history) {
      req.session.history.push(newMessage);
    } else {
      req.session.history = [];
      req.session.history.push(newMessage)
    }
    res.status(200).json(allMessages);
  },
  history: (req, res, then) => {
    res.status(200).json(req.session.history);
  }
}