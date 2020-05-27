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
var networkStatus_1 = require("./networkStatus");
/*
const {
  data: { edges, post, project },
  isFetching,
  fetchMore,
  isRefetching,
  hasNextPage,
  refetch,
} = usePaginatedQuery(['project', 'posts'], {
  project: initialProjectData,
  post: initialPostData,
})(ProjectDocument, {
  variables: {
    slug,
    id,
    postId,
  },
})
*/
exports.default = (function (path, initialData) { return function (query, options) {
    var _a = react_hooks_1.useLazyQuery(query, __assign(__assign({}, options), { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network' })), loadData = _a[0], _b = _a[1], fetchMore = _b.fetchMore, error = _b.error, data = _b.data, error = _b.error, refetch = _b.refetch, loading = _b.loading, networkStatus = _b.networkStatus;
    var result = rambda_1.pathOr({}, path, data);
    var handleFetchMore = react_1.useCallback(function (options) {
        if (options === void 0) { options = {}; }
        return fetchMore(__assign({ variables: {
                after: result.edges[result.edges.length - 1].cursor,
            }, updateQuery: function (prev, _a) {
                var _b, _c, _d;
                var fetchMoreResult = _a.fetchMoreResult;
                if (!rambda_1.pathOr(false, path, fetchMoreResult)) {
                    return prev;
                }
                if (path.length > 1) {
                    return __assign(__assign({}, prev), (_b = {}, _b[path[0]] = __assign(__assign({}, rambda_1.pathOr({}, [path[0]], prev)), (_c = {}, _c[path[1]] = __assign(__assign({}, rambda_1.pathOr({}, path, prev)), { pageInfo: __assign(__assign({}, rambda_1.pathOr({}, __spreadArrays(path, ['pageInfo']), prev)), rambda_1.pathOr({}, __spreadArrays(path, ['pageInfo']), fetchMoreResult)), edges: __spreadArrays(rambda_1.pathOr({}, __spreadArrays(path, ['edges']), prev), rambda_1.pathOr({}, __spreadArrays(path, ['edges']), fetchMoreResult)) }), _c)), _b));
                }
                // Fix fetch more
                return _d = {},
                    _d[path] = __assign(__assign({}, rambda_1.pathOr({}, path, fetchMoreResult)), { __typename: prev[path].__typename, edges: __spreadArrays(rambda_1.pathOr({}, [path, 'edges'], prev), rambda_1.pathOr({}, [path, 'edges'], fetchMoreResult)), pageInfo: rambda_1.pathOr({}, [path, 'pageInfo'], fetchMoreResult) }),
                    _d;
            } }, options));
    }, [data]);
    return {
        loadData: loadData,
        error: error,
        refetch: refetch,
        data: __assign(__assign(__assign(__assign({}, initialData), data), result), { edges: rambda_1.pathOr(null, ['edges'], result) }),
        fetchMore: handleFetchMore,
        hasNextPage: rambda_1.pathOr(false, ['pageInfo', 'hasNextPage'], result),
        isFetching: loading || networkStatus_1.isFetchingMore(networkStatus),
        isRefetching: networkStatus_1.isRefetching(networkStatus),
    };
}; });
//# sourceMappingURL=usePaginatedLazyQuery.js.map