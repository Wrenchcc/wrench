"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRefetching = exports.isFetchingMore = void 0;
// @ts-nocheck
exports.isFetchingMore = function (networkStatus) { return networkStatus === 3; };
exports.isRefetching = function (networkStatus) { return networkStatus === 4; };
//# sourceMappingURL=networkStatus.js.map