
const handleBadRoutes = (req, res, next) => {
  res.status(404).json({ error: "Route not found." });
};

export { handleBadRoutes };
