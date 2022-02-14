import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** Date custom scalar type */
    Date: any;
    /** Returns all strings in lower case */
    LowercaseString: any;
};
export declare type AccessToken = {
    __typename?: 'AccessToken';
    access_token?: Maybe<Scalars['String']>;
};
export declare type ApplePayload = {
    firstName?: InputMaybe<Scalars['String']>;
    lastName?: InputMaybe<Scalars['String']>;
};
export declare type BlogPost = {
    __typename?: 'BlogPost';
    content?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Date']>;
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['Date']>;
    user?: Maybe<User>;
};
export declare type BlogPostConnection = {
    __typename?: 'BlogPostConnection';
    edges?: Maybe<Array<BlogPostEdge>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type BlogPostEdge = {
    __typename?: 'BlogPostEdge';
    cursor: Scalars['String'];
    node: BlogPost;
};
export declare type BlogPostInput = {
    content: Scalars['String'];
    title: Scalars['String'];
};
export declare type BookmarkConnection = {
    __typename?: 'BookmarkConnection';
    edges?: Maybe<Array<BookmarkEdge>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type BookmarkEdge = {
    __typename?: 'BookmarkEdge';
    cursor: Scalars['String'];
    node: Post;
};
export declare type Bookmarks = {
    __typename?: 'Bookmarks';
    isBookmarked?: Maybe<Scalars['Boolean']>;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type Brand = {
    __typename?: 'Brand';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
};
export declare enum CacheControlScope {
    Private = "PRIVATE",
    Public = "PUBLIC"
}
export declare type Collection = {
    __typename?: 'Collection';
    cover?: Maybe<CoverType>;
    createdAt?: Maybe<Scalars['Date']>;
    id?: Maybe<Scalars['ID']>;
    name?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['Date']>;
};
export declare type CollectionConnection = {
    __typename?: 'CollectionConnection';
    edges?: Maybe<Array<CollectionEdge>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type CollectionEdge = {
    __typename?: 'CollectionEdge';
    cursor: Scalars['String'];
    node: Collection;
};
export declare type CollectionInput = {
    postId: Scalars['ID'];
};
export declare type Comment = {
    __typename?: 'Comment';
    commentId?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['Date']>;
    id?: Maybe<Scalars['ID']>;
    language?: Maybe<Scalars['String']>;
    likes?: Maybe<Likes>;
    permissions?: Maybe<CommentPermissions>;
    postId?: Maybe<Scalars['ID']>;
    repliesConnection?: Maybe<CommentConnection>;
    text: Scalars['String'];
    translatable?: Maybe<Scalars['Boolean']>;
    updatedAt?: Maybe<Scalars['Date']>;
    user?: Maybe<User>;
};
export declare type CommentRepliesConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type CommentConnection = {
    __typename?: 'CommentConnection';
    edges?: Maybe<Array<CommentEdge>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type CommentEdge = {
    __typename?: 'CommentEdge';
    cursor: Scalars['String'];
    node: Comment;
};
export declare type CommentInput = {
    text: Scalars['String'];
};
export declare type CommentPermissions = {
    __typename?: 'CommentPermissions';
    isOwner?: Maybe<Scalars['Boolean']>;
};
export declare type CoverType = {
    __typename?: 'CoverType';
    default?: Maybe<Scalars['Boolean']>;
    uri?: Maybe<Scalars['String']>;
};
export declare type EditCollectionInput = {
    name?: InputMaybe<Scalars['String']>;
};
export declare type EditPostInput = {
    caption?: InputMaybe<Scalars['String']>;
    collectionId?: InputMaybe<Scalars['ID']>;
    files?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type EditUserInput = {
    avatarUrl?: InputMaybe<Scalars['String']>;
    bio?: InputMaybe<Scalars['String']>;
    firstName?: InputMaybe<Scalars['String']>;
    interestedIn?: InputMaybe<Array<InputMaybe<ProjectTypeInput>>>;
    lastName?: InputMaybe<Scalars['String']>;
    locale?: InputMaybe<Scalars['String']>;
    location?: InputMaybe<Scalars['String']>;
    timezone?: InputMaybe<Scalars['String']>;
    username?: InputMaybe<Scalars['String']>;
    website?: InputMaybe<Scalars['String']>;
};
export declare type Feed = {
    __typename?: 'Feed';
    postsConnection?: Maybe<PostConnection>;
};
export declare type FeedPostsConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type File = {
    __typename?: 'File';
    createdAt?: Maybe<Scalars['Date']>;
    id?: Maybe<Scalars['ID']>;
    postId?: Maybe<Scalars['ID']>;
    poster?: Maybe<Scalars['String']>;
    type?: Maybe<FileType>;
    updatedAt?: Maybe<Scalars['Date']>;
    uri: Scalars['String'];
};
export declare type FileConnection = {
    __typename?: 'FileConnection';
    edges?: Maybe<Array<Maybe<FileEdge>>>;
    pageInfo: PageInfo;
};
export declare type FileEdge = {
    __typename?: 'FileEdge';
    cursor: Scalars['String'];
    node: File;
};
export declare type FileInput = {
    filename: Scalars['String'];
    poster?: InputMaybe<Scalars['String']>;
};
export declare enum FileType {
    Image = "IMAGE",
    Video = "VIDEO"
}
export declare type FollowersConnection = {
    __typename?: 'FollowersConnection';
    edges?: Maybe<Array<FollowersEdge>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type FollowersEdge = {
    __typename?: 'FollowersEdge';
    cursor: Scalars['String'];
    node: User;
};
export declare type GrowthData = {
    __typename?: 'GrowthData';
    count?: Maybe<Scalars['Int']>;
    date?: Maybe<Scalars['Date']>;
};
export declare enum GrowthType {
    Projects = "PROJECTS",
    Users = "USERS"
}
export declare type Hashtag = {
    __typename?: 'Hashtag';
    createdAt?: Maybe<Scalars['Date']>;
    id?: Maybe<Scalars['ID']>;
    name?: Maybe<Scalars['String']>;
    postsConnection?: Maybe<PostConnection>;
    slug?: Maybe<Scalars['LowercaseString']>;
    totalCount?: Maybe<Scalars['Int']>;
    updatedAt?: Maybe<Scalars['Date']>;
};
export declare type HashtagPostsConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type HashtagConnection = {
    __typename?: 'HashtagConnection';
    edges?: Maybe<Array<HashtagEdge>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type HashtagEdge = {
    __typename?: 'HashtagEdge';
    cursor: Scalars['String'];
    node: Hashtag;
};
export declare type LikeConnection = {
    __typename?: 'LikeConnection';
    edges?: Maybe<Array<LikeEdge>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type LikeEdge = {
    __typename?: 'LikeEdge';
    cursor: Scalars['String'];
    node: User;
};
export declare type Likes = {
    __typename?: 'Likes';
    isLiked?: Maybe<Scalars['Boolean']>;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type Meta = {
    __typename?: 'Meta';
    isAdmin?: Maybe<Scalars['Boolean']>;
    totalComments?: Maybe<Scalars['Int']>;
    totalCommentsToday?: Maybe<Scalars['Int']>;
    totalFiles?: Maybe<Scalars['Int']>;
    totalFilesToday?: Maybe<Scalars['Int']>;
    totalPosts?: Maybe<Scalars['Int']>;
    totalPostsToday?: Maybe<Scalars['Int']>;
    totalProjects?: Maybe<Scalars['Int']>;
    totalProjectsToday?: Maybe<Scalars['Int']>;
    totalUsers?: Maybe<Scalars['Int']>;
    totalUsersToday?: Maybe<Scalars['Int']>;
};
export declare type Model = {
    __typename?: 'Model';
    brand?: Maybe<Brand>;
    id: Scalars['ID'];
    model?: Maybe<Scalars['String']>;
    year?: Maybe<Scalars['Int']>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    addBlogPost?: Maybe<BlogPost>;
    addCollection?: Maybe<Collection>;
    addComment?: Maybe<Comment>;
    addPost?: Maybe<Post>;
    addProject?: Maybe<Project>;
    authenticateApple?: Maybe<Tokens>;
    authenticateFacebook?: Maybe<Tokens>;
    authenticateGoogle?: Maybe<Tokens>;
    banUser?: Maybe<User>;
    bookmarkPost?: Maybe<Post>;
    collectPosts?: Maybe<Collection>;
    deleteBlogPost?: Maybe<BlogPost>;
    deleteCollection?: Maybe<Collection>;
    deleteComment?: Maybe<Scalars['Boolean']>;
    deleteCurrentUser?: Maybe<Scalars['Boolean']>;
    deleteNotification?: Maybe<Scalars['Boolean']>;
    deletePost?: Maybe<Post>;
    deleteProject?: Maybe<Scalars['Boolean']>;
    deleteUser?: Maybe<Scalars['Boolean']>;
    dummy?: Maybe<Scalars['String']>;
    editCollection?: Maybe<Collection>;
    editComment?: Maybe<Comment>;
    editPost?: Maybe<Post>;
    editProject?: Maybe<Project>;
    editUser?: Maybe<User>;
    followProject?: Maybe<Project>;
    likeComment?: Maybe<Comment>;
    likePost?: Maybe<Post>;
    markAllNotificationsSeen?: Maybe<Scalars['Boolean']>;
    markNotificationSeen?: Maybe<Notification>;
    preSignUrl?: Maybe<PreSignedUrl>;
    preSignUrls?: Maybe<Array<Maybe<PreSignedUrl>>>;
    refreshToken?: Maybe<AccessToken>;
    registerDeviceToken?: Maybe<Scalars['Boolean']>;
    report?: Maybe<Scalars['Boolean']>;
    sendPromo?: Maybe<Scalars['Boolean']>;
    toggleNotificationSettings?: Maybe<User>;
    translateComment?: Maybe<Comment>;
    translatePost?: Maybe<Post>;
};
export declare type MutationAddBlogPostArgs = {
    id?: InputMaybe<Scalars['ID']>;
    input: BlogPostInput;
};
export declare type MutationAddCollectionArgs = {
    name: Scalars['String'];
    projectId: Scalars['ID'];
};
export declare type MutationAddCommentArgs = {
    commentId?: InputMaybe<Scalars['ID']>;
    input: CommentInput;
    postId: Scalars['ID'];
};
export declare type MutationAddPostArgs = {
    input: PostInput;
};
export declare type MutationAddProjectArgs = {
    input: ProjectInput;
};
export declare type MutationAuthenticateAppleArgs = {
    identityToken: Scalars['String'];
    user: ApplePayload;
};
export declare type MutationAuthenticateFacebookArgs = {
    token: Scalars['String'];
};
export declare type MutationAuthenticateGoogleArgs = {
    idToken: Scalars['String'];
};
export declare type MutationBanUserArgs = {
    id: Scalars['ID'];
};
export declare type MutationBookmarkPostArgs = {
    id: Scalars['ID'];
};
export declare type MutationCollectPostsArgs = {
    collectionId: Scalars['ID'];
    input?: InputMaybe<Array<InputMaybe<CollectionInput>>>;
    projectId: Scalars['ID'];
};
export declare type MutationDeleteBlogPostArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCollectionArgs = {
    id: Scalars['ID'];
    projectId: Scalars['ID'];
};
export declare type MutationDeleteCommentArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteNotificationArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePostArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteProjectArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteUserArgs = {
    id: Scalars['ID'];
};
export declare type MutationEditCollectionArgs = {
    id: Scalars['ID'];
    input: EditCollectionInput;
};
export declare type MutationEditCommentArgs = {
    id: Scalars['ID'];
    input: CommentInput;
};
export declare type MutationEditPostArgs = {
    id: Scalars['ID'];
    input: EditPostInput;
};
export declare type MutationEditProjectArgs = {
    id: Scalars['ID'];
    input: ProjectInput;
};
export declare type MutationEditUserArgs = {
    id?: InputMaybe<Scalars['ID']>;
    input: EditUserInput;
};
export declare type MutationFollowProjectArgs = {
    id: Scalars['ID'];
};
export declare type MutationLikeCommentArgs = {
    id: Scalars['ID'];
};
export declare type MutationLikePostArgs = {
    id: Scalars['ID'];
};
export declare type MutationMarkNotificationSeenArgs = {
    id: Scalars['ID'];
};
export declare type MutationPreSignUrlArgs = {
    input: PreSignedUrlInput;
};
export declare type MutationPreSignUrlsArgs = {
    input?: InputMaybe<Array<InputMaybe<PreSignedUrlnput>>>;
};
export declare type MutationRefreshTokenArgs = {
    refreshToken: Scalars['String'];
};
export declare type MutationRegisterDeviceTokenArgs = {
    platform: PlatformType;
    token: Scalars['String'];
};
export declare type MutationReportArgs = {
    id: Scalars['ID'];
    type: ReportType;
};
export declare type MutationSendPromoArgs = {
    number: Scalars['String'];
};
export declare type MutationToggleNotificationSettingsArgs = {
    input?: InputMaybe<ToggleNotificationSettingsInput>;
};
export declare type MutationTranslateCommentArgs = {
    id: Scalars['ID'];
    original?: InputMaybe<Scalars['Boolean']>;
};
export declare type MutationTranslatePostArgs = {
    id: Scalars['ID'];
    original?: InputMaybe<Scalars['Boolean']>;
};
export declare type Notification = {
    __typename?: 'Notification';
    comment?: Maybe<Comment>;
    createdAt: Scalars['Date'];
    filesConnection?: Maybe<FileConnection>;
    id: Scalars['ID'];
    isSeen: Scalars['Boolean'];
    post?: Maybe<Post>;
    project?: Maybe<Project>;
    type?: Maybe<NotificationTypes>;
    updatedAt: Scalars['Date'];
    user: User;
};
export declare type NotificationFilesConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    reverse?: InputMaybe<Scalars['Boolean']>;
    type?: InputMaybe<FileType>;
};
export declare type NotificationEdge = {
    __typename?: 'NotificationEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<Notification>;
};
export declare type NotificationKindSettings = {
    __typename?: 'NotificationKindSettings';
    email?: Maybe<Scalars['Boolean']>;
    push?: Maybe<Scalars['Boolean']>;
};
export declare type NotificationSettingsType = {
    __typename?: 'NotificationSettingsType';
    NEW_ARTICLE?: Maybe<NotificationKindSettings>;
    NEW_COMMENT?: Maybe<NotificationKindSettings>;
    NEW_FOLLOWER?: Maybe<NotificationKindSettings>;
    NEW_MENTION?: Maybe<NotificationKindSettings>;
    PRODUCT_ANNOUNCEMENTS?: Maybe<NotificationKindSettings>;
    SIMILAR_PROJECTS?: Maybe<NotificationKindSettings>;
};
export declare enum NotificationTypes {
    NewComment = "NEW_COMMENT",
    NewCommentLike = "NEW_COMMENT_LIKE",
    NewFollower = "NEW_FOLLOWER",
    NewMention = "NEW_MENTION",
    NewPostLike = "NEW_POST_LIKE",
    NewReply = "NEW_REPLY"
}
export declare type NotificationsConnection = {
    __typename?: 'NotificationsConnection';
    edges?: Maybe<Array<Maybe<NotificationEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    unreadCount?: Maybe<Scalars['Int']>;
};
export declare type PageInfo = {
    __typename?: 'PageInfo';
    hasNextPage?: Maybe<Scalars['Boolean']>;
    hasPreviousPage?: Maybe<Scalars['Boolean']>;
};
export declare enum PlatformType {
    Mobile = "MOBILE",
    Web = "WEB"
}
export declare type Post = {
    __typename?: 'Post';
    bookmarks?: Maybe<Bookmarks>;
    caption?: Maybe<Scalars['String']>;
    collection?: Maybe<Collection>;
    commentsConnection?: Maybe<CommentConnection>;
    createdAt?: Maybe<Scalars['Date']>;
    filesConnection?: Maybe<FileConnection>;
    id?: Maybe<Scalars['ID']>;
    language?: Maybe<Scalars['String']>;
    likes?: Maybe<Likes>;
    likesConnection?: Maybe<LikeConnection>;
    permissions?: Maybe<PostPermissions>;
    postPermissions?: Maybe<PostPermissions>;
    project?: Maybe<Project>;
    translatable?: Maybe<Scalars['Boolean']>;
    updatedAt?: Maybe<Scalars['Date']>;
    user?: Maybe<User>;
};
export declare type PostCommentsConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type PostFilesConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    reverse?: InputMaybe<Scalars['Boolean']>;
    type?: InputMaybe<FileType>;
};
export declare type PostLikesConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type PostConnection = {
    __typename?: 'PostConnection';
    edges?: Maybe<Array<PostEdge>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type PostEdge = {
    __typename?: 'PostEdge';
    cursor: Scalars['String'];
    node: Post;
};
export declare type PostInput = {
    caption?: InputMaybe<Scalars['String']>;
    collectionId?: InputMaybe<Scalars['ID']>;
    files: Array<InputMaybe<FileInput>>;
    projectId: Scalars['ID'];
};
export declare type PostPermissions = {
    __typename?: 'PostPermissions';
    isOwner?: Maybe<Scalars['Boolean']>;
};
export declare type PreSignedUrl = {
    __typename?: 'PreSignedUrl';
    filename?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['ID']>;
    type?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
};
export declare type PreSignedUrlInput = {
    path: Scalars['String'];
    type: UploadType;
};
export declare type PreSignedUrlnput = {
    type: UploadType;
};
export declare type Project = {
    __typename?: 'Project';
    collectionsConnection?: Maybe<CollectionConnection>;
    commentsDisabled?: Maybe<Scalars['Boolean']>;
    cover?: Maybe<CoverType>;
    createdAt?: Maybe<Scalars['Date']>;
    dynamicLink?: Maybe<Scalars['String']>;
    filesConnection?: Maybe<FileConnection>;
    followersConnection?: Maybe<FollowersConnection>;
    id?: Maybe<Scalars['ID']>;
    model?: Maybe<Model>;
    permissions?: Maybe<ProjectPermissions>;
    postsConnection?: Maybe<PostConnection>;
    projectPermissions?: Maybe<ProjectPermissions>;
    slug?: Maybe<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
    type?: Maybe<ProjectType>;
    updatedAt?: Maybe<Scalars['Date']>;
    user?: Maybe<User>;
};
export declare type ProjectCollectionsConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type ProjectFilesConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    reverse?: InputMaybe<Scalars['Boolean']>;
    type?: InputMaybe<FileType>;
};
export declare type ProjectFollowersConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type ProjectPostsConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type ProjectEdge = {
    __typename?: 'ProjectEdge';
    cursor: Scalars['String'];
    node: Project;
};
export declare type ProjectInput = {
    commentsDisabled?: InputMaybe<Scalars['Boolean']>;
    modelId?: InputMaybe<Scalars['ID']>;
    projectTypeId?: InputMaybe<Scalars['ID']>;
    title?: InputMaybe<Scalars['String']>;
};
export declare type ProjectPermissions = {
    __typename?: 'ProjectPermissions';
    isFollower?: Maybe<Scalars['Boolean']>;
    isOwner?: Maybe<Scalars['Boolean']>;
};
export declare enum ProjectSortType {
    Popular = "POPULAR",
    Recent = "RECENT"
}
export declare type ProjectSuggestionsConnection = {
    __typename?: 'ProjectSuggestionsConnection';
    edges?: Maybe<Array<ProjectEdge>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
    type?: Maybe<ProjectType>;
};
export declare type ProjectType = {
    __typename?: 'ProjectType';
    id?: Maybe<Scalars['ID']>;
    imageUrl: Scalars['String'];
    slug?: Maybe<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
    type?: Maybe<VehicleTypes>;
};
export declare type ProjectTypeInput = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type ProjectsConnection = {
    __typename?: 'ProjectsConnection';
    edges?: Maybe<Array<ProjectEdge>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type Query = {
    __typename?: 'Query';
    blogPost?: Maybe<BlogPost>;
    blogPosts?: Maybe<BlogPostConnection>;
    bookmarks?: Maybe<BookmarkConnection>;
    collections?: Maybe<PostConnection>;
    comment?: Maybe<Comment>;
    comments?: Maybe<CommentConnection>;
    currentUser?: Maybe<User>;
    dummy?: Maybe<Scalars['String']>;
    feed?: Maybe<Feed>;
    files?: Maybe<FileConnection>;
    followers?: Maybe<FollowersConnection>;
    growth?: Maybe<Array<Maybe<GrowthData>>>;
    hashtag?: Maybe<Hashtag>;
    likes?: Maybe<LikeConnection>;
    meta?: Maybe<Meta>;
    notifications?: Maybe<NotificationsConnection>;
    post?: Maybe<Post>;
    posts?: Maybe<PostConnection>;
    project?: Maybe<Project>;
    projectCollections?: Maybe<CollectionConnection>;
    projectSuggestions?: Maybe<Array<Maybe<ProjectSuggestionsConnection>>>;
    projectTypes?: Maybe<Array<Maybe<ProjectType>>>;
    projects?: Maybe<ProjectsConnection>;
    recentComments?: Maybe<CommentConnection>;
    search?: Maybe<SearchResults>;
    similarProjects?: Maybe<ProjectsConnection>;
    unreadNotifications?: Maybe<Scalars['Int']>;
    user?: Maybe<User>;
    users?: Maybe<UserConnection>;
};
export declare type QueryBlogPostArgs = {
    id?: InputMaybe<Scalars['ID']>;
    slug?: InputMaybe<Scalars['LowercaseString']>;
};
export declare type QueryBlogPostsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type QueryBookmarksArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type QueryCollectionsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    id?: InputMaybe<Scalars['ID']>;
    last?: InputMaybe<Scalars['Int']>;
    projectId?: InputMaybe<Scalars['ID']>;
    projectSlug?: InputMaybe<Scalars['LowercaseString']>;
    slug?: InputMaybe<Scalars['LowercaseString']>;
};
export declare type QueryCommentArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    id: Scalars['ID'];
    last?: InputMaybe<Scalars['Int']>;
};
export declare type QueryCommentsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
    postId: Scalars['ID'];
};
export declare type QueryCurrentUserArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type QueryFilesArgs = {
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<SortType>;
    type?: InputMaybe<FileType>;
};
export declare type QueryFollowersArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
    projectId: Scalars['ID'];
};
export declare type QueryGrowthArgs = {
    endDate?: InputMaybe<Scalars['Date']>;
    startDate?: InputMaybe<Scalars['Date']>;
    type: GrowthType;
};
export declare type QueryHashtagArgs = {
    id?: InputMaybe<Scalars['ID']>;
    name?: InputMaybe<Scalars['String']>;
    slug?: InputMaybe<Scalars['LowercaseString']>;
};
export declare type QueryLikesArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
    postId: Scalars['ID'];
};
export declare type QueryNotificationsArgs = {
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
};
export declare type QueryPostArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryPostsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type QueryProjectArgs = {
    id?: InputMaybe<Scalars['ID']>;
    slug?: InputMaybe<Scalars['LowercaseString']>;
};
export declare type QueryProjectCollectionsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
    projectId?: InputMaybe<Scalars['ID']>;
    projectSlug?: InputMaybe<Scalars['LowercaseString']>;
    slug?: InputMaybe<Scalars['LowercaseString']>;
};
export declare type QueryProjectSuggestionsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type QueryProjectTypesArgs = {
    type?: InputMaybe<VehicleTypes>;
};
export declare type QueryProjectsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
    type: ProjectSortType;
    typeId?: InputMaybe<Scalars['ID']>;
};
export declare type QueryRecentCommentsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type QuerySearchArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
    query: Scalars['String'];
    type: SearchType;
    vehicleType?: InputMaybe<VehicleTypes>;
};
export declare type QuerySimilarProjectsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    id: Scalars['ID'];
    last?: InputMaybe<Scalars['Int']>;
};
export declare type QueryUserArgs = {
    id?: InputMaybe<Scalars['ID']>;
    username?: InputMaybe<Scalars['LowercaseString']>;
};
export declare type QueryUsersArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare enum ReportType {
    Comment = "COMMENT",
    Post = "POST",
    Project = "PROJECT",
    User = "USER"
}
export declare type SearchResultEdge = {
    __typename?: 'SearchResultEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<SearchResultNode>;
};
export declare type SearchResultNode = Hashtag | Model | Project | User;
export declare type SearchResults = {
    __typename?: 'SearchResults';
    edges?: Maybe<Array<Maybe<SearchResultEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare enum SearchType {
    Hashtags = "HASHTAGS",
    Models = "MODELS",
    Projects = "PROJECTS",
    Users = "USERS"
}
export declare enum SortType {
    Random = "RANDOM",
    Recent = "RECENT"
}
export declare type ToggleNotificationSettingsInput = {
    deliveryMethod: Scalars['String'];
    notificationType: Scalars['String'];
};
export declare type Tokens = {
    __typename?: 'Tokens';
    access_token?: Maybe<Scalars['String']>;
    refresh_token?: Maybe<Scalars['String']>;
};
export declare enum UploadType {
    Image = "IMAGE",
    Video = "VIDEO"
}
export declare type User = {
    __typename?: 'User';
    avatarUrl?: Maybe<Scalars['String']>;
    bio?: Maybe<Scalars['String']>;
    createdAt: Scalars['Date'];
    dynamicLink?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    followingProjects?: Maybe<ProjectsConnection>;
    fullName?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    interestedIn?: Maybe<Array<Maybe<ProjectType>>>;
    isOnline?: Maybe<Scalars['Boolean']>;
    isSilhouette?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    lastSeen?: Maybe<Scalars['Date']>;
    location?: Maybe<Scalars['String']>;
    postsConnection?: Maybe<PostConnection>;
    projectCount?: Maybe<Scalars['Int']>;
    projectsConnection?: Maybe<ProjectsConnection>;
    role?: Maybe<UserRole>;
    settings?: Maybe<UserSettings>;
    updatedAt: Scalars['Date'];
    username?: Maybe<Scalars['LowercaseString']>;
    website?: Maybe<Scalars['String']>;
};
export declare type UserFollowingProjectsArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type UserPostsConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type UserProjectsConnectionArgs = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export declare type UserConnection = {
    __typename?: 'UserConnection';
    edges?: Maybe<Array<Maybe<UserEdge>>>;
    pageInfo?: Maybe<PageInfo>;
};
export declare type UserEdge = {
    __typename?: 'UserEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<User>;
};
export declare type UserNotificationsSettings = {
    __typename?: 'UserNotificationsSettings';
    types?: Maybe<NotificationSettingsType>;
};
export declare enum UserRole {
    Admin = "ADMIN",
    User = "USER"
}
export declare type UserSettings = {
    __typename?: 'UserSettings';
    locale?: Maybe<Scalars['String']>;
    notifications?: Maybe<UserNotificationsSettings>;
    timezone?: Maybe<Scalars['String']>;
};
export declare enum VehicleTypes {
    Car = "CAR",
    Motorcycle = "MOTORCYCLE"
}
export declare type BlogPostFragment = {
    __typename?: 'BlogPost';
    id?: string | null;
    title?: string | null;
    slug?: string | null;
    content?: string | null;
    createdAt?: any | null;
    user?: {
        __typename?: 'User';
        id: string;
        fullName?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        username?: any | null;
        avatarUrl?: string | null;
        isSilhouette?: boolean | null;
        isOnline?: boolean | null;
        website?: string | null;
        location?: string | null;
        bio?: string | null;
        projectCount?: number | null;
        dynamicLink?: string | null;
    } | null;
};
export declare type CollectionFragment = {
    __typename?: 'Collection';
    id?: string | null;
    name?: string | null;
    slug?: string | null;
    cover?: {
        __typename?: 'CoverType';
        uri?: string | null;
    } | null;
};
export declare type CommentAndRepliesFragment = {
    __typename?: 'Comment';
    id?: string | null;
    text: string;
    createdAt?: any | null;
    translatable?: boolean | null;
    replies?: {
        __typename?: 'CommentConnection';
        totalCount?: number | null;
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'CommentEdge';
            cursor: string;
            node: {
                __typename?: 'Comment';
                id?: string | null;
                text: string;
                createdAt?: any | null;
                translatable?: boolean | null;
                permissions?: {
                    __typename?: 'CommentPermissions';
                    isOwner?: boolean | null;
                } | null;
                likes?: {
                    __typename?: 'Likes';
                    isLiked?: boolean | null;
                    totalCount?: number | null;
                } | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
            };
        }> | null;
    } | null;
    permissions?: {
        __typename?: 'CommentPermissions';
        isOwner?: boolean | null;
    } | null;
    likes?: {
        __typename?: 'Likes';
        isLiked?: boolean | null;
        totalCount?: number | null;
    } | null;
    user?: {
        __typename?: 'User';
        id: string;
        fullName?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        username?: any | null;
        avatarUrl?: string | null;
        isSilhouette?: boolean | null;
        isOnline?: boolean | null;
        website?: string | null;
        location?: string | null;
        bio?: string | null;
        projectCount?: number | null;
        dynamicLink?: string | null;
    } | null;
};
export declare type CommentFragment = {
    __typename?: 'Comment';
    id?: string | null;
    text: string;
    createdAt?: any | null;
    translatable?: boolean | null;
    permissions?: {
        __typename?: 'CommentPermissions';
        isOwner?: boolean | null;
    } | null;
    likes?: {
        __typename?: 'Likes';
        isLiked?: boolean | null;
        totalCount?: number | null;
    } | null;
    user?: {
        __typename?: 'User';
        id: string;
        fullName?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        username?: any | null;
        avatarUrl?: string | null;
        isSilhouette?: boolean | null;
        isOnline?: boolean | null;
        website?: string | null;
        location?: string | null;
        bio?: string | null;
        projectCount?: number | null;
        dynamicLink?: string | null;
    } | null;
};
export declare type NotificationFragment = {
    __typename?: 'Notification';
    id: string;
    type?: NotificationTypes | null;
    createdAt: any;
    user: {
        __typename?: 'User';
        id: string;
        fullName?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        username?: any | null;
        avatarUrl?: string | null;
        isSilhouette?: boolean | null;
        isOnline?: boolean | null;
        website?: string | null;
        location?: string | null;
        bio?: string | null;
        projectCount?: number | null;
        dynamicLink?: string | null;
    };
    project?: {
        __typename?: 'Project';
        id?: string | null;
        title?: string | null;
        slug?: string | null;
        dynamicLink?: string | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
        permissions?: {
            __typename?: 'ProjectPermissions';
            isOwner?: boolean | null;
            isFollower?: boolean | null;
        } | null;
        type?: {
            __typename?: 'ProjectType';
            title?: string | null;
        } | null;
        cover?: {
            __typename?: 'CoverType';
            uri?: string | null;
        } | null;
        followers?: {
            __typename?: 'FollowersConnection';
            totalCount?: number | null;
            edges?: Array<{
                __typename?: 'FollowersEdge';
                node: {
                    __typename?: 'User';
                    id: string;
                    username?: any | null;
                    avatarUrl?: string | null;
                };
            }> | null;
        } | null;
    } | null;
    post?: {
        __typename?: 'Post';
        id?: string | null;
    } | null;
    comment?: {
        __typename?: 'Comment';
        id?: string | null;
        text: string;
        postId?: string | null;
    } | null;
    files?: {
        __typename?: 'FileConnection';
        edges?: Array<{
            __typename?: 'FileEdge';
            node: {
                __typename?: 'File';
                id?: string | null;
                uri: string;
                poster?: string | null;
            };
        } | null> | null;
    } | null;
};
export declare type PostFragment = {
    __typename?: 'Post';
    id?: string | null;
    caption?: string | null;
    createdAt?: any | null;
    translatable?: boolean | null;
    user?: {
        __typename?: 'User';
        id: string;
        fullName?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        username?: any | null;
        avatarUrl?: string | null;
        isSilhouette?: boolean | null;
        isOnline?: boolean | null;
        website?: string | null;
        location?: string | null;
        bio?: string | null;
        projectCount?: number | null;
        dynamicLink?: string | null;
    } | null;
    permissions?: {
        __typename?: 'PostPermissions';
        isOwner?: boolean | null;
    } | null;
    files?: {
        __typename?: 'FileConnection';
        edges?: Array<{
            __typename?: 'FileEdge';
            node: {
                __typename?: 'File';
                id?: string | null;
                type?: FileType | null;
                uri: string;
                poster?: string | null;
            };
        } | null> | null;
    } | null;
    project?: {
        __typename?: 'Project';
        id?: string | null;
        title?: string | null;
        slug?: string | null;
        dynamicLink?: string | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
        permissions?: {
            __typename?: 'ProjectPermissions';
            isOwner?: boolean | null;
            isFollower?: boolean | null;
        } | null;
        type?: {
            __typename?: 'ProjectType';
            title?: string | null;
        } | null;
        cover?: {
            __typename?: 'CoverType';
            uri?: string | null;
        } | null;
        followers?: {
            __typename?: 'FollowersConnection';
            totalCount?: number | null;
            edges?: Array<{
                __typename?: 'FollowersEdge';
                node: {
                    __typename?: 'User';
                    id: string;
                    username?: any | null;
                    avatarUrl?: string | null;
                };
            }> | null;
        } | null;
    } | null;
    likes?: {
        __typename?: 'Likes';
        isLiked?: boolean | null;
        totalCount?: number | null;
    } | null;
    bookmarks?: {
        __typename?: 'Bookmarks';
        isBookmarked?: boolean | null;
    } | null;
    comments?: {
        __typename?: 'CommentConnection';
        totalCount?: number | null;
        edges?: Array<{
            __typename?: 'CommentEdge';
            node: {
                __typename?: 'Comment';
                id?: string | null;
                text: string;
                createdAt?: any | null;
                translatable?: boolean | null;
                permissions?: {
                    __typename?: 'CommentPermissions';
                    isOwner?: boolean | null;
                } | null;
                likes?: {
                    __typename?: 'Likes';
                    isLiked?: boolean | null;
                    totalCount?: number | null;
                } | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
            };
        }> | null;
    } | null;
    likesConnection?: {
        __typename?: 'LikeConnection';
        edges?: Array<{
            __typename?: 'LikeEdge';
            node: {
                __typename?: 'User';
                id: string;
                avatarUrl?: string | null;
            };
        }> | null;
    } | null;
    collection?: {
        __typename?: 'Collection';
        id?: string | null;
        name?: string | null;
        slug?: string | null;
    } | null;
};
export declare type ProjectFragment = {
    __typename?: 'Project';
    id?: string | null;
    title?: string | null;
    slug?: string | null;
    dynamicLink?: string | null;
    user?: {
        __typename?: 'User';
        id: string;
        fullName?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        username?: any | null;
        avatarUrl?: string | null;
        isSilhouette?: boolean | null;
        isOnline?: boolean | null;
        website?: string | null;
        location?: string | null;
        bio?: string | null;
        projectCount?: number | null;
        dynamicLink?: string | null;
    } | null;
    permissions?: {
        __typename?: 'ProjectPermissions';
        isOwner?: boolean | null;
        isFollower?: boolean | null;
    } | null;
    type?: {
        __typename?: 'ProjectType';
        title?: string | null;
    } | null;
    cover?: {
        __typename?: 'CoverType';
        uri?: string | null;
    } | null;
    followers?: {
        __typename?: 'FollowersConnection';
        totalCount?: number | null;
        edges?: Array<{
            __typename?: 'FollowersEdge';
            node: {
                __typename?: 'User';
                id: string;
                username?: any | null;
                avatarUrl?: string | null;
            };
        }> | null;
    } | null;
};
export declare type UserFragment = {
    __typename?: 'User';
    id: string;
    fullName?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    username?: any | null;
    avatarUrl?: string | null;
    isSilhouette?: boolean | null;
    isOnline?: boolean | null;
    website?: string | null;
    location?: string | null;
    bio?: string | null;
    projectCount?: number | null;
    dynamicLink?: string | null;
};
export declare type UserProjectsFragment = {
    __typename?: 'User';
    projects?: {
        __typename?: 'ProjectsConnection';
        edges?: Array<{
            __typename?: 'ProjectEdge';
            node: {
                __typename?: 'Project';
                id?: string | null;
                title?: string | null;
                followers?: {
                    __typename?: 'FollowersConnection';
                    totalCount?: number | null;
                } | null;
                files?: {
                    __typename?: 'FileConnection';
                    edges?: Array<{
                        __typename?: 'FileEdge';
                        node: {
                            __typename?: 'File';
                            id?: string | null;
                            uri: string;
                            poster?: string | null;
                        };
                    } | null> | null;
                } | null;
            };
        }> | null;
    } | null;
};
export declare type UserSettingsFragment = {
    __typename?: 'User';
    id: string;
    role?: UserRole | null;
    settings?: {
        __typename?: 'UserSettings';
        notifications?: {
            __typename?: 'UserNotificationsSettings';
            types?: {
                __typename?: 'NotificationSettingsType';
                NEW_FOLLOWER?: {
                    __typename?: 'NotificationKindSettings';
                    email?: boolean | null;
                    push?: boolean | null;
                } | null;
                NEW_COMMENT?: {
                    __typename?: 'NotificationKindSettings';
                    email?: boolean | null;
                    push?: boolean | null;
                } | null;
                NEW_MENTION?: {
                    __typename?: 'NotificationKindSettings';
                    email?: boolean | null;
                    push?: boolean | null;
                } | null;
                NEW_ARTICLE?: {
                    __typename?: 'NotificationKindSettings';
                    email?: boolean | null;
                    push?: boolean | null;
                } | null;
                SIMILAR_PROJECTS?: {
                    __typename?: 'NotificationKindSettings';
                    email?: boolean | null;
                    push?: boolean | null;
                } | null;
                PRODUCT_ANNOUNCEMENTS?: {
                    __typename?: 'NotificationKindSettings';
                    email?: boolean | null;
                    push?: boolean | null;
                } | null;
            } | null;
        } | null;
    } | null;
};
export declare type AddBlogPostMutationVariables = Exact<{
    id?: InputMaybe<Scalars['ID']>;
    input: BlogPostInput;
}>;
export declare type AddBlogPostMutation = {
    __typename?: 'Mutation';
    addBlogPost?: {
        __typename?: 'BlogPost';
        id?: string | null;
        title?: string | null;
        slug?: string | null;
        content?: string | null;
        createdAt?: any | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
    } | null;
};
export declare type AddCollectionMutationVariables = Exact<{
    projectId: Scalars['ID'];
    name: Scalars['String'];
}>;
export declare type AddCollectionMutation = {
    __typename?: 'Mutation';
    addCollection?: {
        __typename?: 'Collection';
        id?: string | null;
        name?: string | null;
        slug?: string | null;
        cover?: {
            __typename?: 'CoverType';
            uri?: string | null;
        } | null;
    } | null;
};
export declare type AddCommentMutationVariables = Exact<{
    postId: Scalars['ID'];
    commentId?: InputMaybe<Scalars['ID']>;
    input: CommentInput;
}>;
export declare type AddCommentMutation = {
    __typename?: 'Mutation';
    addComment?: {
        __typename?: 'Comment';
        id?: string | null;
        text: string;
        createdAt?: any | null;
        translatable?: boolean | null;
        replies?: {
            __typename?: 'CommentConnection';
            totalCount?: number | null;
            pageInfo: {
                __typename?: 'PageInfo';
                hasNextPage?: boolean | null;
            };
            edges?: Array<{
                __typename?: 'CommentEdge';
                cursor: string;
                node: {
                    __typename?: 'Comment';
                    id?: string | null;
                    text: string;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    permissions?: {
                        __typename?: 'CommentPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                };
            }> | null;
        } | null;
        permissions?: {
            __typename?: 'CommentPermissions';
            isOwner?: boolean | null;
        } | null;
        likes?: {
            __typename?: 'Likes';
            isLiked?: boolean | null;
            totalCount?: number | null;
        } | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
    } | null;
};
export declare type AddPostMutationVariables = Exact<{
    input: PostInput;
}>;
export declare type AddPostMutation = {
    __typename?: 'Mutation';
    addPost?: {
        __typename?: 'Post';
        id?: string | null;
        caption?: string | null;
        createdAt?: any | null;
        translatable?: boolean | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
        permissions?: {
            __typename?: 'PostPermissions';
            isOwner?: boolean | null;
        } | null;
        files?: {
            __typename?: 'FileConnection';
            edges?: Array<{
                __typename?: 'FileEdge';
                node: {
                    __typename?: 'File';
                    id?: string | null;
                    type?: FileType | null;
                    uri: string;
                    poster?: string | null;
                };
            } | null> | null;
        } | null;
        project?: {
            __typename?: 'Project';
            id?: string | null;
            title?: string | null;
            slug?: string | null;
            dynamicLink?: string | null;
            user?: {
                __typename?: 'User';
                id: string;
                fullName?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                username?: any | null;
                avatarUrl?: string | null;
                isSilhouette?: boolean | null;
                isOnline?: boolean | null;
                website?: string | null;
                location?: string | null;
                bio?: string | null;
                projectCount?: number | null;
                dynamicLink?: string | null;
            } | null;
            permissions?: {
                __typename?: 'ProjectPermissions';
                isOwner?: boolean | null;
                isFollower?: boolean | null;
            } | null;
            type?: {
                __typename?: 'ProjectType';
                title?: string | null;
            } | null;
            cover?: {
                __typename?: 'CoverType';
                uri?: string | null;
            } | null;
            followers?: {
                __typename?: 'FollowersConnection';
                totalCount?: number | null;
                edges?: Array<{
                    __typename?: 'FollowersEdge';
                    node: {
                        __typename?: 'User';
                        id: string;
                        username?: any | null;
                        avatarUrl?: string | null;
                    };
                }> | null;
            } | null;
        } | null;
        likes?: {
            __typename?: 'Likes';
            isLiked?: boolean | null;
            totalCount?: number | null;
        } | null;
        bookmarks?: {
            __typename?: 'Bookmarks';
            isBookmarked?: boolean | null;
        } | null;
        comments?: {
            __typename?: 'CommentConnection';
            totalCount?: number | null;
            edges?: Array<{
                __typename?: 'CommentEdge';
                node: {
                    __typename?: 'Comment';
                    id?: string | null;
                    text: string;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    permissions?: {
                        __typename?: 'CommentPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                };
            }> | null;
        } | null;
        likesConnection?: {
            __typename?: 'LikeConnection';
            edges?: Array<{
                __typename?: 'LikeEdge';
                node: {
                    __typename?: 'User';
                    id: string;
                    avatarUrl?: string | null;
                };
            }> | null;
        } | null;
        collection?: {
            __typename?: 'Collection';
            id?: string | null;
            name?: string | null;
            slug?: string | null;
        } | null;
    } | null;
};
export declare type AddProjectMutationVariables = Exact<{
    input: ProjectInput;
}>;
export declare type AddProjectMutation = {
    __typename?: 'Mutation';
    addProject?: {
        __typename?: 'Project';
        id?: string | null;
        title?: string | null;
        slug?: string | null;
        dynamicLink?: string | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
        permissions?: {
            __typename?: 'ProjectPermissions';
            isOwner?: boolean | null;
            isFollower?: boolean | null;
        } | null;
        type?: {
            __typename?: 'ProjectType';
            title?: string | null;
        } | null;
        cover?: {
            __typename?: 'CoverType';
            uri?: string | null;
        } | null;
        followers?: {
            __typename?: 'FollowersConnection';
            totalCount?: number | null;
            edges?: Array<{
                __typename?: 'FollowersEdge';
                node: {
                    __typename?: 'User';
                    id: string;
                    username?: any | null;
                    avatarUrl?: string | null;
                };
            }> | null;
        } | null;
    } | null;
};
export declare type AuthenticateAppleMutationVariables = Exact<{
    identityToken: Scalars['String'];
    user: ApplePayload;
}>;
export declare type AuthenticateAppleMutation = {
    __typename?: 'Mutation';
    authenticateApple?: {
        __typename?: 'Tokens';
        access_token?: string | null;
        refresh_token?: string | null;
    } | null;
};
export declare type AuthenticateFacebookMutationVariables = Exact<{
    token: Scalars['String'];
}>;
export declare type AuthenticateFacebookMutation = {
    __typename?: 'Mutation';
    authenticateFacebook?: {
        __typename?: 'Tokens';
        access_token?: string | null;
        refresh_token?: string | null;
    } | null;
};
export declare type AuthenticateGoogleMutationVariables = Exact<{
    idToken: Scalars['String'];
}>;
export declare type AuthenticateGoogleMutation = {
    __typename?: 'Mutation';
    authenticateGoogle?: {
        __typename?: 'Tokens';
        access_token?: string | null;
        refresh_token?: string | null;
    } | null;
};
export declare type BanUserMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type BanUserMutation = {
    __typename?: 'Mutation';
    banUser?: {
        __typename?: 'User';
        id: string;
        fullName?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        username?: any | null;
        avatarUrl?: string | null;
        isSilhouette?: boolean | null;
        isOnline?: boolean | null;
        website?: string | null;
        location?: string | null;
        bio?: string | null;
        projectCount?: number | null;
        dynamicLink?: string | null;
    } | null;
};
export declare type BookmarkPostMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type BookmarkPostMutation = {
    __typename?: 'Mutation';
    bookmarkPost?: {
        __typename?: 'Post';
        id?: string | null;
        bookmarks?: {
            __typename?: 'Bookmarks';
            isBookmarked?: boolean | null;
        } | null;
    } | null;
};
export declare type CollectPostsMutationVariables = Exact<{
    projectId: Scalars['ID'];
    collectionId: Scalars['ID'];
    input?: InputMaybe<Array<InputMaybe<CollectionInput>> | InputMaybe<CollectionInput>>;
}>;
export declare type CollectPostsMutation = {
    __typename?: 'Mutation';
    collectPosts?: {
        __typename?: 'Collection';
        id?: string | null;
        name?: string | null;
        cover?: {
            __typename?: 'CoverType';
            uri?: string | null;
        } | null;
    } | null;
};
export declare type DeleteBlogPostMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteBlogPostMutation = {
    __typename?: 'Mutation';
    deleteBlogPost?: {
        __typename?: 'BlogPost';
        id?: string | null;
    } | null;
};
export declare type DeleteCollectionMutationVariables = Exact<{
    projectId: Scalars['ID'];
    id: Scalars['ID'];
}>;
export declare type DeleteCollectionMutation = {
    __typename?: 'Mutation';
    deleteCollection?: {
        __typename?: 'Collection';
        id?: string | null;
    } | null;
};
export declare type DeleteCommentMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteCommentMutation = {
    __typename?: 'Mutation';
    deleteComment?: boolean | null;
};
export declare type DeleteCurrentUserMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type DeleteCurrentUserMutation = {
    __typename?: 'Mutation';
    deleteCurrentUser?: boolean | null;
};
export declare type DeleteNotificationMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteNotificationMutation = {
    __typename?: 'Mutation';
    deleteNotification?: boolean | null;
};
export declare type DeletePostMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeletePostMutation = {
    __typename?: 'Mutation';
    deletePost?: {
        __typename?: 'Post';
        id?: string | null;
    } | null;
};
export declare type DeleteProjectMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteProjectMutation = {
    __typename?: 'Mutation';
    deleteProject?: boolean | null;
};
export declare type DeleteUserMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteUserMutation = {
    __typename?: 'Mutation';
    deleteUser?: boolean | null;
};
export declare type EditCollectionMutationVariables = Exact<{
    input: EditCollectionInput;
    id: Scalars['ID'];
}>;
export declare type EditCollectionMutation = {
    __typename?: 'Mutation';
    editCollection?: {
        __typename?: 'Collection';
        id?: string | null;
        name?: string | null;
        slug?: string | null;
        cover?: {
            __typename?: 'CoverType';
            uri?: string | null;
        } | null;
    } | null;
};
export declare type EditPostMutationVariables = Exact<{
    id: Scalars['ID'];
    input: EditPostInput;
}>;
export declare type EditPostMutation = {
    __typename?: 'Mutation';
    editPost?: {
        __typename?: 'Post';
        id?: string | null;
        caption?: string | null;
        createdAt?: any | null;
        translatable?: boolean | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
        permissions?: {
            __typename?: 'PostPermissions';
            isOwner?: boolean | null;
        } | null;
        files?: {
            __typename?: 'FileConnection';
            edges?: Array<{
                __typename?: 'FileEdge';
                node: {
                    __typename?: 'File';
                    id?: string | null;
                    type?: FileType | null;
                    uri: string;
                    poster?: string | null;
                };
            } | null> | null;
        } | null;
        project?: {
            __typename?: 'Project';
            id?: string | null;
            title?: string | null;
            slug?: string | null;
            dynamicLink?: string | null;
            user?: {
                __typename?: 'User';
                id: string;
                fullName?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                username?: any | null;
                avatarUrl?: string | null;
                isSilhouette?: boolean | null;
                isOnline?: boolean | null;
                website?: string | null;
                location?: string | null;
                bio?: string | null;
                projectCount?: number | null;
                dynamicLink?: string | null;
            } | null;
            permissions?: {
                __typename?: 'ProjectPermissions';
                isOwner?: boolean | null;
                isFollower?: boolean | null;
            } | null;
            type?: {
                __typename?: 'ProjectType';
                title?: string | null;
            } | null;
            cover?: {
                __typename?: 'CoverType';
                uri?: string | null;
            } | null;
            followers?: {
                __typename?: 'FollowersConnection';
                totalCount?: number | null;
                edges?: Array<{
                    __typename?: 'FollowersEdge';
                    node: {
                        __typename?: 'User';
                        id: string;
                        username?: any | null;
                        avatarUrl?: string | null;
                    };
                }> | null;
            } | null;
        } | null;
        likes?: {
            __typename?: 'Likes';
            isLiked?: boolean | null;
            totalCount?: number | null;
        } | null;
        bookmarks?: {
            __typename?: 'Bookmarks';
            isBookmarked?: boolean | null;
        } | null;
        comments?: {
            __typename?: 'CommentConnection';
            totalCount?: number | null;
            edges?: Array<{
                __typename?: 'CommentEdge';
                node: {
                    __typename?: 'Comment';
                    id?: string | null;
                    text: string;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    permissions?: {
                        __typename?: 'CommentPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                };
            }> | null;
        } | null;
        likesConnection?: {
            __typename?: 'LikeConnection';
            edges?: Array<{
                __typename?: 'LikeEdge';
                node: {
                    __typename?: 'User';
                    id: string;
                    avatarUrl?: string | null;
                };
            }> | null;
        } | null;
        collection?: {
            __typename?: 'Collection';
            id?: string | null;
            name?: string | null;
            slug?: string | null;
        } | null;
    } | null;
};
export declare type EditProjectMutationVariables = Exact<{
    id: Scalars['ID'];
    input: ProjectInput;
}>;
export declare type EditProjectMutation = {
    __typename?: 'Mutation';
    editProject?: {
        __typename?: 'Project';
        id?: string | null;
        title?: string | null;
    } | null;
};
export declare type EditUserMutationVariables = Exact<{
    input: EditUserInput;
    id?: InputMaybe<Scalars['ID']>;
}>;
export declare type EditUserMutation = {
    __typename?: 'Mutation';
    editUser?: {
        __typename?: 'User';
        id: string;
        fullName?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        username?: any | null;
        avatarUrl?: string | null;
        isSilhouette?: boolean | null;
        isOnline?: boolean | null;
        website?: string | null;
        location?: string | null;
        bio?: string | null;
        projectCount?: number | null;
        dynamicLink?: string | null;
    } | null;
};
export declare type FollowProjectMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type FollowProjectMutation = {
    __typename?: 'Mutation';
    followProject?: {
        __typename?: 'Project';
        id?: string | null;
        title?: string | null;
        slug?: string | null;
        dynamicLink?: string | null;
        cover?: {
            __typename?: 'CoverType';
            uri?: string | null;
            default?: boolean | null;
        } | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
        permissions?: {
            __typename?: 'ProjectPermissions';
            isOwner?: boolean | null;
            isFollower?: boolean | null;
        } | null;
        type?: {
            __typename?: 'ProjectType';
            title?: string | null;
        } | null;
        followers?: {
            __typename?: 'FollowersConnection';
            totalCount?: number | null;
            edges?: Array<{
                __typename?: 'FollowersEdge';
                node: {
                    __typename?: 'User';
                    id: string;
                    username?: any | null;
                    avatarUrl?: string | null;
                };
            }> | null;
        } | null;
    } | null;
};
export declare type LikeCommentMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type LikeCommentMutation = {
    __typename?: 'Mutation';
    likeComment?: {
        __typename?: 'Comment';
        id?: string | null;
        likes?: {
            __typename?: 'Likes';
            isLiked?: boolean | null;
            totalCount?: number | null;
        } | null;
    } | null;
};
export declare type LikePostMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type LikePostMutation = {
    __typename?: 'Mutation';
    likePost?: {
        __typename?: 'Post';
        id?: string | null;
        likes?: {
            __typename?: 'Likes';
            isLiked?: boolean | null;
            totalCount?: number | null;
        } | null;
    } | null;
};
export declare type MarkAllNotificationsSeenMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type MarkAllNotificationsSeenMutation = {
    __typename?: 'Mutation';
    markAllNotificationsSeen?: boolean | null;
};
export declare type MarkNotificationSeenMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type MarkNotificationSeenMutation = {
    __typename?: 'Mutation';
    markNotificationSeen?: {
        __typename?: 'Notification';
        id: string;
        type?: NotificationTypes | null;
        createdAt: any;
        user: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        };
        project?: {
            __typename?: 'Project';
            id?: string | null;
            title?: string | null;
            slug?: string | null;
            dynamicLink?: string | null;
            user?: {
                __typename?: 'User';
                id: string;
                fullName?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                username?: any | null;
                avatarUrl?: string | null;
                isSilhouette?: boolean | null;
                isOnline?: boolean | null;
                website?: string | null;
                location?: string | null;
                bio?: string | null;
                projectCount?: number | null;
                dynamicLink?: string | null;
            } | null;
            permissions?: {
                __typename?: 'ProjectPermissions';
                isOwner?: boolean | null;
                isFollower?: boolean | null;
            } | null;
            type?: {
                __typename?: 'ProjectType';
                title?: string | null;
            } | null;
            cover?: {
                __typename?: 'CoverType';
                uri?: string | null;
            } | null;
            followers?: {
                __typename?: 'FollowersConnection';
                totalCount?: number | null;
                edges?: Array<{
                    __typename?: 'FollowersEdge';
                    node: {
                        __typename?: 'User';
                        id: string;
                        username?: any | null;
                        avatarUrl?: string | null;
                    };
                }> | null;
            } | null;
        } | null;
        post?: {
            __typename?: 'Post';
            id?: string | null;
        } | null;
        comment?: {
            __typename?: 'Comment';
            id?: string | null;
            text: string;
            postId?: string | null;
        } | null;
        files?: {
            __typename?: 'FileConnection';
            edges?: Array<{
                __typename?: 'FileEdge';
                node: {
                    __typename?: 'File';
                    id?: string | null;
                    uri: string;
                    poster?: string | null;
                };
            } | null> | null;
        } | null;
    } | null;
};
export declare type PreSignUrlMutationVariables = Exact<{
    input: PreSignedUrlInput;
}>;
export declare type PreSignUrlMutation = {
    __typename?: 'Mutation';
    preSignUrl?: {
        __typename?: 'PreSignedUrl';
        url?: string | null;
        type?: string | null;
        filename?: string | null;
    } | null;
};
export declare type PreSignUrlsMutationVariables = Exact<{
    input: Array<InputMaybe<PreSignedUrlnput>> | InputMaybe<PreSignedUrlnput>;
}>;
export declare type PreSignUrlsMutation = {
    __typename?: 'Mutation';
    preSignUrls?: Array<{
        __typename?: 'PreSignedUrl';
        url?: string | null;
        type?: string | null;
        filename?: string | null;
    } | null> | null;
};
export declare type RefreshTokenMutationVariables = Exact<{
    refreshToken: Scalars['String'];
}>;
export declare type RefreshTokenMutation = {
    __typename?: 'Mutation';
    token?: {
        __typename?: 'AccessToken';
        access_token?: string | null;
    } | null;
};
export declare type RegisterDeviceTokenMutationVariables = Exact<{
    token: Scalars['String'];
    platform: PlatformType;
}>;
export declare type RegisterDeviceTokenMutation = {
    __typename?: 'Mutation';
    registerDeviceToken?: boolean | null;
};
export declare type SendPromoMutationVariables = Exact<{
    number: Scalars['String'];
}>;
export declare type SendPromoMutation = {
    __typename?: 'Mutation';
    sendPromo?: boolean | null;
};
export declare type ToggleNotificationSettingsMutationVariables = Exact<{
    input?: InputMaybe<ToggleNotificationSettingsInput>;
}>;
export declare type ToggleNotificationSettingsMutation = {
    __typename?: 'Mutation';
    toggleNotificationSettings?: {
        __typename?: 'User';
        id: string;
        role?: UserRole | null;
        settings?: {
            __typename?: 'UserSettings';
            notifications?: {
                __typename?: 'UserNotificationsSettings';
                types?: {
                    __typename?: 'NotificationSettingsType';
                    NEW_FOLLOWER?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                    NEW_COMMENT?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                    NEW_MENTION?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                    NEW_ARTICLE?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                    SIMILAR_PROJECTS?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                    PRODUCT_ANNOUNCEMENTS?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                } | null;
            } | null;
        } | null;
    } | null;
};
export declare type TranslateCommentMutationVariables = Exact<{
    id: Scalars['ID'];
    original?: InputMaybe<Scalars['Boolean']>;
}>;
export declare type TranslateCommentMutation = {
    __typename?: 'Mutation';
    translateComment?: {
        __typename?: 'Comment';
        id?: string | null;
        translatable?: boolean | null;
        text: string;
    } | null;
};
export declare type TranslatePostMutationVariables = Exact<{
    id: Scalars['ID'];
    original?: InputMaybe<Scalars['Boolean']>;
}>;
export declare type TranslatePostMutation = {
    __typename?: 'Mutation';
    translatePost?: {
        __typename?: 'Post';
        id?: string | null;
        translatable?: boolean | null;
        caption?: string | null;
    } | null;
};
export declare type BlogPostQueryVariables = Exact<{
    slug?: InputMaybe<Scalars['LowercaseString']>;
    id?: InputMaybe<Scalars['ID']>;
}>;
export declare type BlogPostQuery = {
    __typename?: 'Query';
    blogPost?: {
        __typename?: 'BlogPost';
        id?: string | null;
        title?: string | null;
        slug?: string | null;
        content?: string | null;
        createdAt?: any | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
    } | null;
};
export declare type BlogPostsQueryVariables = Exact<{
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type BlogPostsQuery = {
    __typename?: 'Query';
    blogPosts?: {
        __typename?: 'BlogPostConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'BlogPostEdge';
            cursor: string;
            node: {
                __typename?: 'BlogPost';
                id?: string | null;
                title?: string | null;
                slug?: string | null;
                content?: string | null;
                createdAt?: any | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
            };
        }> | null;
    } | null;
};
export declare type BookmarksQueryVariables = Exact<{
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type BookmarksQuery = {
    __typename?: 'Query';
    bookmarks?: {
        __typename?: 'BookmarkConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'BookmarkEdge';
            cursor: string;
            node: {
                __typename?: 'Post';
                id?: string | null;
                caption?: string | null;
                createdAt?: any | null;
                translatable?: boolean | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
                permissions?: {
                    __typename?: 'PostPermissions';
                    isOwner?: boolean | null;
                } | null;
                files?: {
                    __typename?: 'FileConnection';
                    edges?: Array<{
                        __typename?: 'FileEdge';
                        node: {
                            __typename?: 'File';
                            id?: string | null;
                            type?: FileType | null;
                            uri: string;
                            poster?: string | null;
                        };
                    } | null> | null;
                } | null;
                project?: {
                    __typename?: 'Project';
                    id?: string | null;
                    title?: string | null;
                    slug?: string | null;
                    dynamicLink?: string | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'ProjectPermissions';
                        isOwner?: boolean | null;
                        isFollower?: boolean | null;
                    } | null;
                    type?: {
                        __typename?: 'ProjectType';
                        title?: string | null;
                    } | null;
                    cover?: {
                        __typename?: 'CoverType';
                        uri?: string | null;
                    } | null;
                    followers?: {
                        __typename?: 'FollowersConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'FollowersEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                username?: any | null;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                } | null;
                likes?: {
                    __typename?: 'Likes';
                    isLiked?: boolean | null;
                    totalCount?: number | null;
                } | null;
                bookmarks?: {
                    __typename?: 'Bookmarks';
                    isBookmarked?: boolean | null;
                } | null;
                comments?: {
                    __typename?: 'CommentConnection';
                    totalCount?: number | null;
                    edges?: Array<{
                        __typename?: 'CommentEdge';
                        node: {
                            __typename?: 'Comment';
                            id?: string | null;
                            text: string;
                            createdAt?: any | null;
                            translatable?: boolean | null;
                            permissions?: {
                                __typename?: 'CommentPermissions';
                                isOwner?: boolean | null;
                            } | null;
                            likes?: {
                                __typename?: 'Likes';
                                isLiked?: boolean | null;
                                totalCount?: number | null;
                            } | null;
                            user?: {
                                __typename?: 'User';
                                id: string;
                                fullName?: string | null;
                                firstName?: string | null;
                                lastName?: string | null;
                                username?: any | null;
                                avatarUrl?: string | null;
                                isSilhouette?: boolean | null;
                                isOnline?: boolean | null;
                                website?: string | null;
                                location?: string | null;
                                bio?: string | null;
                                projectCount?: number | null;
                                dynamicLink?: string | null;
                            } | null;
                        };
                    }> | null;
                } | null;
                likesConnection?: {
                    __typename?: 'LikeConnection';
                    edges?: Array<{
                        __typename?: 'LikeEdge';
                        node: {
                            __typename?: 'User';
                            id: string;
                            avatarUrl?: string | null;
                        };
                    }> | null;
                } | null;
                collection?: {
                    __typename?: 'Collection';
                    id?: string | null;
                    name?: string | null;
                    slug?: string | null;
                } | null;
            };
        }> | null;
    } | null;
};
export declare type CollectionsQueryVariables = Exact<{
    id?: InputMaybe<Scalars['ID']>;
    slug?: InputMaybe<Scalars['LowercaseString']>;
    projectId?: InputMaybe<Scalars['ID']>;
    projectSlug?: InputMaybe<Scalars['LowercaseString']>;
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type CollectionsQuery = {
    __typename?: 'Query';
    collections?: {
        __typename?: 'PostConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'PostEdge';
            cursor: string;
            node: {
                __typename?: 'Post';
                id?: string | null;
                caption?: string | null;
                createdAt?: any | null;
                translatable?: boolean | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
                permissions?: {
                    __typename?: 'PostPermissions';
                    isOwner?: boolean | null;
                } | null;
                files?: {
                    __typename?: 'FileConnection';
                    edges?: Array<{
                        __typename?: 'FileEdge';
                        node: {
                            __typename?: 'File';
                            id?: string | null;
                            type?: FileType | null;
                            uri: string;
                            poster?: string | null;
                        };
                    } | null> | null;
                } | null;
                project?: {
                    __typename?: 'Project';
                    id?: string | null;
                    title?: string | null;
                    slug?: string | null;
                    dynamicLink?: string | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'ProjectPermissions';
                        isOwner?: boolean | null;
                        isFollower?: boolean | null;
                    } | null;
                    type?: {
                        __typename?: 'ProjectType';
                        title?: string | null;
                    } | null;
                    cover?: {
                        __typename?: 'CoverType';
                        uri?: string | null;
                    } | null;
                    followers?: {
                        __typename?: 'FollowersConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'FollowersEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                username?: any | null;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                } | null;
                likes?: {
                    __typename?: 'Likes';
                    isLiked?: boolean | null;
                    totalCount?: number | null;
                } | null;
                bookmarks?: {
                    __typename?: 'Bookmarks';
                    isBookmarked?: boolean | null;
                } | null;
                comments?: {
                    __typename?: 'CommentConnection';
                    totalCount?: number | null;
                    edges?: Array<{
                        __typename?: 'CommentEdge';
                        node: {
                            __typename?: 'Comment';
                            id?: string | null;
                            text: string;
                            createdAt?: any | null;
                            translatable?: boolean | null;
                            permissions?: {
                                __typename?: 'CommentPermissions';
                                isOwner?: boolean | null;
                            } | null;
                            likes?: {
                                __typename?: 'Likes';
                                isLiked?: boolean | null;
                                totalCount?: number | null;
                            } | null;
                            user?: {
                                __typename?: 'User';
                                id: string;
                                fullName?: string | null;
                                firstName?: string | null;
                                lastName?: string | null;
                                username?: any | null;
                                avatarUrl?: string | null;
                                isSilhouette?: boolean | null;
                                isOnline?: boolean | null;
                                website?: string | null;
                                location?: string | null;
                                bio?: string | null;
                                projectCount?: number | null;
                                dynamicLink?: string | null;
                            } | null;
                        };
                    }> | null;
                } | null;
                likesConnection?: {
                    __typename?: 'LikeConnection';
                    edges?: Array<{
                        __typename?: 'LikeEdge';
                        node: {
                            __typename?: 'User';
                            id: string;
                            avatarUrl?: string | null;
                        };
                    }> | null;
                } | null;
                collection?: {
                    __typename?: 'Collection';
                    id?: string | null;
                    name?: string | null;
                    slug?: string | null;
                } | null;
            };
        }> | null;
    } | null;
};
export declare type CommentQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type CommentQuery = {
    __typename?: 'Query';
    comment?: {
        __typename?: 'Comment';
        id?: string | null;
        text: string;
        createdAt?: any | null;
        translatable?: boolean | null;
        permissions?: {
            __typename?: 'CommentPermissions';
            isOwner?: boolean | null;
        } | null;
        likes?: {
            __typename?: 'Likes';
            isLiked?: boolean | null;
            totalCount?: number | null;
        } | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
    } | null;
};
export declare type CommentsQueryVariables = Exact<{
    postId: Scalars['ID'];
    after?: InputMaybe<Scalars['String']>;
}>;
export declare type CommentsQuery = {
    __typename?: 'Query';
    post?: {
        __typename?: 'Post';
        id?: string | null;
        caption?: string | null;
        createdAt?: any | null;
        translatable?: boolean | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
        permissions?: {
            __typename?: 'PostPermissions';
            isOwner?: boolean | null;
        } | null;
        files?: {
            __typename?: 'FileConnection';
            edges?: Array<{
                __typename?: 'FileEdge';
                node: {
                    __typename?: 'File';
                    id?: string | null;
                    type?: FileType | null;
                    uri: string;
                    poster?: string | null;
                };
            } | null> | null;
        } | null;
        project?: {
            __typename?: 'Project';
            id?: string | null;
            title?: string | null;
            slug?: string | null;
            dynamicLink?: string | null;
            user?: {
                __typename?: 'User';
                id: string;
                fullName?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                username?: any | null;
                avatarUrl?: string | null;
                isSilhouette?: boolean | null;
                isOnline?: boolean | null;
                website?: string | null;
                location?: string | null;
                bio?: string | null;
                projectCount?: number | null;
                dynamicLink?: string | null;
            } | null;
            permissions?: {
                __typename?: 'ProjectPermissions';
                isOwner?: boolean | null;
                isFollower?: boolean | null;
            } | null;
            type?: {
                __typename?: 'ProjectType';
                title?: string | null;
            } | null;
            cover?: {
                __typename?: 'CoverType';
                uri?: string | null;
            } | null;
            followers?: {
                __typename?: 'FollowersConnection';
                totalCount?: number | null;
                edges?: Array<{
                    __typename?: 'FollowersEdge';
                    node: {
                        __typename?: 'User';
                        id: string;
                        username?: any | null;
                        avatarUrl?: string | null;
                    };
                }> | null;
            } | null;
        } | null;
        likes?: {
            __typename?: 'Likes';
            isLiked?: boolean | null;
            totalCount?: number | null;
        } | null;
        bookmarks?: {
            __typename?: 'Bookmarks';
            isBookmarked?: boolean | null;
        } | null;
        comments?: {
            __typename?: 'CommentConnection';
            totalCount?: number | null;
            edges?: Array<{
                __typename?: 'CommentEdge';
                node: {
                    __typename?: 'Comment';
                    id?: string | null;
                    text: string;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    permissions?: {
                        __typename?: 'CommentPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                };
            }> | null;
        } | null;
        likesConnection?: {
            __typename?: 'LikeConnection';
            edges?: Array<{
                __typename?: 'LikeEdge';
                node: {
                    __typename?: 'User';
                    id: string;
                    avatarUrl?: string | null;
                };
            }> | null;
        } | null;
        collection?: {
            __typename?: 'Collection';
            id?: string | null;
            name?: string | null;
            slug?: string | null;
        } | null;
    } | null;
    comments?: {
        __typename?: 'CommentConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'CommentEdge';
            cursor: string;
            node: {
                __typename?: 'Comment';
                id?: string | null;
                text: string;
                createdAt?: any | null;
                translatable?: boolean | null;
                replies?: {
                    __typename?: 'CommentConnection';
                    totalCount?: number | null;
                    pageInfo: {
                        __typename?: 'PageInfo';
                        hasNextPage?: boolean | null;
                    };
                    edges?: Array<{
                        __typename?: 'CommentEdge';
                        cursor: string;
                        node: {
                            __typename?: 'Comment';
                            id?: string | null;
                            text: string;
                            createdAt?: any | null;
                            translatable?: boolean | null;
                            permissions?: {
                                __typename?: 'CommentPermissions';
                                isOwner?: boolean | null;
                            } | null;
                            likes?: {
                                __typename?: 'Likes';
                                isLiked?: boolean | null;
                                totalCount?: number | null;
                            } | null;
                            user?: {
                                __typename?: 'User';
                                id: string;
                                fullName?: string | null;
                                firstName?: string | null;
                                lastName?: string | null;
                                username?: any | null;
                                avatarUrl?: string | null;
                                isSilhouette?: boolean | null;
                                isOnline?: boolean | null;
                                website?: string | null;
                                location?: string | null;
                                bio?: string | null;
                                projectCount?: number | null;
                                dynamicLink?: string | null;
                            } | null;
                        };
                    }> | null;
                } | null;
                permissions?: {
                    __typename?: 'CommentPermissions';
                    isOwner?: boolean | null;
                } | null;
                likes?: {
                    __typename?: 'Likes';
                    isLiked?: boolean | null;
                    totalCount?: number | null;
                } | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
            };
        }> | null;
    } | null;
};
export declare type CurrentUserQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentUserQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'User';
        avatarUrl?: string | null;
        bio?: string | null;
        dynamicLink?: string | null;
        firstName?: string | null;
        fullName?: string | null;
        id: string;
        isOnline?: boolean | null;
        isSilhouette?: boolean | null;
        lastName?: string | null;
        location?: string | null;
        projectCount?: number | null;
        username?: any | null;
        website?: string | null;
        role?: UserRole | null;
        settings?: {
            __typename?: 'UserSettings';
            timezone?: string | null;
            locale?: string | null;
        } | null;
        interestedIn?: Array<{
            __typename?: 'ProjectType';
            id?: string | null;
            title?: string | null;
        } | null> | null;
        projects?: {
            __typename?: 'ProjectsConnection';
            edges?: Array<{
                __typename?: 'ProjectEdge';
                node: {
                    __typename?: 'Project';
                    id?: string | null;
                    title?: string | null;
                    followers?: {
                        __typename?: 'FollowersConnection';
                        totalCount?: number | null;
                    } | null;
                    files?: {
                        __typename?: 'FileConnection';
                        edges?: Array<{
                            __typename?: 'FileEdge';
                            node: {
                                __typename?: 'File';
                                id?: string | null;
                                uri: string;
                                poster?: string | null;
                            };
                        } | null> | null;
                    } | null;
                };
            }> | null;
        } | null;
    } | null;
};
export declare type CurrentUserFollowingProjectsQueryVariables = Exact<{
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type CurrentUserFollowingProjectsQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'User';
        id: string;
        projects?: {
            __typename?: 'ProjectsConnection';
            pageInfo: {
                __typename?: 'PageInfo';
                hasNextPage?: boolean | null;
            };
            edges?: Array<{
                __typename?: 'ProjectEdge';
                cursor: string;
                node: {
                    __typename?: 'Project';
                    id?: string | null;
                    title?: string | null;
                    slug?: string | null;
                    dynamicLink?: string | null;
                    cover?: {
                        __typename?: 'CoverType';
                        uri?: string | null;
                        default?: boolean | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'ProjectPermissions';
                        isOwner?: boolean | null;
                        isFollower?: boolean | null;
                    } | null;
                    type?: {
                        __typename?: 'ProjectType';
                        title?: string | null;
                    } | null;
                    followers?: {
                        __typename?: 'FollowersConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'FollowersEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                username?: any | null;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                };
            }> | null;
        } | null;
    } | null;
};
export declare type CurrentUserProfileQueryVariables = Exact<{
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type CurrentUserProfileQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'User';
        id: string;
        fullName?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        username?: any | null;
        avatarUrl?: string | null;
        isSilhouette?: boolean | null;
        isOnline?: boolean | null;
        website?: string | null;
        location?: string | null;
        bio?: string | null;
        projectCount?: number | null;
        dynamicLink?: string | null;
        projects?: {
            __typename?: 'ProjectsConnection';
            edges?: Array<{
                __typename?: 'ProjectEdge';
                node: {
                    __typename?: 'Project';
                    id?: string | null;
                    title?: string | null;
                    slug?: string | null;
                    dynamicLink?: string | null;
                    cover?: {
                        __typename?: 'CoverType';
                        uri?: string | null;
                        default?: boolean | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'ProjectPermissions';
                        isOwner?: boolean | null;
                        isFollower?: boolean | null;
                    } | null;
                    type?: {
                        __typename?: 'ProjectType';
                        title?: string | null;
                    } | null;
                    followers?: {
                        __typename?: 'FollowersConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'FollowersEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                username?: any | null;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                };
            }> | null;
        } | null;
        posts?: {
            __typename?: 'PostConnection';
            edges?: Array<{
                __typename?: 'PostEdge';
                cursor: string;
                node: {
                    __typename?: 'Post';
                    id?: string | null;
                    caption?: string | null;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'PostPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    files?: {
                        __typename?: 'FileConnection';
                        edges?: Array<{
                            __typename?: 'FileEdge';
                            node: {
                                __typename?: 'File';
                                id?: string | null;
                                type?: FileType | null;
                                uri: string;
                                poster?: string | null;
                            };
                        } | null> | null;
                    } | null;
                    project?: {
                        __typename?: 'Project';
                        id?: string | null;
                        title?: string | null;
                        slug?: string | null;
                        dynamicLink?: string | null;
                        user?: {
                            __typename?: 'User';
                            id: string;
                            fullName?: string | null;
                            firstName?: string | null;
                            lastName?: string | null;
                            username?: any | null;
                            avatarUrl?: string | null;
                            isSilhouette?: boolean | null;
                            isOnline?: boolean | null;
                            website?: string | null;
                            location?: string | null;
                            bio?: string | null;
                            projectCount?: number | null;
                            dynamicLink?: string | null;
                        } | null;
                        permissions?: {
                            __typename?: 'ProjectPermissions';
                            isOwner?: boolean | null;
                            isFollower?: boolean | null;
                        } | null;
                        type?: {
                            __typename?: 'ProjectType';
                            title?: string | null;
                        } | null;
                        cover?: {
                            __typename?: 'CoverType';
                            uri?: string | null;
                        } | null;
                        followers?: {
                            __typename?: 'FollowersConnection';
                            totalCount?: number | null;
                            edges?: Array<{
                                __typename?: 'FollowersEdge';
                                node: {
                                    __typename?: 'User';
                                    id: string;
                                    username?: any | null;
                                    avatarUrl?: string | null;
                                };
                            }> | null;
                        } | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    bookmarks?: {
                        __typename?: 'Bookmarks';
                        isBookmarked?: boolean | null;
                    } | null;
                    comments?: {
                        __typename?: 'CommentConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'CommentEdge';
                            node: {
                                __typename?: 'Comment';
                                id?: string | null;
                                text: string;
                                createdAt?: any | null;
                                translatable?: boolean | null;
                                permissions?: {
                                    __typename?: 'CommentPermissions';
                                    isOwner?: boolean | null;
                                } | null;
                                likes?: {
                                    __typename?: 'Likes';
                                    isLiked?: boolean | null;
                                    totalCount?: number | null;
                                } | null;
                                user?: {
                                    __typename?: 'User';
                                    id: string;
                                    fullName?: string | null;
                                    firstName?: string | null;
                                    lastName?: string | null;
                                    username?: any | null;
                                    avatarUrl?: string | null;
                                    isSilhouette?: boolean | null;
                                    isOnline?: boolean | null;
                                    website?: string | null;
                                    location?: string | null;
                                    bio?: string | null;
                                    projectCount?: number | null;
                                    dynamicLink?: string | null;
                                } | null;
                            };
                        }> | null;
                    } | null;
                    likesConnection?: {
                        __typename?: 'LikeConnection';
                        edges?: Array<{
                            __typename?: 'LikeEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                    collection?: {
                        __typename?: 'Collection';
                        id?: string | null;
                        name?: string | null;
                        slug?: string | null;
                    } | null;
                };
            }> | null;
            pageInfo: {
                __typename?: 'PageInfo';
                hasNextPage?: boolean | null;
            };
        } | null;
    } | null;
};
export declare type CurrentUserProjectsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentUserProjectsQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'User';
        projects?: {
            __typename?: 'ProjectsConnection';
            edges?: Array<{
                __typename?: 'ProjectEdge';
                node: {
                    __typename?: 'Project';
                    id?: string | null;
                    title?: string | null;
                    followers?: {
                        __typename?: 'FollowersConnection';
                        totalCount?: number | null;
                    } | null;
                    files?: {
                        __typename?: 'FileConnection';
                        edges?: Array<{
                            __typename?: 'FileEdge';
                            node: {
                                __typename?: 'File';
                                id?: string | null;
                                uri: string;
                                poster?: string | null;
                            };
                        } | null> | null;
                    } | null;
                };
            }> | null;
        } | null;
    } | null;
};
export declare type CurrentUserSettingsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentUserSettingsQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'User';
        id: string;
        role?: UserRole | null;
        settings?: {
            __typename?: 'UserSettings';
            notifications?: {
                __typename?: 'UserNotificationsSettings';
                types?: {
                    __typename?: 'NotificationSettingsType';
                    NEW_FOLLOWER?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                    NEW_COMMENT?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                    NEW_MENTION?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                    NEW_ARTICLE?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                    SIMILAR_PROJECTS?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                    PRODUCT_ANNOUNCEMENTS?: {
                        __typename?: 'NotificationKindSettings';
                        email?: boolean | null;
                        push?: boolean | null;
                    } | null;
                } | null;
            } | null;
        } | null;
    } | null;
};
export declare type FeedQueryVariables = Exact<{
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type FeedQuery = {
    __typename?: 'Query';
    feed?: {
        __typename?: 'Feed';
        posts?: {
            __typename?: 'PostConnection';
            pageInfo: {
                __typename?: 'PageInfo';
                hasNextPage?: boolean | null;
            };
            edges?: Array<{
                __typename?: 'PostEdge';
                cursor: string;
                node: {
                    __typename?: 'Post';
                    id?: string | null;
                    caption?: string | null;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'PostPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    files?: {
                        __typename?: 'FileConnection';
                        edges?: Array<{
                            __typename?: 'FileEdge';
                            node: {
                                __typename?: 'File';
                                id?: string | null;
                                type?: FileType | null;
                                uri: string;
                                poster?: string | null;
                            };
                        } | null> | null;
                    } | null;
                    project?: {
                        __typename?: 'Project';
                        id?: string | null;
                        title?: string | null;
                        slug?: string | null;
                        dynamicLink?: string | null;
                        user?: {
                            __typename?: 'User';
                            id: string;
                            fullName?: string | null;
                            firstName?: string | null;
                            lastName?: string | null;
                            username?: any | null;
                            avatarUrl?: string | null;
                            isSilhouette?: boolean | null;
                            isOnline?: boolean | null;
                            website?: string | null;
                            location?: string | null;
                            bio?: string | null;
                            projectCount?: number | null;
                            dynamicLink?: string | null;
                        } | null;
                        permissions?: {
                            __typename?: 'ProjectPermissions';
                            isOwner?: boolean | null;
                            isFollower?: boolean | null;
                        } | null;
                        type?: {
                            __typename?: 'ProjectType';
                            title?: string | null;
                        } | null;
                        cover?: {
                            __typename?: 'CoverType';
                            uri?: string | null;
                        } | null;
                        followers?: {
                            __typename?: 'FollowersConnection';
                            totalCount?: number | null;
                            edges?: Array<{
                                __typename?: 'FollowersEdge';
                                node: {
                                    __typename?: 'User';
                                    id: string;
                                    username?: any | null;
                                    avatarUrl?: string | null;
                                };
                            }> | null;
                        } | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    bookmarks?: {
                        __typename?: 'Bookmarks';
                        isBookmarked?: boolean | null;
                    } | null;
                    comments?: {
                        __typename?: 'CommentConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'CommentEdge';
                            node: {
                                __typename?: 'Comment';
                                id?: string | null;
                                text: string;
                                createdAt?: any | null;
                                translatable?: boolean | null;
                                permissions?: {
                                    __typename?: 'CommentPermissions';
                                    isOwner?: boolean | null;
                                } | null;
                                likes?: {
                                    __typename?: 'Likes';
                                    isLiked?: boolean | null;
                                    totalCount?: number | null;
                                } | null;
                                user?: {
                                    __typename?: 'User';
                                    id: string;
                                    fullName?: string | null;
                                    firstName?: string | null;
                                    lastName?: string | null;
                                    username?: any | null;
                                    avatarUrl?: string | null;
                                    isSilhouette?: boolean | null;
                                    isOnline?: boolean | null;
                                    website?: string | null;
                                    location?: string | null;
                                    bio?: string | null;
                                    projectCount?: number | null;
                                    dynamicLink?: string | null;
                                } | null;
                            };
                        }> | null;
                    } | null;
                    likesConnection?: {
                        __typename?: 'LikeConnection';
                        edges?: Array<{
                            __typename?: 'LikeEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                    collection?: {
                        __typename?: 'Collection';
                        id?: string | null;
                        name?: string | null;
                        slug?: string | null;
                    } | null;
                };
            }> | null;
        } | null;
    } | null;
};
export declare type FilesQueryVariables = Exact<{
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type FilesQuery = {
    __typename?: 'Query';
    files?: {
        __typename?: 'FileConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'FileEdge';
            cursor: string;
            node: {
                __typename?: 'File';
                id?: string | null;
                uri: string;
                postId?: string | null;
            };
        } | null> | null;
    } | null;
};
export declare type FollowersQueryVariables = Exact<{
    projectId: Scalars['ID'];
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type FollowersQuery = {
    __typename?: 'Query';
    followers?: {
        __typename?: 'FollowersConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'FollowersEdge';
            cursor: string;
            node: {
                __typename?: 'User';
                id: string;
                fullName?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                username?: any | null;
                avatarUrl?: string | null;
                isSilhouette?: boolean | null;
                isOnline?: boolean | null;
                website?: string | null;
                location?: string | null;
                bio?: string | null;
                projectCount?: number | null;
                dynamicLink?: string | null;
            };
        }> | null;
    } | null;
};
export declare type GrowthQueryVariables = Exact<{
    type: GrowthType;
}>;
export declare type GrowthQuery = {
    __typename?: 'Query';
    growth?: Array<{
        __typename?: 'GrowthData';
        date?: any | null;
        count?: number | null;
    } | null> | null;
};
export declare type HashtagQueryVariables = Exact<{
    id?: InputMaybe<Scalars['ID']>;
    slug?: InputMaybe<Scalars['LowercaseString']>;
    name?: InputMaybe<Scalars['String']>;
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type HashtagQuery = {
    __typename?: 'Query';
    hashtag?: {
        __typename?: 'Hashtag';
        posts?: {
            __typename?: 'PostConnection';
            pageInfo: {
                __typename?: 'PageInfo';
                hasNextPage?: boolean | null;
            };
            edges?: Array<{
                __typename?: 'PostEdge';
                cursor: string;
                node: {
                    __typename?: 'Post';
                    id?: string | null;
                    caption?: string | null;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'PostPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    files?: {
                        __typename?: 'FileConnection';
                        edges?: Array<{
                            __typename?: 'FileEdge';
                            node: {
                                __typename?: 'File';
                                id?: string | null;
                                type?: FileType | null;
                                uri: string;
                                poster?: string | null;
                            };
                        } | null> | null;
                    } | null;
                    project?: {
                        __typename?: 'Project';
                        id?: string | null;
                        title?: string | null;
                        slug?: string | null;
                        dynamicLink?: string | null;
                        user?: {
                            __typename?: 'User';
                            id: string;
                            fullName?: string | null;
                            firstName?: string | null;
                            lastName?: string | null;
                            username?: any | null;
                            avatarUrl?: string | null;
                            isSilhouette?: boolean | null;
                            isOnline?: boolean | null;
                            website?: string | null;
                            location?: string | null;
                            bio?: string | null;
                            projectCount?: number | null;
                            dynamicLink?: string | null;
                        } | null;
                        permissions?: {
                            __typename?: 'ProjectPermissions';
                            isOwner?: boolean | null;
                            isFollower?: boolean | null;
                        } | null;
                        type?: {
                            __typename?: 'ProjectType';
                            title?: string | null;
                        } | null;
                        cover?: {
                            __typename?: 'CoverType';
                            uri?: string | null;
                        } | null;
                        followers?: {
                            __typename?: 'FollowersConnection';
                            totalCount?: number | null;
                            edges?: Array<{
                                __typename?: 'FollowersEdge';
                                node: {
                                    __typename?: 'User';
                                    id: string;
                                    username?: any | null;
                                    avatarUrl?: string | null;
                                };
                            }> | null;
                        } | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    bookmarks?: {
                        __typename?: 'Bookmarks';
                        isBookmarked?: boolean | null;
                    } | null;
                    comments?: {
                        __typename?: 'CommentConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'CommentEdge';
                            node: {
                                __typename?: 'Comment';
                                id?: string | null;
                                text: string;
                                createdAt?: any | null;
                                translatable?: boolean | null;
                                permissions?: {
                                    __typename?: 'CommentPermissions';
                                    isOwner?: boolean | null;
                                } | null;
                                likes?: {
                                    __typename?: 'Likes';
                                    isLiked?: boolean | null;
                                    totalCount?: number | null;
                                } | null;
                                user?: {
                                    __typename?: 'User';
                                    id: string;
                                    fullName?: string | null;
                                    firstName?: string | null;
                                    lastName?: string | null;
                                    username?: any | null;
                                    avatarUrl?: string | null;
                                    isSilhouette?: boolean | null;
                                    isOnline?: boolean | null;
                                    website?: string | null;
                                    location?: string | null;
                                    bio?: string | null;
                                    projectCount?: number | null;
                                    dynamicLink?: string | null;
                                } | null;
                            };
                        }> | null;
                    } | null;
                    likesConnection?: {
                        __typename?: 'LikeConnection';
                        edges?: Array<{
                            __typename?: 'LikeEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                    collection?: {
                        __typename?: 'Collection';
                        id?: string | null;
                        name?: string | null;
                        slug?: string | null;
                    } | null;
                };
            }> | null;
        } | null;
    } | null;
};
export declare type LikesQueryVariables = Exact<{
    postId: Scalars['ID'];
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type LikesQuery = {
    __typename?: 'Query';
    likes?: {
        __typename?: 'LikeConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'LikeEdge';
            cursor: string;
            node: {
                __typename?: 'User';
                id: string;
                fullName?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                username?: any | null;
                avatarUrl?: string | null;
                isSilhouette?: boolean | null;
                isOnline?: boolean | null;
                website?: string | null;
                location?: string | null;
                bio?: string | null;
                projectCount?: number | null;
                dynamicLink?: string | null;
            };
        }> | null;
    } | null;
};
export declare type MetaQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type MetaQuery = {
    __typename?: 'Query';
    meta?: {
        __typename?: 'Meta';
        totalUsers?: number | null;
        totalUsersToday?: number | null;
        totalPostsToday?: number | null;
        totalProjectsToday?: number | null;
        totalCommentsToday?: number | null;
        totalFilesToday?: number | null;
        totalComments?: number | null;
        totalProjects?: number | null;
        totalPosts?: number | null;
        totalFiles?: number | null;
    } | null;
};
export declare type NotificationsQueryVariables = Exact<{
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type NotificationsQuery = {
    __typename?: 'Query';
    notifications?: {
        __typename?: 'NotificationsConnection';
        pageInfo?: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        } | null;
        edges?: Array<{
            __typename?: 'NotificationEdge';
            cursor?: string | null;
            node?: {
                __typename?: 'Notification';
                id: string;
                type?: NotificationTypes | null;
                createdAt: any;
                user: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                };
                project?: {
                    __typename?: 'Project';
                    id?: string | null;
                    title?: string | null;
                    slug?: string | null;
                    dynamicLink?: string | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'ProjectPermissions';
                        isOwner?: boolean | null;
                        isFollower?: boolean | null;
                    } | null;
                    type?: {
                        __typename?: 'ProjectType';
                        title?: string | null;
                    } | null;
                    cover?: {
                        __typename?: 'CoverType';
                        uri?: string | null;
                    } | null;
                    followers?: {
                        __typename?: 'FollowersConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'FollowersEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                username?: any | null;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                } | null;
                post?: {
                    __typename?: 'Post';
                    id?: string | null;
                } | null;
                comment?: {
                    __typename?: 'Comment';
                    id?: string | null;
                    text: string;
                    postId?: string | null;
                } | null;
                files?: {
                    __typename?: 'FileConnection';
                    edges?: Array<{
                        __typename?: 'FileEdge';
                        node: {
                            __typename?: 'File';
                            id?: string | null;
                            uri: string;
                            poster?: string | null;
                        };
                    } | null> | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
};
export declare type PostQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type PostQuery = {
    __typename?: 'Query';
    post?: {
        __typename?: 'Post';
        id?: string | null;
        caption?: string | null;
        createdAt?: any | null;
        translatable?: boolean | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
        permissions?: {
            __typename?: 'PostPermissions';
            isOwner?: boolean | null;
        } | null;
        files?: {
            __typename?: 'FileConnection';
            edges?: Array<{
                __typename?: 'FileEdge';
                node: {
                    __typename?: 'File';
                    id?: string | null;
                    type?: FileType | null;
                    uri: string;
                    poster?: string | null;
                };
            } | null> | null;
        } | null;
        project?: {
            __typename?: 'Project';
            id?: string | null;
            title?: string | null;
            slug?: string | null;
            dynamicLink?: string | null;
            user?: {
                __typename?: 'User';
                id: string;
                fullName?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                username?: any | null;
                avatarUrl?: string | null;
                isSilhouette?: boolean | null;
                isOnline?: boolean | null;
                website?: string | null;
                location?: string | null;
                bio?: string | null;
                projectCount?: number | null;
                dynamicLink?: string | null;
            } | null;
            permissions?: {
                __typename?: 'ProjectPermissions';
                isOwner?: boolean | null;
                isFollower?: boolean | null;
            } | null;
            type?: {
                __typename?: 'ProjectType';
                title?: string | null;
            } | null;
            cover?: {
                __typename?: 'CoverType';
                uri?: string | null;
            } | null;
            followers?: {
                __typename?: 'FollowersConnection';
                totalCount?: number | null;
                edges?: Array<{
                    __typename?: 'FollowersEdge';
                    node: {
                        __typename?: 'User';
                        id: string;
                        username?: any | null;
                        avatarUrl?: string | null;
                    };
                }> | null;
            } | null;
        } | null;
        likes?: {
            __typename?: 'Likes';
            isLiked?: boolean | null;
            totalCount?: number | null;
        } | null;
        bookmarks?: {
            __typename?: 'Bookmarks';
            isBookmarked?: boolean | null;
        } | null;
        comments?: {
            __typename?: 'CommentConnection';
            totalCount?: number | null;
            edges?: Array<{
                __typename?: 'CommentEdge';
                node: {
                    __typename?: 'Comment';
                    id?: string | null;
                    text: string;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    permissions?: {
                        __typename?: 'CommentPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                };
            }> | null;
        } | null;
        likesConnection?: {
            __typename?: 'LikeConnection';
            edges?: Array<{
                __typename?: 'LikeEdge';
                node: {
                    __typename?: 'User';
                    id: string;
                    avatarUrl?: string | null;
                };
            }> | null;
        } | null;
        collection?: {
            __typename?: 'Collection';
            id?: string | null;
            name?: string | null;
            slug?: string | null;
        } | null;
    } | null;
};
export declare type PostsQueryVariables = Exact<{
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type PostsQuery = {
    __typename?: 'Query';
    posts?: {
        __typename?: 'PostConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'PostEdge';
            cursor: string;
            node: {
                __typename?: 'Post';
                id?: string | null;
                caption?: string | null;
                createdAt?: any | null;
                translatable?: boolean | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
                permissions?: {
                    __typename?: 'PostPermissions';
                    isOwner?: boolean | null;
                } | null;
                files?: {
                    __typename?: 'FileConnection';
                    edges?: Array<{
                        __typename?: 'FileEdge';
                        node: {
                            __typename?: 'File';
                            id?: string | null;
                            type?: FileType | null;
                            uri: string;
                            poster?: string | null;
                        };
                    } | null> | null;
                } | null;
                project?: {
                    __typename?: 'Project';
                    id?: string | null;
                    title?: string | null;
                    slug?: string | null;
                    dynamicLink?: string | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'ProjectPermissions';
                        isOwner?: boolean | null;
                        isFollower?: boolean | null;
                    } | null;
                    type?: {
                        __typename?: 'ProjectType';
                        title?: string | null;
                    } | null;
                    cover?: {
                        __typename?: 'CoverType';
                        uri?: string | null;
                    } | null;
                    followers?: {
                        __typename?: 'FollowersConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'FollowersEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                username?: any | null;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                } | null;
                likes?: {
                    __typename?: 'Likes';
                    isLiked?: boolean | null;
                    totalCount?: number | null;
                } | null;
                bookmarks?: {
                    __typename?: 'Bookmarks';
                    isBookmarked?: boolean | null;
                } | null;
                comments?: {
                    __typename?: 'CommentConnection';
                    totalCount?: number | null;
                    edges?: Array<{
                        __typename?: 'CommentEdge';
                        node: {
                            __typename?: 'Comment';
                            id?: string | null;
                            text: string;
                            createdAt?: any | null;
                            translatable?: boolean | null;
                            permissions?: {
                                __typename?: 'CommentPermissions';
                                isOwner?: boolean | null;
                            } | null;
                            likes?: {
                                __typename?: 'Likes';
                                isLiked?: boolean | null;
                                totalCount?: number | null;
                            } | null;
                            user?: {
                                __typename?: 'User';
                                id: string;
                                fullName?: string | null;
                                firstName?: string | null;
                                lastName?: string | null;
                                username?: any | null;
                                avatarUrl?: string | null;
                                isSilhouette?: boolean | null;
                                isOnline?: boolean | null;
                                website?: string | null;
                                location?: string | null;
                                bio?: string | null;
                                projectCount?: number | null;
                                dynamicLink?: string | null;
                            } | null;
                        };
                    }> | null;
                } | null;
                likesConnection?: {
                    __typename?: 'LikeConnection';
                    edges?: Array<{
                        __typename?: 'LikeEdge';
                        node: {
                            __typename?: 'User';
                            id: string;
                            avatarUrl?: string | null;
                        };
                    }> | null;
                } | null;
                collection?: {
                    __typename?: 'Collection';
                    id?: string | null;
                    name?: string | null;
                    slug?: string | null;
                } | null;
            };
        }> | null;
    } | null;
};
export declare type ProjectQueryVariables = Exact<{
    id?: InputMaybe<Scalars['ID']>;
    slug?: InputMaybe<Scalars['LowercaseString']>;
    after?: InputMaybe<Scalars['String']>;
    postId?: InputMaybe<Scalars['ID']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type ProjectQuery = {
    __typename?: 'Query';
    post?: {
        __typename?: 'Post';
        id?: string | null;
        caption?: string | null;
        createdAt?: any | null;
        translatable?: boolean | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
        permissions?: {
            __typename?: 'PostPermissions';
            isOwner?: boolean | null;
        } | null;
        files?: {
            __typename?: 'FileConnection';
            edges?: Array<{
                __typename?: 'FileEdge';
                node: {
                    __typename?: 'File';
                    id?: string | null;
                    type?: FileType | null;
                    uri: string;
                    poster?: string | null;
                };
            } | null> | null;
        } | null;
        project?: {
            __typename?: 'Project';
            id?: string | null;
            title?: string | null;
            slug?: string | null;
            dynamicLink?: string | null;
            user?: {
                __typename?: 'User';
                id: string;
                fullName?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                username?: any | null;
                avatarUrl?: string | null;
                isSilhouette?: boolean | null;
                isOnline?: boolean | null;
                website?: string | null;
                location?: string | null;
                bio?: string | null;
                projectCount?: number | null;
                dynamicLink?: string | null;
            } | null;
            permissions?: {
                __typename?: 'ProjectPermissions';
                isOwner?: boolean | null;
                isFollower?: boolean | null;
            } | null;
            type?: {
                __typename?: 'ProjectType';
                title?: string | null;
            } | null;
            cover?: {
                __typename?: 'CoverType';
                uri?: string | null;
            } | null;
            followers?: {
                __typename?: 'FollowersConnection';
                totalCount?: number | null;
                edges?: Array<{
                    __typename?: 'FollowersEdge';
                    node: {
                        __typename?: 'User';
                        id: string;
                        username?: any | null;
                        avatarUrl?: string | null;
                    };
                }> | null;
            } | null;
        } | null;
        likes?: {
            __typename?: 'Likes';
            isLiked?: boolean | null;
            totalCount?: number | null;
        } | null;
        bookmarks?: {
            __typename?: 'Bookmarks';
            isBookmarked?: boolean | null;
        } | null;
        comments?: {
            __typename?: 'CommentConnection';
            totalCount?: number | null;
            edges?: Array<{
                __typename?: 'CommentEdge';
                node: {
                    __typename?: 'Comment';
                    id?: string | null;
                    text: string;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    permissions?: {
                        __typename?: 'CommentPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                };
            }> | null;
        } | null;
        likesConnection?: {
            __typename?: 'LikeConnection';
            edges?: Array<{
                __typename?: 'LikeEdge';
                node: {
                    __typename?: 'User';
                    id: string;
                    avatarUrl?: string | null;
                };
            }> | null;
        } | null;
        collection?: {
            __typename?: 'Collection';
            id?: string | null;
            name?: string | null;
            slug?: string | null;
        } | null;
    } | null;
    project?: {
        __typename?: 'Project';
        id?: string | null;
        title?: string | null;
        slug?: string | null;
        dynamicLink?: string | null;
        posts?: {
            __typename?: 'PostConnection';
            totalCount?: number | null;
            pageInfo: {
                __typename?: 'PageInfo';
                hasNextPage?: boolean | null;
            };
            edges?: Array<{
                __typename?: 'PostEdge';
                cursor: string;
                node: {
                    __typename?: 'Post';
                    id?: string | null;
                    caption?: string | null;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'PostPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    files?: {
                        __typename?: 'FileConnection';
                        edges?: Array<{
                            __typename?: 'FileEdge';
                            node: {
                                __typename?: 'File';
                                id?: string | null;
                                type?: FileType | null;
                                uri: string;
                                poster?: string | null;
                            };
                        } | null> | null;
                    } | null;
                    project?: {
                        __typename?: 'Project';
                        id?: string | null;
                        title?: string | null;
                        slug?: string | null;
                        dynamicLink?: string | null;
                        user?: {
                            __typename?: 'User';
                            id: string;
                            fullName?: string | null;
                            firstName?: string | null;
                            lastName?: string | null;
                            username?: any | null;
                            avatarUrl?: string | null;
                            isSilhouette?: boolean | null;
                            isOnline?: boolean | null;
                            website?: string | null;
                            location?: string | null;
                            bio?: string | null;
                            projectCount?: number | null;
                            dynamicLink?: string | null;
                        } | null;
                        permissions?: {
                            __typename?: 'ProjectPermissions';
                            isOwner?: boolean | null;
                            isFollower?: boolean | null;
                        } | null;
                        type?: {
                            __typename?: 'ProjectType';
                            title?: string | null;
                        } | null;
                        cover?: {
                            __typename?: 'CoverType';
                            uri?: string | null;
                        } | null;
                        followers?: {
                            __typename?: 'FollowersConnection';
                            totalCount?: number | null;
                            edges?: Array<{
                                __typename?: 'FollowersEdge';
                                node: {
                                    __typename?: 'User';
                                    id: string;
                                    username?: any | null;
                                    avatarUrl?: string | null;
                                };
                            }> | null;
                        } | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    bookmarks?: {
                        __typename?: 'Bookmarks';
                        isBookmarked?: boolean | null;
                    } | null;
                    comments?: {
                        __typename?: 'CommentConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'CommentEdge';
                            node: {
                                __typename?: 'Comment';
                                id?: string | null;
                                text: string;
                                createdAt?: any | null;
                                translatable?: boolean | null;
                                permissions?: {
                                    __typename?: 'CommentPermissions';
                                    isOwner?: boolean | null;
                                } | null;
                                likes?: {
                                    __typename?: 'Likes';
                                    isLiked?: boolean | null;
                                    totalCount?: number | null;
                                } | null;
                                user?: {
                                    __typename?: 'User';
                                    id: string;
                                    fullName?: string | null;
                                    firstName?: string | null;
                                    lastName?: string | null;
                                    username?: any | null;
                                    avatarUrl?: string | null;
                                    isSilhouette?: boolean | null;
                                    isOnline?: boolean | null;
                                    website?: string | null;
                                    location?: string | null;
                                    bio?: string | null;
                                    projectCount?: number | null;
                                    dynamicLink?: string | null;
                                } | null;
                            };
                        }> | null;
                    } | null;
                    likesConnection?: {
                        __typename?: 'LikeConnection';
                        edges?: Array<{
                            __typename?: 'LikeEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                    collection?: {
                        __typename?: 'Collection';
                        id?: string | null;
                        name?: string | null;
                        slug?: string | null;
                    } | null;
                };
            }> | null;
        } | null;
        user?: {
            __typename?: 'User';
            id: string;
            fullName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            username?: any | null;
            avatarUrl?: string | null;
            isSilhouette?: boolean | null;
            isOnline?: boolean | null;
            website?: string | null;
            location?: string | null;
            bio?: string | null;
            projectCount?: number | null;
            dynamicLink?: string | null;
        } | null;
        permissions?: {
            __typename?: 'ProjectPermissions';
            isOwner?: boolean | null;
            isFollower?: boolean | null;
        } | null;
        type?: {
            __typename?: 'ProjectType';
            title?: string | null;
        } | null;
        cover?: {
            __typename?: 'CoverType';
            uri?: string | null;
        } | null;
        followers?: {
            __typename?: 'FollowersConnection';
            totalCount?: number | null;
            edges?: Array<{
                __typename?: 'FollowersEdge';
                node: {
                    __typename?: 'User';
                    id: string;
                    username?: any | null;
                    avatarUrl?: string | null;
                };
            }> | null;
        } | null;
    } | null;
};
export declare type ProjectCollectionsQueryVariables = Exact<{
    projectId?: InputMaybe<Scalars['ID']>;
    projectSlug?: InputMaybe<Scalars['LowercaseString']>;
    slug?: InputMaybe<Scalars['LowercaseString']>;
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type ProjectCollectionsQuery = {
    __typename?: 'Query';
    projectCollections?: {
        __typename?: 'CollectionConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'CollectionEdge';
            cursor: string;
            node: {
                __typename?: 'Collection';
                id?: string | null;
                name?: string | null;
                slug?: string | null;
                cover?: {
                    __typename?: 'CoverType';
                    uri?: string | null;
                } | null;
            };
        }> | null;
    } | null;
};
export declare type ProjectSuggestionsQueryVariables = Exact<{
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type ProjectSuggestionsQuery = {
    __typename?: 'Query';
    projects?: Array<{
        __typename?: 'ProjectSuggestionsConnection';
        type?: {
            __typename?: 'ProjectType';
            id?: string | null;
            title?: string | null;
        } | null;
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'ProjectEdge';
            node: {
                __typename?: 'Project';
                id?: string | null;
                title?: string | null;
                slug?: string | null;
                dynamicLink?: string | null;
                cover?: {
                    __typename?: 'CoverType';
                    uri?: string | null;
                    default?: boolean | null;
                } | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
                permissions?: {
                    __typename?: 'ProjectPermissions';
                    isOwner?: boolean | null;
                    isFollower?: boolean | null;
                } | null;
                type?: {
                    __typename?: 'ProjectType';
                    title?: string | null;
                } | null;
                followers?: {
                    __typename?: 'FollowersConnection';
                    totalCount?: number | null;
                    edges?: Array<{
                        __typename?: 'FollowersEdge';
                        node: {
                            __typename?: 'User';
                            id: string;
                            username?: any | null;
                            avatarUrl?: string | null;
                        };
                    }> | null;
                } | null;
            };
        }> | null;
    } | null> | null;
};
export declare type ProjectTypesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type ProjectTypesQuery = {
    __typename?: 'Query';
    types?: Array<{
        __typename?: 'ProjectType';
        id?: string | null;
        title?: string | null;
        imageUrl: string;
    } | null> | null;
};
export declare type ProjectsQueryVariables = Exact<{
    typeId?: InputMaybe<Scalars['ID']>;
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    type: ProjectSortType;
}>;
export declare type ProjectsQuery = {
    __typename?: 'Query';
    projects?: {
        __typename?: 'ProjectsConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'ProjectEdge';
            cursor: string;
            node: {
                __typename?: 'Project';
                id?: string | null;
                title?: string | null;
                slug?: string | null;
                dynamicLink?: string | null;
                cover?: {
                    __typename?: 'CoverType';
                    uri?: string | null;
                    default?: boolean | null;
                } | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
                permissions?: {
                    __typename?: 'ProjectPermissions';
                    isOwner?: boolean | null;
                    isFollower?: boolean | null;
                } | null;
                type?: {
                    __typename?: 'ProjectType';
                    title?: string | null;
                } | null;
                followers?: {
                    __typename?: 'FollowersConnection';
                    totalCount?: number | null;
                    edges?: Array<{
                        __typename?: 'FollowersEdge';
                        node: {
                            __typename?: 'User';
                            id: string;
                            username?: any | null;
                            avatarUrl?: string | null;
                        };
                    }> | null;
                } | null;
            };
        }> | null;
    } | null;
};
export declare type RecentCommentsQueryVariables = Exact<{
    after?: InputMaybe<Scalars['String']>;
}>;
export declare type RecentCommentsQuery = {
    __typename?: 'Query';
    comments?: {
        __typename?: 'CommentConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        };
        edges?: Array<{
            __typename?: 'CommentEdge';
            cursor: string;
            node: {
                __typename?: 'Comment';
                id?: string | null;
                text: string;
                createdAt?: any | null;
                translatable?: boolean | null;
                replies?: {
                    __typename?: 'CommentConnection';
                    totalCount?: number | null;
                    pageInfo: {
                        __typename?: 'PageInfo';
                        hasNextPage?: boolean | null;
                    };
                    edges?: Array<{
                        __typename?: 'CommentEdge';
                        cursor: string;
                        node: {
                            __typename?: 'Comment';
                            id?: string | null;
                            text: string;
                            createdAt?: any | null;
                            translatable?: boolean | null;
                            permissions?: {
                                __typename?: 'CommentPermissions';
                                isOwner?: boolean | null;
                            } | null;
                            likes?: {
                                __typename?: 'Likes';
                                isLiked?: boolean | null;
                                totalCount?: number | null;
                            } | null;
                            user?: {
                                __typename?: 'User';
                                id: string;
                                fullName?: string | null;
                                firstName?: string | null;
                                lastName?: string | null;
                                username?: any | null;
                                avatarUrl?: string | null;
                                isSilhouette?: boolean | null;
                                isOnline?: boolean | null;
                                website?: string | null;
                                location?: string | null;
                                bio?: string | null;
                                projectCount?: number | null;
                                dynamicLink?: string | null;
                            } | null;
                        };
                    }> | null;
                } | null;
                permissions?: {
                    __typename?: 'CommentPermissions';
                    isOwner?: boolean | null;
                } | null;
                likes?: {
                    __typename?: 'Likes';
                    isLiked?: boolean | null;
                    totalCount?: number | null;
                } | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
            };
        }> | null;
    } | null;
};
export declare type RepliesQueryVariables = Exact<{
    id: Scalars['ID'];
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type RepliesQuery = {
    __typename?: 'Query';
    comment?: {
        __typename?: 'Comment';
        replies?: {
            __typename?: 'CommentConnection';
            totalCount?: number | null;
            pageInfo: {
                __typename?: 'PageInfo';
                hasNextPage?: boolean | null;
            };
            edges?: Array<{
                __typename?: 'CommentEdge';
                cursor: string;
                node: {
                    __typename?: 'Comment';
                    id?: string | null;
                    text: string;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    permissions?: {
                        __typename?: 'CommentPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                };
            }> | null;
        } | null;
    } | null;
};
export declare type SearchHashtagsQueryVariables = Exact<{
    query: Scalars['String'];
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type SearchHashtagsQuery = {
    __typename?: 'Query';
    hashtags?: {
        __typename?: 'SearchResults';
        pageInfo?: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        } | null;
        edges?: Array<{
            __typename?: 'SearchResultEdge';
            cursor?: string | null;
            node?: {
                __typename?: 'Hashtag';
                id?: string | null;
                name?: string | null;
                slug?: any | null;
                totalCount?: number | null;
            } | {
                __typename?: 'Model';
            } | {
                __typename?: 'Project';
            } | {
                __typename?: 'User';
            } | null;
        } | null> | null;
    } | null;
};
export declare type SearchModelsQueryVariables = Exact<{
    query: Scalars['String'];
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type SearchModelsQuery = {
    __typename?: 'Query';
    models?: {
        __typename?: 'SearchResults';
        pageInfo?: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        } | null;
        edges?: Array<{
            __typename?: 'SearchResultEdge';
            cursor?: string | null;
            node?: {
                __typename?: 'Hashtag';
            } | {
                __typename?: 'Model';
                id: string;
                model?: string | null;
                year?: number | null;
                brand?: {
                    __typename?: 'Brand';
                    name?: string | null;
                } | null;
            } | {
                __typename?: 'Project';
            } | {
                __typename?: 'User';
            } | null;
        } | null> | null;
    } | null;
};
export declare type SearchProjectsQueryVariables = Exact<{
    query: Scalars['String'];
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type SearchProjectsQuery = {
    __typename?: 'Query';
    projects?: {
        __typename?: 'SearchResults';
        pageInfo?: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        } | null;
        edges?: Array<{
            __typename?: 'SearchResultEdge';
            cursor?: string | null;
            node?: {
                __typename?: 'Hashtag';
            } | {
                __typename?: 'Model';
            } | {
                __typename?: 'Project';
                id?: string | null;
                title?: string | null;
                slug?: string | null;
                dynamicLink?: string | null;
                cover?: {
                    __typename?: 'CoverType';
                    uri?: string | null;
                    default?: boolean | null;
                } | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
                permissions?: {
                    __typename?: 'ProjectPermissions';
                    isOwner?: boolean | null;
                    isFollower?: boolean | null;
                } | null;
                type?: {
                    __typename?: 'ProjectType';
                    title?: string | null;
                } | null;
                followers?: {
                    __typename?: 'FollowersConnection';
                    totalCount?: number | null;
                    edges?: Array<{
                        __typename?: 'FollowersEdge';
                        node: {
                            __typename?: 'User';
                            id: string;
                            username?: any | null;
                            avatarUrl?: string | null;
                        };
                    }> | null;
                } | null;
            } | {
                __typename?: 'User';
            } | null;
        } | null> | null;
    } | null;
};
export declare type SearchUsersQueryVariables = Exact<{
    query: Scalars['String'];
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type SearchUsersQuery = {
    __typename?: 'Query';
    users?: {
        __typename?: 'SearchResults';
        pageInfo?: {
            __typename?: 'PageInfo';
            hasNextPage?: boolean | null;
        } | null;
        edges?: Array<{
            __typename?: 'SearchResultEdge';
            cursor?: string | null;
            node?: {
                __typename?: 'Hashtag';
            } | {
                __typename?: 'Model';
            } | {
                __typename?: 'Project';
            } | {
                __typename?: 'User';
                projectCount?: number | null;
                id: string;
                fullName?: string | null;
                firstName?: string | null;
                lastName?: string | null;
                username?: any | null;
                avatarUrl?: string | null;
                isSilhouette?: boolean | null;
                isOnline?: boolean | null;
                website?: string | null;
                location?: string | null;
                bio?: string | null;
                dynamicLink?: string | null;
            } | null;
        } | null> | null;
    } | null;
};
export declare type SimilarProjectsQueryVariables = Exact<{
    id: Scalars['ID'];
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type SimilarProjectsQuery = {
    __typename?: 'Query';
    similarProjects?: {
        __typename?: 'ProjectsConnection';
        edges?: Array<{
            __typename?: 'ProjectEdge';
            cursor: string;
            node: {
                __typename?: 'Project';
                id?: string | null;
                title?: string | null;
                slug?: string | null;
                dynamicLink?: string | null;
                cover?: {
                    __typename?: 'CoverType';
                    uri?: string | null;
                } | null;
                user?: {
                    __typename?: 'User';
                    id: string;
                    fullName?: string | null;
                    firstName?: string | null;
                    lastName?: string | null;
                    username?: any | null;
                    avatarUrl?: string | null;
                    isSilhouette?: boolean | null;
                    isOnline?: boolean | null;
                    website?: string | null;
                    location?: string | null;
                    bio?: string | null;
                    projectCount?: number | null;
                    dynamicLink?: string | null;
                } | null;
                permissions?: {
                    __typename?: 'ProjectPermissions';
                    isOwner?: boolean | null;
                    isFollower?: boolean | null;
                } | null;
                type?: {
                    __typename?: 'ProjectType';
                    title?: string | null;
                } | null;
                followers?: {
                    __typename?: 'FollowersConnection';
                    totalCount?: number | null;
                    edges?: Array<{
                        __typename?: 'FollowersEdge';
                        node: {
                            __typename?: 'User';
                            id: string;
                            username?: any | null;
                            avatarUrl?: string | null;
                        };
                    }> | null;
                } | null;
            };
        }> | null;
    } | null;
};
export declare type UnreadNotificationsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type UnreadNotificationsQuery = {
    __typename?: 'Query';
    unreadNotifications?: number | null;
};
export declare type UserQueryVariables = Exact<{
    username: Scalars['LowercaseString'];
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type UserQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'User';
        id: string;
        fullName?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        username?: any | null;
        avatarUrl?: string | null;
        isSilhouette?: boolean | null;
        isOnline?: boolean | null;
        website?: string | null;
        location?: string | null;
        bio?: string | null;
        projectCount?: number | null;
        dynamicLink?: string | null;
        projects?: {
            __typename?: 'ProjectsConnection';
            edges?: Array<{
                __typename?: 'ProjectEdge';
                node: {
                    __typename?: 'Project';
                    id?: string | null;
                    title?: string | null;
                    slug?: string | null;
                    dynamicLink?: string | null;
                    cover?: {
                        __typename?: 'CoverType';
                        uri?: string | null;
                        default?: boolean | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'ProjectPermissions';
                        isOwner?: boolean | null;
                        isFollower?: boolean | null;
                    } | null;
                    type?: {
                        __typename?: 'ProjectType';
                        title?: string | null;
                    } | null;
                    followers?: {
                        __typename?: 'FollowersConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'FollowersEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                username?: any | null;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                };
            }> | null;
        } | null;
        posts?: {
            __typename?: 'PostConnection';
            edges?: Array<{
                __typename?: 'PostEdge';
                cursor: string;
                node: {
                    __typename?: 'Post';
                    id?: string | null;
                    caption?: string | null;
                    createdAt?: any | null;
                    translatable?: boolean | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'PostPermissions';
                        isOwner?: boolean | null;
                    } | null;
                    files?: {
                        __typename?: 'FileConnection';
                        edges?: Array<{
                            __typename?: 'FileEdge';
                            node: {
                                __typename?: 'File';
                                id?: string | null;
                                type?: FileType | null;
                                uri: string;
                                poster?: string | null;
                            };
                        } | null> | null;
                    } | null;
                    project?: {
                        __typename?: 'Project';
                        id?: string | null;
                        title?: string | null;
                        slug?: string | null;
                        dynamicLink?: string | null;
                        user?: {
                            __typename?: 'User';
                            id: string;
                            fullName?: string | null;
                            firstName?: string | null;
                            lastName?: string | null;
                            username?: any | null;
                            avatarUrl?: string | null;
                            isSilhouette?: boolean | null;
                            isOnline?: boolean | null;
                            website?: string | null;
                            location?: string | null;
                            bio?: string | null;
                            projectCount?: number | null;
                            dynamicLink?: string | null;
                        } | null;
                        permissions?: {
                            __typename?: 'ProjectPermissions';
                            isOwner?: boolean | null;
                            isFollower?: boolean | null;
                        } | null;
                        type?: {
                            __typename?: 'ProjectType';
                            title?: string | null;
                        } | null;
                        cover?: {
                            __typename?: 'CoverType';
                            uri?: string | null;
                        } | null;
                        followers?: {
                            __typename?: 'FollowersConnection';
                            totalCount?: number | null;
                            edges?: Array<{
                                __typename?: 'FollowersEdge';
                                node: {
                                    __typename?: 'User';
                                    id: string;
                                    username?: any | null;
                                    avatarUrl?: string | null;
                                };
                            }> | null;
                        } | null;
                    } | null;
                    likes?: {
                        __typename?: 'Likes';
                        isLiked?: boolean | null;
                        totalCount?: number | null;
                    } | null;
                    bookmarks?: {
                        __typename?: 'Bookmarks';
                        isBookmarked?: boolean | null;
                    } | null;
                    comments?: {
                        __typename?: 'CommentConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'CommentEdge';
                            node: {
                                __typename?: 'Comment';
                                id?: string | null;
                                text: string;
                                createdAt?: any | null;
                                translatable?: boolean | null;
                                permissions?: {
                                    __typename?: 'CommentPermissions';
                                    isOwner?: boolean | null;
                                } | null;
                                likes?: {
                                    __typename?: 'Likes';
                                    isLiked?: boolean | null;
                                    totalCount?: number | null;
                                } | null;
                                user?: {
                                    __typename?: 'User';
                                    id: string;
                                    fullName?: string | null;
                                    firstName?: string | null;
                                    lastName?: string | null;
                                    username?: any | null;
                                    avatarUrl?: string | null;
                                    isSilhouette?: boolean | null;
                                    isOnline?: boolean | null;
                                    website?: string | null;
                                    location?: string | null;
                                    bio?: string | null;
                                    projectCount?: number | null;
                                    dynamicLink?: string | null;
                                } | null;
                            };
                        }> | null;
                    } | null;
                    likesConnection?: {
                        __typename?: 'LikeConnection';
                        edges?: Array<{
                            __typename?: 'LikeEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                    collection?: {
                        __typename?: 'Collection';
                        id?: string | null;
                        name?: string | null;
                        slug?: string | null;
                    } | null;
                };
            }> | null;
            pageInfo: {
                __typename?: 'PageInfo';
                hasNextPage?: boolean | null;
            };
        } | null;
    } | null;
};
export declare type UserFollowingProjectsQueryVariables = Exact<{
    username: Scalars['LowercaseString'];
    after?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
}>;
export declare type UserFollowingProjectsQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'User';
        id: string;
        projects?: {
            __typename?: 'ProjectsConnection';
            pageInfo: {
                __typename?: 'PageInfo';
                hasNextPage?: boolean | null;
            };
            edges?: Array<{
                __typename?: 'ProjectEdge';
                cursor: string;
                node: {
                    __typename?: 'Project';
                    id?: string | null;
                    title?: string | null;
                    slug?: string | null;
                    dynamicLink?: string | null;
                    cover?: {
                        __typename?: 'CoverType';
                        uri?: string | null;
                        default?: boolean | null;
                    } | null;
                    user?: {
                        __typename?: 'User';
                        id: string;
                        fullName?: string | null;
                        firstName?: string | null;
                        lastName?: string | null;
                        username?: any | null;
                        avatarUrl?: string | null;
                        isSilhouette?: boolean | null;
                        isOnline?: boolean | null;
                        website?: string | null;
                        location?: string | null;
                        bio?: string | null;
                        projectCount?: number | null;
                        dynamicLink?: string | null;
                    } | null;
                    permissions?: {
                        __typename?: 'ProjectPermissions';
                        isOwner?: boolean | null;
                        isFollower?: boolean | null;
                    } | null;
                    type?: {
                        __typename?: 'ProjectType';
                        title?: string | null;
                    } | null;
                    followers?: {
                        __typename?: 'FollowersConnection';
                        totalCount?: number | null;
                        edges?: Array<{
                            __typename?: 'FollowersEdge';
                            node: {
                                __typename?: 'User';
                                id: string;
                                username?: any | null;
                                avatarUrl?: string | null;
                            };
                        }> | null;
                    } | null;
                };
            }> | null;
        } | null;
    } | null;
};
export declare const UserFragmentDoc: Apollo.DocumentNode;
export declare const BlogPostFragmentDoc: Apollo.DocumentNode;
export declare const CollectionFragmentDoc: Apollo.DocumentNode;
export declare const CommentFragmentDoc: Apollo.DocumentNode;
export declare const CommentAndRepliesFragmentDoc: Apollo.DocumentNode;
export declare const ProjectFragmentDoc: Apollo.DocumentNode;
export declare const NotificationFragmentDoc: Apollo.DocumentNode;
export declare const PostFragmentDoc: Apollo.DocumentNode;
export declare const UserProjectsFragmentDoc: Apollo.DocumentNode;
export declare const UserSettingsFragmentDoc: Apollo.DocumentNode;
export declare const AddBlogPostDocument: Apollo.DocumentNode;
export declare type AddBlogPostMutationFn = Apollo.MutationFunction<AddBlogPostMutation, AddBlogPostMutationVariables>;
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
export declare function useAddBlogPostMutation(baseOptions?: Apollo.MutationHookOptions<AddBlogPostMutation, AddBlogPostMutationVariables>): Apollo.MutationTuple<AddBlogPostMutation, Exact<{
    id?: InputMaybe<string> | undefined;
    input: BlogPostInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type AddBlogPostMutationHookResult = ReturnType<typeof useAddBlogPostMutation>;
export declare type AddBlogPostMutationResult = Apollo.MutationResult<AddBlogPostMutation>;
export declare type AddBlogPostMutationOptions = Apollo.BaseMutationOptions<AddBlogPostMutation, AddBlogPostMutationVariables>;
export declare const AddCollectionDocument: Apollo.DocumentNode;
export declare type AddCollectionMutationFn = Apollo.MutationFunction<AddCollectionMutation, AddCollectionMutationVariables>;
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
export declare function useAddCollectionMutation(baseOptions?: Apollo.MutationHookOptions<AddCollectionMutation, AddCollectionMutationVariables>): Apollo.MutationTuple<AddCollectionMutation, Exact<{
    projectId: string;
    name: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type AddCollectionMutationHookResult = ReturnType<typeof useAddCollectionMutation>;
export declare type AddCollectionMutationResult = Apollo.MutationResult<AddCollectionMutation>;
export declare type AddCollectionMutationOptions = Apollo.BaseMutationOptions<AddCollectionMutation, AddCollectionMutationVariables>;
export declare const AddCommentDocument: Apollo.DocumentNode;
export declare type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;
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
export declare function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>): Apollo.MutationTuple<AddCommentMutation, Exact<{
    postId: string;
    commentId?: InputMaybe<string> | undefined;
    input: CommentInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export declare type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export declare type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export declare const AddPostDocument: Apollo.DocumentNode;
export declare type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;
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
export declare function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>): Apollo.MutationTuple<AddPostMutation, Exact<{
    input: PostInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export declare type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export declare type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export declare const AddProjectDocument: Apollo.DocumentNode;
export declare type AddProjectMutationFn = Apollo.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;
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
export declare function useAddProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>): Apollo.MutationTuple<AddProjectMutation, Exact<{
    input: ProjectInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export declare type AddProjectMutationResult = Apollo.MutationResult<AddProjectMutation>;
export declare type AddProjectMutationOptions = Apollo.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export declare const AuthenticateAppleDocument: Apollo.DocumentNode;
export declare type AuthenticateAppleMutationFn = Apollo.MutationFunction<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>;
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
export declare function useAuthenticateAppleMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>): Apollo.MutationTuple<AuthenticateAppleMutation, Exact<{
    identityToken: string;
    user: ApplePayload;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type AuthenticateAppleMutationHookResult = ReturnType<typeof useAuthenticateAppleMutation>;
export declare type AuthenticateAppleMutationResult = Apollo.MutationResult<AuthenticateAppleMutation>;
export declare type AuthenticateAppleMutationOptions = Apollo.BaseMutationOptions<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>;
export declare const AuthenticateFacebookDocument: Apollo.DocumentNode;
export declare type AuthenticateFacebookMutationFn = Apollo.MutationFunction<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>;
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
export declare function useAuthenticateFacebookMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>): Apollo.MutationTuple<AuthenticateFacebookMutation, Exact<{
    token: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type AuthenticateFacebookMutationHookResult = ReturnType<typeof useAuthenticateFacebookMutation>;
export declare type AuthenticateFacebookMutationResult = Apollo.MutationResult<AuthenticateFacebookMutation>;
export declare type AuthenticateFacebookMutationOptions = Apollo.BaseMutationOptions<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>;
export declare const AuthenticateGoogleDocument: Apollo.DocumentNode;
export declare type AuthenticateGoogleMutationFn = Apollo.MutationFunction<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>;
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
export declare function useAuthenticateGoogleMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>): Apollo.MutationTuple<AuthenticateGoogleMutation, Exact<{
    idToken: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type AuthenticateGoogleMutationHookResult = ReturnType<typeof useAuthenticateGoogleMutation>;
export declare type AuthenticateGoogleMutationResult = Apollo.MutationResult<AuthenticateGoogleMutation>;
export declare type AuthenticateGoogleMutationOptions = Apollo.BaseMutationOptions<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>;
export declare const BanUserDocument: Apollo.DocumentNode;
export declare type BanUserMutationFn = Apollo.MutationFunction<BanUserMutation, BanUserMutationVariables>;
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
export declare function useBanUserMutation(baseOptions?: Apollo.MutationHookOptions<BanUserMutation, BanUserMutationVariables>): Apollo.MutationTuple<BanUserMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type BanUserMutationHookResult = ReturnType<typeof useBanUserMutation>;
export declare type BanUserMutationResult = Apollo.MutationResult<BanUserMutation>;
export declare type BanUserMutationOptions = Apollo.BaseMutationOptions<BanUserMutation, BanUserMutationVariables>;
export declare const BookmarkPostDocument: Apollo.DocumentNode;
export declare type BookmarkPostMutationFn = Apollo.MutationFunction<BookmarkPostMutation, BookmarkPostMutationVariables>;
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
export declare function useBookmarkPostMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkPostMutation, BookmarkPostMutationVariables>): Apollo.MutationTuple<BookmarkPostMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type BookmarkPostMutationHookResult = ReturnType<typeof useBookmarkPostMutation>;
export declare type BookmarkPostMutationResult = Apollo.MutationResult<BookmarkPostMutation>;
export declare type BookmarkPostMutationOptions = Apollo.BaseMutationOptions<BookmarkPostMutation, BookmarkPostMutationVariables>;
export declare const CollectPostsDocument: Apollo.DocumentNode;
export declare type CollectPostsMutationFn = Apollo.MutationFunction<CollectPostsMutation, CollectPostsMutationVariables>;
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
export declare function useCollectPostsMutation(baseOptions?: Apollo.MutationHookOptions<CollectPostsMutation, CollectPostsMutationVariables>): Apollo.MutationTuple<CollectPostsMutation, Exact<{
    projectId: string;
    collectionId: string;
    input?: InputMaybe<InputMaybe<CollectionInput> | InputMaybe<CollectionInput>[]> | undefined;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CollectPostsMutationHookResult = ReturnType<typeof useCollectPostsMutation>;
export declare type CollectPostsMutationResult = Apollo.MutationResult<CollectPostsMutation>;
export declare type CollectPostsMutationOptions = Apollo.BaseMutationOptions<CollectPostsMutation, CollectPostsMutationVariables>;
export declare const DeleteBlogPostDocument: Apollo.DocumentNode;
export declare type DeleteBlogPostMutationFn = Apollo.MutationFunction<DeleteBlogPostMutation, DeleteBlogPostMutationVariables>;
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
export declare function useDeleteBlogPostMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBlogPostMutation, DeleteBlogPostMutationVariables>): Apollo.MutationTuple<DeleteBlogPostMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteBlogPostMutationHookResult = ReturnType<typeof useDeleteBlogPostMutation>;
export declare type DeleteBlogPostMutationResult = Apollo.MutationResult<DeleteBlogPostMutation>;
export declare type DeleteBlogPostMutationOptions = Apollo.BaseMutationOptions<DeleteBlogPostMutation, DeleteBlogPostMutationVariables>;
export declare const DeleteCollectionDocument: Apollo.DocumentNode;
export declare type DeleteCollectionMutationFn = Apollo.MutationFunction<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
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
export declare function useDeleteCollectionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCollectionMutation, DeleteCollectionMutationVariables>): Apollo.MutationTuple<DeleteCollectionMutation, Exact<{
    projectId: string;
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteCollectionMutationHookResult = ReturnType<typeof useDeleteCollectionMutation>;
export declare type DeleteCollectionMutationResult = Apollo.MutationResult<DeleteCollectionMutation>;
export declare type DeleteCollectionMutationOptions = Apollo.BaseMutationOptions<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
export declare const DeleteCommentDocument: Apollo.DocumentNode;
export declare type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;
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
export declare function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>): Apollo.MutationTuple<DeleteCommentMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export declare type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export declare type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export declare const DeleteCurrentUserDocument: Apollo.DocumentNode;
export declare type DeleteCurrentUserMutationFn = Apollo.MutationFunction<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>;
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
export declare function useDeleteCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>): Apollo.MutationTuple<DeleteCurrentUserMutation, Exact<{
    [key: string]: never;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteCurrentUserMutationHookResult = ReturnType<typeof useDeleteCurrentUserMutation>;
export declare type DeleteCurrentUserMutationResult = Apollo.MutationResult<DeleteCurrentUserMutation>;
export declare type DeleteCurrentUserMutationOptions = Apollo.BaseMutationOptions<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>;
export declare const DeleteNotificationDocument: Apollo.DocumentNode;
export declare type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
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
export declare function useDeleteNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>): Apollo.MutationTuple<DeleteNotificationMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export declare type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export declare type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export declare const DeletePostDocument: Apollo.DocumentNode;
export declare type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;
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
export declare function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>): Apollo.MutationTuple<DeletePostMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export declare type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export declare type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export declare const DeleteProjectDocument: Apollo.DocumentNode;
export declare type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;
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
export declare function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>): Apollo.MutationTuple<DeleteProjectMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export declare type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export declare type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export declare const DeleteUserDocument: Apollo.DocumentNode;
export declare type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;
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
export declare function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>): Apollo.MutationTuple<DeleteUserMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export declare type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export declare type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export declare const EditCollectionDocument: Apollo.DocumentNode;
export declare type EditCollectionMutationFn = Apollo.MutationFunction<EditCollectionMutation, EditCollectionMutationVariables>;
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
export declare function useEditCollectionMutation(baseOptions?: Apollo.MutationHookOptions<EditCollectionMutation, EditCollectionMutationVariables>): Apollo.MutationTuple<EditCollectionMutation, Exact<{
    input: EditCollectionInput;
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type EditCollectionMutationHookResult = ReturnType<typeof useEditCollectionMutation>;
export declare type EditCollectionMutationResult = Apollo.MutationResult<EditCollectionMutation>;
export declare type EditCollectionMutationOptions = Apollo.BaseMutationOptions<EditCollectionMutation, EditCollectionMutationVariables>;
export declare const EditPostDocument: Apollo.DocumentNode;
export declare type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;
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
export declare function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>): Apollo.MutationTuple<EditPostMutation, Exact<{
    id: string;
    input: EditPostInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export declare type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export declare type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export declare const EditProjectDocument: Apollo.DocumentNode;
export declare type EditProjectMutationFn = Apollo.MutationFunction<EditProjectMutation, EditProjectMutationVariables>;
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
export declare function useEditProjectMutation(baseOptions?: Apollo.MutationHookOptions<EditProjectMutation, EditProjectMutationVariables>): Apollo.MutationTuple<EditProjectMutation, Exact<{
    id: string;
    input: ProjectInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type EditProjectMutationHookResult = ReturnType<typeof useEditProjectMutation>;
export declare type EditProjectMutationResult = Apollo.MutationResult<EditProjectMutation>;
export declare type EditProjectMutationOptions = Apollo.BaseMutationOptions<EditProjectMutation, EditProjectMutationVariables>;
export declare const EditUserDocument: Apollo.DocumentNode;
export declare type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;
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
export declare function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>): Apollo.MutationTuple<EditUserMutation, Exact<{
    input: EditUserInput;
    id?: InputMaybe<string> | undefined;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export declare type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export declare type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export declare const FollowProjectDocument: Apollo.DocumentNode;
export declare type FollowProjectMutationFn = Apollo.MutationFunction<FollowProjectMutation, FollowProjectMutationVariables>;
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
export declare function useFollowProjectMutation(baseOptions?: Apollo.MutationHookOptions<FollowProjectMutation, FollowProjectMutationVariables>): Apollo.MutationTuple<FollowProjectMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type FollowProjectMutationHookResult = ReturnType<typeof useFollowProjectMutation>;
export declare type FollowProjectMutationResult = Apollo.MutationResult<FollowProjectMutation>;
export declare type FollowProjectMutationOptions = Apollo.BaseMutationOptions<FollowProjectMutation, FollowProjectMutationVariables>;
export declare const LikeCommentDocument: Apollo.DocumentNode;
export declare type LikeCommentMutationFn = Apollo.MutationFunction<LikeCommentMutation, LikeCommentMutationVariables>;
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
export declare function useLikeCommentMutation(baseOptions?: Apollo.MutationHookOptions<LikeCommentMutation, LikeCommentMutationVariables>): Apollo.MutationTuple<LikeCommentMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type LikeCommentMutationHookResult = ReturnType<typeof useLikeCommentMutation>;
export declare type LikeCommentMutationResult = Apollo.MutationResult<LikeCommentMutation>;
export declare type LikeCommentMutationOptions = Apollo.BaseMutationOptions<LikeCommentMutation, LikeCommentMutationVariables>;
export declare const LikePostDocument: Apollo.DocumentNode;
export declare type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;
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
export declare function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>): Apollo.MutationTuple<LikePostMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export declare type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export declare type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export declare const MarkAllNotificationsSeenDocument: Apollo.DocumentNode;
export declare type MarkAllNotificationsSeenMutationFn = Apollo.MutationFunction<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>;
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
export declare function useMarkAllNotificationsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>): Apollo.MutationTuple<MarkAllNotificationsSeenMutation, Exact<{
    [key: string]: never;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type MarkAllNotificationsSeenMutationHookResult = ReturnType<typeof useMarkAllNotificationsSeenMutation>;
export declare type MarkAllNotificationsSeenMutationResult = Apollo.MutationResult<MarkAllNotificationsSeenMutation>;
export declare type MarkAllNotificationsSeenMutationOptions = Apollo.BaseMutationOptions<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>;
export declare const MarkNotificationSeenDocument: Apollo.DocumentNode;
export declare type MarkNotificationSeenMutationFn = Apollo.MutationFunction<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>;
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
export declare function useMarkNotificationSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>): Apollo.MutationTuple<MarkNotificationSeenMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type MarkNotificationSeenMutationHookResult = ReturnType<typeof useMarkNotificationSeenMutation>;
export declare type MarkNotificationSeenMutationResult = Apollo.MutationResult<MarkNotificationSeenMutation>;
export declare type MarkNotificationSeenMutationOptions = Apollo.BaseMutationOptions<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>;
export declare const PreSignUrlDocument: Apollo.DocumentNode;
export declare type PreSignUrlMutationFn = Apollo.MutationFunction<PreSignUrlMutation, PreSignUrlMutationVariables>;
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
export declare function usePreSignUrlMutation(baseOptions?: Apollo.MutationHookOptions<PreSignUrlMutation, PreSignUrlMutationVariables>): Apollo.MutationTuple<PreSignUrlMutation, Exact<{
    input: PreSignedUrlInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type PreSignUrlMutationHookResult = ReturnType<typeof usePreSignUrlMutation>;
export declare type PreSignUrlMutationResult = Apollo.MutationResult<PreSignUrlMutation>;
export declare type PreSignUrlMutationOptions = Apollo.BaseMutationOptions<PreSignUrlMutation, PreSignUrlMutationVariables>;
export declare const PreSignUrlsDocument: Apollo.DocumentNode;
export declare type PreSignUrlsMutationFn = Apollo.MutationFunction<PreSignUrlsMutation, PreSignUrlsMutationVariables>;
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
export declare function usePreSignUrlsMutation(baseOptions?: Apollo.MutationHookOptions<PreSignUrlsMutation, PreSignUrlsMutationVariables>): Apollo.MutationTuple<PreSignUrlsMutation, Exact<{
    input: InputMaybe<PreSignedUrlnput> | InputMaybe<PreSignedUrlnput>[];
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type PreSignUrlsMutationHookResult = ReturnType<typeof usePreSignUrlsMutation>;
export declare type PreSignUrlsMutationResult = Apollo.MutationResult<PreSignUrlsMutation>;
export declare type PreSignUrlsMutationOptions = Apollo.BaseMutationOptions<PreSignUrlsMutation, PreSignUrlsMutationVariables>;
export declare const RefreshTokenDocument: Apollo.DocumentNode;
export declare type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;
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
export declare function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>): Apollo.MutationTuple<RefreshTokenMutation, Exact<{
    refreshToken: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export declare type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export declare type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export declare const RegisterDeviceTokenDocument: Apollo.DocumentNode;
export declare type RegisterDeviceTokenMutationFn = Apollo.MutationFunction<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;
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
export declare function useRegisterDeviceTokenMutation(baseOptions?: Apollo.MutationHookOptions<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>): Apollo.MutationTuple<RegisterDeviceTokenMutation, Exact<{
    token: string;
    platform: PlatformType;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type RegisterDeviceTokenMutationHookResult = ReturnType<typeof useRegisterDeviceTokenMutation>;
export declare type RegisterDeviceTokenMutationResult = Apollo.MutationResult<RegisterDeviceTokenMutation>;
export declare type RegisterDeviceTokenMutationOptions = Apollo.BaseMutationOptions<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;
export declare const SendPromoDocument: Apollo.DocumentNode;
export declare type SendPromoMutationFn = Apollo.MutationFunction<SendPromoMutation, SendPromoMutationVariables>;
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
export declare function useSendPromoMutation(baseOptions?: Apollo.MutationHookOptions<SendPromoMutation, SendPromoMutationVariables>): Apollo.MutationTuple<SendPromoMutation, Exact<{
    number: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type SendPromoMutationHookResult = ReturnType<typeof useSendPromoMutation>;
export declare type SendPromoMutationResult = Apollo.MutationResult<SendPromoMutation>;
export declare type SendPromoMutationOptions = Apollo.BaseMutationOptions<SendPromoMutation, SendPromoMutationVariables>;
export declare const ToggleNotificationSettingsDocument: Apollo.DocumentNode;
export declare type ToggleNotificationSettingsMutationFn = Apollo.MutationFunction<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>;
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
export declare function useToggleNotificationSettingsMutation(baseOptions?: Apollo.MutationHookOptions<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>): Apollo.MutationTuple<ToggleNotificationSettingsMutation, Exact<{
    input?: InputMaybe<ToggleNotificationSettingsInput> | undefined;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type ToggleNotificationSettingsMutationHookResult = ReturnType<typeof useToggleNotificationSettingsMutation>;
export declare type ToggleNotificationSettingsMutationResult = Apollo.MutationResult<ToggleNotificationSettingsMutation>;
export declare type ToggleNotificationSettingsMutationOptions = Apollo.BaseMutationOptions<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>;
export declare const TranslateCommentDocument: Apollo.DocumentNode;
export declare type TranslateCommentMutationFn = Apollo.MutationFunction<TranslateCommentMutation, TranslateCommentMutationVariables>;
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
export declare function useTranslateCommentMutation(baseOptions?: Apollo.MutationHookOptions<TranslateCommentMutation, TranslateCommentMutationVariables>): Apollo.MutationTuple<TranslateCommentMutation, Exact<{
    id: string;
    original?: InputMaybe<boolean> | undefined;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type TranslateCommentMutationHookResult = ReturnType<typeof useTranslateCommentMutation>;
export declare type TranslateCommentMutationResult = Apollo.MutationResult<TranslateCommentMutation>;
export declare type TranslateCommentMutationOptions = Apollo.BaseMutationOptions<TranslateCommentMutation, TranslateCommentMutationVariables>;
export declare const TranslatePostDocument: Apollo.DocumentNode;
export declare type TranslatePostMutationFn = Apollo.MutationFunction<TranslatePostMutation, TranslatePostMutationVariables>;
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
export declare function useTranslatePostMutation(baseOptions?: Apollo.MutationHookOptions<TranslatePostMutation, TranslatePostMutationVariables>): Apollo.MutationTuple<TranslatePostMutation, Exact<{
    id: string;
    original?: InputMaybe<boolean> | undefined;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type TranslatePostMutationHookResult = ReturnType<typeof useTranslatePostMutation>;
export declare type TranslatePostMutationResult = Apollo.MutationResult<TranslatePostMutation>;
export declare type TranslatePostMutationOptions = Apollo.BaseMutationOptions<TranslatePostMutation, TranslatePostMutationVariables>;
export declare const BlogPostDocument: Apollo.DocumentNode;
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
export declare function useBlogPostQuery(baseOptions?: Apollo.QueryHookOptions<BlogPostQuery, BlogPostQueryVariables>): Apollo.QueryResult<BlogPostQuery, Exact<{
    slug?: any;
    id?: InputMaybe<string> | undefined;
}>>;
export declare function useBlogPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogPostQuery, BlogPostQueryVariables>): Apollo.QueryTuple<BlogPostQuery, Exact<{
    slug?: any;
    id?: InputMaybe<string> | undefined;
}>>;
export declare type BlogPostQueryHookResult = ReturnType<typeof useBlogPostQuery>;
export declare type BlogPostLazyQueryHookResult = ReturnType<typeof useBlogPostLazyQuery>;
export declare type BlogPostQueryResult = Apollo.QueryResult<BlogPostQuery, BlogPostQueryVariables>;
export declare const BlogPostsDocument: Apollo.DocumentNode;
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
export declare function useBlogPostsQuery(baseOptions?: Apollo.QueryHookOptions<BlogPostsQuery, BlogPostsQueryVariables>): Apollo.QueryResult<BlogPostsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useBlogPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogPostsQuery, BlogPostsQueryVariables>): Apollo.QueryTuple<BlogPostsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type BlogPostsQueryHookResult = ReturnType<typeof useBlogPostsQuery>;
export declare type BlogPostsLazyQueryHookResult = ReturnType<typeof useBlogPostsLazyQuery>;
export declare type BlogPostsQueryResult = Apollo.QueryResult<BlogPostsQuery, BlogPostsQueryVariables>;
export declare const BookmarksDocument: Apollo.DocumentNode;
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
export declare function useBookmarksQuery(baseOptions?: Apollo.QueryHookOptions<BookmarksQuery, BookmarksQueryVariables>): Apollo.QueryResult<BookmarksQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookmarksQuery, BookmarksQueryVariables>): Apollo.QueryTuple<BookmarksQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type BookmarksQueryHookResult = ReturnType<typeof useBookmarksQuery>;
export declare type BookmarksLazyQueryHookResult = ReturnType<typeof useBookmarksLazyQuery>;
export declare type BookmarksQueryResult = Apollo.QueryResult<BookmarksQuery, BookmarksQueryVariables>;
export declare const CollectionsDocument: Apollo.DocumentNode;
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
export declare function useCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<CollectionsQuery, CollectionsQueryVariables>): Apollo.QueryResult<CollectionsQuery, Exact<{
    id?: InputMaybe<string> | undefined;
    slug?: any;
    projectId?: InputMaybe<string> | undefined;
    projectSlug?: any;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionsQuery, CollectionsQueryVariables>): Apollo.QueryTuple<CollectionsQuery, Exact<{
    id?: InputMaybe<string> | undefined;
    slug?: any;
    projectId?: InputMaybe<string> | undefined;
    projectSlug?: any;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type CollectionsQueryHookResult = ReturnType<typeof useCollectionsQuery>;
export declare type CollectionsLazyQueryHookResult = ReturnType<typeof useCollectionsLazyQuery>;
export declare type CollectionsQueryResult = Apollo.QueryResult<CollectionsQuery, CollectionsQueryVariables>;
export declare const CommentDocument: Apollo.DocumentNode;
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
export declare function useCommentQuery(baseOptions: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>): Apollo.QueryResult<CommentQuery, Exact<{
    id: string;
}>>;
export declare function useCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>): Apollo.QueryTuple<CommentQuery, Exact<{
    id: string;
}>>;
export declare type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export declare type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export declare type CommentQueryResult = Apollo.QueryResult<CommentQuery, CommentQueryVariables>;
export declare const CommentsDocument: Apollo.DocumentNode;
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
export declare function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>): Apollo.QueryResult<CommentsQuery, Exact<{
    postId: string;
    after?: InputMaybe<string> | undefined;
}>>;
export declare function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>): Apollo.QueryTuple<CommentsQuery, Exact<{
    postId: string;
    after?: InputMaybe<string> | undefined;
}>>;
export declare type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export declare type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export declare type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export declare const CurrentUserDocument: Apollo.DocumentNode;
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
export declare function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>): Apollo.QueryResult<CurrentUserQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>): Apollo.QueryTuple<CurrentUserQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export declare type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export declare type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export declare const CurrentUserFollowingProjectsDocument: Apollo.DocumentNode;
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
export declare function useCurrentUserFollowingProjectsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>): Apollo.QueryResult<CurrentUserFollowingProjectsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useCurrentUserFollowingProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>): Apollo.QueryTuple<CurrentUserFollowingProjectsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type CurrentUserFollowingProjectsQueryHookResult = ReturnType<typeof useCurrentUserFollowingProjectsQuery>;
export declare type CurrentUserFollowingProjectsLazyQueryHookResult = ReturnType<typeof useCurrentUserFollowingProjectsLazyQuery>;
export declare type CurrentUserFollowingProjectsQueryResult = Apollo.QueryResult<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>;
export declare const CurrentUserProfileDocument: Apollo.DocumentNode;
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
export declare function useCurrentUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>): Apollo.QueryResult<CurrentUserProfileQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useCurrentUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>): Apollo.QueryTuple<CurrentUserProfileQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type CurrentUserProfileQueryHookResult = ReturnType<typeof useCurrentUserProfileQuery>;
export declare type CurrentUserProfileLazyQueryHookResult = ReturnType<typeof useCurrentUserProfileLazyQuery>;
export declare type CurrentUserProfileQueryResult = Apollo.QueryResult<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>;
export declare const CurrentUserProjectsDocument: Apollo.DocumentNode;
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
export declare function useCurrentUserProjectsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>): Apollo.QueryResult<CurrentUserProjectsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentUserProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>): Apollo.QueryTuple<CurrentUserProjectsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentUserProjectsQueryHookResult = ReturnType<typeof useCurrentUserProjectsQuery>;
export declare type CurrentUserProjectsLazyQueryHookResult = ReturnType<typeof useCurrentUserProjectsLazyQuery>;
export declare type CurrentUserProjectsQueryResult = Apollo.QueryResult<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>;
export declare const CurrentUserSettingsDocument: Apollo.DocumentNode;
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
export declare function useCurrentUserSettingsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>): Apollo.QueryResult<CurrentUserSettingsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentUserSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>): Apollo.QueryTuple<CurrentUserSettingsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentUserSettingsQueryHookResult = ReturnType<typeof useCurrentUserSettingsQuery>;
export declare type CurrentUserSettingsLazyQueryHookResult = ReturnType<typeof useCurrentUserSettingsLazyQuery>;
export declare type CurrentUserSettingsQueryResult = Apollo.QueryResult<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>;
export declare const FeedDocument: Apollo.DocumentNode;
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
export declare function useFeedQuery(baseOptions?: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>): Apollo.QueryResult<FeedQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>): Apollo.QueryTuple<FeedQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export declare type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export declare type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export declare const FilesDocument: Apollo.DocumentNode;
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
export declare function useFilesQuery(baseOptions?: Apollo.QueryHookOptions<FilesQuery, FilesQueryVariables>): Apollo.QueryResult<FilesQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilesQuery, FilesQueryVariables>): Apollo.QueryTuple<FilesQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type FilesQueryHookResult = ReturnType<typeof useFilesQuery>;
export declare type FilesLazyQueryHookResult = ReturnType<typeof useFilesLazyQuery>;
export declare type FilesQueryResult = Apollo.QueryResult<FilesQuery, FilesQueryVariables>;
export declare const FollowersDocument: Apollo.DocumentNode;
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
export declare function useFollowersQuery(baseOptions: Apollo.QueryHookOptions<FollowersQuery, FollowersQueryVariables>): Apollo.QueryResult<FollowersQuery, Exact<{
    projectId: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>): Apollo.QueryTuple<FollowersQuery, Exact<{
    projectId: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>;
export declare type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>;
export declare type FollowersQueryResult = Apollo.QueryResult<FollowersQuery, FollowersQueryVariables>;
export declare const GrowthDocument: Apollo.DocumentNode;
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
export declare function useGrowthQuery(baseOptions: Apollo.QueryHookOptions<GrowthQuery, GrowthQueryVariables>): Apollo.QueryResult<GrowthQuery, Exact<{
    type: GrowthType;
}>>;
export declare function useGrowthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrowthQuery, GrowthQueryVariables>): Apollo.QueryTuple<GrowthQuery, Exact<{
    type: GrowthType;
}>>;
export declare type GrowthQueryHookResult = ReturnType<typeof useGrowthQuery>;
export declare type GrowthLazyQueryHookResult = ReturnType<typeof useGrowthLazyQuery>;
export declare type GrowthQueryResult = Apollo.QueryResult<GrowthQuery, GrowthQueryVariables>;
export declare const HashtagDocument: Apollo.DocumentNode;
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
export declare function useHashtagQuery(baseOptions?: Apollo.QueryHookOptions<HashtagQuery, HashtagQueryVariables>): Apollo.QueryResult<HashtagQuery, Exact<{
    id?: InputMaybe<string> | undefined;
    slug?: any;
    name?: InputMaybe<string> | undefined;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useHashtagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HashtagQuery, HashtagQueryVariables>): Apollo.QueryTuple<HashtagQuery, Exact<{
    id?: InputMaybe<string> | undefined;
    slug?: any;
    name?: InputMaybe<string> | undefined;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type HashtagQueryHookResult = ReturnType<typeof useHashtagQuery>;
export declare type HashtagLazyQueryHookResult = ReturnType<typeof useHashtagLazyQuery>;
export declare type HashtagQueryResult = Apollo.QueryResult<HashtagQuery, HashtagQueryVariables>;
export declare const LikesDocument: Apollo.DocumentNode;
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
export declare function useLikesQuery(baseOptions: Apollo.QueryHookOptions<LikesQuery, LikesQueryVariables>): Apollo.QueryResult<LikesQuery, Exact<{
    postId: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LikesQuery, LikesQueryVariables>): Apollo.QueryTuple<LikesQuery, Exact<{
    postId: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type LikesQueryHookResult = ReturnType<typeof useLikesQuery>;
export declare type LikesLazyQueryHookResult = ReturnType<typeof useLikesLazyQuery>;
export declare type LikesQueryResult = Apollo.QueryResult<LikesQuery, LikesQueryVariables>;
export declare const MetaDocument: Apollo.DocumentNode;
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
export declare function useMetaQuery(baseOptions?: Apollo.QueryHookOptions<MetaQuery, MetaQueryVariables>): Apollo.QueryResult<MetaQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useMetaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MetaQuery, MetaQueryVariables>): Apollo.QueryTuple<MetaQuery, Exact<{
    [key: string]: never;
}>>;
export declare type MetaQueryHookResult = ReturnType<typeof useMetaQuery>;
export declare type MetaLazyQueryHookResult = ReturnType<typeof useMetaLazyQuery>;
export declare type MetaQueryResult = Apollo.QueryResult<MetaQuery, MetaQueryVariables>;
export declare const NotificationsDocument: Apollo.DocumentNode;
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
export declare function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>): Apollo.QueryResult<NotificationsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>): Apollo.QueryTuple<NotificationsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export declare type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export declare type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export declare const PostDocument: Apollo.DocumentNode;
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
export declare function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>): Apollo.QueryResult<PostQuery, Exact<{
    id: string;
}>>;
export declare function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>): Apollo.QueryTuple<PostQuery, Exact<{
    id: string;
}>>;
export declare type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export declare type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export declare type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export declare const PostsDocument: Apollo.DocumentNode;
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
export declare function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>): Apollo.QueryResult<PostsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>): Apollo.QueryTuple<PostsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export declare type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export declare type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export declare const ProjectDocument: Apollo.DocumentNode;
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
export declare function useProjectQuery(baseOptions?: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>): Apollo.QueryResult<ProjectQuery, Exact<{
    id?: InputMaybe<string> | undefined;
    slug?: any;
    after?: InputMaybe<string> | undefined;
    postId?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>): Apollo.QueryTuple<ProjectQuery, Exact<{
    id?: InputMaybe<string> | undefined;
    slug?: any;
    after?: InputMaybe<string> | undefined;
    postId?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export declare type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export declare type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export declare const ProjectCollectionsDocument: Apollo.DocumentNode;
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
export declare function useProjectCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>): Apollo.QueryResult<ProjectCollectionsQuery, Exact<{
    projectId?: InputMaybe<string> | undefined;
    projectSlug?: any;
    slug?: any;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useProjectCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>): Apollo.QueryTuple<ProjectCollectionsQuery, Exact<{
    projectId?: InputMaybe<string> | undefined;
    projectSlug?: any;
    slug?: any;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type ProjectCollectionsQueryHookResult = ReturnType<typeof useProjectCollectionsQuery>;
export declare type ProjectCollectionsLazyQueryHookResult = ReturnType<typeof useProjectCollectionsLazyQuery>;
export declare type ProjectCollectionsQueryResult = Apollo.QueryResult<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>;
export declare const ProjectSuggestionsDocument: Apollo.DocumentNode;
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
export declare function useProjectSuggestionsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>): Apollo.QueryResult<ProjectSuggestionsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useProjectSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>): Apollo.QueryTuple<ProjectSuggestionsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type ProjectSuggestionsQueryHookResult = ReturnType<typeof useProjectSuggestionsQuery>;
export declare type ProjectSuggestionsLazyQueryHookResult = ReturnType<typeof useProjectSuggestionsLazyQuery>;
export declare type ProjectSuggestionsQueryResult = Apollo.QueryResult<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>;
export declare const ProjectTypesDocument: Apollo.DocumentNode;
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
export declare function useProjectTypesQuery(baseOptions?: Apollo.QueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>): Apollo.QueryResult<ProjectTypesQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useProjectTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>): Apollo.QueryTuple<ProjectTypesQuery, Exact<{
    [key: string]: never;
}>>;
export declare type ProjectTypesQueryHookResult = ReturnType<typeof useProjectTypesQuery>;
export declare type ProjectTypesLazyQueryHookResult = ReturnType<typeof useProjectTypesLazyQuery>;
export declare type ProjectTypesQueryResult = Apollo.QueryResult<ProjectTypesQuery, ProjectTypesQueryVariables>;
export declare const ProjectsDocument: Apollo.DocumentNode;
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
export declare function useProjectsQuery(baseOptions: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>): Apollo.QueryResult<ProjectsQuery, Exact<{
    typeId?: InputMaybe<string> | undefined;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
    type: ProjectSortType;
}>>;
export declare function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>): Apollo.QueryTuple<ProjectsQuery, Exact<{
    typeId?: InputMaybe<string> | undefined;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
    type: ProjectSortType;
}>>;
export declare type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export declare type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export declare type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export declare const RecentCommentsDocument: Apollo.DocumentNode;
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
export declare function useRecentCommentsQuery(baseOptions?: Apollo.QueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>): Apollo.QueryResult<RecentCommentsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
}>>;
export declare function useRecentCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>): Apollo.QueryTuple<RecentCommentsQuery, Exact<{
    after?: InputMaybe<string> | undefined;
}>>;
export declare type RecentCommentsQueryHookResult = ReturnType<typeof useRecentCommentsQuery>;
export declare type RecentCommentsLazyQueryHookResult = ReturnType<typeof useRecentCommentsLazyQuery>;
export declare type RecentCommentsQueryResult = Apollo.QueryResult<RecentCommentsQuery, RecentCommentsQueryVariables>;
export declare const RepliesDocument: Apollo.DocumentNode;
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
export declare function useRepliesQuery(baseOptions: Apollo.QueryHookOptions<RepliesQuery, RepliesQueryVariables>): Apollo.QueryResult<RepliesQuery, Exact<{
    id: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useRepliesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepliesQuery, RepliesQueryVariables>): Apollo.QueryTuple<RepliesQuery, Exact<{
    id: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type RepliesQueryHookResult = ReturnType<typeof useRepliesQuery>;
export declare type RepliesLazyQueryHookResult = ReturnType<typeof useRepliesLazyQuery>;
export declare type RepliesQueryResult = Apollo.QueryResult<RepliesQuery, RepliesQueryVariables>;
export declare const SearchHashtagsDocument: Apollo.DocumentNode;
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
export declare function useSearchHashtagsQuery(baseOptions: Apollo.QueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>): Apollo.QueryResult<SearchHashtagsQuery, Exact<{
    query: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useSearchHashtagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>): Apollo.QueryTuple<SearchHashtagsQuery, Exact<{
    query: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type SearchHashtagsQueryHookResult = ReturnType<typeof useSearchHashtagsQuery>;
export declare type SearchHashtagsLazyQueryHookResult = ReturnType<typeof useSearchHashtagsLazyQuery>;
export declare type SearchHashtagsQueryResult = Apollo.QueryResult<SearchHashtagsQuery, SearchHashtagsQueryVariables>;
export declare const SearchModelsDocument: Apollo.DocumentNode;
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
export declare function useSearchModelsQuery(baseOptions: Apollo.QueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>): Apollo.QueryResult<SearchModelsQuery, Exact<{
    query: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useSearchModelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>): Apollo.QueryTuple<SearchModelsQuery, Exact<{
    query: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type SearchModelsQueryHookResult = ReturnType<typeof useSearchModelsQuery>;
export declare type SearchModelsLazyQueryHookResult = ReturnType<typeof useSearchModelsLazyQuery>;
export declare type SearchModelsQueryResult = Apollo.QueryResult<SearchModelsQuery, SearchModelsQueryVariables>;
export declare const SearchProjectsDocument: Apollo.DocumentNode;
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
export declare function useSearchProjectsQuery(baseOptions: Apollo.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>): Apollo.QueryResult<SearchProjectsQuery, Exact<{
    query: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useSearchProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>): Apollo.QueryTuple<SearchProjectsQuery, Exact<{
    query: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>;
export declare type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>;
export declare type SearchProjectsQueryResult = Apollo.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;
export declare const SearchUsersDocument: Apollo.DocumentNode;
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
export declare function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>): Apollo.QueryResult<SearchUsersQuery, Exact<{
    query: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>): Apollo.QueryTuple<SearchUsersQuery, Exact<{
    query: string;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export declare type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export declare type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export declare const SimilarProjectsDocument: Apollo.DocumentNode;
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
export declare function useSimilarProjectsQuery(baseOptions: Apollo.QueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>): Apollo.QueryResult<SimilarProjectsQuery, Exact<{
    id: string;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useSimilarProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>): Apollo.QueryTuple<SimilarProjectsQuery, Exact<{
    id: string;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type SimilarProjectsQueryHookResult = ReturnType<typeof useSimilarProjectsQuery>;
export declare type SimilarProjectsLazyQueryHookResult = ReturnType<typeof useSimilarProjectsLazyQuery>;
export declare type SimilarProjectsQueryResult = Apollo.QueryResult<SimilarProjectsQuery, SimilarProjectsQueryVariables>;
export declare const UnreadNotificationsDocument: Apollo.DocumentNode;
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
export declare function useUnreadNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<UnreadNotificationsQuery, UnreadNotificationsQueryVariables>): Apollo.QueryResult<UnreadNotificationsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useUnreadNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnreadNotificationsQuery, UnreadNotificationsQueryVariables>): Apollo.QueryTuple<UnreadNotificationsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type UnreadNotificationsQueryHookResult = ReturnType<typeof useUnreadNotificationsQuery>;
export declare type UnreadNotificationsLazyQueryHookResult = ReturnType<typeof useUnreadNotificationsLazyQuery>;
export declare type UnreadNotificationsQueryResult = Apollo.QueryResult<UnreadNotificationsQuery, UnreadNotificationsQueryVariables>;
export declare const UserDocument: Apollo.DocumentNode;
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
export declare function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>): Apollo.QueryResult<UserQuery, Exact<{
    username: any;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>): Apollo.QueryTuple<UserQuery, Exact<{
    username: any;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export declare type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export declare type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export declare const UserFollowingProjectsDocument: Apollo.DocumentNode;
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
export declare function useUserFollowingProjectsQuery(baseOptions: Apollo.QueryHookOptions<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>): Apollo.QueryResult<UserFollowingProjectsQuery, Exact<{
    username: any;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare function useUserFollowingProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>): Apollo.QueryTuple<UserFollowingProjectsQuery, Exact<{
    username: any;
    after?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
}>>;
export declare type UserFollowingProjectsQueryHookResult = ReturnType<typeof useUserFollowingProjectsQuery>;
export declare type UserFollowingProjectsLazyQueryHookResult = ReturnType<typeof useUserFollowingProjectsLazyQuery>;
export declare type UserFollowingProjectsQueryResult = Apollo.QueryResult<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>;
