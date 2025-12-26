const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'], // 1. Fix: 'require' -> 'required'
  },
  email: {
    type: String,
    required: [true, 'Email required'], // 1. Fix: 'require' -> 'required'
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: 'user'
  },
  points: {
    type: Number,
    default: 50 // Starting points for new users
  },
  password: {
    type: String,
    required: [true, 'Password Required'], // 1. Fix: 'require' -> 'required'
    minlength: [8, 'Password must be 8 characters'], // Fix: 'minLength' -> 'minlength' (lowercase l)
    select: false,
  },
  // 2. Fix: Name change 'confirmpassword' -> 'passwordConfirm' (Jonas ke code aur Postman se match karne ke liye)
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'], // 1. Fix: 'require' -> 'required'
    validate: {
      // This only works on CREATE and SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  }
});

// --- MIDDLEWARES ---

// 3. Password Hashing Middleware
userSchema.pre('save', async function (next) {
  // Only run if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field (Database me save nahi karna)
  this.passwordConfirm = undefined;
  next();
});

// 4. Password Changed At Middleware
userSchema.pre('save', function(next){
  if(!this.isModified('password') || this.isNew) return next();
  
  this.passwordChangedAt = Date.now() - 1000;
  next();
});




// 5. Query Middleware (Active users only)
userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// --- INSTANCE METHODS ---

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// 6. Model Creation (Ye sabse last me hona chahiye)
const User = mongoose.model('User', userSchema);

module.exports = User;