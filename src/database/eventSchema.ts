import { randomUUID } from "crypto";
import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema({
  eventId: { type: Schema.Types.UUID, unique: true, required: true, trim: true, default: randomUUID() },
  eventName: { type: String, required: true, trim: true },
  eventDescription: { type: String, required: false, trim: true, default: "Contact the host for more info" },
  hostName: { type: [String], required: true, trim: true },
  hostLocation: { type: String, required: true, trim: true },
  postDate: { type: Date, required: true, trim: true, defualt: Date.now() },
  eventDate: { type: Date, required: true, trim: true },
  eventTime: { type: String, required: true, trim: true },
  eventSubject: { type: [String], required: true, trim: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User", required: true, default: [] }],
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
