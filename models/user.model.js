const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { UserStatus } = require("../utils/constants");

const schema = new Schema({
  name: { type: String, required: false, sparse: true, lowercase: true },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
    sparse: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    index: true,
    sparse: true,
  },
  password: { type: String, required: true, index: true },
  description: { type: String, required: false },
  //required in case of soft delete
  status: {
    type: Boolean,
    enum: [UserStatus.isActve, UserStatus.isDisabled],
    default: UserStatus.isActve,
  },
  created_at: { type: Date, default: Date.now, index: true },
  updated_at: { type: Date, default: Date.now, index: true },
  last_login_at: { type: Date, index: true },
  token_manager: { type: Array },
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("User", schema);
