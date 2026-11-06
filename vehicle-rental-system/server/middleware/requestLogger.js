// Sprint 12: basic middleware. Logs every request, then calls next().
module.exports = (req, res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.originalUrl}`);
  next();
};
