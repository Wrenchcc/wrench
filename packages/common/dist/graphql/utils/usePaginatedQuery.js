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
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var react_1 = require("react");
var client_1 = require("@apollo/client");
var react_hooks_1 = require("@apollo/react-hooks");
var rambda_1 = require("rambda");
exports.default = (function (path, initialData) { return function (query, options) {
    var _a = (0, react_hooks_1.useQuery)(query, __assign({ fetchPolicy: 'cache-and-network', nextFetchPolicy: 'cache-first', notifyOnNetworkStatusChange: true }, options)), fetchMore = _a.fetchMore, error = _a.error, data = _a.data, refetch = _a.refetch, loading = _a.loading, networkStatus = _a.networkStatus;
    var result = (0, rambda_1.pathOr)({}, path, data);
    var handleFetchMore = (0, react_1.useCallback)(function (variables) {
        if (variables === void 0) { variables = {}; }
        return fetchMore(__assign({ variables: {
                after: result.edges[result.edges.length - 1].cursor,
            } }, variables));
    }, [result]);
    return {
        error: error,
        refetch: refetch,
        data: __assign(__assign(__assign(__assign({}, initialData), data), result), { edges: (0, rambda_1.pathOr)(null, ['edges'], result) }),
        fetchMore: handleFetchMore,
        hasNextPage: (0, rambda_1.pathOr)(false, ['pageInfo', 'hasNextPage'], result),
        isFetching: loading || networkStatus === 3,
        isRefetching: networkStatus === client_1.NetworkStatus.refetch,
    };
}; });
//# sourceMappingURL=usePaginatedQuery.js.map