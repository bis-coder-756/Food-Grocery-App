import mongoose from "mongoose";

// mongoose.schema constructor in this 1 we will define the structure for user data

const userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartItems: {
    type: Map,
    of: Number,
    default: {}
  }
}, { minimize: false, timestamps:true });

const User = mongoose.models.user || mongoose.model('user',userschema)

// then export this user model then u can use this user model in any file
export default User