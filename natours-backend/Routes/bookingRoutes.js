const express = require('express');
const authController = require('./../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// 🔐 1. Sabse pehle Login check karo (Sabke liye zaroori)
router.use(authController.protect);

// 👇 API for Travel Mates (ISE YAHAN HONA CHAHIYE) ✅
router.get('/tour/:tourId/travelers', bookingController.getTourStats);

router.post('/booking-checkout', bookingController.createBookingFromFrontend);

// Stripe Session maangne ke liye
router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

// "My Bookings" page ke liye
router.get('/my-tours', bookingController.getMyTours);

// Payment Success hone par wapas aane ke liye
router.get('/checkout-success', bookingController.createBookingCheckout);

// ---------------------------------------------------------
// ⛔ RESTRICTED ROUTES (Sirf Admin/Lead-Guide ke liye)
// ---------------------------------------------------------
// 🚨 ISKE NEECHE JO BHI HOGA, WO SIRF ADMIN DEKH PAAYEGA
router.use(authController.restrictTo('admin', 'lead-guide'));

router.get('/admin-stats', bookingController.getAdminStats);

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;