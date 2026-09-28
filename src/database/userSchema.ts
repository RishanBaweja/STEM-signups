import mongoose, { Schema } from "mongoose";

const EducatorInfoSchema = new Schema(
  {
    isVerified: { type: Boolean, required: true, default: false },
    stemSubjects: { type: [String], default: [] },
  },
  { _id: false },
);

const UserSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["educator", "admin"], required: true },
  educatorInfo: {
    type: EducatorInfoSchema,
    required: function () {
      return this.role === "educator";
    },
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
