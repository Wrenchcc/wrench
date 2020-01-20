"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var ApolloReactHooks = require("@apollo/react-hooks");
var FileType;
(function (FileType) {
    FileType["Image"] = "IMAGE";
    FileType["Video"] = "VIDEO";
})(FileType = exports.FileType || (exports.FileType = {}));
var NotificationTypes;
(function (NotificationTypes) {
    NotificationTypes["NewComment"] = "NEW_COMMENT";
    NotificationTypes["NewFollower"] = "NEW_FOLLOWER";
    NotificationTypes["NewPostLike"] = "NEW_POST_LIKE";
    NotificationTypes["NewCommentLike"] = "NEW_COMMENT_LIKE";
    NotificationTypes["NewMention"] = "NEW_MENTION";
    NotificationTypes["NewReply"] = "NEW_REPLY";
})(NotificationTypes = exports.NotificationTypes || (exports.NotificationTypes = {}));
var PlatformType;
(function (PlatformType) {
    PlatformType["Mobile"] = "MOBILE";
    PlatformType["Web"] = "WEB";
})(PlatformType = exports.PlatformType || (exports.PlatformType = {}));
var ProjectSortType;
(function (ProjectSortType) {
    ProjectSortType["Popular"] = "POPULAR";
    ProjectSortType["Recent"] = "RECENT";
})(ProjectSortType = exports.ProjectSortType || (exports.ProjectSortType = {}));
var SearchType;
(function (SearchType) {
    SearchType["Projects"] = "PROJECTS";
    SearchType["Users"] = "USERS";
    SearchType["Models"] = "MODELS";
})(SearchType = exports.SearchType || (exports.SearchType = {}));
var UploadType;
(function (UploadType) {
    UploadType["Image"] = "IMAGE";
    UploadType["Video"] = "VIDEO";
})(UploadType = exports.UploadType || (exports.UploadType = {}));
var UserRole;
(function (UserRole) {
    UserRole["User"] = "USER";
    UserRole["Admin"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
exports.UserFragmentFragmentDoc = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment UserFragment on User {\n  id\n  fullName\n  firstName\n  lastName\n  username\n  avatarUrl\n  isSilhouette\n  isOnline\n  website\n  location\n  bio\n  projectCount\n}\n    "], ["\n    fragment UserFragment on User {\n  id\n  fullName\n  firstName\n  lastName\n  username\n  avatarUrl\n  isSilhouette\n  isOnline\n  website\n  location\n  bio\n  projectCount\n}\n    "])));
exports.ProjectFragmentFragmentDoc = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    fragment ProjectFragment on Project {\n  id\n  title\n  slug\n  dynamicLink\n  user {\n    ...UserFragment\n  }\n  permissions {\n    isOwner\n    isFollower\n  }\n  followers: followersConnection {\n    totalCount\n  }\n}\n    ", ""], ["\n    fragment ProjectFragment on Project {\n  id\n  title\n  slug\n  dynamicLink\n  user {\n    ...UserFragment\n  }\n  permissions {\n    isOwner\n    isFollower\n  }\n  followers: followersConnection {\n    totalCount\n  }\n}\n    ", ""])), exports.UserFragmentFragmentDoc);
exports.CommentFragmentFragmentDoc = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    fragment CommentFragment on Comment {\n  id\n  text\n  createdAt\n  permissions {\n    isOwner\n  }\n  likes {\n    isLiked\n    totalCount\n  }\n  user {\n    ...UserFragment\n  }\n}\n    ", ""], ["\n    fragment CommentFragment on Comment {\n  id\n  text\n  createdAt\n  permissions {\n    isOwner\n  }\n  likes {\n    isLiked\n    totalCount\n  }\n  user {\n    ...UserFragment\n  }\n}\n    ", ""])), exports.UserFragmentFragmentDoc);
exports.PostFragmentFragmentDoc = graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    fragment PostFragment on Post {\n  id\n  caption\n  createdAt\n  user {\n    ...UserFragment\n  }\n  permissions {\n    isOwner\n  }\n  files: filesConnection(type: IMAGE) {\n    edges {\n      node {\n        id\n        type\n        uri\n      }\n    }\n  }\n  project {\n    ...ProjectFragment\n  }\n  likes {\n    isLiked\n    totalCount\n  }\n  comments: commentsConnection(first: 2) @connection(key: \"comments\") {\n    totalCount\n    edges {\n      node {\n        ...CommentFragment\n      }\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    fragment PostFragment on Post {\n  id\n  caption\n  createdAt\n  user {\n    ...UserFragment\n  }\n  permissions {\n    isOwner\n  }\n  files: filesConnection(type: IMAGE) {\n    edges {\n      node {\n        id\n        type\n        uri\n      }\n    }\n  }\n  project {\n    ...ProjectFragment\n  }\n  likes {\n    isLiked\n    totalCount\n  }\n  comments: commentsConnection(first: 2) @connection(key: \"comments\") {\n    totalCount\n    edges {\n      node {\n        ...CommentFragment\n      }\n    }\n  }\n}\n    ", "\n", "\n", ""])), exports.UserFragmentFragmentDoc, exports.ProjectFragmentFragmentDoc, exports.CommentFragmentFragmentDoc);
exports.RepliesFragmentFragmentDoc = graphql_tag_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    fragment RepliesFragment on Comment {\n  replies: repliesConnection(first: 2) @connection(key: \"replies\") {\n    pageInfo {\n      hasNextPage\n    }\n    totalCount\n    edges {\n      cursor\n      node {\n        id\n        commentId\n        text\n        createdAt\n        permissions {\n          isOwner\n        }\n        likes {\n          isLiked\n          totalCount\n        }\n        user {\n          ...UserFragment\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    fragment RepliesFragment on Comment {\n  replies: repliesConnection(first: 2) @connection(key: \"replies\") {\n    pageInfo {\n      hasNextPage\n    }\n    totalCount\n    edges {\n      cursor\n      node {\n        id\n        commentId\n        text\n        createdAt\n        permissions {\n          isOwner\n        }\n        likes {\n          isLiked\n          totalCount\n        }\n        user {\n          ...UserFragment\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.UserFragmentFragmentDoc);
exports.UserProjectsFragmentFragmentDoc = graphql_tag_1.default(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    fragment UserProjectsFragment on User {\n  projects: projectsConnection {\n    edges {\n      node {\n        id\n        title\n        followers: followersConnection {\n          totalCount\n        }\n        files: filesConnection(first: 1, type: IMAGE) {\n          edges {\n            node {\n              id\n              uri\n            }\n          }\n        }\n      }\n    }\n  }\n}\n    "], ["\n    fragment UserProjectsFragment on User {\n  projects: projectsConnection {\n    edges {\n      node {\n        id\n        title\n        followers: followersConnection {\n          totalCount\n        }\n        files: filesConnection(first: 1, type: IMAGE) {\n          edges {\n            node {\n              id\n              uri\n            }\n          }\n        }\n      }\n    }\n  }\n}\n    "])));
exports.UserSettingsFragmentFragmentDoc = graphql_tag_1.default(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    fragment UserSettingsFragment on User {\n  id\n  settings {\n    notifications {\n      types {\n        NEW_FOLLOWER {\n          email\n          push\n        }\n        NEW_COMMENT {\n          email\n          push\n        }\n        NEW_MENTION {\n          email\n          push\n        }\n        NEW_ARTICLE {\n          email\n          push\n        }\n        SIMILAR_PROJECTS {\n          email\n          push\n        }\n        PRODUCT_ANNOUNCEMENTS {\n          email\n          push\n        }\n      }\n    }\n  }\n}\n    "], ["\n    fragment UserSettingsFragment on User {\n  id\n  settings {\n    notifications {\n      types {\n        NEW_FOLLOWER {\n          email\n          push\n        }\n        NEW_COMMENT {\n          email\n          push\n        }\n        NEW_MENTION {\n          email\n          push\n        }\n        NEW_ARTICLE {\n          email\n          push\n        }\n        SIMILAR_PROJECTS {\n          email\n          push\n        }\n        PRODUCT_ANNOUNCEMENTS {\n          email\n          push\n        }\n      }\n    }\n  }\n}\n    "])));
exports.DeleteCommentDocument = graphql_tag_1.default(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    mutation deleteComment($id: ID!) {\n  deleteComment(id: $id)\n}\n    "], ["\n    mutation deleteComment($id: ID!) {\n  deleteComment(id: $id)\n}\n    "])));
/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useDeleteCommentMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.DeleteCommentDocument, baseOptions);
}
exports.useDeleteCommentMutation = useDeleteCommentMutation;
exports.EditPostDocument = graphql_tag_1.default(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    mutation editPost($id: ID!, $input: EditPostInput!) {\n  editPost(id: $id, input: $input) {\n    ...PostFragment\n  }\n}\n    ", ""], ["\n    mutation editPost($id: ID!, $input: EditPostInput!) {\n  editPost(id: $id, input: $input) {\n    ...PostFragment\n  }\n}\n    ", ""])), exports.PostFragmentFragmentDoc);
/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
function useEditPostMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.EditPostDocument, baseOptions);
}
exports.useEditPostMutation = useEditPostMutation;
exports.EditUserDocument = graphql_tag_1.default(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    mutation editUser($input: EditUserInput!) {\n  editUser(input: $input) {\n    ...UserFragment\n  }\n}\n    ", ""], ["\n    mutation editUser($input: EditUserInput!) {\n  editUser(input: $input) {\n    ...UserFragment\n  }\n}\n    ", ""])), exports.UserFragmentFragmentDoc);
/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function useEditUserMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.EditUserDocument, baseOptions);
}
exports.useEditUserMutation = useEditUserMutation;
exports.FollowProjectDocument = graphql_tag_1.default(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    mutation followProject($id: ID!) {\n  followProject(id: $id) {\n    cover {\n      uri\n    }\n    ...ProjectFragment\n  }\n}\n    ", ""], ["\n    mutation followProject($id: ID!) {\n  followProject(id: $id) {\n    cover {\n      uri\n    }\n    ...ProjectFragment\n  }\n}\n    ", ""])), exports.ProjectFragmentFragmentDoc);
/**
 * __useFollowProjectMutation__
 *
 * To run a mutation, you first call `useFollowProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followProjectMutation, { data, loading, error }] = useFollowProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useFollowProjectMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.FollowProjectDocument, baseOptions);
}
exports.useFollowProjectMutation = useFollowProjectMutation;
exports.LikeCommentDocument = graphql_tag_1.default(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    mutation likeComment($id: ID!) {\n  likeComment(id: $id) {\n    id\n    likes {\n      isLiked\n      totalCount\n    }\n  }\n}\n    "], ["\n    mutation likeComment($id: ID!) {\n  likeComment(id: $id) {\n    id\n    likes {\n      isLiked\n      totalCount\n    }\n  }\n}\n    "])));
/**
 * __useLikeCommentMutation__
 *
 * To run a mutation, you first call `useLikeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeCommentMutation, { data, loading, error }] = useLikeCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useLikeCommentMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.LikeCommentDocument, baseOptions);
}
exports.useLikeCommentMutation = useLikeCommentMutation;
exports.LikePostDocument = graphql_tag_1.default(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    mutation likePost($id: ID!) {\n  likePost(id: $id) {\n    id\n    likes {\n      isLiked\n      totalCount\n    }\n  }\n}\n    "], ["\n    mutation likePost($id: ID!) {\n  likePost(id: $id) {\n    id\n    likes {\n      isLiked\n      totalCount\n    }\n  }\n}\n    "])));
/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useLikePostMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.LikePostDocument, baseOptions);
}
exports.useLikePostMutation = useLikePostMutation;
exports.ToggleNotificationSettingsDocument = graphql_tag_1.default(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {\n  toggleNotificationSettings(input: $input) {\n    ...UserSettingsFragment\n  }\n}\n    ", ""], ["\n    mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {\n  toggleNotificationSettings(input: $input) {\n    ...UserSettingsFragment\n  }\n}\n    ", ""])), exports.UserSettingsFragmentFragmentDoc);
/**
 * __useToggleNotificationSettingsMutation__
 *
 * To run a mutation, you first call `useToggleNotificationSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleNotificationSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleNotificationSettingsMutation, { data, loading, error }] = useToggleNotificationSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function useToggleNotificationSettingsMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.ToggleNotificationSettingsDocument, baseOptions);
}
exports.useToggleNotificationSettingsMutation = useToggleNotificationSettingsMutation;
exports.CommentDocument = graphql_tag_1.default(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    query comment($id: ID!) {\n  comment(id: $id) {\n    ...CommentFragment\n    ...RepliesFragment\n  }\n}\n    ", "\n", ""], ["\n    query comment($id: ID!) {\n  comment(id: $id) {\n    ...CommentFragment\n    ...RepliesFragment\n  }\n}\n    ", "\n", ""])), exports.CommentFragmentFragmentDoc, exports.RepliesFragmentFragmentDoc);
/**
 * __useCommentQuery__
 *
 * To run a query within a React component, call `useCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useCommentQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.CommentDocument, baseOptions);
}
exports.useCommentQuery = useCommentQuery;
function useCommentLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.CommentDocument, baseOptions);
}
exports.useCommentLazyQuery = useCommentLazyQuery;
exports.CommentsDocument = graphql_tag_1.default(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    query comments($postId: ID!, $after: String) {\n  comments(postId: $postId, after: $after) @connection(key: \"comments\", filter: [\"postId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...CommentFragment\n      }\n    }\n  }\n}\n    ", ""], ["\n    query comments($postId: ID!, $after: String) {\n  comments(postId: $postId, after: $after) @connection(key: \"comments\", filter: [\"postId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...CommentFragment\n      }\n    }\n  }\n}\n    ", ""])), exports.CommentFragmentFragmentDoc);
/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      after: // value for 'after'
 *   },
 * });
 */
function useCommentsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.CommentsDocument, baseOptions);
}
exports.useCommentsQuery = useCommentsQuery;
function useCommentsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.CommentsDocument, baseOptions);
}
exports.useCommentsLazyQuery = useCommentsLazyQuery;
exports.CurrentUserDocument = graphql_tag_1.default(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n    query currentUser {\n  user: currentUser {\n    avatarUrl\n    bio\n    dynamicLink\n    firstName\n    fullName\n    id\n    isOnline\n    isSilhouette\n    lastName\n    location\n    projectCount\n    username\n    website\n    settings {\n      timezone\n      locale\n    }\n    interestedIn {\n      id\n      title\n    }\n    ...UserProjectsFragment\n  }\n}\n    ", ""], ["\n    query currentUser {\n  user: currentUser {\n    avatarUrl\n    bio\n    dynamicLink\n    firstName\n    fullName\n    id\n    isOnline\n    isSilhouette\n    lastName\n    location\n    projectCount\n    username\n    website\n    settings {\n      timezone\n      locale\n    }\n    interestedIn {\n      id\n      title\n    }\n    ...UserProjectsFragment\n  }\n}\n    ", ""])), exports.UserProjectsFragmentFragmentDoc);
/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
function useCurrentUserQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.CurrentUserDocument, baseOptions);
}
exports.useCurrentUserQuery = useCurrentUserQuery;
function useCurrentUserLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.CurrentUserDocument, baseOptions);
}
exports.useCurrentUserLazyQuery = useCurrentUserLazyQuery;
exports.CurrentUserProfileDocument = graphql_tag_1.default(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n    query currentUserProfile($after: String) {\n  user: currentUser {\n    ...UserFragment\n    projects: projectsConnection {\n      edges {\n        node {\n          id\n          cover {\n            uri\n            default\n          }\n          title\n          followers: followersConnection {\n            totalCount\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: 5) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...PostFragment\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", ""], ["\n    query currentUserProfile($after: String) {\n  user: currentUser {\n    ...UserFragment\n    projects: projectsConnection {\n      edges {\n        node {\n          id\n          cover {\n            uri\n            default\n          }\n          title\n          followers: followersConnection {\n            totalCount\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: 5) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...PostFragment\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", ""])), exports.UserFragmentFragmentDoc, exports.PostFragmentFragmentDoc);
/**
 * __useCurrentUserProfileQuery__
 *
 * To run a query within a React component, call `useCurrentUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserProfileQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
function useCurrentUserProfileQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.CurrentUserProfileDocument, baseOptions);
}
exports.useCurrentUserProfileQuery = useCurrentUserProfileQuery;
function useCurrentUserProfileLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.CurrentUserProfileDocument, baseOptions);
}
exports.useCurrentUserProfileLazyQuery = useCurrentUserProfileLazyQuery;
exports.CurrentUserProjectsDocument = graphql_tag_1.default(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n    query currentUserProjects {\n  user: currentUser {\n    ...UserProjectsFragment\n  }\n}\n    ", ""], ["\n    query currentUserProjects {\n  user: currentUser {\n    ...UserProjectsFragment\n  }\n}\n    ", ""])), exports.UserProjectsFragmentFragmentDoc);
/**
 * __useCurrentUserProjectsQuery__
 *
 * To run a query within a React component, call `useCurrentUserProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserProjectsQuery({
 *   variables: {
 *   },
 * });
 */
function useCurrentUserProjectsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.CurrentUserProjectsDocument, baseOptions);
}
exports.useCurrentUserProjectsQuery = useCurrentUserProjectsQuery;
function useCurrentUserProjectsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.CurrentUserProjectsDocument, baseOptions);
}
exports.useCurrentUserProjectsLazyQuery = useCurrentUserProjectsLazyQuery;
exports.CurrentUserSettingsDocument = graphql_tag_1.default(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n    query currentUserSettings {\n  user: currentUser {\n    ...UserSettingsFragment\n  }\n}\n    ", ""], ["\n    query currentUserSettings {\n  user: currentUser {\n    ...UserSettingsFragment\n  }\n}\n    ", ""])), exports.UserSettingsFragmentFragmentDoc);
/**
 * __useCurrentUserSettingsQuery__
 *
 * To run a query within a React component, call `useCurrentUserSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserSettingsQuery({
 *   variables: {
 *   },
 * });
 */
function useCurrentUserSettingsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.CurrentUserSettingsDocument, baseOptions);
}
exports.useCurrentUserSettingsQuery = useCurrentUserSettingsQuery;
function useCurrentUserSettingsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.CurrentUserSettingsDocument, baseOptions);
}
exports.useCurrentUserSettingsLazyQuery = useCurrentUserSettingsLazyQuery;
exports.FeedDocument = graphql_tag_1.default(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n    query feed($after: String) {\n  feed {\n    posts: postsConnection(after: $after) @connection(key: \"posts\") {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...PostFragment\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query feed($after: String) {\n  feed {\n    posts: postsConnection(after: $after) @connection(key: \"posts\") {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...PostFragment\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.PostFragmentFragmentDoc);
/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
function useFeedQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.FeedDocument, baseOptions);
}
exports.useFeedQuery = useFeedQuery;
function useFeedLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.FeedDocument, baseOptions);
}
exports.useFeedLazyQuery = useFeedLazyQuery;
exports.FollowersDocument = graphql_tag_1.default(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n    query followers($projectId: ID!, $after: String) {\n  followers(projectId: $projectId, after: $after) @connection(key: \"followers\", filter: [\"projectId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...UserFragment\n      }\n    }\n  }\n}\n    ", ""], ["\n    query followers($projectId: ID!, $after: String) {\n  followers(projectId: $projectId, after: $after) @connection(key: \"followers\", filter: [\"projectId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...UserFragment\n      }\n    }\n  }\n}\n    ", ""])), exports.UserFragmentFragmentDoc);
/**
 * __useFollowersQuery__
 *
 * To run a query within a React component, call `useFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowersQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      after: // value for 'after'
 *   },
 * });
 */
function useFollowersQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.FollowersDocument, baseOptions);
}
exports.useFollowersQuery = useFollowersQuery;
function useFollowersLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.FollowersDocument, baseOptions);
}
exports.useFollowersLazyQuery = useFollowersLazyQuery;
exports.NotificationsDocument = graphql_tag_1.default(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n    query notifications($after: String) {\n  notifications(after: $after) @connection(key: \"notifications\") {\n    unreadCount\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        type\n        createdAt\n        user {\n          ...UserFragment\n        }\n        project {\n          ...ProjectFragment\n        }\n        post {\n          id\n        }\n        comment {\n          id\n          text\n          postId\n        }\n        files: filesConnection(type: IMAGE, first: 1) {\n          edges {\n            node {\n              id\n              uri\n            }\n          }\n        }\n      }\n    }\n  }\n}\n    ", "\n", ""], ["\n    query notifications($after: String) {\n  notifications(after: $after) @connection(key: \"notifications\") {\n    unreadCount\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        type\n        createdAt\n        user {\n          ...UserFragment\n        }\n        project {\n          ...ProjectFragment\n        }\n        post {\n          id\n        }\n        comment {\n          id\n          text\n          postId\n        }\n        files: filesConnection(type: IMAGE, first: 1) {\n          edges {\n            node {\n              id\n              uri\n            }\n          }\n        }\n      }\n    }\n  }\n}\n    ", "\n", ""])), exports.UserFragmentFragmentDoc, exports.ProjectFragmentFragmentDoc);
/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
function useNotificationsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.NotificationsDocument, baseOptions);
}
exports.useNotificationsQuery = useNotificationsQuery;
function useNotificationsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.NotificationsDocument, baseOptions);
}
exports.useNotificationsLazyQuery = useNotificationsLazyQuery;
exports.PostDocument = graphql_tag_1.default(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n    query post($id: ID!) {\n  post(id: $id) {\n    ...PostFragment\n  }\n}\n    ", ""], ["\n    query post($id: ID!) {\n  post(id: $id) {\n    ...PostFragment\n  }\n}\n    ", ""])), exports.PostFragmentFragmentDoc);
/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function usePostQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.PostDocument, baseOptions);
}
exports.usePostQuery = usePostQuery;
function usePostLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.PostDocument, baseOptions);
}
exports.usePostLazyQuery = usePostLazyQuery;
exports.PostsDocument = graphql_tag_1.default(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n    query posts($after: String, $first: Int) @connection(key: \"posts\") {\n  posts(after: $after, first: $first) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...PostFragment\n      }\n    }\n  }\n}\n    ", ""], ["\n    query posts($after: String, $first: Int) @connection(key: \"posts\") {\n  posts(after: $after, first: $first) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...PostFragment\n      }\n    }\n  }\n}\n    ", ""])), exports.PostFragmentFragmentDoc);
/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function usePostsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.PostsDocument, baseOptions);
}
exports.usePostsQuery = usePostsQuery;
function usePostsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.PostsDocument, baseOptions);
}
exports.usePostsLazyQuery = usePostsLazyQuery;
exports.ProjectDocument = graphql_tag_1.default(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n    query project($id: ID, $slug: LowercaseString, $after: String, $postId: ID) {\n  post(id: $postId) {\n    ...PostFragment\n  }\n  project(id: $id, slug: $slug) {\n    ...ProjectFragment\n    posts: postsConnection(first: 5, after: $after) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...PostFragment\n        }\n      }\n    }\n  }\n}\n    ", "\n", ""], ["\n    query project($id: ID, $slug: LowercaseString, $after: String, $postId: ID) {\n  post(id: $postId) {\n    ...PostFragment\n  }\n  project(id: $id, slug: $slug) {\n    ...ProjectFragment\n    posts: postsConnection(first: 5, after: $after) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...PostFragment\n        }\n      }\n    }\n  }\n}\n    ", "\n", ""])), exports.PostFragmentFragmentDoc, exports.ProjectFragmentFragmentDoc);
/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      postId: // value for 'postId'
 *   },
 * });
 */
function useProjectQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.ProjectDocument, baseOptions);
}
exports.useProjectQuery = useProjectQuery;
function useProjectLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.ProjectDocument, baseOptions);
}
exports.useProjectLazyQuery = useProjectLazyQuery;
exports.ProjectSuggestionsDocument = graphql_tag_1.default(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n    query projectSuggestions($after: String, $first: Int) {\n  projects: projectSuggestions(after: $after, first: $first) @connection(key: \"projects\") {\n    type {\n      id\n      title\n    }\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        ...ProjectFragment\n        cover {\n          uri\n          default\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query projectSuggestions($after: String, $first: Int) {\n  projects: projectSuggestions(after: $after, first: $first) @connection(key: \"projects\") {\n    type {\n      id\n      title\n    }\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        ...ProjectFragment\n        cover {\n          uri\n          default\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentFragmentDoc);
/**
 * __useProjectSuggestionsQuery__
 *
 * To run a query within a React component, call `useProjectSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectSuggestionsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useProjectSuggestionsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.ProjectSuggestionsDocument, baseOptions);
}
exports.useProjectSuggestionsQuery = useProjectSuggestionsQuery;
function useProjectSuggestionsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.ProjectSuggestionsDocument, baseOptions);
}
exports.useProjectSuggestionsLazyQuery = useProjectSuggestionsLazyQuery;
exports.ProjectTypesDocument = graphql_tag_1.default(templateObject_28 || (templateObject_28 = __makeTemplateObject(["\n    query projectTypes {\n  types: projectTypes {\n    id\n    title\n    imageUrl\n  }\n}\n    "], ["\n    query projectTypes {\n  types: projectTypes {\n    id\n    title\n    imageUrl\n  }\n}\n    "])));
/**
 * __useProjectTypesQuery__
 *
 * To run a query within a React component, call `useProjectTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectTypesQuery({
 *   variables: {
 *   },
 * });
 */
function useProjectTypesQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.ProjectTypesDocument, baseOptions);
}
exports.useProjectTypesQuery = useProjectTypesQuery;
function useProjectTypesLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.ProjectTypesDocument, baseOptions);
}
exports.useProjectTypesLazyQuery = useProjectTypesLazyQuery;
exports.ProjectsDocument = graphql_tag_1.default(templateObject_29 || (templateObject_29 = __makeTemplateObject(["\n    query projects($typeId: ID, $after: String, $first: Int, $type: ProjectSortType!) {\n  projects(typeId: $typeId, after: $after, first: $first, type: $type) @connection(key: \"projects\", filter: [\"type\", \"typeId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        cover {\n          uri\n          default\n        }\n        ...ProjectFragment\n      }\n    }\n  }\n}\n    ", ""], ["\n    query projects($typeId: ID, $after: String, $first: Int, $type: ProjectSortType!) {\n  projects(typeId: $typeId, after: $after, first: $first, type: $type) @connection(key: \"projects\", filter: [\"type\", \"typeId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        cover {\n          uri\n          default\n        }\n        ...ProjectFragment\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentFragmentDoc);
/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      typeId: // value for 'typeId'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      type: // value for 'type'
 *   },
 * });
 */
function useProjectsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.ProjectsDocument, baseOptions);
}
exports.useProjectsQuery = useProjectsQuery;
function useProjectsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.ProjectsDocument, baseOptions);
}
exports.useProjectsLazyQuery = useProjectsLazyQuery;
exports.SearchModelsDocument = graphql_tag_1.default(templateObject_30 || (templateObject_30 = __makeTemplateObject(["\n    query searchModels($query: String!, $after: String) {\n  models: search(query: $query, after: $after, type: MODELS, first: 20) @connection(key: \"models\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        ... on Model {\n          id\n          brand {\n            name\n          }\n          model\n          year\n        }\n      }\n    }\n  }\n}\n    "], ["\n    query searchModels($query: String!, $after: String) {\n  models: search(query: $query, after: $after, type: MODELS, first: 20) @connection(key: \"models\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        ... on Model {\n          id\n          brand {\n            name\n          }\n          model\n          year\n        }\n      }\n    }\n  }\n}\n    "])));
/**
 * __useSearchModelsQuery__
 *
 * To run a query within a React component, call `useSearchModelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchModelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchModelsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      after: // value for 'after'
 *   },
 * });
 */
function useSearchModelsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.SearchModelsDocument, baseOptions);
}
exports.useSearchModelsQuery = useSearchModelsQuery;
function useSearchModelsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.SearchModelsDocument, baseOptions);
}
exports.useSearchModelsLazyQuery = useSearchModelsLazyQuery;
exports.SearchProjectsDocument = graphql_tag_1.default(templateObject_31 || (templateObject_31 = __makeTemplateObject(["\n    query searchProjects($query: String!, $after: String) {\n  projects: search(query: $query, after: $after, type: PROJECTS) @connection(key: \"projects\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ... on Project {\n          ...ProjectFragment\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query searchProjects($query: String!, $after: String) {\n  projects: search(query: $query, after: $after, type: PROJECTS) @connection(key: \"projects\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ... on Project {\n          ...ProjectFragment\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentFragmentDoc);
/**
 * __useSearchProjectsQuery__
 *
 * To run a query within a React component, call `useSearchProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProjectsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      after: // value for 'after'
 *   },
 * });
 */
function useSearchProjectsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.SearchProjectsDocument, baseOptions);
}
exports.useSearchProjectsQuery = useSearchProjectsQuery;
function useSearchProjectsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.SearchProjectsDocument, baseOptions);
}
exports.useSearchProjectsLazyQuery = useSearchProjectsLazyQuery;
exports.SearchUsersDocument = graphql_tag_1.default(templateObject_32 || (templateObject_32 = __makeTemplateObject(["\n    query searchUsers($query: String!, $after: String) {\n  users: search(query: $query, after: $after, type: USERS) @connection(key: \"users\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ... on User {\n          ...UserFragment\n          projectCount\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query searchUsers($query: String!, $after: String) {\n  users: search(query: $query, after: $after, type: USERS) @connection(key: \"users\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ... on User {\n          ...UserFragment\n          projectCount\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.UserFragmentFragmentDoc);
/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      query: // value for 'query'
 *      after: // value for 'after'
 *   },
 * });
 */
function useSearchUsersQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.SearchUsersDocument, baseOptions);
}
exports.useSearchUsersQuery = useSearchUsersQuery;
function useSearchUsersLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.SearchUsersDocument, baseOptions);
}
exports.useSearchUsersLazyQuery = useSearchUsersLazyQuery;
exports.SimilarProjectsDocument = graphql_tag_1.default(templateObject_33 || (templateObject_33 = __makeTemplateObject(["\n    query similarProjects($id: ID!) {\n  similarProjects(id: $id) {\n    edges {\n      node {\n        cover {\n          uri\n        }\n        ...ProjectFragment\n      }\n    }\n  }\n}\n    ", ""], ["\n    query similarProjects($id: ID!) {\n  similarProjects(id: $id) {\n    edges {\n      node {\n        cover {\n          uri\n        }\n        ...ProjectFragment\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentFragmentDoc);
/**
 * __useSimilarProjectsQuery__
 *
 * To run a query within a React component, call `useSimilarProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimilarProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimilarProjectsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useSimilarProjectsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.SimilarProjectsDocument, baseOptions);
}
exports.useSimilarProjectsQuery = useSimilarProjectsQuery;
function useSimilarProjectsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.SimilarProjectsDocument, baseOptions);
}
exports.useSimilarProjectsLazyQuery = useSimilarProjectsLazyQuery;
exports.UserDocument = graphql_tag_1.default(templateObject_34 || (templateObject_34 = __makeTemplateObject(["\n    query user($username: LowercaseString!, $after: String) {\n  user(username: $username) {\n    ...UserFragment\n    projects: projectsConnection {\n      edges {\n        node {\n          id\n          cover {\n            uri\n            default\n          }\n          title\n          followers: followersConnection {\n            totalCount\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: 5) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...PostFragment\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", ""], ["\n    query user($username: LowercaseString!, $after: String) {\n  user(username: $username) {\n    ...UserFragment\n    projects: projectsConnection {\n      edges {\n        node {\n          id\n          cover {\n            uri\n            default\n          }\n          title\n          followers: followersConnection {\n            totalCount\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: 5) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...PostFragment\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", ""])), exports.UserFragmentFragmentDoc, exports.PostFragmentFragmentDoc);
/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *      after: // value for 'after'
 *   },
 * });
 */
function useUserQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.UserDocument, baseOptions);
}
exports.useUserQuery = useUserQuery;
function useUserLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.UserDocument, baseOptions);
}
exports.useUserLazyQuery = useUserLazyQuery;
exports.UserFollowingProjectsDocument = graphql_tag_1.default(templateObject_35 || (templateObject_35 = __makeTemplateObject(["\n    query userFollowingProjects($username: LowercaseString!, $after: String) {\n  user(username: $username) {\n    id\n    projects: followingProjects(after: $after) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        node {\n          ...ProjectFragment\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query userFollowingProjects($username: LowercaseString!, $after: String) {\n  user(username: $username) {\n    id\n    projects: followingProjects(after: $after) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        node {\n          ...ProjectFragment\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentFragmentDoc);
/**
 * __useUserFollowingProjectsQuery__
 *
 * To run a query within a React component, call `useUserFollowingProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFollowingProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFollowingProjectsQuery({
 *   variables: {
 *      username: // value for 'username'
 *      after: // value for 'after'
 *   },
 * });
 */
function useUserFollowingProjectsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.UserFollowingProjectsDocument, baseOptions);
}
exports.useUserFollowingProjectsQuery = useUserFollowingProjectsQuery;
function useUserFollowingProjectsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.UserFollowingProjectsDocument, baseOptions);
}
exports.useUserFollowingProjectsLazyQuery = useUserFollowingProjectsLazyQuery;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35;
//# sourceMappingURL=graphql-hooks.js.map