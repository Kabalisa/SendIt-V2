import { Schema } from 'mongoose';

export const userSchema: Schema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    userName: String,
    image: String,
    isVerified: Boolean,
});
