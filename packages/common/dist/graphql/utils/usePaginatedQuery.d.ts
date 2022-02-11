declare const _default: (path: any, initialData?: any) => (query: any, options?: any) => {
    error: import("@apollo/client").ApolloError | undefined;
    refetch: (variables?: Partial<import("@apollo/client").OperationVariables> | undefined) => Promise<import("@apollo/client").ApolloQueryResult<any>>;
    data: any;
    previousData: {
        edges: null;
    };
    fetchMore: (variables?: any) => Promise<import("@apollo/client").ApolloQueryResult<any>>;
    hasNextPage: boolean;
    isFetching: boolean;
    isRefetching: boolean;
};
export default _default;
