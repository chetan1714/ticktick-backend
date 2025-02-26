import { Schema, model } from 'mongoose';
import { encryptPassword } from '../utils/utils.js';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true, collection: 'tt_users' });

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = encryptPassword(this.password);
  next();
});

const User = model('User', UserSchema);

export default User;