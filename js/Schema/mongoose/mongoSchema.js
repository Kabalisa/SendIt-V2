"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    userName: String,
    image: String,
});
//# sourceMappingURL=mongoSchema.js.map