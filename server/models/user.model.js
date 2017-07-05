// grab the things we need
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const providerSchema = {
  provider: String,
  providerId: String,
  providerData: {}
};

// create a schema
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: {
    type: String,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  isAdmin: {type: Boolean, default: false},
  location: String,
  verificado: Boolean,
  profileComplete: {type: Boolean, default: false},
  urlImage: String,
  fechaNacimiento: Date,
  is_active: {type: Boolean, default: true},
  created_at: Date,
  updated_at: Date,
  providers: [providerSchema]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// on every save, add the date
userSchema.pre('save', function (next) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

userSchema.statics.findUniqueUsername = function (username, suffix,
                                                  callback) {
  var possibleUsername = username + (suffix || '');
  this.findOne({
    username: possibleUsername
  }, (err, user) => {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return this.findUniqueUsername(username, (suffix || 0) +
          1, callback);
      }
    } else {
      callback(null);
    }
  });
};

userSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;

