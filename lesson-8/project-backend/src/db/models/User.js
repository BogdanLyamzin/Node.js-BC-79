import { Schema, model } from 'mongoose';

import { emailRegex } from '../../constants/index.js';

import { handleSaveError, setUpdateRules } from '../hooks.js';

const userSchema = new Schema({
  username: {
    type: String,
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, 'Email must be exist'],
    pattern: emailRegex,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { versionKey: false, timestamps: true });

userSchema.pre("save", function(){
  if(!this.username) {
    this.username = this.email;
  }
});

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateRules);

userSchema.post('findOneAndUpdate', handleSaveError);

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = model('user', userSchema);

export default User;
