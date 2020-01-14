"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoSchema_1 = require("../Schema/mongoose/mongoSchema");
const mongoSchema_2 = require("../Schema/mongoose/mongoSchema");
exports.BookModel = mongoose_1.model('book', mongoSchema_1.booksSchema);
exports.TypeModel = mongoose_1.model('bookType', mongoSchema_2.bookTypeSchema);
//# sourceMappingURL=mongoModels.js.map