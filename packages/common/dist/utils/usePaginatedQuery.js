"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var react_1 = require("react");
var react_hooks_1 = require("@apollo/react-hooks");
var rambda_1 = require("rambda");
var networkStatus_1 = require("./networkStatus");
exports.default = (function (path) { return function (query, options) {
    var _a = react_hooks_1.useQuery(query, __assign(__assign({}, options), { notifyOnNetworkStatusChange: true })), fetchMore = _a.fetchMore, error = _a.error, result = __rest(_a, ["fetchMore", "error"]);
    var data = rambda_1.pathOr({}, __spreadArrays(['data'], path), result);
    var handleFetchMore = react_1.useCallback(function () {
        return fetchMore({
            variables: {
                after: data.edges[data.edges.length - 1].cursor,
            },
            updateQuery: function (previousResult, _a) {
                var fetchMoreResult = _a.fetchMoreResult;
                if (!rambda_1.pathOr(null, path, fetchMoreResult)) {
                    return previousResult;
                }
                var _b = rambda_1.pathOr({}, path, fetchMoreResult), edges = _b.edges, pageInfo = _b.pageInfo, rest = __rest(_b, ["edges", "pageInfo"]);
                return __assign(__assign({}, previousResult), { data: __spreadArrays(rambda_1.pathOr({}, __spreadArrays(path, ['edges']), previousResult), [
                        rambda_1.pathOr({}, __spreadArrays(path, ['edges']), fetchMoreResult),
                    ]) });
                //   return {
                //     [path]: {
                //       ...rest,
                //       __typename: previousResult[path].__typename,
                //       edges: [...previousResult[path].edges, ...edges],
                //       pageInfo,
                //     },
                //   }
            },
        });
    }, [result]);
    return __assign(__assign({}, result.data), { refetch: result.refetch, error: result.error, data: rambda_1.pathOr(null, ['edges'], data), fetchMore: handleFetchMore, hasNextPage: rambda_1.pathOr(false, ['pageInfo', 'hasNextPage'], data), isFetching: result.loading || networkStatus_1.isFetchingMore(result.networkStatus), isRefetching: networkStatus_1.isRefetching(result.networkStatus) });
}; });
//# sourceMappingURL=usePaginatedQuery.js.map