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
exports.UserFragmentDoc = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment User on User {\n  id\n  fullName\n  firstName\n  lastName\n  username\n  avatarUrl\n  isSilhouette\n  isOnline\n  website\n  location\n  bio\n}\n    "], ["\n    fragment User on User {\n  id\n  fullName\n  firstName\n  lastName\n  username\n  avatarUrl\n  isSilhouette\n  isOnline\n  website\n  location\n  bio\n}\n    "])));
exports.ProjectFragmentDoc = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    fragment Project on Project {\n  id\n  title\n  slug\n  dynamicLink\n  user {\n    ...User\n  }\n  permissions {\n    isOwner\n    isFollower\n  }\n  followers: followersConnection {\n    totalCount\n  }\n}\n    ", ""], ["\n    fragment Project on Project {\n  id\n  title\n  slug\n  dynamicLink\n  user {\n    ...User\n  }\n  permissions {\n    isOwner\n    isFollower\n  }\n  followers: followersConnection {\n    totalCount\n  }\n}\n    ", ""])), exports.UserFragmentDoc);
exports.CommentsFragmentDoc = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    fragment Comments on CommentConnection {\n  totalCount\n  edges {\n    node {\n      id\n      text\n      user {\n        ...User\n      }\n    }\n  }\n}\n    ", ""], ["\n    fragment Comments on CommentConnection {\n  totalCount\n  edges {\n    node {\n      id\n      text\n      user {\n        ...User\n      }\n    }\n  }\n}\n    ", ""])), exports.UserFragmentDoc);
exports.PostFragmentDoc = graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    fragment Post on Post {\n  id\n  caption\n  createdAt\n  user {\n    ...User\n  }\n  permissions {\n    isOwner\n  }\n  files: filesConnection(type: IMAGE) {\n    edges {\n      node {\n        id\n        type\n        uri\n      }\n    }\n  }\n  project {\n    ...Project\n  }\n  likes {\n    isLiked\n    totalCount\n  }\n  comments: commentsConnection(first: 2) @connection(key: \"comments\") {\n    ...Comments\n  }\n}\n    ", "\n", "\n", ""], ["\n    fragment Post on Post {\n  id\n  caption\n  createdAt\n  user {\n    ...User\n  }\n  permissions {\n    isOwner\n  }\n  files: filesConnection(type: IMAGE) {\n    edges {\n      node {\n        id\n        type\n        uri\n      }\n    }\n  }\n  project {\n    ...Project\n  }\n  likes {\n    isLiked\n    totalCount\n  }\n  comments: commentsConnection(first: 2) @connection(key: \"comments\") {\n    ...Comments\n  }\n}\n    ", "\n", "\n", ""])), exports.UserFragmentDoc, exports.ProjectFragmentDoc, exports.CommentsFragmentDoc);
exports.UserProjectsFragmentDoc = graphql_tag_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    fragment UserProjects on User {\n  projects: projectsConnection {\n    edges {\n      node {\n        id\n        title\n        followers: followersConnection {\n          totalCount\n        }\n        files: filesConnection(first: 1, type: IMAGE) {\n          edges {\n            node {\n              id\n              uri\n            }\n          }\n        }\n      }\n    }\n  }\n}\n    "], ["\n    fragment UserProjects on User {\n  projects: projectsConnection {\n    edges {\n      node {\n        id\n        title\n        followers: followersConnection {\n          totalCount\n        }\n        files: filesConnection(first: 1, type: IMAGE) {\n          edges {\n            node {\n              id\n              uri\n            }\n          }\n        }\n      }\n    }\n  }\n}\n    "])));
exports.UserSettingsFragmentDoc = graphql_tag_1.default(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    fragment UserSettings on User {\n  id\n  settings {\n    notifications {\n      types {\n        NEW_FOLLOWER {\n          email\n          push\n        }\n        NEW_COMMENT {\n          email\n          push\n        }\n        NEW_MENTION {\n          email\n          push\n        }\n        NEW_ARTICLE {\n          email\n          push\n        }\n        SIMILAR_PROJECTS {\n          email\n          push\n        }\n        PRODUCT_ANNOUNCEMENTS {\n          email\n          push\n        }\n      }\n    }\n  }\n}\n    "], ["\n    fragment UserSettings on User {\n  id\n  settings {\n    notifications {\n      types {\n        NEW_FOLLOWER {\n          email\n          push\n        }\n        NEW_COMMENT {\n          email\n          push\n        }\n        NEW_MENTION {\n          email\n          push\n        }\n        NEW_ARTICLE {\n          email\n          push\n        }\n        SIMILAR_PROJECTS {\n          email\n          push\n        }\n        PRODUCT_ANNOUNCEMENTS {\n          email\n          push\n        }\n      }\n    }\n  }\n}\n    "])));
exports.CurrentUserDocument = graphql_tag_1.default(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    query CurrentUser {\n  user: currentUser {\n    avatarUrl\n    bio\n    dynamicLink\n    firstName\n    fullName\n    id\n    isOnline\n    isSilhouette\n    lastName\n    location\n    projectCount\n    username\n    website\n    settings {\n      timezone\n      locale\n    }\n    interestedIn {\n      id\n      title\n    }\n    ...UserProjects\n  }\n}\n    ", ""], ["\n    query CurrentUser {\n  user: currentUser {\n    avatarUrl\n    bio\n    dynamicLink\n    firstName\n    fullName\n    id\n    isOnline\n    isSilhouette\n    lastName\n    location\n    projectCount\n    username\n    website\n    settings {\n      timezone\n      locale\n    }\n    interestedIn {\n      id\n      title\n    }\n    ...UserProjects\n  }\n}\n    ", ""])), exports.UserProjectsFragmentDoc);
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
exports.GetCurrentUserDocument = graphql_tag_1.default(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    query getCurrentUser($after: String) {\n  user: currentUser {\n    ...User\n    projects: projectsConnection {\n      edges {\n        node {\n          id\n          cover {\n            uri\n            default\n          }\n          title\n          followers: followersConnection {\n            totalCount\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: 5) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", ""], ["\n    query getCurrentUser($after: String) {\n  user: currentUser {\n    ...User\n    projects: projectsConnection {\n      edges {\n        node {\n          id\n          cover {\n            uri\n            default\n          }\n          title\n          followers: followersConnection {\n            totalCount\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: 5) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", ""])), exports.UserFragmentDoc, exports.PostFragmentDoc);
/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
function useGetCurrentUserQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.GetCurrentUserDocument, baseOptions);
}
exports.useGetCurrentUserQuery = useGetCurrentUserQuery;
function useGetCurrentUserLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.GetCurrentUserDocument, baseOptions);
}
exports.useGetCurrentUserLazyQuery = useGetCurrentUserLazyQuery;
exports.CurrentUserProjectsDocument = graphql_tag_1.default(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    query CurrentUserProjects {\n  user: currentUser {\n    ...UserProjects\n  }\n}\n    ", ""], ["\n    query CurrentUserProjects {\n  user: currentUser {\n    ...UserProjects\n  }\n}\n    ", ""])), exports.UserProjectsFragmentDoc);
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
exports.CurrentUserSettingsDocument = graphql_tag_1.default(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    query CurrentUserSettings {\n  user: currentUser {\n    ...UserSettings\n  }\n}\n    ", ""], ["\n    query CurrentUserSettings {\n  user: currentUser {\n    ...UserSettings\n  }\n}\n    ", ""])), exports.UserSettingsFragmentDoc);
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
exports.PostDocument = graphql_tag_1.default(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    query post($id: ID!) {\n  post(id: $id) {\n    ...Post\n  }\n}\n    ", ""], ["\n    query post($id: ID!) {\n  post(id: $id) {\n    ...Post\n  }\n}\n    ", ""])), exports.PostFragmentDoc);
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
exports.ProjectSuggestionsDocument = graphql_tag_1.default(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    query projectSuggestions($after: String, $first: Int) {\n  projects: projectSuggestions(after: $after, first: $first) @connection(key: \"projects\") {\n    type {\n      id\n      title\n    }\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        ...Project\n        cover {\n          uri\n          default\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query projectSuggestions($after: String, $first: Int) {\n  projects: projectSuggestions(after: $after, first: $first) @connection(key: \"projects\") {\n    type {\n      id\n      title\n    }\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        ...Project\n        cover {\n          uri\n          default\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
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
exports.ProjectTypesDocument = graphql_tag_1.default(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    query projectTypes {\n  types: projectTypes {\n    id\n    title\n    imageUrl\n  }\n}\n    "], ["\n    query projectTypes {\n  types: projectTypes {\n    id\n    title\n    imageUrl\n  }\n}\n    "])));
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
exports.ProjectsDocument = graphql_tag_1.default(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    query projects($typeId: ID, $after: String, $first: Int, $type: ProjectSortType!) {\n  projects(typeId: $typeId, after: $after, first: $first, type: $type) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        cover {\n          uri\n          default\n        }\n        ...Project\n      }\n    }\n  }\n}\n    ", ""], ["\n    query projects($typeId: ID, $after: String, $first: Int, $type: ProjectSortType!) {\n  projects(typeId: $typeId, after: $after, first: $first, type: $type) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        cover {\n          uri\n          default\n        }\n        ...Project\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
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
exports.SimilarProjectsDocument = graphql_tag_1.default(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    query similarProjects($id: ID!) {\n  similarProjects(id: $id) {\n    edges {\n      node {\n        cover {\n          uri\n        }\n        ...Project\n      }\n    }\n  }\n}\n    ", ""], ["\n    query similarProjects($id: ID!) {\n  similarProjects(id: $id) {\n    edges {\n      node {\n        cover {\n          uri\n        }\n        ...Project\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
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
exports.UserByUsernameDocument = graphql_tag_1.default(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    query UserByUsername($username: LowercaseString!, $after: String) {\n  user(username: $username) {\n    ...User\n    projects: projectsConnection {\n      edges {\n        node {\n          id\n          cover {\n            uri\n            default\n          }\n          title\n          followers: followersConnection {\n            totalCount\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: 5) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", ""], ["\n    query UserByUsername($username: LowercaseString!, $after: String) {\n  user(username: $username) {\n    ...User\n    projects: projectsConnection {\n      edges {\n        node {\n          id\n          cover {\n            uri\n            default\n          }\n          title\n          followers: followersConnection {\n            totalCount\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: 5) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", ""])), exports.UserFragmentDoc, exports.PostFragmentDoc);
/**
 * __useUserByUsernameQuery__
 *
 * To run a query within a React component, call `useUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *      after: // value for 'after'
 *   },
 * });
 */
function useUserByUsernameQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.UserByUsernameDocument, baseOptions);
}
exports.useUserByUsernameQuery = useUserByUsernameQuery;
function useUserByUsernameLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.UserByUsernameDocument, baseOptions);
}
exports.useUserByUsernameLazyQuery = useUserByUsernameLazyQuery;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
//# sourceMappingURL=graphql-hooks.js.map