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
exports.default = (function (type) { return function (query, options) {
    var _a;
    var _b = react_hooks_1.useQuery(query, __assign(__assign({}, options), { notifyOnNetworkStatusChange: true })), fetchMore = _b.fetchMore, error = _b.error, result = __rest(_b, ["fetchMore", "error"]);
    var data = rambda_1.pathOr({}, ['data', type], result);
    var handleFetchMore = react_1.useCallback(function () {
        return fetchMore({
            variables: {
                after: data.edges[data.edges.length - 1].cursor,
            },
            updateQuery: function (previousResult, _a) {
                var _b;
                var fetchMoreResult = _a.fetchMoreResult;
                if (!previousResult || !previousResult[type]) {
                    return previousResult;
                }
                var _c = fetchMoreResult[type], edges = _c.edges, pageInfo = _c.pageInfo, rest = __rest(_c, ["edges", "pageInfo"]);
                return _b = {},
                    _b[type] = __assign(__assign({}, rest), { __typename: previousResult[type].__typename, edges: __spreadArrays(previousResult[type].edges, edges), pageInfo: pageInfo }),
                    _b;
            },
        });
    }, [result]);
    return __assign(__assign({}, result), (_a = {}, _a[type] = rambda_1.pathOr(null, ['edges'], data), _a.fetchMore = handleFetchMore, _a.hasNextPage = rambda_1.pathOr(false, ['pageInfo', 'hasNextPage'], data), _a.isFetching = result.loading || networkStatus_1.isFetchingMore(result.networkStatus), _a.isRefetching = networkStatus_1.isRefetching(result.networkStatus), _a));
}; });
//# sourceMappingURL=usePaginatedQuery.js.map