declare const _default: (path: any, initialData?: any) => (query: any, options?: any) => {
    error: import("@apollo/react-hooks").ApolloError | undefined;
    refetch: (variables?: Partial<import("@apollo/react-hooks").OperationVariables> | undefined) => Promise<import("@apollo/react-hooks").ApolloQueryResult<any>>;
    data: any;
    fetchMore: (variables?: any) => Promise<import("@apollo/react-hooks").ApolloQueryResult<any>>;
    hasNextPage: boolean;
    isFetching: boolean;
    isRefetching: boolean;
};
export default _default;
