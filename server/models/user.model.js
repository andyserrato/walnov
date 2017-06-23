// grab the things we need
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: {
      type: String,
      //required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      //required: true,
      //unique: true,
      //match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    password: {
      type: String,
      //required: true,
      //validate: [(password) => {
       // return password && password.length > 6;
      //}, 'Password should be longer']
    },
    isAdmin: { type: Boolean , default: false},
    location: String,
    token: String,
    verificado: Boolean,
    profileComplete: Boolean,
    urlImage: String,
    meta: {
        age: Number,
        website: String
    },
    is_active: { type: Boolean , default: true},
    created_at: Date,
    updated_at: Date,
  // =======================
    // pruebas de passport ===========
  // =====================
  provider: {
    type: String,
    //required: 'Provider is required'
  },
  providerId: String,
  providerData: {},
  local            : {
    email        : String,
    password     : String,
  },
  facebook         : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  twitter          : {
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
  },
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// on every save, add the date
userSchema.pre('save', function(next) {
    // get the current date
    const currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

userSchema.statics.findUniqueUsername = function(username, suffix,
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

