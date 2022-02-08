"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteCommentMutation = exports.DeleteCommentDocument = exports.useDeleteCollectionMutation = exports.DeleteCollectionDocument = exports.useDeleteBlogPostMutation = exports.DeleteBlogPostDocument = exports.useCollectPostsMutation = exports.CollectPostsDocument = exports.useBookmarkPostMutation = exports.BookmarkPostDocument = exports.useBanUserMutation = exports.BanUserDocument = exports.useAuthenticateGoogleMutation = exports.AuthenticateGoogleDocument = exports.useAuthenticateFacebookMutation = exports.AuthenticateFacebookDocument = exports.useAuthenticateAppleMutation = exports.AuthenticateAppleDocument = exports.useAddProjectMutation = exports.AddProjectDocument = exports.useAddPostMutation = exports.AddPostDocument = exports.useAddCommentMutation = exports.AddCommentDocument = exports.useAddCollectionMutation = exports.AddCollectionDocument = exports.useAddBlogPostMutation = exports.AddBlogPostDocument = exports.UserSettingsFragmentDoc = exports.UserProjectsFragmentDoc = exports.PostFragmentDoc = exports.NotificationFragmentDoc = exports.ProjectFragmentDoc = exports.CommentAndRepliesFragmentDoc = exports.CommentFragmentDoc = exports.CollectionFragmentDoc = exports.BlogPostFragmentDoc = exports.UserFragmentDoc = exports.VehicleTypes = exports.UserRole = exports.UploadType = exports.SortType = exports.SearchType = exports.ReportType = exports.ProjectSortType = exports.PlatformType = exports.NotificationTypes = exports.GrowthType = exports.FileType = exports.CacheControlScope = void 0;
exports.useBlogPostsLazyQuery = exports.useBlogPostsQuery = exports.BlogPostsDocument = exports.useBlogPostLazyQuery = exports.useBlogPostQuery = exports.BlogPostDocument = exports.useTranslatePostMutation = exports.TranslatePostDocument = exports.useTranslateCommentMutation = exports.TranslateCommentDocument = exports.useToggleNotificationSettingsMutation = exports.ToggleNotificationSettingsDocument = exports.useSendPromoMutation = exports.SendPromoDocument = exports.useRegisterDeviceTokenMutation = exports.RegisterDeviceTokenDocument = exports.useRefreshTokenMutation = exports.RefreshTokenDocument = exports.usePreSignUrlsMutation = exports.PreSignUrlsDocument = exports.usePreSignUrlMutation = exports.PreSignUrlDocument = exports.useMarkNotificationSeenMutation = exports.MarkNotificationSeenDocument = exports.useMarkAllNotificationsSeenMutation = exports.MarkAllNotificationsSeenDocument = exports.useLikePostMutation = exports.LikePostDocument = exports.useLikeCommentMutation = exports.LikeCommentDocument = exports.useFollowProjectMutation = exports.FollowProjectDocument = exports.useEditUserMutation = exports.EditUserDocument = exports.useEditProjectMutation = exports.EditProjectDocument = exports.useEditPostMutation = exports.EditPostDocument = exports.useEditCollectionMutation = exports.EditCollectionDocument = exports.useDeleteUserMutation = exports.DeleteUserDocument = exports.useDeleteProjectMutation = exports.DeleteProjectDocument = exports.useDeletePostMutation = exports.DeletePostDocument = exports.useDeleteNotificationMutation = exports.DeleteNotificationDocument = exports.useDeleteCurrentUserMutation = exports.DeleteCurrentUserDocument = void 0;
exports.useNotificationsQuery = exports.NotificationsDocument = exports.useMetaLazyQuery = exports.useMetaQuery = exports.MetaDocument = exports.useLikesLazyQuery = exports.useLikesQuery = exports.LikesDocument = exports.useHashtagLazyQuery = exports.useHashtagQuery = exports.HashtagDocument = exports.useGrowthLazyQuery = exports.useGrowthQuery = exports.GrowthDocument = exports.useFollowersLazyQuery = exports.useFollowersQuery = exports.FollowersDocument = exports.useFilesLazyQuery = exports.useFilesQuery = exports.FilesDocument = exports.useFeedLazyQuery = exports.useFeedQuery = exports.FeedDocument = exports.useCurrentUserSettingsLazyQuery = exports.useCurrentUserSettingsQuery = exports.CurrentUserSettingsDocument = exports.useCurrentUserProjectsLazyQuery = exports.useCurrentUserProjectsQuery = exports.CurrentUserProjectsDocument = exports.useCurrentUserProfileLazyQuery = exports.useCurrentUserProfileQuery = exports.CurrentUserProfileDocument = exports.useCurrentUserFollowingProjectsLazyQuery = exports.useCurrentUserFollowingProjectsQuery = exports.CurrentUserFollowingProjectsDocument = exports.useCurrentUserLazyQuery = exports.useCurrentUserQuery = exports.CurrentUserDocument = exports.useCommentsLazyQuery = exports.useCommentsQuery = exports.CommentsDocument = exports.useCommentLazyQuery = exports.useCommentQuery = exports.CommentDocument = exports.useCollectionsLazyQuery = exports.useCollectionsQuery = exports.CollectionsDocument = exports.useBookmarksLazyQuery = exports.useBookmarksQuery = exports.BookmarksDocument = void 0;
exports.UserFollowingProjectsDocument = exports.useUserLazyQuery = exports.useUserQuery = exports.UserDocument = exports.useUnreadNotificationsLazyQuery = exports.useUnreadNotificationsQuery = exports.UnreadNotificationsDocument = exports.useSimilarProjectsLazyQuery = exports.useSimilarProjectsQuery = exports.SimilarProjectsDocument = exports.useSearchUsersLazyQuery = exports.useSearchUsersQuery = exports.SearchUsersDocument = exports.useSearchProjectsLazyQuery = exports.useSearchProjectsQuery = exports.SearchProjectsDocument = exports.useSearchModelsLazyQuery = exports.useSearchModelsQuery = exports.SearchModelsDocument = exports.useSearchHashtagsLazyQuery = exports.useSearchHashtagsQuery = exports.SearchHashtagsDocument = exports.useRepliesLazyQuery = exports.useRepliesQuery = exports.RepliesDocument = exports.useRecentCommentsLazyQuery = exports.useRecentCommentsQuery = exports.RecentCommentsDocument = exports.useProjectsLazyQuery = exports.useProjectsQuery = exports.ProjectsDocument = exports.useProjectTypesLazyQuery = exports.useProjectTypesQuery = exports.ProjectTypesDocument = exports.useProjectSuggestionsLazyQuery = exports.useProjectSuggestionsQuery = exports.ProjectSuggestionsDocument = exports.useProjectCollectionsLazyQuery = exports.useProjectCollectionsQuery = exports.ProjectCollectionsDocument = exports.useProjectLazyQuery = exports.useProjectQuery = exports.ProjectDocument = exports.usePostsLazyQuery = exports.usePostsQuery = exports.PostsDocument = exports.usePostLazyQuery = exports.usePostQuery = exports.PostDocument = exports.useNotificationsLazyQuery = void 0;
exports.useUserFollowingProjectsLazyQuery = exports.useUserFollowingProjectsQuery = void 0;
var client_1 = require("@apollo/client");
var Apollo = require("@apollo/client");
var defaultOptions = {};
var CacheControlScope;
(function (CacheControlScope) {
    CacheControlScope["Private"] = "PRIVATE";
    CacheControlScope["Public"] = "PUBLIC";
})(CacheControlScope = exports.CacheControlScope || (exports.CacheControlScope = {}));
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
    NotificationTypes["NewCommentLike"] = "NEW_COMMENT_LIKE";
    NotificationTypes["NewFollower"] = "NEW_FOLLOWER";
    NotificationTypes["NewMention"] = "NEW_MENTION";
    NotificationTypes["NewPostLike"] = "NEW_POST_LIKE";
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
var ReportType;
(function (ReportType) {
    ReportType["Comment"] = "COMMENT";
    ReportType["Post"] = "POST";
    ReportType["Project"] = "PROJECT";
    ReportType["User"] = "USER";
})(ReportType = exports.ReportType || (exports.ReportType = {}));
var SearchType;
(function (SearchType) {
    SearchType["Hashtags"] = "HASHTAGS";
    SearchType["Models"] = "MODELS";
    SearchType["Projects"] = "PROJECTS";
    SearchType["Users"] = "USERS";
})(SearchType = exports.SearchType || (exports.SearchType = {}));
var SortType;
(function (SortType) {
    SortType["Random"] = "RANDOM";
    SortType["Recent"] = "RECENT";
})(SortType = exports.SortType || (exports.SortType = {}));
var UploadType;
(function (UploadType) {
    UploadType["Image"] = "IMAGE";
    UploadType["Video"] = "VIDEO";
})(UploadType = exports.UploadType || (exports.UploadType = {}));
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "ADMIN";
    UserRole["User"] = "USER";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var VehicleTypes;
(function (VehicleTypes) {
    VehicleTypes["Car"] = "CAR";
    VehicleTypes["Motorcycle"] = "MOTORCYCLE";
})(VehicleTypes = exports.VehicleTypes || (exports.VehicleTypes = {}));
exports.UserFragmentDoc = (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment User on User {\n    id\n    fullName\n    firstName\n    lastName\n    username\n    avatarUrl\n    isSilhouette\n    isOnline\n    website\n    location\n    bio\n    projectCount\n    dynamicLink\n  }\n"], ["\n  fragment User on User {\n    id\n    fullName\n    firstName\n    lastName\n    username\n    avatarUrl\n    isSilhouette\n    isOnline\n    website\n    location\n    bio\n    projectCount\n    dynamicLink\n  }\n"])));
exports.BlogPostFragmentDoc = (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  fragment BlogPost on BlogPost {\n    id\n    title\n    slug\n    content\n    createdAt\n    user {\n      ...User\n    }\n  }\n  ", "\n"], ["\n  fragment BlogPost on BlogPost {\n    id\n    title\n    slug\n    content\n    createdAt\n    user {\n      ...User\n    }\n  }\n  ", "\n"])), exports.UserFragmentDoc);
exports.CollectionFragmentDoc = (0, client_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  fragment Collection on Collection {\n    id\n    name\n    slug\n    cover {\n      uri\n    }\n  }\n"], ["\n  fragment Collection on Collection {\n    id\n    name\n    slug\n    cover {\n      uri\n    }\n  }\n"])));
exports.CommentFragmentDoc = (0, client_1.gql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  fragment Comment on Comment {\n    id\n    text\n    createdAt\n    permissions {\n      isOwner\n    }\n    likes {\n      isLiked\n      totalCount\n    }\n    translatable\n    user {\n      ...User\n    }\n  }\n  ", "\n"], ["\n  fragment Comment on Comment {\n    id\n    text\n    createdAt\n    permissions {\n      isOwner\n    }\n    likes {\n      isLiked\n      totalCount\n    }\n    translatable\n    user {\n      ...User\n    }\n  }\n  ", "\n"])), exports.UserFragmentDoc);
exports.CommentAndRepliesFragmentDoc = (0, client_1.gql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  fragment CommentAndReplies on Comment {\n    ...Comment\n    replies: repliesConnection(first: 1) {\n      pageInfo {\n        hasNextPage\n      }\n      totalCount\n      edges {\n        cursor\n        node {\n          ...Comment\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  fragment CommentAndReplies on Comment {\n    ...Comment\n    replies: repliesConnection(first: 1) {\n      pageInfo {\n        hasNextPage\n      }\n      totalCount\n      edges {\n        cursor\n        node {\n          ...Comment\n        }\n      }\n    }\n  }\n  ", "\n"])), exports.CommentFragmentDoc);
exports.ProjectFragmentDoc = (0, client_1.gql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  fragment Project on Project {\n    id\n    title\n    slug\n    dynamicLink\n    user {\n      ...User\n    }\n    permissions {\n      isOwner\n      isFollower\n    }\n    type {\n      title\n    }\n    cover {\n      uri\n    }\n    followers: followersConnection(first: 3) {\n      totalCount\n      edges {\n        node {\n          id\n          username\n          avatarUrl\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  fragment Project on Project {\n    id\n    title\n    slug\n    dynamicLink\n    user {\n      ...User\n    }\n    permissions {\n      isOwner\n      isFollower\n    }\n    type {\n      title\n    }\n    cover {\n      uri\n    }\n    followers: followersConnection(first: 3) {\n      totalCount\n      edges {\n        node {\n          id\n          username\n          avatarUrl\n        }\n      }\n    }\n  }\n  ", "\n"])), exports.UserFragmentDoc);
exports.NotificationFragmentDoc = (0, client_1.gql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  fragment Notification on Notification {\n    id\n    type\n    createdAt\n    user {\n      ...User\n    }\n    project {\n      ...Project\n    }\n    post {\n      id\n    }\n    comment {\n      id\n      text\n      postId\n    }\n    files: filesConnection(first: 1) {\n      edges {\n        node {\n          id\n          uri\n          poster\n        }\n      }\n    }\n  }\n  ", "\n  ", "\n"], ["\n  fragment Notification on Notification {\n    id\n    type\n    createdAt\n    user {\n      ...User\n    }\n    project {\n      ...Project\n    }\n    post {\n      id\n    }\n    comment {\n      id\n      text\n      postId\n    }\n    files: filesConnection(first: 1) {\n      edges {\n        node {\n          id\n          uri\n          poster\n        }\n      }\n    }\n  }\n  ", "\n  ", "\n"])), exports.UserFragmentDoc, exports.ProjectFragmentDoc);
exports.PostFragmentDoc = (0, client_1.gql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  fragment Post on Post {\n    id\n    caption\n    createdAt\n    translatable\n    user {\n      ...User\n    }\n    permissions {\n      isOwner\n    }\n    files: filesConnection {\n      edges {\n        node {\n          id\n          type\n          uri\n          poster\n        }\n      }\n    }\n    project {\n      ...Project\n    }\n    likes {\n      isLiked\n      totalCount\n    }\n    bookmarks {\n      isBookmarked\n    }\n    comments: commentsConnection(first: 2) @connection(key: \"comments\") {\n      totalCount\n      edges {\n        node {\n          ...Comment\n        }\n      }\n    }\n    likesConnection(first: 3) @connection(key: \"likes\") {\n      edges {\n        node {\n          id\n          avatarUrl\n        }\n      }\n    }\n    collection {\n      id\n      name\n      slug\n    }\n  }\n  ", "\n  ", "\n  ", "\n"], ["\n  fragment Post on Post {\n    id\n    caption\n    createdAt\n    translatable\n    user {\n      ...User\n    }\n    permissions {\n      isOwner\n    }\n    files: filesConnection {\n      edges {\n        node {\n          id\n          type\n          uri\n          poster\n        }\n      }\n    }\n    project {\n      ...Project\n    }\n    likes {\n      isLiked\n      totalCount\n    }\n    bookmarks {\n      isBookmarked\n    }\n    comments: commentsConnection(first: 2) @connection(key: \"comments\") {\n      totalCount\n      edges {\n        node {\n          ...Comment\n        }\n      }\n    }\n    likesConnection(first: 3) @connection(key: \"likes\") {\n      edges {\n        node {\n          id\n          avatarUrl\n        }\n      }\n    }\n    collection {\n      id\n      name\n      slug\n    }\n  }\n  ", "\n  ", "\n  ", "\n"])), exports.UserFragmentDoc, exports.ProjectFragmentDoc, exports.CommentFragmentDoc);
exports.UserProjectsFragmentDoc = (0, client_1.gql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  fragment UserProjects on User {\n    projects: projectsConnection {\n      edges {\n        node {\n          id\n          title\n          followers: followersConnection {\n            totalCount\n          }\n          files: filesConnection(first: 1) {\n            edges {\n              node {\n                id\n                uri\n                poster\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"], ["\n  fragment UserProjects on User {\n    projects: projectsConnection {\n      edges {\n        node {\n          id\n          title\n          followers: followersConnection {\n            totalCount\n          }\n          files: filesConnection(first: 1) {\n            edges {\n              node {\n                id\n                uri\n                poster\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"])));
exports.UserSettingsFragmentDoc = (0, client_1.gql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  fragment UserSettings on User {\n    id\n    role\n    settings {\n      notifications {\n        types {\n          NEW_FOLLOWER {\n            email\n            push\n          }\n          NEW_COMMENT {\n            email\n            push\n          }\n          NEW_MENTION {\n            email\n            push\n          }\n          NEW_ARTICLE {\n            email\n            push\n          }\n          SIMILAR_PROJECTS {\n            email\n            push\n          }\n          PRODUCT_ANNOUNCEMENTS {\n            email\n            push\n          }\n        }\n      }\n    }\n  }\n"], ["\n  fragment UserSettings on User {\n    id\n    role\n    settings {\n      notifications {\n        types {\n          NEW_FOLLOWER {\n            email\n            push\n          }\n          NEW_COMMENT {\n            email\n            push\n          }\n          NEW_MENTION {\n            email\n            push\n          }\n          NEW_ARTICLE {\n            email\n            push\n          }\n          SIMILAR_PROJECTS {\n            email\n            push\n          }\n          PRODUCT_ANNOUNCEMENTS {\n            email\n            push\n          }\n        }\n      }\n    }\n  }\n"])));
exports.AddBlogPostDocument = (0, client_1.gql)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  mutation addBlogPost($id: ID, $input: BlogPostInput!) {\n    addBlogPost(id: $id, input: $input) {\n      ...BlogPost\n    }\n  }\n  ", "\n"], ["\n  mutation addBlogPost($id: ID, $input: BlogPostInput!) {\n    addBlogPost(id: $id, input: $input) {\n      ...BlogPost\n    }\n  }\n  ", "\n"])), exports.BlogPostFragmentDoc);
/**
 * __useAddBlogPostMutation__
 *
 * To run a mutation, you first call `useAddBlogPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBlogPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBlogPostMutation, { data, loading, error }] = useAddBlogPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
function useAddBlogPostMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.AddBlogPostDocument, options);
}
exports.useAddBlogPostMutation = useAddBlogPostMutation;
exports.AddCollectionDocument = (0, client_1.gql)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  mutation addCollection($projectId: ID!, $name: String!) {\n    addCollection(projectId: $projectId, name: $name) {\n      ...Collection\n    }\n  }\n  ", "\n"], ["\n  mutation addCollection($projectId: ID!, $name: String!) {\n    addCollection(projectId: $projectId, name: $name) {\n      ...Collection\n    }\n  }\n  ", "\n"])), exports.CollectionFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.AddCollectionDocument, options);
}
exports.useAddCollectionMutation = useAddCollectionMutation;
exports.AddCommentDocument = (0, client_1.gql)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {\n    addComment(postId: $postId, commentId: $commentId, input: $input) {\n      ...CommentAndReplies\n    }\n  }\n  ", "\n"], ["\n  mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {\n    addComment(postId: $postId, commentId: $commentId, input: $input) {\n      ...CommentAndReplies\n    }\n  }\n  ", "\n"])), exports.CommentAndRepliesFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.AddCommentDocument, options);
}
exports.useAddCommentMutation = useAddCommentMutation;
exports.AddPostDocument = (0, client_1.gql)(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  mutation addPost($input: PostInput!) {\n    addPost(input: $input) {\n      ...Post\n    }\n  }\n  ", "\n"], ["\n  mutation addPost($input: PostInput!) {\n    addPost(input: $input) {\n      ...Post\n    }\n  }\n  ", "\n"])), exports.PostFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.AddPostDocument, options);
}
exports.useAddPostMutation = useAddPostMutation;
exports.AddProjectDocument = (0, client_1.gql)(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  mutation addProject($input: ProjectInput!) {\n    addProject(input: $input) {\n      ...Project\n    }\n  }\n  ", "\n"], ["\n  mutation addProject($input: ProjectInput!) {\n    addProject(input: $input) {\n      ...Project\n    }\n  }\n  ", "\n"])), exports.ProjectFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.AddProjectDocument, options);
}
exports.useAddProjectMutation = useAddProjectMutation;
exports.AuthenticateAppleDocument = (0, client_1.gql)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  mutation authenticateApple($identityToken: String!, $user: ApplePayload!) {\n    authenticateApple(identityToken: $identityToken, user: $user) {\n      access_token\n      refresh_token\n    }\n  }\n"], ["\n  mutation authenticateApple($identityToken: String!, $user: ApplePayload!) {\n    authenticateApple(identityToken: $identityToken, user: $user) {\n      access_token\n      refresh_token\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.AuthenticateAppleDocument, options);
}
exports.useAuthenticateAppleMutation = useAuthenticateAppleMutation;
exports.AuthenticateFacebookDocument = (0, client_1.gql)(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  mutation authenticateFacebook($token: String!) {\n    authenticateFacebook(token: $token) {\n      access_token\n      refresh_token\n    }\n  }\n"], ["\n  mutation authenticateFacebook($token: String!) {\n    authenticateFacebook(token: $token) {\n      access_token\n      refresh_token\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.AuthenticateFacebookDocument, options);
}
exports.useAuthenticateFacebookMutation = useAuthenticateFacebookMutation;
exports.AuthenticateGoogleDocument = (0, client_1.gql)(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  mutation authenticateGoogle($idToken: String!) {\n    authenticateGoogle(idToken: $idToken) {\n      access_token\n      refresh_token\n    }\n  }\n"], ["\n  mutation authenticateGoogle($idToken: String!) {\n    authenticateGoogle(idToken: $idToken) {\n      access_token\n      refresh_token\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.AuthenticateGoogleDocument, options);
}
exports.useAuthenticateGoogleMutation = useAuthenticateGoogleMutation;
exports.BanUserDocument = (0, client_1.gql)(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  mutation banUser($id: ID!) {\n    banUser(id: $id) {\n      ...User\n    }\n  }\n  ", "\n"], ["\n  mutation banUser($id: ID!) {\n    banUser(id: $id) {\n      ...User\n    }\n  }\n  ", "\n"])), exports.UserFragmentDoc);
/**
 * __useBanUserMutation__
 *
 * To run a mutation, you first call `useBanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banUserMutation, { data, loading, error }] = useBanUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useBanUserMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.BanUserDocument, options);
}
exports.useBanUserMutation = useBanUserMutation;
exports.BookmarkPostDocument = (0, client_1.gql)(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  mutation bookmarkPost($id: ID!) {\n    bookmarkPost(id: $id) {\n      id\n      bookmarks {\n        isBookmarked\n      }\n    }\n  }\n"], ["\n  mutation bookmarkPost($id: ID!) {\n    bookmarkPost(id: $id) {\n      id\n      bookmarks {\n        isBookmarked\n      }\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.BookmarkPostDocument, options);
}
exports.useBookmarkPostMutation = useBookmarkPostMutation;
exports.CollectPostsDocument = (0, client_1.gql)(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  mutation collectPosts($projectId: ID!, $collectionId: ID!, $input: [CollectionInput]) {\n    collectPosts(projectId: $projectId, collectionId: $collectionId, input: $input) {\n      id\n      name\n      cover {\n        uri\n      }\n    }\n  }\n"], ["\n  mutation collectPosts($projectId: ID!, $collectionId: ID!, $input: [CollectionInput]) {\n    collectPosts(projectId: $projectId, collectionId: $collectionId, input: $input) {\n      id\n      name\n      cover {\n        uri\n      }\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CollectPostsDocument, options);
}
exports.useCollectPostsMutation = useCollectPostsMutation;
exports.DeleteBlogPostDocument = (0, client_1.gql)(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  mutation deleteBlogPost($id: ID!) {\n    deleteBlogPost(id: $id) {\n      id\n    }\n  }\n"], ["\n  mutation deleteBlogPost($id: ID!) {\n    deleteBlogPost(id: $id) {\n      id\n    }\n  }\n"])));
/**
 * __useDeleteBlogPostMutation__
 *
 * To run a mutation, you first call `useDeleteBlogPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBlogPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBlogPostMutation, { data, loading, error }] = useDeleteBlogPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useDeleteBlogPostMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteBlogPostDocument, options);
}
exports.useDeleteBlogPostMutation = useDeleteBlogPostMutation;
exports.DeleteCollectionDocument = (0, client_1.gql)(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n  mutation deleteCollection($projectId: ID!, $id: ID!) {\n    deleteCollection(id: $id, projectId: $projectId) {\n      id\n    }\n  }\n"], ["\n  mutation deleteCollection($projectId: ID!, $id: ID!) {\n    deleteCollection(id: $id, projectId: $projectId) {\n      id\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteCollectionDocument, options);
}
exports.useDeleteCollectionMutation = useDeleteCollectionMutation;
exports.DeleteCommentDocument = (0, client_1.gql)(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n  mutation deleteComment($id: ID!) {\n    deleteComment(id: $id)\n  }\n"], ["\n  mutation deleteComment($id: ID!) {\n    deleteComment(id: $id)\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteCommentDocument, options);
}
exports.useDeleteCommentMutation = useDeleteCommentMutation;
exports.DeleteCurrentUserDocument = (0, client_1.gql)(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n  mutation deleteCurrentUser {\n    deleteCurrentUser\n  }\n"], ["\n  mutation deleteCurrentUser {\n    deleteCurrentUser\n  }\n"])));
/**
 * __useDeleteCurrentUserMutation__
 *
 * To run a mutation, you first call `useDeleteCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCurrentUserMutation, { data, loading, error }] = useDeleteCurrentUserMutation({
 *   variables: {
 *   },
 * });
 */
function useDeleteCurrentUserMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteCurrentUserDocument, options);
}
exports.useDeleteCurrentUserMutation = useDeleteCurrentUserMutation;
exports.DeleteNotificationDocument = (0, client_1.gql)(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n  mutation deleteNotification($id: ID!) {\n    deleteNotification(id: $id)\n  }\n"], ["\n  mutation deleteNotification($id: ID!) {\n    deleteNotification(id: $id)\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteNotificationDocument, options);
}
exports.useDeleteNotificationMutation = useDeleteNotificationMutation;
exports.DeletePostDocument = (0, client_1.gql)(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n  mutation deletePost($id: ID!) {\n    deletePost(id: $id) {\n      id\n    }\n  }\n"], ["\n  mutation deletePost($id: ID!) {\n    deletePost(id: $id) {\n      id\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeletePostDocument, options);
}
exports.useDeletePostMutation = useDeletePostMutation;
exports.DeleteProjectDocument = (0, client_1.gql)(templateObject_28 || (templateObject_28 = __makeTemplateObject(["\n  mutation deleteProject($id: ID!) {\n    deleteProject(id: $id)\n  }\n"], ["\n  mutation deleteProject($id: ID!) {\n    deleteProject(id: $id)\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteProjectDocument, options);
}
exports.useDeleteProjectMutation = useDeleteProjectMutation;
exports.DeleteUserDocument = (0, client_1.gql)(templateObject_29 || (templateObject_29 = __makeTemplateObject(["\n  mutation deleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n"], ["\n  mutation deleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n"])));
/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
function useDeleteUserMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteUserDocument, options);
}
exports.useDeleteUserMutation = useDeleteUserMutation;
exports.EditCollectionDocument = (0, client_1.gql)(templateObject_30 || (templateObject_30 = __makeTemplateObject(["\n  mutation editCollection($input: EditCollectionInput!, $id: ID!) {\n    editCollection(input: $input, id: $id) {\n      ...Collection\n    }\n  }\n  ", "\n"], ["\n  mutation editCollection($input: EditCollectionInput!, $id: ID!) {\n    editCollection(input: $input, id: $id) {\n      ...Collection\n    }\n  }\n  ", "\n"])), exports.CollectionFragmentDoc);
/**
 * __useEditCollectionMutation__
 *
 * To run a mutation, you first call `useEditCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCollectionMutation, { data, loading, error }] = useEditCollectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
function useEditCollectionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.EditCollectionDocument, options);
}
exports.useEditCollectionMutation = useEditCollectionMutation;
exports.EditPostDocument = (0, client_1.gql)(templateObject_31 || (templateObject_31 = __makeTemplateObject(["\n  mutation editPost($id: ID!, $input: EditPostInput!) {\n    editPost(id: $id, input: $input) {\n      ...Post\n    }\n  }\n  ", "\n"], ["\n  mutation editPost($id: ID!, $input: EditPostInput!) {\n    editPost(id: $id, input: $input) {\n      ...Post\n    }\n  }\n  ", "\n"])), exports.PostFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.EditPostDocument, options);
}
exports.useEditPostMutation = useEditPostMutation;
exports.EditProjectDocument = (0, client_1.gql)(templateObject_32 || (templateObject_32 = __makeTemplateObject(["\n  mutation editProject($id: ID!, $input: ProjectInput!) {\n    editProject(id: $id, input: $input) {\n      id\n      title\n    }\n  }\n"], ["\n  mutation editProject($id: ID!, $input: ProjectInput!) {\n    editProject(id: $id, input: $input) {\n      id\n      title\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.EditProjectDocument, options);
}
exports.useEditProjectMutation = useEditProjectMutation;
exports.EditUserDocument = (0, client_1.gql)(templateObject_33 || (templateObject_33 = __makeTemplateObject(["\n  mutation editUser($input: EditUserInput!, $id: ID) {\n    editUser(input: $input, id: $id) {\n      ...User\n    }\n  }\n  ", "\n"], ["\n  mutation editUser($input: EditUserInput!, $id: ID) {\n    editUser(input: $input, id: $id) {\n      ...User\n    }\n  }\n  ", "\n"])), exports.UserFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.EditUserDocument, options);
}
exports.useEditUserMutation = useEditUserMutation;
exports.FollowProjectDocument = (0, client_1.gql)(templateObject_34 || (templateObject_34 = __makeTemplateObject(["\n  mutation followProject($id: ID!) {\n    followProject(id: $id) {\n      cover {\n        uri\n        default\n      }\n      ...Project\n    }\n  }\n  ", "\n"], ["\n  mutation followProject($id: ID!) {\n    followProject(id: $id) {\n      cover {\n        uri\n        default\n      }\n      ...Project\n    }\n  }\n  ", "\n"])), exports.ProjectFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.FollowProjectDocument, options);
}
exports.useFollowProjectMutation = useFollowProjectMutation;
exports.LikeCommentDocument = (0, client_1.gql)(templateObject_35 || (templateObject_35 = __makeTemplateObject(["\n  mutation likeComment($id: ID!) {\n    likeComment(id: $id) {\n      id\n      likes {\n        isLiked\n        totalCount\n      }\n    }\n  }\n"], ["\n  mutation likeComment($id: ID!) {\n    likeComment(id: $id) {\n      id\n      likes {\n        isLiked\n        totalCount\n      }\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LikeCommentDocument, options);
}
exports.useLikeCommentMutation = useLikeCommentMutation;
exports.LikePostDocument = (0, client_1.gql)(templateObject_36 || (templateObject_36 = __makeTemplateObject(["\n  mutation likePost($id: ID!) {\n    likePost(id: $id) {\n      id\n      likes {\n        isLiked\n        totalCount\n      }\n    }\n  }\n"], ["\n  mutation likePost($id: ID!) {\n    likePost(id: $id) {\n      id\n      likes {\n        isLiked\n        totalCount\n      }\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LikePostDocument, options);
}
exports.useLikePostMutation = useLikePostMutation;
exports.MarkAllNotificationsSeenDocument = (0, client_1.gql)(templateObject_37 || (templateObject_37 = __makeTemplateObject(["\n  mutation markAllNotificationsSeen {\n    markAllNotificationsSeen\n  }\n"], ["\n  mutation markAllNotificationsSeen {\n    markAllNotificationsSeen\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MarkAllNotificationsSeenDocument, options);
}
exports.useMarkAllNotificationsSeenMutation = useMarkAllNotificationsSeenMutation;
exports.MarkNotificationSeenDocument = (0, client_1.gql)(templateObject_38 || (templateObject_38 = __makeTemplateObject(["\n  mutation markNotificationSeen($id: ID!) {\n    markNotificationSeen(id: $id) {\n      ...Notification\n    }\n  }\n  ", "\n"], ["\n  mutation markNotificationSeen($id: ID!) {\n    markNotificationSeen(id: $id) {\n      ...Notification\n    }\n  }\n  ", "\n"])), exports.NotificationFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MarkNotificationSeenDocument, options);
}
exports.useMarkNotificationSeenMutation = useMarkNotificationSeenMutation;
exports.PreSignUrlDocument = (0, client_1.gql)(templateObject_39 || (templateObject_39 = __makeTemplateObject(["\n  mutation preSignUrl($input: PreSignedUrlInput!) {\n    preSignUrl(input: $input) {\n      url\n      type\n      filename\n    }\n  }\n"], ["\n  mutation preSignUrl($input: PreSignedUrlInput!) {\n    preSignUrl(input: $input) {\n      url\n      type\n      filename\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.PreSignUrlDocument, options);
}
exports.usePreSignUrlMutation = usePreSignUrlMutation;
exports.PreSignUrlsDocument = (0, client_1.gql)(templateObject_40 || (templateObject_40 = __makeTemplateObject(["\n  mutation preSignUrls($input: [PreSignedUrlnput]!) {\n    preSignUrls(input: $input) {\n      url\n      type\n      filename\n    }\n  }\n"], ["\n  mutation preSignUrls($input: [PreSignedUrlnput]!) {\n    preSignUrls(input: $input) {\n      url\n      type\n      filename\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.PreSignUrlsDocument, options);
}
exports.usePreSignUrlsMutation = usePreSignUrlsMutation;
exports.RefreshTokenDocument = (0, client_1.gql)(templateObject_41 || (templateObject_41 = __makeTemplateObject(["\n  mutation refreshToken($refreshToken: String!) {\n    token: refreshToken(refreshToken: $refreshToken) {\n      access_token\n    }\n  }\n"], ["\n  mutation refreshToken($refreshToken: String!) {\n    token: refreshToken(refreshToken: $refreshToken) {\n      access_token\n    }\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.RefreshTokenDocument, options);
}
exports.useRefreshTokenMutation = useRefreshTokenMutation;
exports.RegisterDeviceTokenDocument = (0, client_1.gql)(templateObject_42 || (templateObject_42 = __makeTemplateObject(["\n  mutation registerDeviceToken($token: String!, $platform: PlatformType!) {\n    registerDeviceToken(token: $token, platform: $platform)\n  }\n"], ["\n  mutation registerDeviceToken($token: String!, $platform: PlatformType!) {\n    registerDeviceToken(token: $token, platform: $platform)\n  }\n"])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.RegisterDeviceTokenDocument, options);
}
exports.useRegisterDeviceTokenMutation = useRegisterDeviceTokenMutation;
exports.SendPromoDocument = (0, client_1.gql)(templateObject_43 || (templateObject_43 = __makeTemplateObject(["\n  mutation sendPromo($number: String!) {\n    sendPromo(number: $number)\n  }\n"], ["\n  mutation sendPromo($number: String!) {\n    sendPromo(number: $number)\n  }\n"])));
/**
 * __useSendPromoMutation__
 *
 * To run a mutation, you first call `useSendPromoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPromoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPromoMutation, { data, loading, error }] = useSendPromoMutation({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
function useSendPromoMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.SendPromoDocument, options);
}
exports.useSendPromoMutation = useSendPromoMutation;
exports.ToggleNotificationSettingsDocument = (0, client_1.gql)(templateObject_44 || (templateObject_44 = __makeTemplateObject(["\n  mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {\n    toggleNotificationSettings(input: $input) {\n      ...UserSettings\n    }\n  }\n  ", "\n"], ["\n  mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {\n    toggleNotificationSettings(input: $input) {\n      ...UserSettings\n    }\n  }\n  ", "\n"])), exports.UserSettingsFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.ToggleNotificationSettingsDocument, options);
}
exports.useToggleNotificationSettingsMutation = useToggleNotificationSettingsMutation;
exports.TranslateCommentDocument = (0, client_1.gql)(templateObject_45 || (templateObject_45 = __makeTemplateObject(["\n  mutation translateComment($id: ID!, $original: Boolean) {\n    translateComment(id: $id, original: $original) {\n      id\n      translatable\n      text\n    }\n  }\n"], ["\n  mutation translateComment($id: ID!, $original: Boolean) {\n    translateComment(id: $id, original: $original) {\n      id\n      translatable\n      text\n    }\n  }\n"])));
/**
 * __useTranslateCommentMutation__
 *
 * To run a mutation, you first call `useTranslateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTranslateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [translateCommentMutation, { data, loading, error }] = useTranslateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      original: // value for 'original'
 *   },
 * });
 */
function useTranslateCommentMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.TranslateCommentDocument, options);
}
exports.useTranslateCommentMutation = useTranslateCommentMutation;
exports.TranslatePostDocument = (0, client_1.gql)(templateObject_46 || (templateObject_46 = __makeTemplateObject(["\n  mutation translatePost($id: ID!, $original: Boolean) {\n    translatePost(id: $id, original: $original) {\n      id\n      translatable\n      caption\n    }\n  }\n"], ["\n  mutation translatePost($id: ID!, $original: Boolean) {\n    translatePost(id: $id, original: $original) {\n      id\n      translatable\n      caption\n    }\n  }\n"])));
/**
 * __useTranslatePostMutation__
 *
 * To run a mutation, you first call `useTranslatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTranslatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [translatePostMutation, { data, loading, error }] = useTranslatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      original: // value for 'original'
 *   },
 * });
 */
function useTranslatePostMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.TranslatePostDocument, options);
}
exports.useTranslatePostMutation = useTranslatePostMutation;
exports.BlogPostDocument = (0, client_1.gql)(templateObject_47 || (templateObject_47 = __makeTemplateObject(["\n  query blogPost($slug: LowercaseString, $id: ID) {\n    blogPost(slug: $slug, id: $id) {\n      ...BlogPost\n    }\n  }\n  ", "\n"], ["\n  query blogPost($slug: LowercaseString, $id: ID) {\n    blogPost(slug: $slug, id: $id) {\n      ...BlogPost\n    }\n  }\n  ", "\n"
    /**
     * __useBlogPostQuery__
     *
     * To run a query within a React component, call `useBlogPostQuery` and pass it any options that fit your needs.
     * When your component renders, `useBlogPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
     * you can use to render your UI.
     *
     * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
     *
     * @example
     * const { data, loading, error } = useBlogPostQuery({
     *   variables: {
     *      slug: // value for 'slug'
     *      id: // value for 'id'
     *   },
     * });
     */
])), exports.BlogPostFragmentDoc);
/**
 * __useBlogPostQuery__
 *
 * To run a query within a React component, call `useBlogPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogPostQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      id: // value for 'id'
 *   },
 * });
 */
function useBlogPostQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.BlogPostDocument, options);
}
exports.useBlogPostQuery = useBlogPostQuery;
function useBlogPostLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.BlogPostDocument, options);
}
exports.useBlogPostLazyQuery = useBlogPostLazyQuery;
exports.BlogPostsDocument = (0, client_1.gql)(templateObject_48 || (templateObject_48 = __makeTemplateObject(["\n  query blogPosts($after: String, $first: Int = 5) @connection(key: \"blogPosts\") {\n    blogPosts(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...BlogPost\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query blogPosts($after: String, $first: Int = 5) @connection(key: \"blogPosts\") {\n    blogPosts(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...BlogPost\n        }\n      }\n    }\n  }\n  ", "\n"
    /**
     * __useBlogPostsQuery__
     *
     * To run a query within a React component, call `useBlogPostsQuery` and pass it any options that fit your needs.
     * When your component renders, `useBlogPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
     * you can use to render your UI.
     *
     * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
     *
     * @example
     * const { data, loading, error } = useBlogPostsQuery({
     *   variables: {
     *      after: // value for 'after'
     *      first: // value for 'first'
     *   },
     * });
     */
])), exports.BlogPostFragmentDoc);
/**
 * __useBlogPostsQuery__
 *
 * To run a query within a React component, call `useBlogPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogPostsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useBlogPostsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.BlogPostsDocument, options);
}
exports.useBlogPostsQuery = useBlogPostsQuery;
function useBlogPostsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.BlogPostsDocument, options);
}
exports.useBlogPostsLazyQuery = useBlogPostsLazyQuery;
exports.BookmarksDocument = (0, client_1.gql)(templateObject_49 || (templateObject_49 = __makeTemplateObject(["\n  query bookmarks($after: String, $first: Int = 5) @connection(key: \"bookmarks\") {\n    bookmarks(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query bookmarks($after: String, $first: Int = 5) @connection(key: \"bookmarks\") {\n    bookmarks(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.PostFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.BookmarksDocument, options);
}
exports.useBookmarksQuery = useBookmarksQuery;
function useBookmarksLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.BookmarksDocument, options);
}
exports.useBookmarksLazyQuery = useBookmarksLazyQuery;
exports.CollectionsDocument = (0, client_1.gql)(templateObject_50 || (templateObject_50 = __makeTemplateObject(["\n  query collections(\n    $id: ID\n    $slug: LowercaseString\n    $projectId: ID\n    $projectSlug: LowercaseString\n    $after: String\n    $first: Int = 5\n  ) @connection(key: \"collections\") {\n    collections(\n      id: $id\n      slug: $slug\n      projectId: $projectId\n      projectSlug: $projectSlug\n      after: $after\n      first: $first\n    ) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query collections(\n    $id: ID\n    $slug: LowercaseString\n    $projectId: ID\n    $projectSlug: LowercaseString\n    $after: String\n    $first: Int = 5\n  ) @connection(key: \"collections\") {\n    collections(\n      id: $id\n      slug: $slug\n      projectId: $projectId\n      projectSlug: $projectSlug\n      after: $after\n      first: $first\n    ) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n  ", "\n"
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
     *      slug: // value for 'slug'
     *      projectId: // value for 'projectId'
     *      projectSlug: // value for 'projectSlug'
     *      after: // value for 'after'
     *      first: // value for 'first'
     *   },
     * });
     */
])), exports.PostFragmentDoc);
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
 *      slug: // value for 'slug'
 *      projectId: // value for 'projectId'
 *      projectSlug: // value for 'projectSlug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useCollectionsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.CollectionsDocument, options);
}
exports.useCollectionsQuery = useCollectionsQuery;
function useCollectionsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.CollectionsDocument, options);
}
exports.useCollectionsLazyQuery = useCollectionsLazyQuery;
exports.CommentDocument = (0, client_1.gql)(templateObject_51 || (templateObject_51 = __makeTemplateObject(["\n  query comment($id: ID!) {\n    comment(id: $id) {\n      ...Comment\n    }\n  }\n  ", "\n"], ["\n  query comment($id: ID!) {\n    comment(id: $id) {\n      ...Comment\n    }\n  }\n  ", "\n"
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
])), exports.CommentFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.CommentDocument, options);
}
exports.useCommentQuery = useCommentQuery;
function useCommentLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.CommentDocument, options);
}
exports.useCommentLazyQuery = useCommentLazyQuery;
exports.CommentsDocument = (0, client_1.gql)(templateObject_52 || (templateObject_52 = __makeTemplateObject(["\n  query comments($postId: ID!, $after: String) {\n    post(id: $postId) {\n      ...Post\n    }\n    comments(postId: $postId, after: $after) @connection(key: \"comments\", filter: [\"postId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...CommentAndReplies\n        }\n      }\n    }\n  }\n  ", "\n  ", "\n"], ["\n  query comments($postId: ID!, $after: String) {\n    post(id: $postId) {\n      ...Post\n    }\n    comments(postId: $postId, after: $after) @connection(key: \"comments\", filter: [\"postId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...CommentAndReplies\n        }\n      }\n    }\n  }\n  ", "\n  ", "\n"
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
])), exports.PostFragmentDoc, exports.CommentAndRepliesFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.CommentsDocument, options);
}
exports.useCommentsQuery = useCommentsQuery;
function useCommentsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.CommentsDocument, options);
}
exports.useCommentsLazyQuery = useCommentsLazyQuery;
exports.CurrentUserDocument = (0, client_1.gql)(templateObject_53 || (templateObject_53 = __makeTemplateObject(["\n  query currentUser {\n    user: currentUser {\n      avatarUrl\n      bio\n      dynamicLink\n      firstName\n      fullName\n      id\n      isOnline\n      isSilhouette\n      lastName\n      location\n      projectCount\n      username\n      website\n      role\n      settings {\n        timezone\n        locale\n      }\n      interestedIn {\n        id\n        title\n      }\n      ...UserProjects\n    }\n  }\n  ", "\n"], ["\n  query currentUser {\n    user: currentUser {\n      avatarUrl\n      bio\n      dynamicLink\n      firstName\n      fullName\n      id\n      isOnline\n      isSilhouette\n      lastName\n      location\n      projectCount\n      username\n      website\n      role\n      settings {\n        timezone\n        locale\n      }\n      interestedIn {\n        id\n        title\n      }\n      ...UserProjects\n    }\n  }\n  ", "\n"
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
])), exports.UserProjectsFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.CurrentUserDocument, options);
}
exports.useCurrentUserQuery = useCurrentUserQuery;
function useCurrentUserLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.CurrentUserDocument, options);
}
exports.useCurrentUserLazyQuery = useCurrentUserLazyQuery;
exports.CurrentUserFollowingProjectsDocument = (0, client_1.gql)(templateObject_54 || (templateObject_54 = __makeTemplateObject(["\n  query currentUserFollowingProjects($after: String, $first: Int = 5) {\n    user: currentUser {\n      id\n      projects: followingProjects(after: $after, first: $first) {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ...Project\n            cover {\n              uri\n              default\n            }\n          }\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query currentUserFollowingProjects($after: String, $first: Int = 5) {\n    user: currentUser {\n      id\n      projects: followingProjects(after: $after, first: $first) {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ...Project\n            cover {\n              uri\n              default\n            }\n          }\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.ProjectFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.CurrentUserFollowingProjectsDocument, options);
}
exports.useCurrentUserFollowingProjectsQuery = useCurrentUserFollowingProjectsQuery;
function useCurrentUserFollowingProjectsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.CurrentUserFollowingProjectsDocument, options);
}
exports.useCurrentUserFollowingProjectsLazyQuery = useCurrentUserFollowingProjectsLazyQuery;
exports.CurrentUserProfileDocument = (0, client_1.gql)(templateObject_55 || (templateObject_55 = __makeTemplateObject(["\n  query currentUserProfile($after: String, $first: Int = 5) {\n    user: currentUser {\n      ...User\n      projects: projectsConnection {\n        edges {\n          node {\n            ...Project\n            cover {\n              uri\n              default\n            }\n          }\n        }\n      }\n      posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n        edges {\n          cursor\n          node {\n            ...Post\n          }\n        }\n        pageInfo {\n          hasNextPage\n        }\n      }\n    }\n  }\n  ", "\n  ", "\n  ", "\n"], ["\n  query currentUserProfile($after: String, $first: Int = 5) {\n    user: currentUser {\n      ...User\n      projects: projectsConnection {\n        edges {\n          node {\n            ...Project\n            cover {\n              uri\n              default\n            }\n          }\n        }\n      }\n      posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n        edges {\n          cursor\n          node {\n            ...Post\n          }\n        }\n        pageInfo {\n          hasNextPage\n        }\n      }\n    }\n  }\n  ", "\n  ", "\n  ", "\n"
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
])), exports.UserFragmentDoc, exports.ProjectFragmentDoc, exports.PostFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.CurrentUserProfileDocument, options);
}
exports.useCurrentUserProfileQuery = useCurrentUserProfileQuery;
function useCurrentUserProfileLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.CurrentUserProfileDocument, options);
}
exports.useCurrentUserProfileLazyQuery = useCurrentUserProfileLazyQuery;
exports.CurrentUserProjectsDocument = (0, client_1.gql)(templateObject_56 || (templateObject_56 = __makeTemplateObject(["\n  query currentUserProjects {\n    user: currentUser {\n      ...UserProjects\n    }\n  }\n  ", "\n"], ["\n  query currentUserProjects {\n    user: currentUser {\n      ...UserProjects\n    }\n  }\n  ", "\n"
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
])), exports.UserProjectsFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.CurrentUserProjectsDocument, options);
}
exports.useCurrentUserProjectsQuery = useCurrentUserProjectsQuery;
function useCurrentUserProjectsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.CurrentUserProjectsDocument, options);
}
exports.useCurrentUserProjectsLazyQuery = useCurrentUserProjectsLazyQuery;
exports.CurrentUserSettingsDocument = (0, client_1.gql)(templateObject_57 || (templateObject_57 = __makeTemplateObject(["\n  query currentUserSettings {\n    user: currentUser {\n      ...UserSettings\n    }\n  }\n  ", "\n"], ["\n  query currentUserSettings {\n    user: currentUser {\n      ...UserSettings\n    }\n  }\n  ", "\n"
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
])), exports.UserSettingsFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.CurrentUserSettingsDocument, options);
}
exports.useCurrentUserSettingsQuery = useCurrentUserSettingsQuery;
function useCurrentUserSettingsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.CurrentUserSettingsDocument, options);
}
exports.useCurrentUserSettingsLazyQuery = useCurrentUserSettingsLazyQuery;
exports.FeedDocument = (0, client_1.gql)(templateObject_58 || (templateObject_58 = __makeTemplateObject(["\n  query feed($after: String, $first: Int = 5) {\n    feed {\n      posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ...Post\n          }\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query feed($after: String, $first: Int = 5) {\n    feed {\n      posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ...Post\n          }\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.PostFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.FeedDocument, options);
}
exports.useFeedQuery = useFeedQuery;
function useFeedLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.FeedDocument, options);
}
exports.useFeedLazyQuery = useFeedLazyQuery;
exports.FilesDocument = (0, client_1.gql)(templateObject_59 || (templateObject_59 = __makeTemplateObject(["\n  query files($after: String, $first: Int = 10) @connection(key: \"files\") {\n    files(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          id\n          uri\n          postId\n        }\n      }\n    }\n  }\n"], ["\n  query files($after: String, $first: Int = 10) @connection(key: \"files\") {\n    files(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          id\n          uri\n          postId\n        }\n      }\n    }\n  }\n"
    /**
     * __useFilesQuery__
     *
     * To run a query within a React component, call `useFilesQuery` and pass it any options that fit your needs.
     * When your component renders, `useFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
     * you can use to render your UI.
     *
     * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
     *
     * @example
     * const { data, loading, error } = useFilesQuery({
     *   variables: {
     *      after: // value for 'after'
     *      first: // value for 'first'
     *   },
     * });
     */
])));
/**
 * __useFilesQuery__
 *
 * To run a query within a React component, call `useFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useFilesQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.FilesDocument, options);
}
exports.useFilesQuery = useFilesQuery;
function useFilesLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.FilesDocument, options);
}
exports.useFilesLazyQuery = useFilesLazyQuery;
exports.FollowersDocument = (0, client_1.gql)(templateObject_60 || (templateObject_60 = __makeTemplateObject(["\n  query followers($projectId: ID!, $after: String, $first: Int = 10) {\n    followers(projectId: $projectId, after: $after, first: $first)\n      @connection(key: \"followers\", filter: [\"projectId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...User\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query followers($projectId: ID!, $after: String, $first: Int = 10) {\n    followers(projectId: $projectId, after: $after, first: $first)\n      @connection(key: \"followers\", filter: [\"projectId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...User\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.UserFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.FollowersDocument, options);
}
exports.useFollowersQuery = useFollowersQuery;
function useFollowersLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.FollowersDocument, options);
}
exports.useFollowersLazyQuery = useFollowersLazyQuery;
exports.GrowthDocument = (0, client_1.gql)(templateObject_61 || (templateObject_61 = __makeTemplateObject(["\n  query growth($type: GrowthType!) {\n    growth(type: $type) {\n      date\n      count\n    }\n  }\n"], ["\n  query growth($type: GrowthType!) {\n    growth(type: $type) {\n      date\n      count\n    }\n  }\n"
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
])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GrowthDocument, options);
}
exports.useGrowthQuery = useGrowthQuery;
function useGrowthLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GrowthDocument, options);
}
exports.useGrowthLazyQuery = useGrowthLazyQuery;
exports.HashtagDocument = (0, client_1.gql)(templateObject_62 || (templateObject_62 = __makeTemplateObject(["\n  query hashtag($id: ID, $slug: LowercaseString, $name: String, $after: String, $first: Int = 5) {\n    hashtag(id: $id, slug: $slug, name: $name) {\n      posts: postsConnection(first: $first, after: $after) @connection(key: \"posts\") {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ...Post\n          }\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query hashtag($id: ID, $slug: LowercaseString, $name: String, $after: String, $first: Int = 5) {\n    hashtag(id: $id, slug: $slug, name: $name) {\n      posts: postsConnection(first: $first, after: $after) @connection(key: \"posts\") {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ...Post\n          }\n        }\n      }\n    }\n  }\n  ", "\n"
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
     *      name: // value for 'name'
     *      after: // value for 'after'
     *      first: // value for 'first'
     *   },
     * });
     */
])), exports.PostFragmentDoc);
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
 *      name: // value for 'name'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useHashtagQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.HashtagDocument, options);
}
exports.useHashtagQuery = useHashtagQuery;
function useHashtagLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.HashtagDocument, options);
}
exports.useHashtagLazyQuery = useHashtagLazyQuery;
exports.LikesDocument = (0, client_1.gql)(templateObject_63 || (templateObject_63 = __makeTemplateObject(["\n  query likes($postId: ID!, $after: String, $first: Int = 10) {\n    likes(postId: $postId, first: $first, after: $after)\n      @connection(key: \"comments\", filter: [\"postId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...User\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query likes($postId: ID!, $after: String, $first: Int = 10) {\n    likes(postId: $postId, first: $first, after: $after)\n      @connection(key: \"comments\", filter: [\"postId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...User\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.UserFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.LikesDocument, options);
}
exports.useLikesQuery = useLikesQuery;
function useLikesLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.LikesDocument, options);
}
exports.useLikesLazyQuery = useLikesLazyQuery;
exports.MetaDocument = (0, client_1.gql)(templateObject_64 || (templateObject_64 = __makeTemplateObject(["\n  query meta {\n    meta {\n      totalUsers\n      totalUsersToday\n      totalPostsToday\n      totalProjectsToday\n      totalCommentsToday\n      totalFilesToday\n      totalComments\n      totalProjects\n      totalPosts\n      totalFiles\n    }\n  }\n"], ["\n  query meta {\n    meta {\n      totalUsers\n      totalUsersToday\n      totalPostsToday\n      totalProjectsToday\n      totalCommentsToday\n      totalFilesToday\n      totalComments\n      totalProjects\n      totalPosts\n      totalFiles\n    }\n  }\n"
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
])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.MetaDocument, options);
}
exports.useMetaQuery = useMetaQuery;
function useMetaLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.MetaDocument, options);
}
exports.useMetaLazyQuery = useMetaLazyQuery;
exports.NotificationsDocument = (0, client_1.gql)(templateObject_65 || (templateObject_65 = __makeTemplateObject(["\n  query notifications($after: String, $first: Int = 10) {\n    notifications(after: $after, first: $first) @connection(key: \"notifications\") {\n      unreadCount\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Notification\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query notifications($after: String, $first: Int = 10) {\n    notifications(after: $after, first: $first) @connection(key: \"notifications\") {\n      unreadCount\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Notification\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.NotificationFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.NotificationsDocument, options);
}
exports.useNotificationsQuery = useNotificationsQuery;
function useNotificationsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.NotificationsDocument, options);
}
exports.useNotificationsLazyQuery = useNotificationsLazyQuery;
exports.PostDocument = (0, client_1.gql)(templateObject_66 || (templateObject_66 = __makeTemplateObject(["\n  query post($id: ID!) {\n    post(id: $id) {\n      ...Post\n    }\n  }\n  ", "\n"], ["\n  query post($id: ID!) {\n    post(id: $id) {\n      ...Post\n    }\n  }\n  ", "\n"
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
])), exports.PostFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.PostDocument, options);
}
exports.usePostQuery = usePostQuery;
function usePostLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.PostDocument, options);
}
exports.usePostLazyQuery = usePostLazyQuery;
exports.PostsDocument = (0, client_1.gql)(templateObject_67 || (templateObject_67 = __makeTemplateObject(["\n  query posts($after: String, $first: Int = 5) @connection(key: \"posts\") {\n    posts(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query posts($after: String, $first: Int = 5) @connection(key: \"posts\") {\n    posts(after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Post\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.PostFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.PostsDocument, options);
}
exports.usePostsQuery = usePostsQuery;
function usePostsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.PostsDocument, options);
}
exports.usePostsLazyQuery = usePostsLazyQuery;
exports.ProjectDocument = (0, client_1.gql)(templateObject_68 || (templateObject_68 = __makeTemplateObject(["\n  query project($id: ID, $slug: LowercaseString, $after: String, $postId: ID, $first: Int = 5) {\n    post(id: $postId) {\n      ...Post\n    }\n    project(id: $id, slug: $slug) {\n      ...Project\n      posts: postsConnection(first: $first, after: $after) @connection(key: \"posts\") {\n        totalCount\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ...Post\n          }\n        }\n      }\n    }\n  }\n  ", "\n  ", "\n"], ["\n  query project($id: ID, $slug: LowercaseString, $after: String, $postId: ID, $first: Int = 5) {\n    post(id: $postId) {\n      ...Post\n    }\n    project(id: $id, slug: $slug) {\n      ...Project\n      posts: postsConnection(first: $first, after: $after) @connection(key: \"posts\") {\n        totalCount\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ...Post\n          }\n        }\n      }\n    }\n  }\n  ", "\n  ", "\n"
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
])), exports.PostFragmentDoc, exports.ProjectFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.ProjectDocument, options);
}
exports.useProjectQuery = useProjectQuery;
function useProjectLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.ProjectDocument, options);
}
exports.useProjectLazyQuery = useProjectLazyQuery;
exports.ProjectCollectionsDocument = (0, client_1.gql)(templateObject_69 || (templateObject_69 = __makeTemplateObject(["\n  query projectCollections(\n    $projectId: ID\n    $projectSlug: LowercaseString\n    $slug: LowercaseString\n    $after: String\n    $first: Int = 10\n  ) {\n    projectCollections(\n      projectId: $projectId\n      projectSlug: $projectSlug\n      slug: $slug\n      first: $first\n      after: $after\n    ) @connection(key: \"collections\", filter: [\"projectId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Collection\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query projectCollections(\n    $projectId: ID\n    $projectSlug: LowercaseString\n    $slug: LowercaseString\n    $after: String\n    $first: Int = 10\n  ) {\n    projectCollections(\n      projectId: $projectId\n      projectSlug: $projectSlug\n      slug: $slug\n      first: $first\n      after: $after\n    ) @connection(key: \"collections\", filter: [\"projectId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...Collection\n        }\n      }\n    }\n  }\n  ", "\n"
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
     *      projectSlug: // value for 'projectSlug'
     *      slug: // value for 'slug'
     *      after: // value for 'after'
     *      first: // value for 'first'
     *   },
     * });
     */
])), exports.CollectionFragmentDoc);
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
 *      projectSlug: // value for 'projectSlug'
 *      slug: // value for 'slug'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
function useProjectCollectionsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.ProjectCollectionsDocument, options);
}
exports.useProjectCollectionsQuery = useProjectCollectionsQuery;
function useProjectCollectionsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.ProjectCollectionsDocument, options);
}
exports.useProjectCollectionsLazyQuery = useProjectCollectionsLazyQuery;
exports.ProjectSuggestionsDocument = (0, client_1.gql)(templateObject_70 || (templateObject_70 = __makeTemplateObject(["\n  query projectSuggestions($after: String, $first: Int = 5) {\n    projects: projectSuggestions(after: $after, first: $first) @connection(key: \"projects\") {\n      type {\n        id\n        title\n      }\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        node {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query projectSuggestions($after: String, $first: Int = 5) {\n    projects: projectSuggestions(after: $after, first: $first) @connection(key: \"projects\") {\n      type {\n        id\n        title\n      }\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        node {\n          ...Project\n          cover {\n            uri\n            default\n          }\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.ProjectFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.ProjectSuggestionsDocument, options);
}
exports.useProjectSuggestionsQuery = useProjectSuggestionsQuery;
function useProjectSuggestionsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.ProjectSuggestionsDocument, options);
}
exports.useProjectSuggestionsLazyQuery = useProjectSuggestionsLazyQuery;
exports.ProjectTypesDocument = (0, client_1.gql)(templateObject_71 || (templateObject_71 = __makeTemplateObject(["\n  query projectTypes {\n    types: projectTypes {\n      id\n      title\n      imageUrl\n    }\n  }\n"], ["\n  query projectTypes {\n    types: projectTypes {\n      id\n      title\n      imageUrl\n    }\n  }\n"
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
])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.ProjectTypesDocument, options);
}
exports.useProjectTypesQuery = useProjectTypesQuery;
function useProjectTypesLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.ProjectTypesDocument, options);
}
exports.useProjectTypesLazyQuery = useProjectTypesLazyQuery;
exports.ProjectsDocument = (0, client_1.gql)(templateObject_72 || (templateObject_72 = __makeTemplateObject(["\n  query projects($typeId: ID, $after: String, $first: Int = 5, $type: ProjectSortType!) {\n    projects(typeId: $typeId, after: $after, first: $first, type: $type)\n      @connection(key: \"projects\", filter: [\"type\", \"typeId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          cover {\n            uri\n            default\n          }\n          ...Project\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query projects($typeId: ID, $after: String, $first: Int = 5, $type: ProjectSortType!) {\n    projects(typeId: $typeId, after: $after, first: $first, type: $type)\n      @connection(key: \"projects\", filter: [\"type\", \"typeId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          cover {\n            uri\n            default\n          }\n          ...Project\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.ProjectFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.ProjectsDocument, options);
}
exports.useProjectsQuery = useProjectsQuery;
function useProjectsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.ProjectsDocument, options);
}
exports.useProjectsLazyQuery = useProjectsLazyQuery;
exports.RecentCommentsDocument = (0, client_1.gql)(templateObject_73 || (templateObject_73 = __makeTemplateObject(["\n  query recentComments($after: String) {\n    comments: recentComments(after: $after) @connection(key: \"comments\", filter: [\"postId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...CommentAndReplies\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query recentComments($after: String) {\n    comments: recentComments(after: $after) @connection(key: \"comments\", filter: [\"postId\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ...CommentAndReplies\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.CommentAndRepliesFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.RecentCommentsDocument, options);
}
exports.useRecentCommentsQuery = useRecentCommentsQuery;
function useRecentCommentsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.RecentCommentsDocument, options);
}
exports.useRecentCommentsLazyQuery = useRecentCommentsLazyQuery;
exports.RepliesDocument = (0, client_1.gql)(templateObject_74 || (templateObject_74 = __makeTemplateObject(["\n  query replies($id: ID!, $after: String, $first: Int = 5) {\n    comment(id: $id) {\n      replies: repliesConnection(after: $after, first: $first) {\n        pageInfo {\n          hasNextPage\n        }\n        totalCount\n        edges {\n          cursor\n          node {\n            ...Comment\n          }\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query replies($id: ID!, $after: String, $first: Int = 5) {\n    comment(id: $id) {\n      replies: repliesConnection(after: $after, first: $first) {\n        pageInfo {\n          hasNextPage\n        }\n        totalCount\n        edges {\n          cursor\n          node {\n            ...Comment\n          }\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.CommentFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.RepliesDocument, options);
}
exports.useRepliesQuery = useRepliesQuery;
function useRepliesLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.RepliesDocument, options);
}
exports.useRepliesLazyQuery = useRepliesLazyQuery;
exports.SearchHashtagsDocument = (0, client_1.gql)(templateObject_75 || (templateObject_75 = __makeTemplateObject(["\n  query searchHashtags($query: String!, $after: String, $first: Int = 10) {\n    hashtags: search(query: $query, after: $after, type: HASHTAGS, first: $first)\n      @connection(key: \"hashtags\", filter: [\"query\", \"type\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ... on Hashtag {\n            id\n            name\n            slug\n            totalCount\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query searchHashtags($query: String!, $after: String, $first: Int = 10) {\n    hashtags: search(query: $query, after: $after, type: HASHTAGS, first: $first)\n      @connection(key: \"hashtags\", filter: [\"query\", \"type\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ... on Hashtag {\n            id\n            name\n            slug\n            totalCount\n          }\n        }\n      }\n    }\n  }\n"
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
])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.SearchHashtagsDocument, options);
}
exports.useSearchHashtagsQuery = useSearchHashtagsQuery;
function useSearchHashtagsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.SearchHashtagsDocument, options);
}
exports.useSearchHashtagsLazyQuery = useSearchHashtagsLazyQuery;
exports.SearchModelsDocument = (0, client_1.gql)(templateObject_76 || (templateObject_76 = __makeTemplateObject(["\n  query searchModels($query: String!, $after: String, $first: Int = 20) {\n    models: search(query: $query, after: $after, type: MODELS, first: $first)\n      @connection(key: \"models\", filter: [\"query\", \"type\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ... on Model {\n            id\n            brand {\n              name\n            }\n            model\n            year\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query searchModels($query: String!, $after: String, $first: Int = 20) {\n    models: search(query: $query, after: $after, type: MODELS, first: $first)\n      @connection(key: \"models\", filter: [\"query\", \"type\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ... on Model {\n            id\n            brand {\n              name\n            }\n            model\n            year\n          }\n        }\n      }\n    }\n  }\n"
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
])));
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.SearchModelsDocument, options);
}
exports.useSearchModelsQuery = useSearchModelsQuery;
function useSearchModelsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.SearchModelsDocument, options);
}
exports.useSearchModelsLazyQuery = useSearchModelsLazyQuery;
exports.SearchProjectsDocument = (0, client_1.gql)(templateObject_77 || (templateObject_77 = __makeTemplateObject(["\n  query searchProjects($query: String!, $after: String, $first: Int = 10) {\n    projects: search(query: $query, after: $after, type: PROJECTS, first: $first)\n      @connection(key: \"projects\", filter: [\"query\", \"type\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ... on Project {\n            ...Project\n            cover {\n              uri\n              default\n            }\n          }\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query searchProjects($query: String!, $after: String, $first: Int = 10) {\n    projects: search(query: $query, after: $after, type: PROJECTS, first: $first)\n      @connection(key: \"projects\", filter: [\"query\", \"type\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ... on Project {\n            ...Project\n            cover {\n              uri\n              default\n            }\n          }\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.ProjectFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.SearchProjectsDocument, options);
}
exports.useSearchProjectsQuery = useSearchProjectsQuery;
function useSearchProjectsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.SearchProjectsDocument, options);
}
exports.useSearchProjectsLazyQuery = useSearchProjectsLazyQuery;
exports.SearchUsersDocument = (0, client_1.gql)(templateObject_78 || (templateObject_78 = __makeTemplateObject(["\n  query searchUsers($query: String!, $after: String, $first: Int = 10) {\n    users: search(query: $query, after: $after, type: USERS, first: $first)\n      @connection(key: \"users\", filter: [\"query\", \"type\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ... on User {\n            ...User\n            projectCount\n          }\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query searchUsers($query: String!, $after: String, $first: Int = 10) {\n    users: search(query: $query, after: $after, type: USERS, first: $first)\n      @connection(key: \"users\", filter: [\"query\", \"type\"]) {\n      pageInfo {\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          ... on User {\n            ...User\n            projectCount\n          }\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.UserFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.SearchUsersDocument, options);
}
exports.useSearchUsersQuery = useSearchUsersQuery;
function useSearchUsersLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.SearchUsersDocument, options);
}
exports.useSearchUsersLazyQuery = useSearchUsersLazyQuery;
exports.SimilarProjectsDocument = (0, client_1.gql)(templateObject_79 || (templateObject_79 = __makeTemplateObject(["\n  query similarProjects($id: ID!, $first: Int = 5) {\n    similarProjects(id: $id, first: $first) {\n      edges {\n        cursor\n        node {\n          cover {\n            uri\n          }\n          ...Project\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query similarProjects($id: ID!, $first: Int = 5) {\n    similarProjects(id: $id, first: $first) {\n      edges {\n        cursor\n        node {\n          cover {\n            uri\n          }\n          ...Project\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.ProjectFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.SimilarProjectsDocument, options);
}
exports.useSimilarProjectsQuery = useSimilarProjectsQuery;
function useSimilarProjectsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.SimilarProjectsDocument, options);
}
exports.useSimilarProjectsLazyQuery = useSimilarProjectsLazyQuery;
exports.UnreadNotificationsDocument = (0, client_1.gql)(templateObject_80 || (templateObject_80 = __makeTemplateObject(["\n  query unreadNotifications {\n    notifications {\n      unreadCount\n    }\n  }\n"], ["\n  query unreadNotifications {\n    notifications {\n      unreadCount\n    }\n  }\n"
    /**
     * __useUnreadNotificationsQuery__
     *
     * To run a query within a React component, call `useUnreadNotificationsQuery` and pass it any options that fit your needs.
     * When your component renders, `useUnreadNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
     * you can use to render your UI.
     *
     * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
     *
     * @example
     * const { data, loading, error } = useUnreadNotificationsQuery({
     *   variables: {
     *   },
     * });
     */
])));
/**
 * __useUnreadNotificationsQuery__
 *
 * To run a query within a React component, call `useUnreadNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnreadNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnreadNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
function useUnreadNotificationsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.UnreadNotificationsDocument, options);
}
exports.useUnreadNotificationsQuery = useUnreadNotificationsQuery;
function useUnreadNotificationsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.UnreadNotificationsDocument, options);
}
exports.useUnreadNotificationsLazyQuery = useUnreadNotificationsLazyQuery;
exports.UserDocument = (0, client_1.gql)(templateObject_81 || (templateObject_81 = __makeTemplateObject(["\n  query user($username: LowercaseString!, $after: String, $first: Int = 5) {\n    user(username: $username) {\n      ...User\n      projects: projectsConnection {\n        edges {\n          node {\n            ...Project\n            cover {\n              uri\n              default\n            }\n          }\n        }\n      }\n      posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n        edges {\n          cursor\n          node {\n            ...Post\n          }\n        }\n        pageInfo {\n          hasNextPage\n        }\n      }\n    }\n  }\n  ", "\n  ", "\n  ", "\n"], ["\n  query user($username: LowercaseString!, $after: String, $first: Int = 5) {\n    user(username: $username) {\n      ...User\n      projects: projectsConnection {\n        edges {\n          node {\n            ...Project\n            cover {\n              uri\n              default\n            }\n          }\n        }\n      }\n      posts: postsConnection(after: $after, first: $first) @connection(key: \"posts\") {\n        edges {\n          cursor\n          node {\n            ...Post\n          }\n        }\n        pageInfo {\n          hasNextPage\n        }\n      }\n    }\n  }\n  ", "\n  ", "\n  ", "\n"
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
])), exports.UserFragmentDoc, exports.ProjectFragmentDoc, exports.PostFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.UserDocument, options);
}
exports.useUserQuery = useUserQuery;
function useUserLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.UserDocument, options);
}
exports.useUserLazyQuery = useUserLazyQuery;
exports.UserFollowingProjectsDocument = (0, client_1.gql)(templateObject_82 || (templateObject_82 = __makeTemplateObject(["\n  query userFollowingProjects($username: LowercaseString!, $after: String, $first: Int = 5) {\n    user(username: $username) {\n      id\n      projects: followingProjects(after: $after, first: $first) {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ...Project\n            cover {\n              uri\n              default\n            }\n          }\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query userFollowingProjects($username: LowercaseString!, $after: String, $first: Int = 5) {\n    user(username: $username) {\n      id\n      projects: followingProjects(after: $after, first: $first) {\n        pageInfo {\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ...Project\n            cover {\n              uri\n              default\n            }\n          }\n        }\n      }\n    }\n  }\n  ", "\n"
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
])), exports.ProjectFragmentDoc);
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
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.UserFollowingProjectsDocument, options);
}
exports.useUserFollowingProjectsQuery = useUserFollowingProjectsQuery;
function useUserFollowingProjectsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.UserFollowingProjectsDocument, options);
}
exports.useUserFollowingProjectsLazyQuery = useUserFollowingProjectsLazyQuery;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42, templateObject_43, templateObject_44, templateObject_45, templateObject_46, templateObject_47, templateObject_48, templateObject_49, templateObject_50, templateObject_51, templateObject_52, templateObject_53, templateObject_54, templateObject_55, templateObject_56, templateObject_57, templateObject_58, templateObject_59, templateObject_60, templateObject_61, templateObject_62, templateObject_63, templateObject_64, templateObject_65, templateObject_66, templateObject_67, templateObject_68, templateObject_69, templateObject_70, templateObject_71, templateObject_72, templateObject_73, templateObject_74, templateObject_75, templateObject_76, templateObject_77, templateObject_78, templateObject_79, templateObject_80, templateObject_81, templateObject_82;
//# sourceMappingURL=graphql-hooks.js.map