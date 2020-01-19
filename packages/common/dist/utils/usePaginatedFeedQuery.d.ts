declare const _default: (options?: any) => {
    error: import("apollo-client").ApolloError | undefined;
    refetch: (variables?: Record<string, any> | undefined) => Promise<import("apollo-client").ApolloQueryResult<any>>;
    posts: any;
    hasNextPage: any;
    isRefetching: boolean;
    isFetching: boolean;
    fetchMore: () => Promise<import("apollo-client").ApolloQueryResult<any>>;
};
export default _default;
