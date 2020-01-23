declare const _default: (type: any) => (query: any, options?: any) => {
    loadData: (options?: import("@apollo/react-hooks").QueryLazyOptions<Record<string, any>> | undefined) => void;
    data: any;
    fetchMore: () => Promise<import("apollo-client").ApolloQueryResult<any>>;
    hasNextPage: any;
    isFetching: boolean;
    isRefetching: boolean;
    client: import("apollo-client").ApolloClient<any>;
    loading: boolean;
    networkStatus: import("apollo-client").NetworkStatus;
    called: boolean;
    variables: Record<string, any>;
    refetch: (variables?: Record<string, any> | undefined) => Promise<import("apollo-client").ApolloQueryResult<any>>;
    startPolling: (pollInterval: number) => void;
    stopPolling: () => void;
    subscribeToMore: <TSubscriptionData = any, TSubscriptionVariables = Record<string, any>>(options: import("apollo-client").SubscribeToMoreOptions<any, TSubscriptionVariables, TSubscriptionData>) => () => void;
    updateQuery: <TVars = Record<string, any>>(mapFn: (previousQueryResult: any, options: import("apollo-client").UpdateQueryOptions<TVars>) => any) => void;
};
export default _default;
