module.exports = async (req, res, next) => {
  req.session.destroy();
  res.status(200).json({});
};
