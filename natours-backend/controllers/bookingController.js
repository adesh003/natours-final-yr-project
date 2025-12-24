// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const Tour = require('./../models/tourModel');
// const Booking = require('./../models/bookingModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
// const factory = require('./../controllers/handlerFactory');
// const { PaymentMethods } = require('stripe/lib/resources');


// exports.getCheckoutSession =catchAsync(async (req,res,next)=>{
//         //1  get currently booked tour

//         const tour = await Tour.findById(req.params.tourId)



//         //2 create checkout session
//     const imageUrl = `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`;
//     const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     mode: 'payment',
//     success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
//     cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
//     customer_email: req.user.email,
//     client_reference_id: req.params.tourId,
//     line_items: [
//       {
//         price_data: {
//           currency: 'inr',
//           unit_amount: tour.price * 100, // amount in paise
//           product_data: {
//             name: `${tour.name} Tour`,
//             description: tour.summary,
//             images: [`https://natours.dev/img/logo-green.png`] // Put real image URL or leave blank
//           }
//         },
//         quantity: 1 
//       }
//     ]
//   });

//   res.status(200).json({
//     status: 'success',
//     session
//   });
// })


// // exports.createBookingCheckout= catchAsync(async(req, res, next)=>{
// //   const {tour,user,price} =req.query;

// //   if(!tour && !user && !price ) return next()
// //     await Booking.create({tour, user, price})

// //   res.redirect(req.originalUrl.spilt('?')[0])
// // })

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   const { tour, user, price } = req.query;

//   if (!tour && !user && !price) return next();

//   await Booking.create({ tour, user, price });

//   res.redirect(req.originalUrl.split('?')[0]);
// });


// exports.createBooking = factory.createOne(Booking)
// exports.getBooking = factory.getOne(Booking)
// exports.getAllBookings = factory.getAll(Booking)
// exports.updateBooking = factory.updateOne(Booking)
// exports.deleteBooking = factory.deleteOne(Booking)

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./../controllers/handlerFactory');
const User = require('./../models/userModel');


exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // 2) Create checkout session
  // IMPORTANT: success_url backend ke naye route par jayega jo booking create karega
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/api/v1/bookings/checkout-success?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://localhost:5173/payment-success?alert=booking`,
    cancel_url: `http://localhost:5173/tour/${tour.slug}`, // Cancel hone par Frontend tour page par wapas
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
          unit_amount: tour.price * 100, // Amount in cents/paise
        },
        quantity: 1,
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

// ✅ YE NAYA FUNCTION HAI (Booking Create karne ke liye)
exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return next();

  // 1) Booking DB me save karo
  await Booking.create({ tour, user, price });

  // 2) Frontend Home Page par Redirect karo
  res.redirect('http://localhost:5173/?alert=booking');
});

// ✅ YE FUNCTION MISSING THA (My Bookings Page ke liye)
exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings for current user
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  // 'in' operator use karke wo saare tours nikalo jinki id list me hai
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours,
    },
  });
});




exports.getAdminStats = catchAsync(async (req, res, next) => {
  // 1. Basic Stats & Charts (Parallel Execution)
  const [usersCount, toursCount, bookingsCount, salesData] = await Promise.all([
    User.countDocuments(),
    Tour.countDocuments(),
    Booking.countDocuments(),
    Booking.aggregate([
      { $group: { _id: null, totalSales: { $sum: '$price' } } }
    ])
  ]);

  const totalRevenue = salesData.length > 0 ? salesData[0].totalSales : 0;

  // 2. Best Sellers (Chart)
  const bestSellers = await Booking.aggregate([
    { $group: { _id: '$tour', numBookings: { $sum: 1 } } },
    { $sort: { numBookings: -1 } },
    { $limit: 5 },
    { $lookup: { from: 'tours', localField: '_id', foreignField: '_id', as: 'tourDetails' } },
    { $unwind: '$tourDetails' },
    { $project: { name: '$tourDetails.name', numBookings: 1 } }
  ]);

  // 3. Monthly Plan (Chart)
  const monthlyPlan = await Booking.aggregate([
    {
      $group: {
        _id: { $month: '$createdAt' },
        numBookings: { $sum: 1 },
        revenue: { $sum: '$price' }
      }
    },
    { $addFields: { month: '$_id' } },
    { $sort: { month: 1 } }
  ]);

  // --- 🔥 NEW ADDITIONS FOR REAL-TIME DATA ---

  // 4. Get Latest 5 Bookings (Table ke liye)
  const latestBookings = await Booking.find()
    .sort({ createdAt: -1 }) // Sabse naya pehle
    .limit(5)
    .populate({
      path: 'user',
      select: 'name photo'
    })
    .populate({
      path: 'tour',
      select: 'name'
    });

  // 5. Get Newest 5 Users (Side list ke liye)
  const newUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name photo createdAt role');

  res.status(200).json({
    status: 'success',
    data: {
      stats: {
        users: usersCount,
        tours: toursCount,
        bookings: bookingsCount,
        revenue: totalRevenue
      },
      bestSellers,
      monthlyPlan,
      latestBookings, // <--- Bhej diya frontend ko
      newUsers        // <--- Bhej diya frontend ko
    }
  });
});


exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);