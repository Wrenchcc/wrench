"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRefetching = exports.isFetchingMore = void 0;
// @ts-nocheck
var isFetchingMore = function (networkStatus) { return networkStatus === 3; };
exports.isFetchingMore = isFetchingMore;
var isRefetching = function (networkStatus) { return networkStatus === 4; };
exports.isRefetching = isRefetching;
//# sourceMappingURL=networkStatus.js.map