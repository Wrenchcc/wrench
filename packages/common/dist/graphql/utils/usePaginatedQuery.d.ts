declare const _default: (path: any, initialData: any) => (query: any, options?: any) => {
    error: import("apollo-client").ApolloError | undefined;
    refetch: (variables?: Record<string, any> | undefined) => Promise<import("apollo-client").ApolloQueryResult<any>>;
    data: any;
    fetchMore: () => Promise<import("apollo-client").ApolloQueryResult<any>>;
    hasNextPage: any;
    isFetching: boolean;
    isRefetching: boolean;
};
export default _default;
