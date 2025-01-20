import mongoose from "mongoose";

// schema are a kind of rules/condition for our user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // specifies the data type which is a string here
      required: true, // makes username required in order to continue
      unique: true, // makes username unique, so that no one else may use it
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    },
    isAdmin: { // must change default in mongodb if user wants to be admin
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
