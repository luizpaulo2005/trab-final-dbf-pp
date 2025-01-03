const getHello = (req, res) => {
  const { name } = req.query;

  return res.status(200).json({ message: `Hello, ${name || "World"}!` });
};

module.exports = { getHello };
