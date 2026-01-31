const { query } = require('express');
const Review = require('./../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./../controllers/handlerFactory');
const review = require('./../models/reviewModel');



exports.getAllReviews = factory.getAll(review)


exports.setTourUserIds = (req, res, next)=>{
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
}

exports.getReview = factory.getOne(Review)
exports.createReview = factory.createOne(Review)
exports.updateReview = factory.updateOne(Review)
exports.deleteReview = factory.deleteOne(Review);


exports.checkIfBooked = async (req, res, next) => {
  // 1. Admin ko allow karo (Superpower)
  if (req.user.role === 'admin') return next();

  // 2. Booking dhoondo (Current User + Current Tour)
  // Note: req.body.tour frontend se aana chahiye, ya params se set hona chahiye
  const tourId = req.body.tour || req.params.tourId;
  
  const booking = await Booking.findOne({ user: req.user.id, tour: tourId });

  if (!booking) {
    return next(new AppError('You can only review tours you have booked! 🔒', 403));
  }

  next();
};
