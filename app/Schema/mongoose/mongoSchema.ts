import { Schema } from 'mongoose';

export const userSchema: Schema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    provider: String,
    image: String,
    isVerified: Boolean,
    role: {
        type: String,
        enum: ['ADMIN', 'USER', 'SELLER'],
    },
});
