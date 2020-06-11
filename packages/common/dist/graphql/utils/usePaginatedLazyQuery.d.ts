declare const _default: (path: any, initialData?: any) => (query: any, options?: any) => {
    loadData: (options?: import("@apollo/react-hooks").QueryLazyOptions<Record<string, any>> | undefined) => void;
    error: any;
    refetch: any;
    data: any;
    fetchMore: (options?: any) => Promise<any>;
    hasNextPage: boolean;
    isFetching: boolean;
    isRefetching: boolean;
};
export default _default;
