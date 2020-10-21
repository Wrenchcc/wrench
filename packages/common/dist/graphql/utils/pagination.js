"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// As proof of the flexibility of field policies, this function generates
// one that handles Relay-style pagination, without Apollo Client knowing
// anything about connections, edges, cursors, or pageInfo objects.
function relayStylePagination(keyArgs) {
    if (keyArgs === void 0) { keyArgs = false; }
    return {
        keyArgs: keyArgs,
    };
}
exports.default = relayStylePagination;
// function makeEmptyData() {
//   return {
//     edges: [],
//     pageInfo: {
//       hasPreviousPage: false,
//       hasNextPage: true,
//       startCursor: '',
//       endCursor: '',
//     },
//   }
// }
// function cursorFromEdge<TNode>(edges: TInternalRelay<TNode>['edges'], index: number): string {
//   if (index < 0) index += edges.length
//   const edge = edges[index]
//   return (edge && edge.cursor) || ''
// }
// function updateCursor<TNode>(
//   edges: TInternalRelay<TNode>['edges'],
//   index: number,
//   cursor: string | undefined
// ) {
//   if (index < 0) index += edges.length
//   const edge = edges[index]
//   if (cursor && cursor !== edge.cursor) {
//     edges[index] = { ...edge, cursor }
//   }
// }
//# sourceMappingURL=pagination.js.map