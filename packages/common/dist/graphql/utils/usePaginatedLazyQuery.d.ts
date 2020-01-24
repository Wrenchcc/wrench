declare const _default: (path: any, initialData?: any) => (query: any, options?: any) => {
    loadData: (options?: import("@apollo/react-hooks").QueryLazyOptions<Record<string, any>> | undefined) => void;
    error: import("apollo-client").ApolloError | undefined;
    refetch: (variables?: Record<string, any> | undefined) => Promise<import("apollo-client").ApolloQueryResult<any>>;
    data: any;
    fetchMore: (options?: any) => Promise<import("apollo-client").ApolloQueryResult<any>>;
    hasNextPage: any;
    isFetching: boolean;
    isRefetching: boolean;
};
export default _default;
