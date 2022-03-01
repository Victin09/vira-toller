import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface Name extends Document {
  firstName: string;
  lastName: string;
}

export interface IUser extends Document {
  _id: string;
  name: Name;
  email: string;
  username: string;
  password: string;
  matchPassword: (password: string) => boolean;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    _id: {
      type: String,
      _id: false,
    },
    name: {
      firstName: { type: String, trim: true, required: true },
      lastName: { type: String, trim: true, required: true },
    },
    email: {
      type: String,
      required: true,
      default: `No label`,
    },
    username: {
      type: String,
      required: true,
      minLength: 8,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minLength: 8,
      select: true,
    },
  },
  { timestamps: true },
);

// Encrypt password using bcrypt
// * Hash the password before it is being saved to the database
UserSchema.pre('save', async function (this: IUser, next: (err?: Error | undefined) => void) {
  // * Make sure you don't hash the hash
  if (!this.isModified('password')) {
    return next();
  }

  const salt: string = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = model<IUser>('User', UserSchema, 'users');

export default UserModel;
