"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimisticId = exports.usePaginatedLazyQuery = exports.usePaginatedQuery = void 0;
var usePaginatedQuery_1 = require("./graphql/utils/usePaginatedQuery");
Object.defineProperty(exports, "usePaginatedQuery", { enumerable: true, get: function () { return usePaginatedQuery_1.default; } });
var usePaginatedLazyQuery_1 = require("./graphql/utils/usePaginatedLazyQuery");
Object.defineProperty(exports, "usePaginatedLazyQuery", { enumerable: true, get: function () { return usePaginatedLazyQuery_1.default; } });
var optimisticId_1 = require("./graphql/utils/optimisticId");
Object.defineProperty(exports, "optimisticId", { enumerable: true, get: function () { return optimisticId_1.default; } });
__exportStar(require("./generated/graphql-hooks"), exports);
//# sourceMappingURL=index.js.map