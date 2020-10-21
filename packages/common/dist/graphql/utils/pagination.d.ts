import { FieldPolicy, Reference } from '@apollo/client';
declare type KeyArgs = FieldPolicy<any>['keyArgs'];
declare type TInternalRelay<TNode> = Readonly<{
    edges: Array<{
        cursor: string;
        node: TNode;
    }>;
    pageInfo: Readonly<{
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
    }>;
}>;
export default function relayStylePagination<TNode = Reference>(keyArgs?: KeyArgs): FieldPolicy<TInternalRelay<TNode>>;
export {};
