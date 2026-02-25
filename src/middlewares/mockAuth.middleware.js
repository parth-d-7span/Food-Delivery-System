module.exports = (req, res, next) => {

  // simulate logged-in restaurant
  req.user = {
   _id: "65f111111111111111111111",
    role: "restaurant"
  };

  next();
};