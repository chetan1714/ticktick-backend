
const handleUnsupportedMethods = (req, res, next) => {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({
      error: `Method ${req.method} not allowed.`,
    });
  } else {
    next();
  }
};

export { handleUnsupportedMethods };
