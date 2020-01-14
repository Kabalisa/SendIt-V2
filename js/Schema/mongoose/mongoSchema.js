"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.booksSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    typeId: String
});
exports.bookTypeSchema = new mongoose_1.Schema({
    leader: String,
    genre: String
});
//# sourceMappingURL=mongoSchema.js.map