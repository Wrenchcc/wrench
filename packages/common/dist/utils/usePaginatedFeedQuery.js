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
var __1 = require("../");
var networkStatus_1 = require("./networkStatus");
exports.default = (function (options) {
    var _a = react_hooks_1.useQuery(__1.FeedDocument, __assign(__assign({}, options), { notifyOnNetworkStatusChange: true })), fetchMore = _a.fetchMore, error = _a.error, loading = _a.loading, data = _a.data, networkStatus = _a.networkStatus, refetch = _a.refetch;
    var handleFetchMore = react_1.useCallback(function () {
        return fetchMore({
            variables: {
                after: data.edges[data.edges.length - 1].cursor,
            },
            updateQuery: function (previousResult, _a) {
                var fetchMoreResult = _a.fetchMoreResult;
                if (!fetchMoreResult.feed) {
                    return prev;
                }
                return __assign(__assign({}, prev), { feed: __assign(__assign({}, prev.feed), { posts: __assign(__assign({}, prev.feed.posts), { pageInfo: __assign(__assign({}, prev.feed.posts.pageInfo), fetchMoreResult.feed.posts.pageInfo), edges: __spreadArrays(prev.feed.posts.edges, fetchMoreResult.feed.posts.edges) }) }) });
            },
        });
    }, [data]);
    return {
        error: error,
        refetch: refetch,
        posts: rambda_1.pathOr(null, ['feed', 'posts', 'edges'], data),
        hasNextPage: rambda_1.pathOr(false, ['posts', 'pageInfo', 'hasNextPage'], data),
        isRefetching: networkStatus_1.isRefetching(networkStatus),
        isFetching: loading || networkStatus_1.isFetchingMore(networkStatus),
        fetchMore: handleFetchMore,
    };
});
//# sourceMappingURL=usePaginatedFeedQuery.js.map