"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
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
//# sourceMappingURL=mongoSchema.js.map