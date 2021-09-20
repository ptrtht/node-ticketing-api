import mongoose from 'mongoose';


export interface LogDocument extends mongoose.Document {
    logger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    minutes: { type: Number, require: true },
  }


export const LogSchema = new mongoose.Schema({
    logger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    minutes: { type: Number, require: true },
  });
