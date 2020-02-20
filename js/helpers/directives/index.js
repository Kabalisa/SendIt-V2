"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isverifiedDirective_1 = require("./isverifiedDirective");
const isAdminDirective_1 = require("./isAdminDirective");
exports.schemaDirectives = {
    isEmailVerified: isverifiedDirective_1.IsVerifiedDirective,
    isAdmin: isAdminDirective_1.IsAdminDirective,
};
//# sourceMappingURL=index.js.map