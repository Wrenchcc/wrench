declare const _default: (path: any, initialData?: any) => (query: any, options?: any) => {
    error: import("@apollo/react-hooks").ApolloError | undefined;
    refetch: (variables?: Partial<Record<string, any>> | undefined) => Promise<import("@apollo/react-hooks").ApolloQueryResult<any>>;
    data: any;
    fetchMore: () => void;
    hasNextPage: boolean;
    isFetching: boolean;
    isRefetching: boolean;
};
export default _default;
