declare const _default: (path: any, initialData?: any) => (query: any, options?: any) => {
    loadData: (options?: import("@apollo/react-hooks").QueryLazyOptions<Record<string, any>> | undefined) => void;
    error: import("@apollo/react-hooks").ApolloError | undefined;
    refetch: ((variables?: Partial<Record<string, any>> | undefined) => Promise<import("@apollo/react-hooks").ApolloQueryResult<any>>) | undefined;
    data: any;
    fetchMore: (options?: any) => Promise<import("@apollo/react-hooks").ApolloQueryResult<any>>;
    hasNextPage: boolean;
    isFetching: boolean;
    isRefetching: boolean;
};
export default _default;
