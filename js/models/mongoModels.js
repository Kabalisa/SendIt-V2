"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoSchema_1 = require("../Schema/mongoose/mongoSchema");
exports.UserModel = mongoose_1.model('user', mongoSchema_1.userSchema);
//# sourceMappingURL=mongoModels.js.map