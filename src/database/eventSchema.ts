import mongoose, { Schema } from "mongoose";
import User from "@/database/userSchema";

const EventSchema = new Schema({
  hostName: { type: [String], required: true, trim: true },
  hostLocation: { type: String, required: true, trim: true },
  postDate: { type: Date, required: true, trim: true, defualt: Date.now() },
  eventDate: { type: Date, required: true, trim: true },
  eventTime: { type: String, required: true, trim: true },
  eventSubject: { type: [String], required: true, trim: true },
  attendees: { type: [User], required: true, trim: true, default: [] },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
