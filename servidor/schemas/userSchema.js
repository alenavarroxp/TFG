import { Schema } from "mongoose";

export const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  isProfessor: {
    type: Boolean,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
  rotation: {
    type: Object,
    required: true,
  },
  purse: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  accessoryName: {
    type: String,
    required: true,
  },
  colors: {
    type: Array,
    required: true,
  },
  accessories: {
    type: Array,
    required: true,
  },
});
