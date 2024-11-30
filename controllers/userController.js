exports.getProfile = (req, res) => {
    res.status(200).json({ message: "Profile accessed", user: req.user });
  };