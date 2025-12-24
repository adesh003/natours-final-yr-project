// const express = require('express');
// const authController = require('./../controllers/authController');
// const bookingController = require('../controllers/bookingController');

// const router = express.Router();

// // 🔐 Protect all routes after this middleware
// router.use(authController.protect);

// // 🛒 Checkout session for booking a tour
// router.get(
//   '/checkout-session/:tourId',
//   bookingController.getCheckoutSession
// );

// // 👮 Restrict below routes to admin or lead-guide only
// router.use(authController.restrictTo('admin', 'lead-guide'));

// router.get('/checkout-success', bookingController.createBookingCheckout);
// router
//   .route('/')
//   .get(bookingController.getAllBookings)
//   .post(bookingController.createBooking);

// router
//   .route('/:id')
//   .get(bookingController.getBooking)
//   .patch(bookingController.updateBooking)
//   .delete(bookingController.deleteBooking);

// module.exports = router;

const express = require('express');
const authController = require('./../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// 🔐 1. Sabse pehle Login check karo (Sabke liye zaroori)
router.use(authController.protect);

// ---------------------------------------------------------
// ✅ USER ROUTES (Normal users ke liye open rakho)
// ---------------------------------------------------------

// Stripe Session maangne ke liye
router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

// "My Bookings" page ke liye (Ye bhi tumhare snippet me missing tha, ise add kar lo)
router.get('/my-tours',authController.protect, bookingController.getMyTours);

// Payment Success hone par wapas aane ke liye (Ye ab RESTRICTED ke upar hai)
router.get('/checkout-success', bookingController.createBookingCheckout);

// ---------------------------------------------------------
// ⛔ RESTRICTED ROUTES (Sirf Admin/Lead-Guide ke liye)
// ---------------------------------------------------------
// Is line ke neeche jo bhi hoga, wo sirf Admin kar payega
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
