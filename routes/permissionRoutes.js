// const {
//   getAllReviewsForMovie,
//   getAllReviewsForUser,
//   getAllReviewsForUserForMovie,
//   updateReview,
//   deleteReview,
//   addReview,
// } = require("../controllers/reviewController");

// const { verifyUser } = require("../middleware/authMiddleware");

// //Initializing router
// const reviewRoutes = require("express").Router();

// //Review routes
// reviewRoutes.post("/", verifyUser, addReview);
// reviewRoutes.delete("/:reviewId", verifyUser, deleteReview);
// reviewRoutes.get("/movie/:movieTitle", getAllReviewsForMovie);

// reviewRoutes.get(
//   "/movie/:movieTitle/user/:userName",
//   verifyUser,
//   getAllReviewsForUserForMovie
// );

// reviewRoutes.get("/user/:userName", verifyUser, getAllReviewsForUser);
// reviewRoutes.put("/:reviewId", verifyUser, updateReview);

// module.exports = reviewRoutes;
