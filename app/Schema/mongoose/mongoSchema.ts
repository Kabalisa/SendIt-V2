import { Schema } from 'mongoose';

export const userSchema: Schema = new Schema({
    email: String,
    password: String,
    token: String,
    firstName: String,
    lastName: String,
    userName: String,
    image: String,
});
