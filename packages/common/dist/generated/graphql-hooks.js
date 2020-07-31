"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserFollowingProjectsLazyQuery = exports.useUserFollowingProjectsQuery = exports.UserFollowingProjectsDocument = exports.useUserLazyQuery = exports.useUserQuery = exports.UserDocument = exports.useSimilarProjectsLazyQuery = exports.useSimilarProjectsQuery = exports.SimilarProjectsDocument = exports.useSearchUsersLazyQuery = exports.useSearchUsersQuery = exports.SearchUsersDocument = exports.useSearchProjectsLazyQuery = exports.useSearchProjectsQuery = exports.SearchProjectsDocument = exports.useSearchModelsLazyQuery = exports.useSearchModelsQuery = exports.SearchModelsDocument = exports.useSearchHashtagsLazyQuery = exports.useSearchHashtagsQuery = exports.SearchHashtagsDocument = exports.useRepliesLazyQuery = exports.useRepliesQuery = exports.RepliesDocument = exports.useRecentCommentsLazyQuery = exports.useRecentCommentsQuery = exports.RecentCommentsDocument = exports.useProjectsLazyQuery = exports.useProjectsQuery = exports.ProjectsDocument = exports.useProjectTypesLazyQuery = exports.useProjectTypesQuery = exports.ProjectTypesDocument = exports.useProjectSuggestionsLazyQuery = exports.useProjectSuggestionsQuery = exports.ProjectSuggestionsDocument = exports.useProjectCollectionsLazyQuery = exports.useProjectCollectionsQuery = exports.ProjectCollectionsDocument = exports.useProjectLazyQuery = exports.useProjectQuery = exports.ProjectDocument = exports.usePostsLazyQuery = exports.usePostsQuery = exports.PostsDocument = exports.usePostLazyQuery = exports.usePostQuery = exports.PostDocument = exports.useNotificationsLazyQuery = exports.useNotificationsQuery = exports.NotificationsDocument = exports.useMetaLazyQuery = exports.useMetaQuery = exports.MetaDocument = exports.useLikesLazyQuery = exports.useLikesQuery = exports.LikesDocument = exports.useHashtagLazyQuery = exports.useHashtagQuery = exports.HashtagDocument = exports.useGrowthLazyQuery = exports.useGrowthQuery = exports.GrowthDocument = exports.useFollowersLazyQuery = exports.useFollowersQuery = exports.FollowersDocument = exports.useFeedLazyQuery = exports.useFeedQuery = exports.FeedDocument = exports.useCurrentUserSettingsLazyQuery = exports.useCurrentUserSettingsQuery = exports.CurrentUserSettingsDocument = exports.useCurrentUserProjectsLazyQuery = exports.useCurrentUserProjectsQuery = exports.CurrentUserProjectsDocument = exports.useCurrentUserProfileLazyQuery = exports.useCurrentUserProfileQuery = exports.CurrentUserProfileDocument = exports.useCurrentUserFollowingProjectsLazyQuery = exports.useCurrentUserFollowingProjectsQuery = exports.CurrentUserFollowingProjectsDocument = exports.useCurrentUserLazyQuery = exports.useCurrentUserQuery = exports.CurrentUserDocument = exports.useCommentsLazyQuery = exports.useCommentsQuery = exports.CommentsDocument = exports.useCommentLazyQuery = exports.useCommentQuery = exports.CommentDocument = exports.useCollectionsLazyQuery = exports.useCollectionsQuery = exports.CollectionsDocument = exports.useBookmarksLazyQuery = exports.useBookmarksQuery = exports.BookmarksDocument = exports.useToggleNotificationSettingsMutation = exports.ToggleNotificationSettingsDocument = exports.useRegisterDeviceTokenMutation = exports.RegisterDeviceTokenDocument = exports.useRefreshTokenMutation = exports.RefreshTokenDocument = exports.usePreSignUrlsMutation = exports.PreSignUrlsDocument = exports.usePreSignUrlMutation = exports.PreSignUrlDocument = exports.useMarkNotificationSeenMutation = exports.MarkNotificationSeenDocument = exports.useMarkAllNotificationsSeenMutation = exports.MarkAllNotificationsSeenDocument = exports.useLikePostMutation = exports.LikePostDocument = exports.useLikeCommentMutation = exports.LikeCommentDocument = exports.useFollowProjectMutation = exports.FollowProjectDocument = exports.useEditUserMutation = exports.EditUserDocument = exports.useEditProjectMutation = exports.EditProjectDocument = exports.useEditPostMutation = exports.EditPostDocument = exports.useDeleteProjectMutation = exports.DeleteProjectDocument = exports.useDeletePostMutation = exports.DeletePostDocument = exports.useDeleteNotificationMutation = exports.DeleteNotificationDocument = exports.useDeleteCommentMutation = exports.DeleteCommentDocument = exports.useDeleteCollectionMutation = exports.DeleteCollectionDocument = exports.useCollectPostsMutation = exports.CollectPostsDocument = exports.useBookmarkPostMutation = exports.BookmarkPostDocument = exports.useAuthenticateGoogleMutation = exports.AuthenticateGoogleDocument = exports.useAuthenticateFacebookMutation = exports.AuthenticateFacebookDocument = exports.useAuthenticateAppleMutation = exports.AuthenticateAppleDocument = exports.useAddProjectMutation = exports.AddProjectDocument = exports.useAddPostMutation = exports.AddPostDocument = exports.useAddCommentMutation = exports.AddCommentDocument = exports.useAddCollectionMutation = exports.AddCollectionDocument = exports.UserSettingsFragmentDoc = exports.UserProjectsFragmentDoc = exports.PostFragmentDoc = exports.NotificationFragmentDoc = exports.ProjectFragmentDoc = exports.CommentAndRepliesFragmentDoc = exports.CommentFragmentDoc = exports.UserFragmentDoc = exports.PlatformType = exports.UploadType = exports.ReportType = exports.SearchType = exports.ProjectSortType = exports.NotificationTypes = exports.GrowthType = exports.FileType = exports.UserRole = void 0;
var graphql_tag_1 = require("graphql-tag");
var ApolloReactHooks = require("@apollo/client");
var UserRole;
(function (UserRole) {
    UserRole["User"] = "USER";
    UserRole["Admin"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var FileType;
(function (FileType) {
    FileType["Image"] = "IMAGE";
    FileType["Video"] = "VIDEO";
})(FileType = exports.FileType || (exports.FileType = {}));
var GrowthType;
(function (GrowthType) {
    GrowthType["Projects"] = "PROJECTS";
    GrowthType["Users"] = "USERS";
})(GrowthType = exports.GrowthType || (exports.GrowthType = {}));
var NotificationTypes;
(function (NotificationTypes) {
    NotificationTypes["NewComment"] = "NEW_COMMENT";
    NotificationTypes["NewFollower"] = "NEW_FOLLOWER";
    NotificationTypes["NewPostLike"] = "NEW_POST_LIKE";
    NotificationTypes["NewCommentLike"] = "NEW_COMMENT_LIKE";
    NotificationTypes["NewMention"] = "NEW_MENTION";
    NotificationTypes["NewReply"] = "NEW_REPLY";
})(NotificationTypes = exports.NotificationTypes || (exports.NotificationTypes = {}));
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
    SearchType["Hashtags"] = "HASHTAGS";
})(SearchType = exports.SearchType || (exports.SearchType = {}));
var ReportType;
(function (ReportType) {
    ReportType["Project"] = "PROJECT";
    ReportType["User"] = "USER";
    ReportType["Comment"] = "COMMENT";
    ReportType["Post"] = "POST";
})(ReportType = exports.ReportType || (exports.ReportType = {}));
var UploadType;
(function (UploadType) {
    UploadType["Image"] = "IMAGE";
    UploadType["Video"] = "VIDEO";
})(UploadType = exports.UploadType || (exports.UploadType = {}));
var PlatformType;
(function (PlatformType) {
    PlatformType["Mobile"] = "MOBILE";
    PlatformType["Web"] = "WEB";
})(PlatformType = exports.PlatformType || (exports.PlatformType = {}));
exports.UserFragmentDoc = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment User on User {\n  id\n  fullName\n  firstName\n  lastName\n  username\n  avatarUrl\n  isSilhouette\n  isOnline\n  website\n  location\n  bio\n  projectCount\n  dynamicLink\n}\n    "], ["\n    fragment User on User {\n  id\n  fullName\n  firstName\n  lastName\n  username\n  avatarUrl\n  isSilhouette\n  isOnline\n  website\n  location\n  bio\n  projectCount\n  dynamicLink\n}\n    "])));
exports.CommentFragmentDoc = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    fragment Comment on Comment {\n  id\n  text\n  createdAt\n  permissions {\n    isOwner\n  }\n  likes {\n    isLiked\n    totalCount\n  }\n  user {\n    ...User\n  }\n}\n    ", ""], ["\n    fragment Comment on Comment {\n  id\n  text\n  createdAt\n  permissions {\n    isOwner\n  }\n  likes {\n    isLiked\n    totalCount\n  }\n  user {\n    ...User\n  }\n}\n    ", ""])), exports.UserFragmentDoc);
exports.CommentAndRepliesFragmentDoc = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    fragment CommentAndReplies on Comment {\n  ...Comment\n  replies: repliesConnection(first: 1) {\n    pageInfo {\n      hasNextPage\n    }\n    totalCount\n    edges {\n      cursor\n      node {\n        ...Comment\n      }\n    }\n  }\n}\n    ", ""], ["\n    fragment CommentAndReplies on Comment {\n  ...Comment\n  replies: repliesConnection(first: 1) {\n    pageInfo {\n      hasNextPage\n    }\n    totalCount\n    edges {\n      cursor\n      node {\n        ...Comment\n      }\n    }\n  }\n}\n    ", ""])), exports.CommentFragmentDoc);
exports.ProjectFragmentDoc = graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    fragment Project on Project {\n  id\n  title\n  slug\n  dynamicLink\n  user {\n    ...User\n  }\n  permissions {\n    isOwner\n    isFollower\n  }\n  followers: followersConnection(first: 3) {\n    totalCount\n    edges {\n      node {\n        id\n        avatarUrl\n      }\n    }\n  }\n}\n    ", ""], ["\n    fragment Project on Project {\n  id\n  title\n  slug\n  dynamicLink\n  user {\n    ...User\n  }\n  permissions {\n    isOwner\n    isFollower\n  }\n  followers: followersConnection(first: 3) {\n    totalCount\n    edges {\n      node {\n        id\n        avatarUrl\n      }\n    }\n  }\n}\n    ", ""])), exports.UserFragmentDoc);
exports.NotificationFragmentDoc = graphql_tag_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    fragment Notification on Notification {\n  id\n  type\n  createdAt\n  user {\n    ...User\n  }\n  project {\n    ...Project\n  }\n  post {\n    id\n  }\n  comment {\n    id\n    text\n    postId\n  }\n  files: filesConnection(type: IMAGE, first: 1) {\n    edges {\n      node {\n        id\n        uri\n      }\n    }\n  }\n}\n    ", "\n", ""], ["\n    fragment Notification on Notification {\n  id\n  type\n  createdAt\n  user {\n    ...User\n  }\n  project {\n    ...Project\n  }\n  post {\n    id\n  }\n  comment {\n    id\n    text\n    postId\n  }\n  files: filesConnection(type: IMAGE, first: 1) {\n    edges {\n      node {\n        id\n        uri\n      }\n    }\n  }\n}\n    ", "\n", ""])), exports.UserFragmentDoc, exports.ProjectFragmentDoc);
exports.PostFragmentDoc = graphql_tag_1.default(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    fragment Post on Post {\n  id\n  caption\n  createdAt\n  user {\n    ...User\n  }\n  permissions {\n    isOwner\n  }\n  files: filesConnection(type: IMAGE) {\n    edges {\n      node {\n        id\n        type\n        uri\n      }\n    }\n  }\n  project {\n    ...Project\n  }\n  likes {\n    isLiked\n    totalCount\n  }\n  bookmarks {\n    isBookmarked\n  }\n  comments: commentsConnection(first: 2) @connection(key: \"comments\") {\n    totalCount\n    edges {\n      node {\n        ...Comment\n      }\n    }\n  }\n  likesConnection(first: 3) @connection(key: \"likes\") {\n    edges {\n      node {\n        id\n        avatarUrl\n      }\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    fragment Post on Post {\n  id\n  caption\n  createdAt\n  user {\n    ...User\n  }\n  permissions {\n    isOwner\n  }\n  files: filesConnection(type: IMAGE) {\n    edges {\n      node {\n        id\n        type\n        uri\n      }\n    }\n  }\n  project {\n    ...Project\n  }\n  likes {\n    isLiked\n    totalCount\n  }\n  bookmarks {\n    isBookmarked\n  }\n  comments: commentsConnection(first: 2) @connection(key: \"comments\") {\n    totalCount\n    edges {\n      node {\n        ...Comment\n      }\n    }\n  }\n  likesConnection(first: 3) @connection(key: \"likes\") {\n    edges {\n      node {\n        id\n        avatarUrl\n      }\n    }\n  }\n}\n    ", "\n", "\n", ""])), exports.UserFragmentDoc, exports.ProjectFragmentDoc, exports.CommentFragmentDoc);
exports.UserProjectsFragmentDoc = graphql_tag_1.default(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    fragment UserProjects on User {\n  projects: projectsConnection {\n    edges {\n      node {\n        id\n        title\n        followers: followersConnection {\n          totalCount\n        }\n        files: filesConnection(first: 1, type: IMAGE) {\n          edges {\n            node {\n              id\n              uri\n            }\n          }\n        }\n      }\n    }\n  }\n}\n    "], ["\n    fragment UserProjects on User {\n  projects: projectsConnection {\n    edges {\n      node {\n        id\n        title\n        followers: followersConnection {\n          totalCount\n        }\n        files: filesConnection(first: 1, type: IMAGE) {\n          edges {\n            node {\n              id\n              uri\n            }\n          }\n        }\n      }\n    }\n  }\n}\n    "])));
exports.UserSettingsFragmentDoc = graphql_tag_1.default(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    fragment UserSettings on User {\n  id\n  role\n  settings {\n    notifications {\n      types {\n        NEW_FOLLOWER {\n          email\n          push\n        }\n        NEW_COMMENT {\n          email\n          push\n        }\n        NEW_MENTION {\n          email\n          push\n        }\n        NEW_ARTICLE {\n          email\n          push\n        }\n        SIMILAR_PROJECTS {\n          email\n          push\n        }\n        PRODUCT_ANNOUNCEMENTS {\n          email\n          push\n        }\n      }\n    }\n  }\n}\n    "], ["\n    fragment UserSettings on User {\n  id\n  role\n  settings {\n    notifications {\n      types {\n        NEW_FOLLOWER {\n          email\n          push\n        }\n        NEW_COMMENT {\n          email\n          push\n        }\n        NEW_MENTION {\n          email\n          push\n        }\n        NEW_ARTICLE {\n          email\n          push\n        }\n        SIMILAR_PROJECTS {\n          email\n          push\n        }\n        PRODUCT_ANNOUNCEMENTS {\n          email\n          push\n        }\n      }\n    }\n  }\n}\n    "])));
exports.AddCollectionDocument = graphql_tag_1.default(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    mutation addCollection($projectId: ID!, $name: String!) {\n  addCollection(projectId: $projectId, name: $name) {\n    name\n    id\n  }\n}\n    "], ["\n    mutation addCollection($projectId: ID!, $name: String!) {\n  addCollection(projectId: $projectId, name: $name) {\n    name\n    id\n  }\n}\n    "])));
/**
 * __useAddCollectionMutation__
 *
 * To run a mutation, you first call `useAddCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCollectionMutation, { data, loading, error }] = useAddCollectionMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      name: // value for 'name'
 *   },
 * });
 */
function useAddCollectionMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.AddCollectionDocument, baseOptions);
}
exports.useAddCollectionMutation = useAddCollectionMutation;
exports.AddCommentDocument = graphql_tag_1.default(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {\n  addComment(postId: $postId, commentId: $commentId, input: $input) {\n    commentId\n    id\n    text\n  }\n}\n    "], ["\n    mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {\n  addComment(postId: $postId, commentId: $commentId, input: $input) {\n    commentId\n    id\n    text\n  }\n}\n    "])));
/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      commentId: // value for 'commentId'
 *      input: // value for 'input'
 *   },
 * });
 */
function useAddCommentMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.AddCommentDocument, baseOptions);
}
exports.useAddCommentMutation = useAddCommentMutation;
exports.AddPostDocument = graphql_tag_1.default(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    mutation addPost($input: PostInput!) {\n  addPost(input: $input) {\n    ...Post\n  }\n}\n    ", ""], ["\n    mutation addPost($input: PostInput!) {\n  addPost(input: $input) {\n    ...Post\n  }\n}\n    ", ""])), exports.PostFragmentDoc);
/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function useAddPostMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.AddPostDocument, baseOptions);
}
exports.useAddPostMutation = useAddPostMutation;
exports.AddProjectDocument = graphql_tag_1.default(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    mutation addProject($input: ProjectInput!) {\n  addProject(input: $input) {\n    ...Project\n  }\n}\n    ", ""], ["\n    mutation addProject($input: ProjectInput!) {\n  addProject(input: $input) {\n    ...Project\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
/**
 * __useAddProjectMutation__
 *
 * To run a mutation, you first call `useAddProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMutation, { data, loading, error }] = useAddProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function useAddProjectMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.AddProjectDocument, baseOptions);
}
exports.useAddProjectMutation = useAddProjectMutation;
exports.AuthenticateAppleDocument = graphql_tag_1.default(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    mutation authenticateApple($identityToken: String!, $user: ApplePayload!) {\n  authenticateApple(identityToken: $identityToken, user: $user) {\n    access_token\n    refresh_token\n  }\n}\n    "], ["\n    mutation authenticateApple($identityToken: String!, $user: ApplePayload!) {\n  authenticateApple(identityToken: $identityToken, user: $user) {\n    access_token\n    refresh_token\n  }\n}\n    "])));
/**
 * __useAuthenticateAppleMutation__
 *
 * To run a mutation, you first call `useAuthenticateAppleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateAppleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateAppleMutation, { data, loading, error }] = useAuthenticateAppleMutation({
 *   variables: {
 *      identityToken: // value for 'identityToken'
 *      user: // value for 'user'
 *   },
 * });
 */
function useAuthenticateAppleMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.AuthenticateAppleDocument, baseOptions);
}
exports.useAuthenticateAppleMutation = useAuthenticateAppleMutation;
exports.AuthenticateFacebookDocument = graphql_tag_1.default(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    mutation authenticateFacebook($token: String!) {\n  authenticateFacebook(token: $token) {\n    access_token\n    refresh_token\n  }\n}\n    "], ["\n    mutation authenticateFacebook($token: String!) {\n  authenticateFacebook(token: $token) {\n    access_token\n    refresh_token\n  }\n}\n    "])));
/**
 * __useAuthenticateFacebookMutation__
 *
 * To run a mutation, you first call `useAuthenticateFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateFacebookMutation, { data, loading, error }] = useAuthenticateFacebookMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
function useAuthenticateFacebookMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.AuthenticateFacebookDocument, baseOptions);
}
exports.useAuthenticateFacebookMutation = useAuthenticateFacebookMutation;
exports.AuthenticateGoogleDocument = graphql_tag_1.default(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    mutation authenticateGoogle($idToken: String!) {\n  authenticateGoogle(idToken: $idToken) {\n    access_token\n    refresh_token\n  }\n}\n    "], ["\n    mutation authenticateGoogle($idToken: String!) {\n  authenticateGoogle(idToken: $idToken) {\n    access_token\n    refresh_token\n  }\n}\n    "])));
/**
 * __useAuthenticateGoogleMutation__
 *
 * To run a mutation, you first call `useAuthenticateGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateGoogleMutation, { data, loading, error }] = useAuthenticateGoogleMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *   },
 * });
 */
function useAuthenticateGoogleMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.AuthenticateGoogleDocument, baseOptions);
}
exports.useAuthenticateGoogleMutation = useAuthenticateGoogleMutation;
exports.BookmarkPostDocument = graphql_tag_1.default(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    mutation bookmarkPost($id: ID!) {\n  bookmarkPost(id: $id) {\n    id\n    bookmarks {\n      isBookmarked\n    }\n  }\n}\n    "], ["\n    mutation bookmarkPost($id: ID!) {\n  bookmarkPost(id: $id) {\n    id\n    bookmarks {\n      isBookmarked\n    }\n  }\n}\n    "])));
/**
 * __useBookmarkPostMutation__
 *
 * To run a mutation, you first call `useBookmarkPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkPostMutation, { data, loading, error }] = useBookmarkPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useBookmarkPostMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.BookmarkPostDocument, baseOptions);
}
exports.useBookmarkPostMutation = useBookmarkPostMutation;
exports.CollectPostsDocument = graphql_tag_1.default(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n    mutation collectPosts($projectId: ID!, $collectionId: ID!, $input: [CollectionInput]) {\n  collectPosts(projectId: $projectId, collectionId: $collectionId, input: $input) {\n    id\n    name\n    cover {\n      uri\n    }\n  }\n}\n    "], ["\n    mutation collectPosts($projectId: ID!, $collectionId: ID!, $input: [CollectionInput]) {\n  collectPosts(projectId: $projectId, collectionId: $collectionId, input: $input) {\n    id\n    name\n    cover {\n      uri\n    }\n  }\n}\n    "])));
/**
 * __useCollectPostsMutation__
 *
 * To run a mutation, you first call `useCollectPostsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCollectPostsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [collectPostsMutation, { data, loading, error }] = useCollectPostsMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      collectionId: // value for 'collectionId'
 *      input: // value for 'input'
 *   },
 * });
 */
function useCollectPostsMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.CollectPostsDocument, baseOptions);
}
exports.useCollectPostsMutation = useCollectPostsMutation;
exports.DeleteCollectionDocument = graphql_tag_1.default(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n    mutation deleteCollection($projectId: ID!, $id: ID!) {\n  deleteCollection(id: $id, projectId: $projectId) {\n    id\n  }\n}\n    "], ["\n    mutation deleteCollection($projectId: ID!, $id: ID!) {\n  deleteCollection(id: $id, projectId: $projectId) {\n    id\n  }\n}\n    "])));
/**
 * __useDeleteCollectionMutation__
 *
 * To run a mutation, you first call `useDeleteCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCollectionMutation, { data, loading, error }] = useDeleteCollectionMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      id: // value for 'id'
 *   },
 * });
 */
function useDeleteCollectionMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.DeleteCollectionDocument, baseOptions);
}
exports.useDeleteCollectionMutation = useDeleteCollectionMutation;
exports.DeleteCommentDocument = graphql_tag_1.default(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n    mutation deleteComment($id: ID!) {\n  deleteComment(id: $id)\n}\n    "], ["\n    mutation deleteComment($id: ID!) {\n  deleteComment(id: $id)\n}\n    "])));
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
exports.DeleteNotificationDocument = graphql_tag_1.default(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n    mutation deleteNotification($id: ID!) {\n  deleteNotification(id: $id)\n}\n    "], ["\n    mutation deleteNotification($id: ID!) {\n  deleteNotification(id: $id)\n}\n    "])));
/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useDeleteNotificationMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.DeleteNotificationDocument, baseOptions);
}
exports.useDeleteNotificationMutation = useDeleteNotificationMutation;
exports.DeletePostDocument = graphql_tag_1.default(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n    mutation deletePost($id: ID!) {\n  deletePost(id: $id) {\n    id\n  }\n}\n    "], ["\n    mutation deletePost($id: ID!) {\n  deletePost(id: $id) {\n    id\n  }\n}\n    "])));
/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useDeletePostMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.DeletePostDocument, baseOptions);
}
exports.useDeletePostMutation = useDeletePostMutation;
exports.DeleteProjectDocument = graphql_tag_1.default(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n    mutation deleteProject($id: ID!) {\n  deleteProject(id: $id)\n}\n    "], ["\n    mutation deleteProject($id: ID!) {\n  deleteProject(id: $id)\n}\n    "])));
/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useDeleteProjectMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.DeleteProjectDocument, baseOptions);
}
exports.useDeleteProjectMutation = useDeleteProjectMutation;
exports.EditPostDocument = graphql_tag_1.default(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n    mutation editPost($id: ID!, $input: EditPostInput!) {\n  editPost(id: $id, input: $input) {\n    ...Post\n  }\n}\n    ", ""], ["\n    mutation editPost($id: ID!, $input: EditPostInput!) {\n  editPost(id: $id, input: $input) {\n    ...Post\n  }\n}\n    ", ""])), exports.PostFragmentDoc);
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
exports.EditProjectDocument = graphql_tag_1.default(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n    mutation editProject($id: ID!, $input: ProjectInput!) {\n  editProject(id: $id, input: $input) {\n    id\n    title\n  }\n}\n    "], ["\n    mutation editProject($id: ID!, $input: ProjectInput!) {\n  editProject(id: $id, input: $input) {\n    id\n    title\n  }\n}\n    "])));
/**
 * __useEditProjectMutation__
 *
 * To run a mutation, you first call `useEditProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProjectMutation, { data, loading, error }] = useEditProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
function useEditProjectMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.EditProjectDocument, baseOptions);
}
exports.useEditProjectMutation = useEditProjectMutation;
exports.EditUserDocument = graphql_tag_1.default(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n    mutation editUser($input: EditUserInput!, $id: ID) {\n  editUser(input: $input, id: $id) {\n    ...User\n  }\n}\n    ", ""], ["\n    mutation editUser($input: EditUserInput!, $id: ID) {\n  editUser(input: $input, id: $id) {\n    ...User\n  }\n}\n    ", ""])), exports.UserFragmentDoc);
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
 *      id: // value for 'id'
 *   },
 * });
 */
function useEditUserMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.EditUserDocument, baseOptions);
}
exports.useEditUserMutation = useEditUserMutation;
exports.FollowProjectDocument = graphql_tag_1.default(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n    mutation followProject($id: ID!) {\n  followProject(id: $id) {\n    cover {\n      uri\n      default\n    }\n    ...Project\n  }\n}\n    ", ""], ["\n    mutation followProject($id: ID!) {\n  followProject(id: $id) {\n    cover {\n      uri\n      default\n    }\n    ...Project\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
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
exports.LikeCommentDocument = graphql_tag_1.default(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n    mutation likeComment($id: ID!) {\n  likeComment(id: $id) {\n    id\n    likes {\n      isLiked\n      totalCount\n    }\n  }\n}\n    "], ["\n    mutation likeComment($id: ID!) {\n  likeComment(id: $id) {\n    id\n    likes {\n      isLiked\n      totalCount\n    }\n  }\n}\n    "])));
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
exports.LikePostDocument = graphql_tag_1.default(templateObject_28 || (templateObject_28 = __makeTemplateObject(["\n    mutation likePost($id: ID!) {\n  likePost(id: $id) {\n    id\n    likes {\n      isLiked\n      totalCount\n    }\n  }\n}\n    "], ["\n    mutation likePost($id: ID!) {\n  likePost(id: $id) {\n    id\n    likes {\n      isLiked\n      totalCount\n    }\n  }\n}\n    "])));
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
exports.MarkAllNotificationsSeenDocument = graphql_tag_1.default(templateObject_29 || (templateObject_29 = __makeTemplateObject(["\n    mutation markAllNotificationsSeen {\n  markAllNotificationsSeen\n}\n    "], ["\n    mutation markAllNotificationsSeen {\n  markAllNotificationsSeen\n}\n    "])));
/**
 * __useMarkAllNotificationsSeenMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllNotificationsSeenMutation, { data, loading, error }] = useMarkAllNotificationsSeenMutation({
 *   variables: {
 *   },
 * });
 */
function useMarkAllNotificationsSeenMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.MarkAllNotificationsSeenDocument, baseOptions);
}
exports.useMarkAllNotificationsSeenMutation = useMarkAllNotificationsSeenMutation;
exports.MarkNotificationSeenDocument = graphql_tag_1.default(templateObject_30 || (templateObject_30 = __makeTemplateObject(["\n    mutation markNotificationSeen($id: ID!) {\n  markNotificationSeen(id: $id) {\n    ...Notification\n  }\n}\n    ", ""], ["\n    mutation markNotificationSeen($id: ID!) {\n  markNotificationSeen(id: $id) {\n    ...Notification\n  }\n}\n    ", ""])), exports.NotificationFragmentDoc);
/**
 * __useMarkNotificationSeenMutation__
 *
 * To run a mutation, you first call `useMarkNotificationSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationSeenMutation, { data, loading, error }] = useMarkNotificationSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useMarkNotificationSeenMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.MarkNotificationSeenDocument, baseOptions);
}
exports.useMarkNotificationSeenMutation = useMarkNotificationSeenMutation;
exports.PreSignUrlDocument = graphql_tag_1.default(templateObject_31 || (templateObject_31 = __makeTemplateObject(["\n    mutation preSignUrl($input: PreSignedUrlInput!) {\n  preSignUrl(input: $input) {\n    url\n    type\n    filename\n  }\n}\n    "], ["\n    mutation preSignUrl($input: PreSignedUrlInput!) {\n  preSignUrl(input: $input) {\n    url\n    type\n    filename\n  }\n}\n    "])));
/**
 * __usePreSignUrlMutation__
 *
 * To run a mutation, you first call `usePreSignUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePreSignUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [preSignUrlMutation, { data, loading, error }] = usePreSignUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function usePreSignUrlMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.PreSignUrlDocument, baseOptions);
}
exports.usePreSignUrlMutation = usePreSignUrlMutation;
exports.PreSignUrlsDocument = graphql_tag_1.default(templateObject_32 || (templateObject_32 = __makeTemplateObject(["\n    mutation preSignUrls($input: [PreSignedUrlnput]!) {\n  preSignUrls(input: $input) {\n    url\n    type\n    filename\n  }\n}\n    "], ["\n    mutation preSignUrls($input: [PreSignedUrlnput]!) {\n  preSignUrls(input: $input) {\n    url\n    type\n    filename\n  }\n}\n    "])));
/**
 * __usePreSignUrlsMutation__
 *
 * To run a mutation, you first call `usePreSignUrlsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePreSignUrlsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [preSignUrlsMutation, { data, loading, error }] = usePreSignUrlsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function usePreSignUrlsMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.PreSignUrlsDocument, baseOptions);
}
exports.usePreSignUrlsMutation = usePreSignUrlsMutation;
exports.RefreshTokenDocument = graphql_tag_1.default(templateObject_33 || (templateObject_33 = __makeTemplateObject(["\n    mutation refreshToken($refreshToken: String!) {\n  token: refreshToken(refreshToken: $refreshToken) {\n    access_token\n  }\n}\n    "], ["\n    mutation refreshToken($refreshToken: String!) {\n  token: refreshToken(refreshToken: $refreshToken) {\n    access_token\n  }\n}\n    "])));
/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
function useRefreshTokenMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.RefreshTokenDocument, baseOptions);
}
exports.useRefreshTokenMutation = useRefreshTokenMutation;
exports.RegisterDeviceTokenDocument = graphql_tag_1.default(templateObject_34 || (templateObject_34 = __makeTemplateObject(["\n    mutation registerDeviceToken($token: String!, $platform: PlatformType!) {\n  registerDeviceToken(token: $token, platform: $platform)\n}\n    "], ["\n    mutation registerDeviceToken($token: String!, $platform: PlatformType!) {\n  registerDeviceToken(token: $token, platform: $platform)\n}\n    "])));
/**
 * __useRegisterDeviceTokenMutation__
 *
 * To run a mutation, you first call `useRegisterDeviceTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterDeviceTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerDeviceTokenMutation, { data, loading, error }] = useRegisterDeviceTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *      platform: // value for 'platform'
 *   },
 * });
 */
function useRegisterDeviceTokenMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.RegisterDeviceTokenDocument, baseOptions);
}
exports.useRegisterDeviceTokenMutation = useRegisterDeviceTokenMutation;
exports.ToggleNotificationSettingsDocument = graphql_tag_1.default(templateObject_35 || (templateObject_35 = __makeTemplateObject(["\n    mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {\n  toggleNotificationSettings(input: $input) {\n    ...UserSettings\n  }\n}\n    ", ""], ["\n    mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {\n  toggleNotificationSettings(input: $input) {\n    ...UserSettings\n  }\n}\n    ", ""])), exports.UserSettingsFragmentDoc);
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
exports.BookmarksDocument = graphql_tag_1.default(templateObject_36 || (templateObject_36 = __makeTemplateObject(["\n    query bookmarks($after: String, $first: Int = 5) @connection(key: \"bookmarks\") {\n  bookmarks(after: $after, first: $first) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...Post\n      }\n    }\n  }\n}\n    ", ""], ["\n    query bookmarks($after: String, $first: Int = 5) @connection(key: \"bookmarks\") {\n  bookmarks(after: $after, first: $first) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...Post\n      }\n    }\n  }\n}\n    ", ""])), exports.PostFragmentDoc);
/**
 * __useBookmarksQuery__
 *
 * To run a query within a React component, call `useBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarksQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useBookmarksQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.BookmarksDocument, baseOptions);
}
exports.useBookmarksQuery = useBookmarksQuery;
function useBookmarksLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.BookmarksDocument, baseOptions);
}
exports.useBookmarksLazyQuery = useBookmarksLazyQuery;
exports.CollectionsDocument = graphql_tag_1.default(templateObject_37 || (templateObject_37 = __makeTemplateObject(["\n    query collections($id: ID!, $projectId: ID!, $after: String, $first: Int = 5) @connection(key: \"collections\") {\n  collections(id: $id, projectId: $projectId, after: $after, first: $first) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...Post\n      }\n    }\n  }\n}\n    ", ""], ["\n    query collections($id: ID!, $projectId: ID!, $after: String, $first: Int = 5) @connection(key: \"collections\") {\n  collections(id: $id, projectId: $projectId, after: $after, first: $first) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...Post\n      }\n    }\n  }\n}\n    ", ""])), exports.PostFragmentDoc);
/**
 * __useCollectionsQuery__
 *
 * To run a query within a React component, call `useCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      projectId: // value for 'projectId'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useCollectionsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.CollectionsDocument, baseOptions);
}
exports.useCollectionsQuery = useCollectionsQuery;
function useCollectionsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.CollectionsDocument, baseOptions);
}
exports.useCollectionsLazyQuery = useCollectionsLazyQuery;
exports.CommentDocument = graphql_tag_1.default(templateObject_38 || (templateObject_38 = __makeTemplateObject(["\n    query comment($id: ID!) {\n  comment(id: $id) {\n    ...Comment\n  }\n}\n    ", ""], ["\n    query comment($id: ID!) {\n  comment(id: $id) {\n    ...Comment\n  }\n}\n    ", ""])), exports.CommentFragmentDoc);
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
exports.CommentsDocument = graphql_tag_1.default(templateObject_39 || (templateObject_39 = __makeTemplateObject(["\n    query comments($postId: ID!, $after: String) {\n  post(id: $postId) {\n    ...Post\n  }\n  comments(postId: $postId, after: $after) @connection(key: \"comments\", filter: [\"postId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...CommentAndReplies\n      }\n    }\n  }\n}\n    ", "\n", ""], ["\n    query comments($postId: ID!, $after: String) {\n  post(id: $postId) {\n    ...Post\n  }\n  comments(postId: $postId, after: $after) @connection(key: \"comments\", filter: [\"postId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...CommentAndReplies\n      }\n    }\n  }\n}\n    ", "\n", ""])), exports.PostFragmentDoc, exports.CommentAndRepliesFragmentDoc);
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
exports.CurrentUserDocument = graphql_tag_1.default(templateObject_40 || (templateObject_40 = __makeTemplateObject(["\n    query currentUser {\n  user: currentUser {\n    avatarUrl\n    bio\n    dynamicLink\n    firstName\n    fullName\n    id\n    isOnline\n    isSilhouette\n    lastName\n    location\n    projectCount\n    username\n    website\n    role\n    settings {\n      timezone\n      locale\n    }\n    interestedIn {\n      id\n      title\n    }\n    ...UserProjects\n  }\n}\n    ", ""], ["\n    query currentUser {\n  user: currentUser {\n    avatarUrl\n    bio\n    dynamicLink\n    firstName\n    fullName\n    id\n    isOnline\n    isSilhouette\n    lastName\n    location\n    projectCount\n    username\n    website\n    role\n    settings {\n      timezone\n      locale\n    }\n    interestedIn {\n      id\n      title\n    }\n    ...UserProjects\n  }\n}\n    ", ""])), exports.UserProjectsFragmentDoc);
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
exports.CurrentUserFollowingProjectsDocument = graphql_tag_1.default(templateObject_41 || (templateObject_41 = __makeTemplateObject(["\n    query currentUserFollowingProjects($after: String, $first: Int = 5) {\n  user: currentUser {\n    id\n    projects: followingProjects(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query currentUserFollowingProjects($after: String, $first: Int = 5) {\n  user: currentUser {\n    id\n    projects: followingProjects(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
/**
 * __useCurrentUserFollowingProjectsQuery__
 *
 * To run a query within a React component, call `useCurrentUserFollowingProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserFollowingProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserFollowingProjectsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useCurrentUserFollowingProjectsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.CurrentUserFollowingProjectsDocument, baseOptions);
}
exports.useCurrentUserFollowingProjectsQuery = useCurrentUserFollowingProjectsQuery;
function useCurrentUserFollowingProjectsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.CurrentUserFollowingProjectsDocument, baseOptions);
}
exports.useCurrentUserFollowingProjectsLazyQuery = useCurrentUserFollowingProjectsLazyQuery;
exports.CurrentUserProfileDocument = graphql_tag_1.default(templateObject_42 || (templateObject_42 = __makeTemplateObject(["\n    query currentUserProfile($after: String, $first: Int = 5) {\n  user: currentUser {\n    ...User\n    projects: projectsConnection {\n      edges {\n        node {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query currentUserProfile($after: String, $first: Int = 5) {\n  user: currentUser {\n    ...User\n    projects: projectsConnection {\n      edges {\n        node {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", "\n", ""])), exports.UserFragmentDoc, exports.ProjectFragmentDoc, exports.PostFragmentDoc);
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
 *      first: // value for 'first'
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
exports.CurrentUserProjectsDocument = graphql_tag_1.default(templateObject_43 || (templateObject_43 = __makeTemplateObject(["\n    query currentUserProjects {\n  user: currentUser {\n    ...UserProjects\n  }\n}\n    ", ""], ["\n    query currentUserProjects {\n  user: currentUser {\n    ...UserProjects\n  }\n}\n    ", ""])), exports.UserProjectsFragmentDoc);
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
exports.CurrentUserSettingsDocument = graphql_tag_1.default(templateObject_44 || (templateObject_44 = __makeTemplateObject(["\n    query currentUserSettings {\n  user: currentUser {\n    ...UserSettings\n  }\n}\n    ", ""], ["\n    query currentUserSettings {\n  user: currentUser {\n    ...UserSettings\n  }\n}\n    ", ""])), exports.UserSettingsFragmentDoc);
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
exports.FeedDocument = graphql_tag_1.default(templateObject_45 || (templateObject_45 = __makeTemplateObject(["\n    query feed($after: String, $first: Int = 5) {\n  feed {\n    posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query feed($after: String, $first: Int = 5) {\n  feed {\n    posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.PostFragmentDoc);
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
 *      first: // value for 'first'
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
exports.FollowersDocument = graphql_tag_1.default(templateObject_46 || (templateObject_46 = __makeTemplateObject(["\n    query followers($projectId: ID!, $after: String, $first: Int = 10) {\n  followers(projectId: $projectId, after: $after, first: $first) @connection(key: \"followers\", filter: [\"projectId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...User\n      }\n    }\n  }\n}\n    ", ""], ["\n    query followers($projectId: ID!, $after: String, $first: Int = 10) {\n  followers(projectId: $projectId, after: $after, first: $first) @connection(key: \"followers\", filter: [\"projectId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...User\n      }\n    }\n  }\n}\n    ", ""])), exports.UserFragmentDoc);
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
 *      first: // value for 'first'
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
exports.GrowthDocument = graphql_tag_1.default(templateObject_47 || (templateObject_47 = __makeTemplateObject(["\n    query growth($type: GrowthType!) {\n  growth(type: $type) {\n    date\n    count\n  }\n}\n    "], ["\n    query growth($type: GrowthType!) {\n  growth(type: $type) {\n    date\n    count\n  }\n}\n    "])));
/**
 * __useGrowthQuery__
 *
 * To run a query within a React component, call `useGrowthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGrowthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGrowthQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
function useGrowthQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.GrowthDocument, baseOptions);
}
exports.useGrowthQuery = useGrowthQuery;
function useGrowthLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.GrowthDocument, baseOptions);
}
exports.useGrowthLazyQuery = useGrowthLazyQuery;
exports.HashtagDocument = graphql_tag_1.default(templateObject_48 || (templateObject_48 = __makeTemplateObject(["\n    query hashtag($id: ID, $slug: LowercaseString, $after: String, $first: Int = 5) {\n  hashtag(id: $id, slug: $slug) {\n    posts: postsConnection(first: $first, after: $after) @connection(key: \"posts\") {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query hashtag($id: ID, $slug: LowercaseString, $after: String, $first: Int = 5) {\n  hashtag(id: $id, slug: $slug) {\n    posts: postsConnection(first: $first, after: $after) @connection(key: \"posts\") {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.PostFragmentDoc);
/**
 * __useHashtagQuery__
 *
 * To run a query within a React component, call `useHashtagQuery` and pass it any options that fit your needs.
 * When your component renders, `useHashtagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHashtagQuery({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useHashtagQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.HashtagDocument, baseOptions);
}
exports.useHashtagQuery = useHashtagQuery;
function useHashtagLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.HashtagDocument, baseOptions);
}
exports.useHashtagLazyQuery = useHashtagLazyQuery;
exports.LikesDocument = graphql_tag_1.default(templateObject_49 || (templateObject_49 = __makeTemplateObject(["\n    query likes($postId: ID!, $after: String, $first: Int = 10) {\n  likes(postId: $postId, first: $first, after: $after) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...User\n      }\n    }\n  }\n}\n    ", ""], ["\n    query likes($postId: ID!, $after: String, $first: Int = 10) {\n  likes(postId: $postId, first: $first, after: $after) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...User\n      }\n    }\n  }\n}\n    ", ""])), exports.UserFragmentDoc);
/**
 * __useLikesQuery__
 *
 * To run a query within a React component, call `useLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikesQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useLikesQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.LikesDocument, baseOptions);
}
exports.useLikesQuery = useLikesQuery;
function useLikesLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.LikesDocument, baseOptions);
}
exports.useLikesLazyQuery = useLikesLazyQuery;
exports.MetaDocument = graphql_tag_1.default(templateObject_50 || (templateObject_50 = __makeTemplateObject(["\n    query meta {\n  meta {\n    totalUsers\n    totalUsersToday\n    totalPostsToday\n    totalProjectsToday\n    totalCommentsToday\n    totalFilesToday\n    totalComments\n    totalProjects\n    totalPosts\n    totalFiles\n  }\n}\n    "], ["\n    query meta {\n  meta {\n    totalUsers\n    totalUsersToday\n    totalPostsToday\n    totalProjectsToday\n    totalCommentsToday\n    totalFilesToday\n    totalComments\n    totalProjects\n    totalPosts\n    totalFiles\n  }\n}\n    "])));
/**
 * __useMetaQuery__
 *
 * To run a query within a React component, call `useMetaQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetaQuery({
 *   variables: {
 *   },
 * });
 */
function useMetaQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.MetaDocument, baseOptions);
}
exports.useMetaQuery = useMetaQuery;
function useMetaLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.MetaDocument, baseOptions);
}
exports.useMetaLazyQuery = useMetaLazyQuery;
exports.NotificationsDocument = graphql_tag_1.default(templateObject_51 || (templateObject_51 = __makeTemplateObject(["\n    query notifications($after: String, $first: Int = 10) {\n  notifications(after: $after, first: $first) @connection(key: \"notifications\") {\n    unreadCount\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...Notification\n      }\n    }\n  }\n}\n    ", ""], ["\n    query notifications($after: String, $first: Int = 10) {\n  notifications(after: $after, first: $first) @connection(key: \"notifications\") {\n    unreadCount\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...Notification\n      }\n    }\n  }\n}\n    ", ""])), exports.NotificationFragmentDoc);
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
 *      first: // value for 'first'
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
exports.PostDocument = graphql_tag_1.default(templateObject_52 || (templateObject_52 = __makeTemplateObject(["\n    query post($id: ID!) {\n  post(id: $id) {\n    ...Post\n  }\n}\n    ", ""], ["\n    query post($id: ID!) {\n  post(id: $id) {\n    ...Post\n  }\n}\n    ", ""])), exports.PostFragmentDoc);
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
exports.PostsDocument = graphql_tag_1.default(templateObject_53 || (templateObject_53 = __makeTemplateObject(["\n    query posts($after: String, $first: Int = 5) @connection(key: \"posts\") {\n  posts(after: $after, first: $first) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...Post\n      }\n    }\n  }\n}\n    ", ""], ["\n    query posts($after: String, $first: Int = 5) @connection(key: \"posts\") {\n  posts(after: $after, first: $first) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...Post\n      }\n    }\n  }\n}\n    ", ""])), exports.PostFragmentDoc);
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
exports.ProjectDocument = graphql_tag_1.default(templateObject_54 || (templateObject_54 = __makeTemplateObject(["\n    query project($id: ID, $slug: LowercaseString, $after: String, $postId: ID, $first: Int = 5) {\n  post(id: $postId) {\n    ...Post\n  }\n  project(id: $id, slug: $slug) {\n    ...Project\n    posts: postsConnection(first: $first, after: $after) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n}\n    ", "\n", ""], ["\n    query project($id: ID, $slug: LowercaseString, $after: String, $postId: ID, $first: Int = 5) {\n  post(id: $postId) {\n    ...Post\n  }\n  project(id: $id, slug: $slug) {\n    ...Project\n    posts: postsConnection(first: $first, after: $after) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n}\n    ", "\n", ""])), exports.PostFragmentDoc, exports.ProjectFragmentDoc);
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
 *      first: // value for 'first'
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
exports.ProjectCollectionsDocument = graphql_tag_1.default(templateObject_55 || (templateObject_55 = __makeTemplateObject(["\n    query projectCollections($projectId: ID!, $after: String, $first: Int = 10) {\n  projectCollections(projectId: $projectId, first: $first, after: $after) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        name\n        cover {\n          uri\n        }\n      }\n    }\n  }\n}\n    "], ["\n    query projectCollections($projectId: ID!, $after: String, $first: Int = 10) {\n  projectCollections(projectId: $projectId, first: $first, after: $after) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        name\n        cover {\n          uri\n        }\n      }\n    }\n  }\n}\n    "])));
/**
 * __useProjectCollectionsQuery__
 *
 * To run a query within a React component, call `useProjectCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectCollectionsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useProjectCollectionsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.ProjectCollectionsDocument, baseOptions);
}
exports.useProjectCollectionsQuery = useProjectCollectionsQuery;
function useProjectCollectionsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.ProjectCollectionsDocument, baseOptions);
}
exports.useProjectCollectionsLazyQuery = useProjectCollectionsLazyQuery;
exports.ProjectSuggestionsDocument = graphql_tag_1.default(templateObject_56 || (templateObject_56 = __makeTemplateObject(["\n    query projectSuggestions($after: String, $first: Int = 5) {\n  projects: projectSuggestions(after: $after, first: $first) @connection(key: \"projects\") {\n    type {\n      id\n      title\n    }\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        ...Project\n        cover {\n          uri\n          default\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query projectSuggestions($after: String, $first: Int = 5) {\n  projects: projectSuggestions(after: $after, first: $first) @connection(key: \"projects\") {\n    type {\n      id\n      title\n    }\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        ...Project\n        cover {\n          uri\n          default\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
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
exports.ProjectTypesDocument = graphql_tag_1.default(templateObject_57 || (templateObject_57 = __makeTemplateObject(["\n    query projectTypes {\n  types: projectTypes {\n    id\n    title\n    imageUrl\n  }\n}\n    "], ["\n    query projectTypes {\n  types: projectTypes {\n    id\n    title\n    imageUrl\n  }\n}\n    "])));
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
exports.ProjectsDocument = graphql_tag_1.default(templateObject_58 || (templateObject_58 = __makeTemplateObject(["\n    query projects($typeId: ID, $after: String, $first: Int = 5, $type: ProjectSortType!) {\n  projects(typeId: $typeId, after: $after, first: $first, type: $type) @connection(key: \"projects\", filter: [\"type\", \"typeId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        cover {\n          uri\n          default\n        }\n        ...Project\n      }\n    }\n  }\n}\n    ", ""], ["\n    query projects($typeId: ID, $after: String, $first: Int = 5, $type: ProjectSortType!) {\n  projects(typeId: $typeId, after: $after, first: $first, type: $type) @connection(key: \"projects\", filter: [\"type\", \"typeId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        cover {\n          uri\n          default\n        }\n        ...Project\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
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
exports.RecentCommentsDocument = graphql_tag_1.default(templateObject_59 || (templateObject_59 = __makeTemplateObject(["\n    query recentComments($after: String) {\n  comments: recentComments(after: $after) @connection(key: \"comments\", filter: [\"postId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...CommentAndReplies\n      }\n    }\n  }\n}\n    ", ""], ["\n    query recentComments($after: String) {\n  comments: recentComments(after: $after) @connection(key: \"comments\", filter: [\"postId\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...CommentAndReplies\n      }\n    }\n  }\n}\n    ", ""])), exports.CommentAndRepliesFragmentDoc);
/**
 * __useRecentCommentsQuery__
 *
 * To run a query within a React component, call `useRecentCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentCommentsQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
function useRecentCommentsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.RecentCommentsDocument, baseOptions);
}
exports.useRecentCommentsQuery = useRecentCommentsQuery;
function useRecentCommentsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.RecentCommentsDocument, baseOptions);
}
exports.useRecentCommentsLazyQuery = useRecentCommentsLazyQuery;
exports.RepliesDocument = graphql_tag_1.default(templateObject_60 || (templateObject_60 = __makeTemplateObject(["\n    query replies($id: ID!, $after: String, $first: Int = 5) {\n  comment(id: $id) {\n    replies: repliesConnection(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      totalCount\n      edges {\n        cursor\n        node {\n          ...Comment\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query replies($id: ID!, $after: String, $first: Int = 5) {\n  comment(id: $id) {\n    replies: repliesConnection(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      totalCount\n      edges {\n        cursor\n        node {\n          ...Comment\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.CommentFragmentDoc);
/**
 * __useRepliesQuery__
 *
 * To run a query within a React component, call `useRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepliesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useRepliesQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.RepliesDocument, baseOptions);
}
exports.useRepliesQuery = useRepliesQuery;
function useRepliesLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.RepliesDocument, baseOptions);
}
exports.useRepliesLazyQuery = useRepliesLazyQuery;
exports.SearchHashtagsDocument = graphql_tag_1.default(templateObject_61 || (templateObject_61 = __makeTemplateObject(["\n    query searchHashtags($query: String!, $after: String, $first: Int = 10) {\n  hashtags: search(query: $query, after: $after, type: HASHTAGS, first: $first) @connection(key: \"hashtags\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ... on Hashtag {\n          id\n          name\n          slug\n          totalCount\n        }\n      }\n    }\n  }\n}\n    "], ["\n    query searchHashtags($query: String!, $after: String, $first: Int = 10) {\n  hashtags: search(query: $query, after: $after, type: HASHTAGS, first: $first) @connection(key: \"hashtags\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ... on Hashtag {\n          id\n          name\n          slug\n          totalCount\n        }\n      }\n    }\n  }\n}\n    "])));
/**
 * __useSearchHashtagsQuery__
 *
 * To run a query within a React component, call `useSearchHashtagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchHashtagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchHashtagsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useSearchHashtagsQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.SearchHashtagsDocument, baseOptions);
}
exports.useSearchHashtagsQuery = useSearchHashtagsQuery;
function useSearchHashtagsLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.SearchHashtagsDocument, baseOptions);
}
exports.useSearchHashtagsLazyQuery = useSearchHashtagsLazyQuery;
exports.SearchModelsDocument = graphql_tag_1.default(templateObject_62 || (templateObject_62 = __makeTemplateObject(["\n    query searchModels($query: String!, $after: String, $first: Int = 20) {\n  models: search(query: $query, after: $after, type: MODELS, first: $first) @connection(key: \"models\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        ... on Model {\n          id\n          brand {\n            name\n          }\n          model\n          year\n        }\n      }\n    }\n  }\n}\n    "], ["\n    query searchModels($query: String!, $after: String, $first: Int = 20) {\n  models: search(query: $query, after: $after, type: MODELS, first: $first) @connection(key: \"models\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        ... on Model {\n          id\n          brand {\n            name\n          }\n          model\n          year\n        }\n      }\n    }\n  }\n}\n    "])));
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
 *      first: // value for 'first'
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
exports.SearchProjectsDocument = graphql_tag_1.default(templateObject_63 || (templateObject_63 = __makeTemplateObject(["\n    query searchProjects($query: String!, $after: String, $first: Int = 10) {\n  projects: search(query: $query, after: $after, type: PROJECTS, first: $first) @connection(key: \"projects\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ... on Project {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query searchProjects($query: String!, $after: String, $first: Int = 10) {\n  projects: search(query: $query, after: $after, type: PROJECTS, first: $first) @connection(key: \"projects\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ... on Project {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
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
 *      first: // value for 'first'
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
exports.SearchUsersDocument = graphql_tag_1.default(templateObject_64 || (templateObject_64 = __makeTemplateObject(["\n    query searchUsers($query: String!, $after: String, $first: Int = 10) {\n  users: search(query: $query, after: $after, type: USERS, first: $first) @connection(key: \"users\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ... on User {\n          ...User\n          projectCount\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query searchUsers($query: String!, $after: String, $first: Int = 10) {\n  users: search(query: $query, after: $after, type: USERS, first: $first) @connection(key: \"users\", filter: [\"query\", \"type\"]) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ... on User {\n          ...User\n          projectCount\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.UserFragmentDoc);
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
 *      first: // value for 'first'
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
exports.SimilarProjectsDocument = graphql_tag_1.default(templateObject_65 || (templateObject_65 = __makeTemplateObject(["\n    query similarProjects($id: ID!, $first: Int = 5) {\n  similarProjects(id: $id, first: $first) {\n    edges {\n      cursor\n      node {\n        cover {\n          uri\n        }\n        ...Project\n      }\n    }\n  }\n}\n    ", ""], ["\n    query similarProjects($id: ID!, $first: Int = 5) {\n  similarProjects(id: $id, first: $first) {\n    edges {\n      cursor\n      node {\n        cover {\n          uri\n        }\n        ...Project\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
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
 *      first: // value for 'first'
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
exports.UserDocument = graphql_tag_1.default(templateObject_66 || (templateObject_66 = __makeTemplateObject(["\n    query user($username: LowercaseString!, $after: String, $first: Int = 5) {\n  user(username: $username) {\n    ...User\n    projects: projectsConnection {\n      edges {\n        node {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query user($username: LowercaseString!, $after: String, $first: Int = 5) {\n  user(username: $username) {\n    ...User\n    projects: projectsConnection {\n      edges {\n        node {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n    posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}\n    ", "\n", "\n", ""])), exports.UserFragmentDoc, exports.ProjectFragmentDoc, exports.PostFragmentDoc);
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
 *      first: // value for 'first'
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
exports.UserFollowingProjectsDocument = graphql_tag_1.default(templateObject_67 || (templateObject_67 = __makeTemplateObject(["\n    query userFollowingProjects($username: LowercaseString!, $after: String, $first: Int = 5) {\n  user(username: $username) {\n    id\n    projects: followingProjects(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n}\n    ", ""], ["\n    query userFollowingProjects($username: LowercaseString!, $after: String, $first: Int = 5) {\n  user(username: $username) {\n    id\n    projects: followingProjects(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n}\n    ", ""])), exports.ProjectFragmentDoc);
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
 *      first: // value for 'first'
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
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42, templateObject_43, templateObject_44, templateObject_45, templateObject_46, templateObject_47, templateObject_48, templateObject_49, templateObject_50, templateObject_51, templateObject_52, templateObject_53, templateObject_54, templateObject_55, templateObject_56, templateObject_57, templateObject_58, templateObject_59, templateObject_60, templateObject_61, templateObject_62, templateObject_63, templateObject_64, templateObject_65, templateObject_66, templateObject_67;
//# sourceMappingURL=graphql-hooks.js.map