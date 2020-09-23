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
    var _a = react_hooks_1.useQuery(query, __assign(__assign({}, options), { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network' })), fetchMore = _a.fetchMore, error = _a.error, data = _a.data, error = _a.error, refetch = _a.refetch, loading = _a.loading, networkStatus = _a.networkStatus;
    var result = rambda_1.pathOr({}, path, data);
    var handleFetchMore = function () {
        fetchMore({
            variables: {
                after: result.edges[result.edges.length - 1].cursor,
            },
        });
    };
    return {
        error: error,
        refetch: refetch,
        data: __assign(__assign(__assign(__assign({}, initialData), data), result), { edges: rambda_1.pathOr(null, ['edges'], result) }),
        fetchMore: handleFetchMore,
        hasNextPage: rambda_1.pathOr(false, ['pageInfo', 'hasNextPage'], result),
        isFetching: loading || networkStatus_1.isFetchingMore(networkStatus),
        isRefetching: networkStatus_1.isRefetching(networkStatus),
    };
}; });
//# sourceMappingURL=usePaginatedQuery.js.map