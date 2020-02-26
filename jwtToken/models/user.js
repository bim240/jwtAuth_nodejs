var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  password: String
});
userSchema.pre("save", async function(next) {
  try {
    if (this.password && this.isModified("password")) {
      this.password = await bcrypt.hashSync(this.password, 10);
      next();
    }
  } catch (error) {
    next(error);
  }
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
