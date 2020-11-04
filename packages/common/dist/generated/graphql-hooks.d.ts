import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
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
export declare type Query = {
    __typename?: 'Query';
    dummy?: Maybe<Scalars['String']>;
    bookmarks?: Maybe<BookmarkConnection>;
    blogPost?: Maybe<BlogPost>;
    blogPosts?: Maybe<BlogPostConnection>;
    comments?: Maybe<CommentConnection>;
    recentComments?: Maybe<CommentConnection>;
    comment?: Maybe<Comment>;
    collections?: Maybe<PostConnection>;
    projectCollections?: Maybe<CollectionConnection>;
    feed?: Maybe<Feed>;
    files?: Maybe<FileConnection>;
    followers?: Maybe<FollowersConnection>;
    hashtag?: Maybe<Hashtag>;
    likes?: Maybe<LikeConnection>;
    meta?: Maybe<Meta>;
    growth?: Maybe<Array<Maybe<GrowthData>>>;
    notifications?: Maybe<NotificationsConnection>;
    post?: Maybe<Post>;
    posts?: Maybe<PostConnection>;
    project?: Maybe<Project>;
    projects?: Maybe<ProjectsConnection>;
    projectSuggestions?: Maybe<Array<Maybe<ProjectSuggestionsConnection>>>;
    similarProjects?: Maybe<ProjectsConnection>;
    projectTypes?: Maybe<Array<Maybe<ProjectType>>>;
    search?: Maybe<SearchResults>;
    user?: Maybe<User>;
    users?: Maybe<UserConnection>;
    currentUser?: Maybe<User>;
};
export declare type QueryBookmarksArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryBlogPostArgs = {
    slug?: Maybe<Scalars['LowercaseString']>;
    id?: Maybe<Scalars['ID']>;
};
export declare type QueryBlogPostsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryCommentsArgs = {
    postId: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryRecentCommentsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryCommentArgs = {
    id: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryCollectionsArgs = {
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['LowercaseString']>;
    projectId?: Maybe<Scalars['ID']>;
    projectSlug?: Maybe<Scalars['LowercaseString']>;
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryProjectCollectionsArgs = {
    slug?: Maybe<Scalars['LowercaseString']>;
    projectId?: Maybe<Scalars['ID']>;
    projectSlug?: Maybe<Scalars['LowercaseString']>;
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryFilesArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    type?: Maybe<FileType>;
    sort?: Maybe<SortType>;
};
export declare type QueryFollowersArgs = {
    projectId: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryHashtagArgs = {
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['LowercaseString']>;
    name?: Maybe<Scalars['String']>;
};
export declare type QueryLikesArgs = {
    postId: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryGrowthArgs = {
    type: GrowthType;
    startDate?: Maybe<Scalars['Date']>;
    endDate?: Maybe<Scalars['Date']>;
};
export declare type QueryNotificationsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
};
export declare type QueryPostArgs = {
    id?: Maybe<Scalars['ID']>;
};
export declare type QueryPostsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryProjectArgs = {
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['LowercaseString']>;
};
export declare type QueryProjectsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    type: ProjectSortType;
    typeId?: Maybe<Scalars['ID']>;
};
export declare type QueryProjectSuggestionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
export declare type QuerySimilarProjectsArgs = {
    id: Scalars['ID'];
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
export declare type QuerySearchArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
    query: Scalars['String'];
    type: SearchType;
};
export declare type QueryUserArgs = {
    id?: Maybe<Scalars['ID']>;
    username?: Maybe<Scalars['LowercaseString']>;
};
export declare type QueryUsersArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type QueryCurrentUserArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type BookmarkConnection = {
    __typename?: 'BookmarkConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<BookmarkEdge>>;
};
export declare type PageInfo = {
    __typename?: 'PageInfo';
    hasNextPage?: Maybe<Scalars['Boolean']>;
    hasPreviousPage?: Maybe<Scalars['Boolean']>;
};
export declare type BookmarkEdge = {
    __typename?: 'BookmarkEdge';
    cursor: Scalars['String'];
    node: Post;
};
export declare type Post = {
    __typename?: 'Post';
    id?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    caption?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
    project?: Maybe<Project>;
    postPermissions?: Maybe<PostPermissions>;
    permissions?: Maybe<PostPermissions>;
    likes?: Maybe<Likes>;
    bookmarks?: Maybe<Bookmarks>;
    collection?: Maybe<Collection>;
    translatable?: Maybe<Scalars['Boolean']>;
    language?: Maybe<Scalars['String']>;
    filesConnection?: Maybe<FileConnection>;
    commentsConnection?: Maybe<CommentConnection>;
    likesConnection?: Maybe<LikeConnection>;
};
export declare type PostFilesConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    reverse?: Maybe<Scalars['Boolean']>;
    type?: Maybe<FileType>;
};
export declare type PostCommentsConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type PostLikesConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    username?: Maybe<Scalars['LowercaseString']>;
    createdAt: Scalars['Date'];
    updatedAt: Scalars['Date'];
    fullName?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    avatarUrl?: Maybe<Scalars['String']>;
    projectCount?: Maybe<Scalars['Int']>;
    interestedIn?: Maybe<Array<Maybe<ProjectType>>>;
    settings?: Maybe<UserSettings>;
    dynamicLink?: Maybe<Scalars['String']>;
    isOnline?: Maybe<Scalars['Boolean']>;
    lastSeen?: Maybe<Scalars['Date']>;
    website?: Maybe<Scalars['String']>;
    bio?: Maybe<Scalars['String']>;
    location?: Maybe<Scalars['String']>;
    isSilhouette?: Maybe<Scalars['Boolean']>;
    role?: Maybe<UserRole>;
    projectsConnection?: Maybe<ProjectsConnection>;
    followingProjects?: Maybe<ProjectsConnection>;
    postsConnection?: Maybe<PostConnection>;
};
export declare type UserProjectsConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type UserFollowingProjectsArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type UserPostsConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type ProjectType = {
    __typename?: 'ProjectType';
    id?: Maybe<Scalars['ID']>;
    title?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['String']>;
    imageUrl: Scalars['String'];
};
export declare type UserSettings = {
    __typename?: 'UserSettings';
    locale?: Maybe<Scalars['String']>;
    timezone?: Maybe<Scalars['String']>;
    notifications?: Maybe<UserNotificationsSettings>;
};
export declare type UserNotificationsSettings = {
    __typename?: 'UserNotificationsSettings';
    types?: Maybe<NotificationSettingsType>;
};
export declare type NotificationSettingsType = {
    __typename?: 'NotificationSettingsType';
    NEW_FOLLOWER?: Maybe<NotificationKindSettings>;
    NEW_COMMENT?: Maybe<NotificationKindSettings>;
    NEW_MENTION?: Maybe<NotificationKindSettings>;
    NEW_ARTICLE?: Maybe<NotificationKindSettings>;
    SIMILAR_PROJECTS?: Maybe<NotificationKindSettings>;
    PRODUCT_ANNOUNCEMENTS?: Maybe<NotificationKindSettings>;
};
export declare type NotificationKindSettings = {
    __typename?: 'NotificationKindSettings';
    email?: Maybe<Scalars['Boolean']>;
    push?: Maybe<Scalars['Boolean']>;
};
export declare enum UserRole {
    User = "USER",
    Admin = "ADMIN"
}
export declare type ProjectsConnection = {
    __typename?: 'ProjectsConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<ProjectEdge>>;
};
export declare type ProjectEdge = {
    __typename?: 'ProjectEdge';
    cursor: Scalars['String'];
    node: Project;
};
export declare type Project = {
    __typename?: 'Project';
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    dynamicLink?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
    projectPermissions?: Maybe<ProjectPermissions>;
    permissions?: Maybe<ProjectPermissions>;
    commentsDisabled?: Maybe<Scalars['Boolean']>;
    type?: Maybe<ProjectType>;
    cover?: Maybe<CoverType>;
    model?: Maybe<Model>;
    filesConnection?: Maybe<FileConnection>;
    followersConnection?: Maybe<FollowersConnection>;
    postsConnection?: Maybe<PostConnection>;
    collectionsConnection?: Maybe<CollectionConnection>;
};
export declare type ProjectFilesConnectionArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    reverse?: Maybe<Scalars['Boolean']>;
    type?: Maybe<FileType>;
};
export declare type ProjectFollowersConnectionArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
export declare type ProjectPostsConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type ProjectCollectionsConnectionArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
export declare type ProjectPermissions = {
    __typename?: 'ProjectPermissions';
    isFollower?: Maybe<Scalars['Boolean']>;
    isOwner?: Maybe<Scalars['Boolean']>;
};
export declare type CoverType = {
    __typename?: 'CoverType';
    uri?: Maybe<Scalars['String']>;
    default?: Maybe<Scalars['Boolean']>;
};
export declare type Model = {
    __typename?: 'Model';
    id: Scalars['ID'];
    brand?: Maybe<Brand>;
    model?: Maybe<Scalars['String']>;
    year?: Maybe<Scalars['Int']>;
};
export declare type Brand = {
    __typename?: 'Brand';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
};
export declare enum FileType {
    Image = "IMAGE",
    Video = "VIDEO"
}
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
export declare type File = {
    __typename?: 'File';
    id?: Maybe<Scalars['ID']>;
    postId?: Maybe<Scalars['ID']>;
    type?: Maybe<FileType>;
    uri: Scalars['String'];
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
};
export declare type FollowersConnection = {
    __typename?: 'FollowersConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<FollowersEdge>>;
};
export declare type FollowersEdge = {
    __typename?: 'FollowersEdge';
    cursor: Scalars['String'];
    node: User;
};
export declare type PostConnection = {
    __typename?: 'PostConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<PostEdge>>;
};
export declare type PostEdge = {
    __typename?: 'PostEdge';
    cursor: Scalars['String'];
    node: Post;
};
export declare type CollectionConnection = {
    __typename?: 'CollectionConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<CollectionEdge>>;
};
export declare type CollectionEdge = {
    __typename?: 'CollectionEdge';
    cursor: Scalars['String'];
    node: Collection;
};
export declare type Collection = {
    __typename?: 'Collection';
    id?: Maybe<Scalars['ID']>;
    name?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['String']>;
    cover?: Maybe<CoverType>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
};
export declare type PostPermissions = {
    __typename?: 'PostPermissions';
    isOwner?: Maybe<Scalars['Boolean']>;
};
export declare type Likes = {
    __typename?: 'Likes';
    totalCount?: Maybe<Scalars['Int']>;
    isLiked?: Maybe<Scalars['Boolean']>;
};
export declare type Bookmarks = {
    __typename?: 'Bookmarks';
    totalCount?: Maybe<Scalars['Int']>;
    isBookmarked?: Maybe<Scalars['Boolean']>;
};
export declare type CommentConnection = {
    __typename?: 'CommentConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<CommentEdge>>;
};
export declare type CommentEdge = {
    __typename?: 'CommentEdge';
    cursor: Scalars['String'];
    node: Comment;
};
export declare type Comment = {
    __typename?: 'Comment';
    id?: Maybe<Scalars['ID']>;
    commentId?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    text: Scalars['String'];
    user?: Maybe<User>;
    postId?: Maybe<Scalars['ID']>;
    permissions?: Maybe<CommentPermissions>;
    translatable?: Maybe<Scalars['Boolean']>;
    language?: Maybe<Scalars['String']>;
    repliesConnection?: Maybe<CommentConnection>;
    likes?: Maybe<Likes>;
};
export declare type CommentRepliesConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type CommentPermissions = {
    __typename?: 'CommentPermissions';
    isOwner?: Maybe<Scalars['Boolean']>;
};
export declare type LikeConnection = {
    __typename?: 'LikeConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<LikeEdge>>;
};
export declare type LikeEdge = {
    __typename?: 'LikeEdge';
    cursor: Scalars['String'];
    node: User;
};
export declare type BlogPost = {
    __typename?: 'BlogPost';
    id?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    title?: Maybe<Scalars['String']>;
    content?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
    slug?: Maybe<Scalars['String']>;
};
export declare type BlogPostConnection = {
    __typename?: 'BlogPostConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<BlogPostEdge>>;
};
export declare type BlogPostEdge = {
    __typename?: 'BlogPostEdge';
    cursor: Scalars['String'];
    node: BlogPost;
};
export declare type Feed = {
    __typename?: 'Feed';
    postsConnection?: Maybe<PostConnection>;
};
export declare type FeedPostsConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare enum SortType {
    Recent = "RECENT",
    Random = "RANDOM"
}
export declare type Hashtag = {
    __typename?: 'Hashtag';
    id?: Maybe<Scalars['ID']>;
    name?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['LowercaseString']>;
    totalCount?: Maybe<Scalars['Int']>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    postsConnection?: Maybe<PostConnection>;
};
export declare type HashtagPostsConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type Meta = {
    __typename?: 'Meta';
    isAdmin?: Maybe<Scalars['Boolean']>;
    totalUsers?: Maybe<Scalars['Int']>;
    totalProjects?: Maybe<Scalars['Int']>;
    totalPosts?: Maybe<Scalars['Int']>;
    totalComments?: Maybe<Scalars['Int']>;
    totalFiles?: Maybe<Scalars['Int']>;
    totalUsersToday?: Maybe<Scalars['Int']>;
    totalProjectsToday?: Maybe<Scalars['Int']>;
    totalPostsToday?: Maybe<Scalars['Int']>;
    totalCommentsToday?: Maybe<Scalars['Int']>;
    totalFilesToday?: Maybe<Scalars['Int']>;
};
export declare enum GrowthType {
    Projects = "PROJECTS",
    Users = "USERS"
}
export declare type GrowthData = {
    __typename?: 'GrowthData';
    date?: Maybe<Scalars['Date']>;
    count?: Maybe<Scalars['Int']>;
};
export declare type NotificationsConnection = {
    __typename?: 'NotificationsConnection';
    unreadCount?: Maybe<Scalars['Int']>;
    pageInfo?: Maybe<PageInfo>;
    edges?: Maybe<Array<Maybe<NotificationEdge>>>;
};
export declare type NotificationEdge = {
    __typename?: 'NotificationEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<Notification>;
};
export declare type Notification = {
    __typename?: 'Notification';
    id: Scalars['ID'];
    user: User;
    type?: Maybe<NotificationTypes>;
    project?: Maybe<Project>;
    post?: Maybe<Post>;
    comment?: Maybe<Comment>;
    isSeen: Scalars['Boolean'];
    createdAt: Scalars['Date'];
    updatedAt: Scalars['Date'];
    filesConnection?: Maybe<FileConnection>;
};
export declare type NotificationFilesConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    reverse?: Maybe<Scalars['Boolean']>;
    type?: Maybe<FileType>;
};
export declare enum NotificationTypes {
    NewComment = "NEW_COMMENT",
    NewFollower = "NEW_FOLLOWER",
    NewPostLike = "NEW_POST_LIKE",
    NewCommentLike = "NEW_COMMENT_LIKE",
    NewMention = "NEW_MENTION",
    NewReply = "NEW_REPLY"
}
export declare enum ProjectSortType {
    Popular = "POPULAR",
    Recent = "RECENT"
}
export declare type ProjectSuggestionsConnection = {
    __typename?: 'ProjectSuggestionsConnection';
    totalCount?: Maybe<Scalars['Int']>;
    type?: Maybe<ProjectType>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<ProjectEdge>>;
};
export declare enum SearchType {
    Projects = "PROJECTS",
    Users = "USERS",
    Models = "MODELS",
    Hashtags = "HASHTAGS"
}
export declare type SearchResults = {
    __typename?: 'SearchResults';
    totalCount?: Maybe<Scalars['Int']>;
    edges?: Maybe<Array<Maybe<SearchResultEdge>>>;
    pageInfo?: Maybe<PageInfo>;
};
export declare type SearchResultEdge = {
    __typename?: 'SearchResultEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<SearchResultNode>;
};
export declare type SearchResultNode = Project | User | Model | Hashtag;
export declare type UserConnection = {
    __typename?: 'UserConnection';
    pageInfo?: Maybe<PageInfo>;
    edges?: Maybe<Array<Maybe<UserEdge>>>;
};
export declare type UserEdge = {
    __typename?: 'UserEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<User>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    dummy?: Maybe<Scalars['String']>;
    authenticateApple?: Maybe<Tokens>;
    authenticateFacebook?: Maybe<Tokens>;
    authenticateGoogle?: Maybe<Tokens>;
    refreshToken?: Maybe<AccessToken>;
    bookmarkPost?: Maybe<Post>;
    deleteBlogPost?: Maybe<BlogPost>;
    addBlogPost?: Maybe<BlogPost>;
    addComment?: Maybe<Comment>;
    editComment?: Maybe<Comment>;
    deleteComment?: Maybe<Scalars['Boolean']>;
    translateComment?: Maybe<Comment>;
    addCollection?: Maybe<Collection>;
    deleteCollection?: Maybe<Collection>;
    editCollection?: Maybe<Collection>;
    collectPosts?: Maybe<Collection>;
    sendPromo?: Maybe<Scalars['Boolean']>;
    likePost?: Maybe<Post>;
    likeComment?: Maybe<Comment>;
    markAllNotificationsSeen?: Maybe<Scalars['Boolean']>;
    markNotificationSeen?: Maybe<Notification>;
    deleteNotification?: Maybe<Scalars['Boolean']>;
    deletePost?: Maybe<Post>;
    addPost?: Maybe<Post>;
    editPost?: Maybe<Post>;
    translatePost?: Maybe<Post>;
    followProject?: Maybe<Project>;
    addProject?: Maybe<Project>;
    editProject?: Maybe<Project>;
    deleteProject?: Maybe<Scalars['Boolean']>;
    report?: Maybe<Scalars['Boolean']>;
    preSignUrls?: Maybe<Array<Maybe<PreSignedUrl>>>;
    preSignUrl?: Maybe<PreSignedUrl>;
    editUser?: Maybe<User>;
    toggleNotificationSettings?: Maybe<User>;
    registerDeviceToken?: Maybe<Scalars['Boolean']>;
    banUser?: Maybe<User>;
    deleteCurrentUser?: Maybe<Scalars['Boolean']>;
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
export declare type MutationRefreshTokenArgs = {
    refreshToken: Scalars['String'];
};
export declare type MutationBookmarkPostArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteBlogPostArgs = {
    id: Scalars['ID'];
};
export declare type MutationAddBlogPostArgs = {
    id?: Maybe<Scalars['ID']>;
    input: BlogPostInput;
};
export declare type MutationAddCommentArgs = {
    postId: Scalars['ID'];
    commentId?: Maybe<Scalars['ID']>;
    input: CommentInput;
};
export declare type MutationEditCommentArgs = {
    id: Scalars['ID'];
    input: CommentInput;
};
export declare type MutationDeleteCommentArgs = {
    id: Scalars['ID'];
};
export declare type MutationTranslateCommentArgs = {
    id: Scalars['ID'];
    original?: Maybe<Scalars['Boolean']>;
};
export declare type MutationAddCollectionArgs = {
    projectId: Scalars['ID'];
    name: Scalars['String'];
};
export declare type MutationDeleteCollectionArgs = {
    projectId: Scalars['ID'];
    id: Scalars['ID'];
};
export declare type MutationEditCollectionArgs = {
    id: Scalars['ID'];
    input: EditCollectionInput;
};
export declare type MutationCollectPostsArgs = {
    projectId: Scalars['ID'];
    collectionId: Scalars['ID'];
    input?: Maybe<Array<Maybe<CollectionInput>>>;
};
export declare type MutationSendPromoArgs = {
    number: Scalars['String'];
};
export declare type MutationLikePostArgs = {
    id: Scalars['ID'];
};
export declare type MutationLikeCommentArgs = {
    id: Scalars['ID'];
};
export declare type MutationMarkNotificationSeenArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteNotificationArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePostArgs = {
    id: Scalars['ID'];
};
export declare type MutationAddPostArgs = {
    input: PostInput;
};
export declare type MutationEditPostArgs = {
    id: Scalars['ID'];
    input: EditPostInput;
};
export declare type MutationTranslatePostArgs = {
    id: Scalars['ID'];
    original?: Maybe<Scalars['Boolean']>;
};
export declare type MutationFollowProjectArgs = {
    id: Scalars['ID'];
};
export declare type MutationAddProjectArgs = {
    input: ProjectInput;
};
export declare type MutationEditProjectArgs = {
    id: Scalars['ID'];
    input: ProjectInput;
};
export declare type MutationDeleteProjectArgs = {
    id: Scalars['ID'];
};
export declare type MutationReportArgs = {
    id: Scalars['ID'];
    type: ReportType;
};
export declare type MutationPreSignUrlsArgs = {
    input?: Maybe<Array<Maybe<PreSignedUrlnput>>>;
};
export declare type MutationPreSignUrlArgs = {
    input: PreSignedUrlInput;
};
export declare type MutationEditUserArgs = {
    input: EditUserInput;
    id?: Maybe<Scalars['ID']>;
};
export declare type MutationToggleNotificationSettingsArgs = {
    input?: Maybe<ToggleNotificationSettingsInput>;
};
export declare type MutationRegisterDeviceTokenArgs = {
    token: Scalars['String'];
    platform: PlatformType;
};
export declare type MutationBanUserArgs = {
    id: Scalars['ID'];
};
export declare type ApplePayload = {
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
};
export declare type Tokens = {
    __typename?: 'Tokens';
    access_token?: Maybe<Scalars['String']>;
    refresh_token?: Maybe<Scalars['String']>;
};
export declare type AccessToken = {
    __typename?: 'AccessToken';
    access_token?: Maybe<Scalars['String']>;
};
export declare type BlogPostInput = {
    title: Scalars['String'];
    content: Scalars['String'];
};
export declare type CommentInput = {
    text: Scalars['String'];
};
export declare type EditCollectionInput = {
    name?: Maybe<Scalars['String']>;
};
export declare type CollectionInput = {
    postId: Scalars['ID'];
};
export declare type PostInput = {
    projectId: Scalars['ID'];
    caption?: Maybe<Scalars['String']>;
    files: Array<Maybe<FileInput>>;
    collectionId?: Maybe<Scalars['ID']>;
};
export declare type FileInput = {
    filename: Scalars['String'];
};
export declare type EditPostInput = {
    caption?: Maybe<Scalars['String']>;
    collectionId?: Maybe<Scalars['ID']>;
};
export declare type ProjectInput = {
    title?: Maybe<Scalars['String']>;
    commentsDisabled?: Maybe<Scalars['Boolean']>;
    projectTypeId?: Maybe<Scalars['ID']>;
    modelId?: Maybe<Scalars['ID']>;
};
export declare enum ReportType {
    Project = "PROJECT",
    User = "USER",
    Comment = "COMMENT",
    Post = "POST"
}
export declare type PreSignedUrlnput = {
    type: UploadType;
};
export declare enum UploadType {
    Image = "IMAGE",
    Video = "VIDEO"
}
export declare type PreSignedUrl = {
    __typename?: 'PreSignedUrl';
    url?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['ID']>;
    filename?: Maybe<Scalars['String']>;
};
export declare type PreSignedUrlInput = {
    type: UploadType;
    path: Scalars['String'];
};
export declare type EditUserInput = {
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    interestedIn?: Maybe<Array<Maybe<ProjectTypeInput>>>;
    timezone?: Maybe<Scalars['String']>;
    locale?: Maybe<Scalars['String']>;
    location?: Maybe<Scalars['String']>;
    bio?: Maybe<Scalars['String']>;
    website?: Maybe<Scalars['String']>;
    avatarUrl?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
};
export declare type ProjectTypeInput = {
    id?: Maybe<Scalars['ID']>;
};
export declare type ToggleNotificationSettingsInput = {
    deliveryMethod: Scalars['String'];
    notificationType: Scalars['String'];
};
export declare enum PlatformType {
    Mobile = "MOBILE",
    Web = "WEB"
}
export declare type HashtagConnection = {
    __typename?: 'HashtagConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<HashtagEdge>>;
};
export declare type HashtagEdge = {
    __typename?: 'HashtagEdge';
    cursor: Scalars['String'];
    node: Hashtag;
};
export declare enum CacheControlScope {
    Public = "PUBLIC",
    Private = "PRIVATE"
}
export declare type BlogPostFragment = ({
    __typename?: 'BlogPost';
} & Pick<BlogPost, 'id' | 'title' | 'slug' | 'content' | 'createdAt'> & {
    user?: Maybe<({
        __typename?: 'User';
    } & UserFragment)>;
});
export declare type CollectionFragment = ({
    __typename?: 'Collection';
} & Pick<Collection, 'id' | 'name' | 'slug'> & {
    cover?: Maybe<({
        __typename?: 'CoverType';
    } & Pick<CoverType, 'uri'>)>;
});
export declare type CommentAndRepliesFragment = ({
    __typename?: 'Comment';
} & {
    replies?: Maybe<({
        __typename?: 'CommentConnection';
    } & Pick<CommentConnection, 'totalCount'> & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'CommentEdge';
        } & Pick<CommentEdge, 'cursor'> & {
            node: ({
                __typename?: 'Comment';
            } & CommentFragment);
        })>>;
    })>;
} & CommentFragment);
export declare type CommentFragment = ({
    __typename?: 'Comment';
} & Pick<Comment, 'id' | 'text' | 'createdAt' | 'translatable'> & {
    permissions?: Maybe<({
        __typename?: 'CommentPermissions';
    } & Pick<CommentPermissions, 'isOwner'>)>;
    likes?: Maybe<({
        __typename?: 'Likes';
    } & Pick<Likes, 'isLiked' | 'totalCount'>)>;
    user?: Maybe<({
        __typename?: 'User';
    } & UserFragment)>;
});
export declare type NotificationFragment = ({
    __typename?: 'Notification';
} & Pick<Notification, 'id' | 'type' | 'createdAt'> & {
    user: ({
        __typename?: 'User';
    } & UserFragment);
    project?: Maybe<({
        __typename?: 'Project';
    } & ProjectFragment)>;
    post?: Maybe<({
        __typename?: 'Post';
    } & Pick<Post, 'id'>)>;
    comment?: Maybe<({
        __typename?: 'Comment';
    } & Pick<Comment, 'id' | 'text' | 'postId'>)>;
    files?: Maybe<({
        __typename?: 'FileConnection';
    } & {
        edges?: Maybe<Array<Maybe<({
            __typename?: 'FileEdge';
        } & {
            node: ({
                __typename?: 'File';
            } & Pick<File, 'id' | 'uri'>);
        })>>>;
    })>;
});
export declare type PostFragment = ({
    __typename?: 'Post';
} & Pick<Post, 'id' | 'caption' | 'createdAt' | 'translatable'> & {
    user?: Maybe<({
        __typename?: 'User';
    } & UserFragment)>;
    permissions?: Maybe<({
        __typename?: 'PostPermissions';
    } & Pick<PostPermissions, 'isOwner'>)>;
    files?: Maybe<({
        __typename?: 'FileConnection';
    } & {
        edges?: Maybe<Array<Maybe<({
            __typename?: 'FileEdge';
        } & {
            node: ({
                __typename?: 'File';
            } & Pick<File, 'id' | 'type' | 'uri'>);
        })>>>;
    })>;
    project?: Maybe<({
        __typename?: 'Project';
    } & ProjectFragment)>;
    likes?: Maybe<({
        __typename?: 'Likes';
    } & Pick<Likes, 'isLiked' | 'totalCount'>)>;
    bookmarks?: Maybe<({
        __typename?: 'Bookmarks';
    } & Pick<Bookmarks, 'isBookmarked'>)>;
    comments?: Maybe<({
        __typename?: 'CommentConnection';
    } & Pick<CommentConnection, 'totalCount'> & {
        edges?: Maybe<Array<({
            __typename?: 'CommentEdge';
        } & {
            node: ({
                __typename?: 'Comment';
            } & CommentFragment);
        })>>;
    })>;
    likesConnection?: Maybe<({
        __typename?: 'LikeConnection';
    } & {
        edges?: Maybe<Array<({
            __typename?: 'LikeEdge';
        } & {
            node: ({
                __typename?: 'User';
            } & Pick<User, 'id' | 'avatarUrl'>);
        })>>;
    })>;
    collection?: Maybe<({
        __typename?: 'Collection';
    } & Pick<Collection, 'id' | 'name'>)>;
});
export declare type ProjectFragment = ({
    __typename?: 'Project';
} & Pick<Project, 'id' | 'title' | 'slug' | 'dynamicLink'> & {
    user?: Maybe<({
        __typename?: 'User';
    } & UserFragment)>;
    permissions?: Maybe<({
        __typename?: 'ProjectPermissions';
    } & Pick<ProjectPermissions, 'isOwner' | 'isFollower'>)>;
    type?: Maybe<({
        __typename?: 'ProjectType';
    } & Pick<ProjectType, 'title'>)>;
    cover?: Maybe<({
        __typename?: 'CoverType';
    } & Pick<CoverType, 'uri'>)>;
    followers?: Maybe<({
        __typename?: 'FollowersConnection';
    } & Pick<FollowersConnection, 'totalCount'> & {
        edges?: Maybe<Array<({
            __typename?: 'FollowersEdge';
        } & {
            node: ({
                __typename?: 'User';
            } & Pick<User, 'id' | 'username' | 'avatarUrl'>);
        })>>;
    })>;
});
export declare type UserFragment = ({
    __typename?: 'User';
} & Pick<User, 'id' | 'fullName' | 'firstName' | 'lastName' | 'username' | 'avatarUrl' | 'isSilhouette' | 'isOnline' | 'website' | 'location' | 'bio' | 'projectCount' | 'dynamicLink'>);
export declare type UserProjectsFragment = ({
    __typename?: 'User';
} & {
    projects?: Maybe<({
        __typename?: 'ProjectsConnection';
    } & {
        edges?: Maybe<Array<({
            __typename?: 'ProjectEdge';
        } & {
            node: ({
                __typename?: 'Project';
            } & Pick<Project, 'id' | 'title'> & {
                followers?: Maybe<({
                    __typename?: 'FollowersConnection';
                } & Pick<FollowersConnection, 'totalCount'>)>;
                files?: Maybe<({
                    __typename?: 'FileConnection';
                } & {
                    edges?: Maybe<Array<Maybe<({
                        __typename?: 'FileEdge';
                    } & {
                        node: ({
                            __typename?: 'File';
                        } & Pick<File, 'id' | 'uri'>);
                    })>>>;
                })>;
            });
        })>>;
    })>;
});
export declare type UserSettingsFragment = ({
    __typename?: 'User';
} & Pick<User, 'id' | 'role'> & {
    settings?: Maybe<({
        __typename?: 'UserSettings';
    } & {
        notifications?: Maybe<({
            __typename?: 'UserNotificationsSettings';
        } & {
            types?: Maybe<({
                __typename?: 'NotificationSettingsType';
            } & {
                NEW_FOLLOWER?: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
                NEW_COMMENT?: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
                NEW_MENTION?: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
                NEW_ARTICLE?: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
                SIMILAR_PROJECTS?: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
                PRODUCT_ANNOUNCEMENTS?: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
            })>;
        })>;
    })>;
});
export declare type AddBlogPostMutationVariables = Exact<{
    id?: Maybe<Scalars['ID']>;
    input: BlogPostInput;
}>;
export declare type AddBlogPostMutation = ({
    __typename?: 'Mutation';
} & {
    addBlogPost?: Maybe<({
        __typename?: 'BlogPost';
    } & BlogPostFragment)>;
});
export declare type AddCollectionMutationVariables = Exact<{
    projectId: Scalars['ID'];
    name: Scalars['String'];
}>;
export declare type AddCollectionMutation = ({
    __typename?: 'Mutation';
} & {
    addCollection?: Maybe<({
        __typename?: 'Collection';
    } & CollectionFragment)>;
});
export declare type AddCommentMutationVariables = Exact<{
    postId: Scalars['ID'];
    commentId?: Maybe<Scalars['ID']>;
    input: CommentInput;
}>;
export declare type AddCommentMutation = ({
    __typename?: 'Mutation';
} & {
    addComment?: Maybe<({
        __typename?: 'Comment';
    } & CommentAndRepliesFragment)>;
});
export declare type AddPostMutationVariables = Exact<{
    input: PostInput;
}>;
export declare type AddPostMutation = ({
    __typename?: 'Mutation';
} & {
    addPost?: Maybe<({
        __typename?: 'Post';
    } & PostFragment)>;
});
export declare type AddProjectMutationVariables = Exact<{
    input: ProjectInput;
}>;
export declare type AddProjectMutation = ({
    __typename?: 'Mutation';
} & {
    addProject?: Maybe<({
        __typename?: 'Project';
    } & ProjectFragment)>;
});
export declare type AuthenticateAppleMutationVariables = Exact<{
    identityToken: Scalars['String'];
    user: ApplePayload;
}>;
export declare type AuthenticateAppleMutation = ({
    __typename?: 'Mutation';
} & {
    authenticateApple?: Maybe<({
        __typename?: 'Tokens';
    } & Pick<Tokens, 'access_token' | 'refresh_token'>)>;
});
export declare type AuthenticateFacebookMutationVariables = Exact<{
    token: Scalars['String'];
}>;
export declare type AuthenticateFacebookMutation = ({
    __typename?: 'Mutation';
} & {
    authenticateFacebook?: Maybe<({
        __typename?: 'Tokens';
    } & Pick<Tokens, 'access_token' | 'refresh_token'>)>;
});
export declare type AuthenticateGoogleMutationVariables = Exact<{
    idToken: Scalars['String'];
}>;
export declare type AuthenticateGoogleMutation = ({
    __typename?: 'Mutation';
} & {
    authenticateGoogle?: Maybe<({
        __typename?: 'Tokens';
    } & Pick<Tokens, 'access_token' | 'refresh_token'>)>;
});
export declare type BanUserMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type BanUserMutation = ({
    __typename?: 'Mutation';
} & {
    banUser?: Maybe<({
        __typename?: 'User';
    } & UserFragment)>;
});
export declare type BookmarkPostMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type BookmarkPostMutation = ({
    __typename?: 'Mutation';
} & {
    bookmarkPost?: Maybe<({
        __typename?: 'Post';
    } & Pick<Post, 'id'> & {
        bookmarks?: Maybe<({
            __typename?: 'Bookmarks';
        } & Pick<Bookmarks, 'isBookmarked'>)>;
    })>;
});
export declare type CollectPostsMutationVariables = Exact<{
    projectId: Scalars['ID'];
    collectionId: Scalars['ID'];
    input?: Maybe<Array<Maybe<CollectionInput>>>;
}>;
export declare type CollectPostsMutation = ({
    __typename?: 'Mutation';
} & {
    collectPosts?: Maybe<({
        __typename?: 'Collection';
    } & Pick<Collection, 'id' | 'name'> & {
        cover?: Maybe<({
            __typename?: 'CoverType';
        } & Pick<CoverType, 'uri'>)>;
    })>;
});
export declare type DeleteBlogPostMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteBlogPostMutation = ({
    __typename?: 'Mutation';
} & {
    deleteBlogPost?: Maybe<({
        __typename?: 'BlogPost';
    } & Pick<BlogPost, 'id'>)>;
});
export declare type DeleteCollectionMutationVariables = Exact<{
    projectId: Scalars['ID'];
    id: Scalars['ID'];
}>;
export declare type DeleteCollectionMutation = ({
    __typename?: 'Mutation';
} & {
    deleteCollection?: Maybe<({
        __typename?: 'Collection';
    } & Pick<Collection, 'id'>)>;
});
export declare type DeleteCommentMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteCommentMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deleteComment'>);
export declare type DeleteCurrentUserMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type DeleteCurrentUserMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deleteCurrentUser'>);
export declare type DeleteNotificationMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteNotificationMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deleteNotification'>);
export declare type DeletePostMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeletePostMutation = ({
    __typename?: 'Mutation';
} & {
    deletePost?: Maybe<({
        __typename?: 'Post';
    } & Pick<Post, 'id'>)>;
});
export declare type DeleteProjectMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteProjectMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deleteProject'>);
export declare type EditCollectionMutationVariables = Exact<{
    input: EditCollectionInput;
    id: Scalars['ID'];
}>;
export declare type EditCollectionMutation = ({
    __typename?: 'Mutation';
} & {
    editCollection?: Maybe<({
        __typename?: 'Collection';
    } & CollectionFragment)>;
});
export declare type EditPostMutationVariables = Exact<{
    id: Scalars['ID'];
    input: EditPostInput;
}>;
export declare type EditPostMutation = ({
    __typename?: 'Mutation';
} & {
    editPost?: Maybe<({
        __typename?: 'Post';
    } & PostFragment)>;
});
export declare type EditProjectMutationVariables = Exact<{
    id: Scalars['ID'];
    input: ProjectInput;
}>;
export declare type EditProjectMutation = ({
    __typename?: 'Mutation';
} & {
    editProject?: Maybe<({
        __typename?: 'Project';
    } & Pick<Project, 'id' | 'title'>)>;
});
export declare type EditUserMutationVariables = Exact<{
    input: EditUserInput;
    id?: Maybe<Scalars['ID']>;
}>;
export declare type EditUserMutation = ({
    __typename?: 'Mutation';
} & {
    editUser?: Maybe<({
        __typename?: 'User';
    } & UserFragment)>;
});
export declare type FollowProjectMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type FollowProjectMutation = ({
    __typename?: 'Mutation';
} & {
    followProject?: Maybe<({
        __typename?: 'Project';
    } & {
        cover?: Maybe<({
            __typename?: 'CoverType';
        } & Pick<CoverType, 'uri' | 'default'>)>;
    } & ProjectFragment)>;
});
export declare type LikeCommentMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type LikeCommentMutation = ({
    __typename?: 'Mutation';
} & {
    likeComment?: Maybe<({
        __typename?: 'Comment';
    } & Pick<Comment, 'id'> & {
        likes?: Maybe<({
            __typename?: 'Likes';
        } & Pick<Likes, 'isLiked' | 'totalCount'>)>;
    })>;
});
export declare type LikePostMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type LikePostMutation = ({
    __typename?: 'Mutation';
} & {
    likePost?: Maybe<({
        __typename?: 'Post';
    } & Pick<Post, 'id'> & {
        likes?: Maybe<({
            __typename?: 'Likes';
        } & Pick<Likes, 'isLiked' | 'totalCount'>)>;
    })>;
});
export declare type MarkAllNotificationsSeenMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type MarkAllNotificationsSeenMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'markAllNotificationsSeen'>);
export declare type MarkNotificationSeenMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type MarkNotificationSeenMutation = ({
    __typename?: 'Mutation';
} & {
    markNotificationSeen?: Maybe<({
        __typename?: 'Notification';
    } & NotificationFragment)>;
});
export declare type PreSignUrlMutationVariables = Exact<{
    input: PreSignedUrlInput;
}>;
export declare type PreSignUrlMutation = ({
    __typename?: 'Mutation';
} & {
    preSignUrl?: Maybe<({
        __typename?: 'PreSignedUrl';
    } & Pick<PreSignedUrl, 'url' | 'type' | 'filename'>)>;
});
export declare type PreSignUrlsMutationVariables = Exact<{
    input: Array<Maybe<PreSignedUrlnput>>;
}>;
export declare type PreSignUrlsMutation = ({
    __typename?: 'Mutation';
} & {
    preSignUrls?: Maybe<Array<Maybe<({
        __typename?: 'PreSignedUrl';
    } & Pick<PreSignedUrl, 'url' | 'type' | 'filename'>)>>>;
});
export declare type RefreshTokenMutationVariables = Exact<{
    refreshToken: Scalars['String'];
}>;
export declare type RefreshTokenMutation = ({
    __typename?: 'Mutation';
} & {
    token?: Maybe<({
        __typename?: 'AccessToken';
    } & Pick<AccessToken, 'access_token'>)>;
});
export declare type RegisterDeviceTokenMutationVariables = Exact<{
    token: Scalars['String'];
    platform: PlatformType;
}>;
export declare type RegisterDeviceTokenMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'registerDeviceToken'>);
export declare type SendPromoMutationVariables = Exact<{
    number: Scalars['String'];
}>;
export declare type SendPromoMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'sendPromo'>);
export declare type ToggleNotificationSettingsMutationVariables = Exact<{
    input?: Maybe<ToggleNotificationSettingsInput>;
}>;
export declare type ToggleNotificationSettingsMutation = ({
    __typename?: 'Mutation';
} & {
    toggleNotificationSettings?: Maybe<({
        __typename?: 'User';
    } & UserSettingsFragment)>;
});
export declare type TranslateCommentMutationVariables = Exact<{
    id: Scalars['ID'];
    original?: Maybe<Scalars['Boolean']>;
}>;
export declare type TranslateCommentMutation = ({
    __typename?: 'Mutation';
} & {
    translateComment?: Maybe<({
        __typename?: 'Comment';
    } & Pick<Comment, 'id' | 'translatable' | 'text'>)>;
});
export declare type TranslatePostMutationVariables = Exact<{
    id: Scalars['ID'];
    original?: Maybe<Scalars['Boolean']>;
}>;
export declare type TranslatePostMutation = ({
    __typename?: 'Mutation';
} & {
    translatePost?: Maybe<({
        __typename?: 'Post';
    } & Pick<Post, 'id' | 'translatable' | 'caption'>)>;
});
export declare type BlogPostQueryVariables = Exact<{
    slug?: Maybe<Scalars['LowercaseString']>;
    id?: Maybe<Scalars['ID']>;
}>;
export declare type BlogPostQuery = ({
    __typename?: 'Query';
} & {
    blogPost?: Maybe<({
        __typename?: 'BlogPost';
    } & BlogPostFragment)>;
});
export declare type BlogPostsQueryVariables = Exact<{
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type BlogPostsQuery = ({
    __typename?: 'Query';
} & {
    blogPosts?: Maybe<({
        __typename?: 'BlogPostConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'BlogPostEdge';
        } & Pick<BlogPostEdge, 'cursor'> & {
            node: ({
                __typename?: 'BlogPost';
            } & BlogPostFragment);
        })>>;
    })>;
});
export declare type BookmarksQueryVariables = Exact<{
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type BookmarksQuery = ({
    __typename?: 'Query';
} & {
    bookmarks?: Maybe<({
        __typename?: 'BookmarkConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'BookmarkEdge';
        } & Pick<BookmarkEdge, 'cursor'> & {
            node: ({
                __typename?: 'Post';
            } & PostFragment);
        })>>;
    })>;
});
export declare type CollectionsQueryVariables = Exact<{
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['LowercaseString']>;
    projectId?: Maybe<Scalars['ID']>;
    projectSlug?: Maybe<Scalars['LowercaseString']>;
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type CollectionsQuery = ({
    __typename?: 'Query';
} & {
    collections?: Maybe<({
        __typename?: 'PostConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'PostEdge';
        } & Pick<PostEdge, 'cursor'> & {
            node: ({
                __typename?: 'Post';
            } & PostFragment);
        })>>;
    })>;
});
export declare type CommentQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type CommentQuery = ({
    __typename?: 'Query';
} & {
    comment?: Maybe<({
        __typename?: 'Comment';
    } & CommentFragment)>;
});
export declare type CommentsQueryVariables = Exact<{
    postId: Scalars['ID'];
    after?: Maybe<Scalars['String']>;
}>;
export declare type CommentsQuery = ({
    __typename?: 'Query';
} & {
    post?: Maybe<({
        __typename?: 'Post';
    } & PostFragment)>;
    comments?: Maybe<({
        __typename?: 'CommentConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'CommentEdge';
        } & Pick<CommentEdge, 'cursor'> & {
            node: ({
                __typename?: 'Comment';
            } & CommentAndRepliesFragment);
        })>>;
    })>;
});
export declare type CurrentUserQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentUserQuery = ({
    __typename?: 'Query';
} & {
    user?: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'avatarUrl' | 'bio' | 'dynamicLink' | 'firstName' | 'fullName' | 'id' | 'isOnline' | 'isSilhouette' | 'lastName' | 'location' | 'projectCount' | 'username' | 'website' | 'role'> & {
        settings?: Maybe<({
            __typename?: 'UserSettings';
        } & Pick<UserSettings, 'timezone' | 'locale'>)>;
        interestedIn?: Maybe<Array<Maybe<({
            __typename?: 'ProjectType';
        } & Pick<ProjectType, 'id' | 'title'>)>>>;
    } & UserProjectsFragment)>;
});
export declare type CurrentUserFollowingProjectsQueryVariables = Exact<{
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type CurrentUserFollowingProjectsQuery = ({
    __typename?: 'Query';
} & {
    user?: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id'> & {
        projects?: Maybe<({
            __typename?: 'ProjectsConnection';
        } & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges?: Maybe<Array<({
                __typename?: 'ProjectEdge';
            } & Pick<ProjectEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Project';
                } & {
                    cover?: Maybe<({
                        __typename?: 'CoverType';
                    } & Pick<CoverType, 'uri' | 'default'>)>;
                } & ProjectFragment);
            })>>;
        })>;
    })>;
});
export declare type CurrentUserProfileQueryVariables = Exact<{
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type CurrentUserProfileQuery = ({
    __typename?: 'Query';
} & {
    user?: Maybe<({
        __typename?: 'User';
    } & {
        projects?: Maybe<({
            __typename?: 'ProjectsConnection';
        } & {
            edges?: Maybe<Array<({
                __typename?: 'ProjectEdge';
            } & {
                node: ({
                    __typename?: 'Project';
                } & {
                    cover?: Maybe<({
                        __typename?: 'CoverType';
                    } & Pick<CoverType, 'uri' | 'default'>)>;
                } & ProjectFragment);
            })>>;
        })>;
        posts?: Maybe<({
            __typename?: 'PostConnection';
        } & {
            edges?: Maybe<Array<({
                __typename?: 'PostEdge';
            } & Pick<PostEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Post';
                } & PostFragment);
            })>>;
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
        })>;
    } & UserFragment)>;
});
export declare type CurrentUserProjectsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentUserProjectsQuery = ({
    __typename?: 'Query';
} & {
    user?: Maybe<({
        __typename?: 'User';
    } & UserProjectsFragment)>;
});
export declare type CurrentUserSettingsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentUserSettingsQuery = ({
    __typename?: 'Query';
} & {
    user?: Maybe<({
        __typename?: 'User';
    } & UserSettingsFragment)>;
});
export declare type FeedQueryVariables = Exact<{
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type FeedQuery = ({
    __typename?: 'Query';
} & {
    feed?: Maybe<({
        __typename?: 'Feed';
    } & {
        posts?: Maybe<({
            __typename?: 'PostConnection';
        } & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges?: Maybe<Array<({
                __typename?: 'PostEdge';
            } & Pick<PostEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Post';
                } & PostFragment);
            })>>;
        })>;
    })>;
});
export declare type FilesQueryVariables = Exact<{
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type FilesQuery = ({
    __typename?: 'Query';
} & {
    files?: Maybe<({
        __typename?: 'FileConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<Maybe<({
            __typename?: 'FileEdge';
        } & Pick<FileEdge, 'cursor'> & {
            node: ({
                __typename?: 'File';
            } & Pick<File, 'id' | 'uri' | 'postId'>);
        })>>>;
    })>;
});
export declare type FollowersQueryVariables = Exact<{
    projectId: Scalars['ID'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type FollowersQuery = ({
    __typename?: 'Query';
} & {
    followers?: Maybe<({
        __typename?: 'FollowersConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'FollowersEdge';
        } & Pick<FollowersEdge, 'cursor'> & {
            node: ({
                __typename?: 'User';
            } & UserFragment);
        })>>;
    })>;
});
export declare type GrowthQueryVariables = Exact<{
    type: GrowthType;
}>;
export declare type GrowthQuery = ({
    __typename?: 'Query';
} & {
    growth?: Maybe<Array<Maybe<({
        __typename?: 'GrowthData';
    } & Pick<GrowthData, 'date' | 'count'>)>>>;
});
export declare type HashtagQueryVariables = Exact<{
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['LowercaseString']>;
    name?: Maybe<Scalars['String']>;
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type HashtagQuery = ({
    __typename?: 'Query';
} & {
    hashtag?: Maybe<({
        __typename?: 'Hashtag';
    } & {
        posts?: Maybe<({
            __typename?: 'PostConnection';
        } & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges?: Maybe<Array<({
                __typename?: 'PostEdge';
            } & Pick<PostEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Post';
                } & PostFragment);
            })>>;
        })>;
    })>;
});
export declare type LikesQueryVariables = Exact<{
    postId: Scalars['ID'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type LikesQuery = ({
    __typename?: 'Query';
} & {
    likes?: Maybe<({
        __typename?: 'LikeConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'LikeEdge';
        } & Pick<LikeEdge, 'cursor'> & {
            node: ({
                __typename?: 'User';
            } & UserFragment);
        })>>;
    })>;
});
export declare type MetaQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type MetaQuery = ({
    __typename?: 'Query';
} & {
    meta?: Maybe<({
        __typename?: 'Meta';
    } & Pick<Meta, 'totalUsers' | 'totalUsersToday' | 'totalPostsToday' | 'totalProjectsToday' | 'totalCommentsToday' | 'totalFilesToday' | 'totalComments' | 'totalProjects' | 'totalPosts' | 'totalFiles'>)>;
});
export declare type NotificationsQueryVariables = Exact<{
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type NotificationsQuery = ({
    __typename?: 'Query';
} & {
    notifications?: Maybe<({
        __typename?: 'NotificationsConnection';
    } & Pick<NotificationsConnection, 'unreadCount'> & {
        pageInfo?: Maybe<({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>)>;
        edges?: Maybe<Array<Maybe<({
            __typename?: 'NotificationEdge';
        } & Pick<NotificationEdge, 'cursor'> & {
            node?: Maybe<({
                __typename?: 'Notification';
            } & NotificationFragment)>;
        })>>>;
    })>;
});
export declare type PostQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type PostQuery = ({
    __typename?: 'Query';
} & {
    post?: Maybe<({
        __typename?: 'Post';
    } & PostFragment)>;
});
export declare type PostsQueryVariables = Exact<{
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type PostsQuery = ({
    __typename?: 'Query';
} & {
    posts?: Maybe<({
        __typename?: 'PostConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'PostEdge';
        } & Pick<PostEdge, 'cursor'> & {
            node: ({
                __typename?: 'Post';
            } & PostFragment);
        })>>;
    })>;
});
export declare type ProjectQueryVariables = Exact<{
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['LowercaseString']>;
    after?: Maybe<Scalars['String']>;
    postId?: Maybe<Scalars['ID']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type ProjectQuery = ({
    __typename?: 'Query';
} & {
    post?: Maybe<({
        __typename?: 'Post';
    } & PostFragment)>;
    project?: Maybe<({
        __typename?: 'Project';
    } & {
        posts?: Maybe<({
            __typename?: 'PostConnection';
        } & Pick<PostConnection, 'totalCount'> & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges?: Maybe<Array<({
                __typename?: 'PostEdge';
            } & Pick<PostEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Post';
                } & PostFragment);
            })>>;
        })>;
    } & ProjectFragment)>;
});
export declare type ProjectCollectionsQueryVariables = Exact<{
    projectId?: Maybe<Scalars['ID']>;
    projectSlug?: Maybe<Scalars['LowercaseString']>;
    slug?: Maybe<Scalars['LowercaseString']>;
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type ProjectCollectionsQuery = ({
    __typename?: 'Query';
} & {
    projectCollections?: Maybe<({
        __typename?: 'CollectionConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'CollectionEdge';
        } & Pick<CollectionEdge, 'cursor'> & {
            node: ({
                __typename?: 'Collection';
            } & CollectionFragment);
        })>>;
    })>;
});
export declare type ProjectSuggestionsQueryVariables = Exact<{
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type ProjectSuggestionsQuery = ({
    __typename?: 'Query';
} & {
    projects?: Maybe<Array<Maybe<({
        __typename?: 'ProjectSuggestionsConnection';
    } & {
        type?: Maybe<({
            __typename?: 'ProjectType';
        } & Pick<ProjectType, 'id' | 'title'>)>;
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'ProjectEdge';
        } & {
            node: ({
                __typename?: 'Project';
            } & {
                cover?: Maybe<({
                    __typename?: 'CoverType';
                } & Pick<CoverType, 'uri' | 'default'>)>;
            } & ProjectFragment);
        })>>;
    })>>>;
});
export declare type ProjectTypesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type ProjectTypesQuery = ({
    __typename?: 'Query';
} & {
    types?: Maybe<Array<Maybe<({
        __typename?: 'ProjectType';
    } & Pick<ProjectType, 'id' | 'title' | 'imageUrl'>)>>>;
});
export declare type ProjectsQueryVariables = Exact<{
    typeId?: Maybe<Scalars['ID']>;
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    type: ProjectSortType;
}>;
export declare type ProjectsQuery = ({
    __typename?: 'Query';
} & {
    projects?: Maybe<({
        __typename?: 'ProjectsConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'ProjectEdge';
        } & Pick<ProjectEdge, 'cursor'> & {
            node: ({
                __typename?: 'Project';
            } & {
                cover?: Maybe<({
                    __typename?: 'CoverType';
                } & Pick<CoverType, 'uri' | 'default'>)>;
            } & ProjectFragment);
        })>>;
    })>;
});
export declare type RecentCommentsQueryVariables = Exact<{
    after?: Maybe<Scalars['String']>;
}>;
export declare type RecentCommentsQuery = ({
    __typename?: 'Query';
} & {
    comments?: Maybe<({
        __typename?: 'CommentConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges?: Maybe<Array<({
            __typename?: 'CommentEdge';
        } & Pick<CommentEdge, 'cursor'> & {
            node: ({
                __typename?: 'Comment';
            } & CommentAndRepliesFragment);
        })>>;
    })>;
});
export declare type RepliesQueryVariables = Exact<{
    id: Scalars['ID'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type RepliesQuery = ({
    __typename?: 'Query';
} & {
    comment?: Maybe<({
        __typename?: 'Comment';
    } & {
        replies?: Maybe<({
            __typename?: 'CommentConnection';
        } & Pick<CommentConnection, 'totalCount'> & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges?: Maybe<Array<({
                __typename?: 'CommentEdge';
            } & Pick<CommentEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Comment';
                } & CommentFragment);
            })>>;
        })>;
    })>;
});
export declare type SearchHashtagsQueryVariables = Exact<{
    query: Scalars['String'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type SearchHashtagsQuery = ({
    __typename?: 'Query';
} & {
    hashtags?: Maybe<({
        __typename?: 'SearchResults';
    } & {
        pageInfo?: Maybe<({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>)>;
        edges?: Maybe<Array<Maybe<({
            __typename?: 'SearchResultEdge';
        } & Pick<SearchResultEdge, 'cursor'> & {
            node?: Maybe<{
                __typename?: 'Project';
            } | {
                __typename?: 'User';
            } | {
                __typename?: 'Model';
            } | ({
                __typename?: 'Hashtag';
            } & Pick<Hashtag, 'id' | 'name' | 'slug' | 'totalCount'>)>;
        })>>>;
    })>;
});
export declare type SearchModelsQueryVariables = Exact<{
    query: Scalars['String'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type SearchModelsQuery = ({
    __typename?: 'Query';
} & {
    models?: Maybe<({
        __typename?: 'SearchResults';
    } & {
        pageInfo?: Maybe<({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>)>;
        edges?: Maybe<Array<Maybe<({
            __typename?: 'SearchResultEdge';
        } & Pick<SearchResultEdge, 'cursor'> & {
            node?: Maybe<{
                __typename?: 'Project';
            } | {
                __typename?: 'User';
            } | ({
                __typename?: 'Model';
            } & Pick<Model, 'id' | 'model' | 'year'> & {
                brand?: Maybe<({
                    __typename?: 'Brand';
                } & Pick<Brand, 'name'>)>;
            }) | {
                __typename?: 'Hashtag';
            }>;
        })>>>;
    })>;
});
export declare type SearchProjectsQueryVariables = Exact<{
    query: Scalars['String'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type SearchProjectsQuery = ({
    __typename?: 'Query';
} & {
    projects?: Maybe<({
        __typename?: 'SearchResults';
    } & {
        pageInfo?: Maybe<({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>)>;
        edges?: Maybe<Array<Maybe<({
            __typename?: 'SearchResultEdge';
        } & Pick<SearchResultEdge, 'cursor'> & {
            node?: Maybe<({
                __typename?: 'Project';
            } & {
                cover?: Maybe<({
                    __typename?: 'CoverType';
                } & Pick<CoverType, 'uri' | 'default'>)>;
            } & ProjectFragment) | {
                __typename?: 'User';
            } | {
                __typename?: 'Model';
            } | {
                __typename?: 'Hashtag';
            }>;
        })>>>;
    })>;
});
export declare type SearchUsersQueryVariables = Exact<{
    query: Scalars['String'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type SearchUsersQuery = ({
    __typename?: 'Query';
} & {
    users?: Maybe<({
        __typename?: 'SearchResults';
    } & {
        pageInfo?: Maybe<({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>)>;
        edges?: Maybe<Array<Maybe<({
            __typename?: 'SearchResultEdge';
        } & Pick<SearchResultEdge, 'cursor'> & {
            node?: Maybe<{
                __typename?: 'Project';
            } | ({
                __typename?: 'User';
            } & Pick<User, 'projectCount'> & UserFragment) | {
                __typename?: 'Model';
            } | {
                __typename?: 'Hashtag';
            }>;
        })>>>;
    })>;
});
export declare type SimilarProjectsQueryVariables = Exact<{
    id: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
}>;
export declare type SimilarProjectsQuery = ({
    __typename?: 'Query';
} & {
    similarProjects?: Maybe<({
        __typename?: 'ProjectsConnection';
    } & {
        edges?: Maybe<Array<({
            __typename?: 'ProjectEdge';
        } & Pick<ProjectEdge, 'cursor'> & {
            node: ({
                __typename?: 'Project';
            } & {
                cover?: Maybe<({
                    __typename?: 'CoverType';
                } & Pick<CoverType, 'uri'>)>;
            } & ProjectFragment);
        })>>;
    })>;
});
export declare type UnreadNotificationsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type UnreadNotificationsQuery = ({
    __typename?: 'Query';
} & {
    notifications?: Maybe<({
        __typename?: 'NotificationsConnection';
    } & Pick<NotificationsConnection, 'unreadCount'>)>;
});
export declare type UserQueryVariables = Exact<{
    username: Scalars['LowercaseString'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type UserQuery = ({
    __typename?: 'Query';
} & {
    user?: Maybe<({
        __typename?: 'User';
    } & {
        projects?: Maybe<({
            __typename?: 'ProjectsConnection';
        } & {
            edges?: Maybe<Array<({
                __typename?: 'ProjectEdge';
            } & {
                node: ({
                    __typename?: 'Project';
                } & {
                    cover?: Maybe<({
                        __typename?: 'CoverType';
                    } & Pick<CoverType, 'uri' | 'default'>)>;
                } & ProjectFragment);
            })>>;
        })>;
        posts?: Maybe<({
            __typename?: 'PostConnection';
        } & {
            edges?: Maybe<Array<({
                __typename?: 'PostEdge';
            } & Pick<PostEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Post';
                } & PostFragment);
            })>>;
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
        })>;
    } & UserFragment)>;
});
export declare type UserFollowingProjectsQueryVariables = Exact<{
    username: Scalars['LowercaseString'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
}>;
export declare type UserFollowingProjectsQuery = ({
    __typename?: 'Query';
} & {
    user?: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id'> & {
        projects?: Maybe<({
            __typename?: 'ProjectsConnection';
        } & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges?: Maybe<Array<({
                __typename?: 'ProjectEdge';
            } & Pick<ProjectEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Project';
                } & {
                    cover?: Maybe<({
                        __typename?: 'CoverType';
                    } & Pick<CoverType, 'uri' | 'default'>)>;
                } & ProjectFragment);
            })>>;
        })>;
    })>;
});
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
    id?: string | null | undefined;
    input: BlogPostInput;
}>>;
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
}>>;
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
    commentId?: string | null | undefined;
    input: CommentInput;
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
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
    input?: Maybe<CollectionInput>[] | null | undefined;
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
export declare type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export declare type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export declare type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
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
}>>;
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
}>>;
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
}>>;
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
    id?: string | null | undefined;
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
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
}>>;
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
    input: Maybe<PreSignedUrlnput>[];
}>>;
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
}>>;
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
}>>;
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
}>>;
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
    input?: ToggleNotificationSettingsInput | null | undefined;
}>>;
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
    original?: boolean | null | undefined;
}>>;
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
    original?: boolean | null | undefined;
}>>;
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
    id?: string | null | undefined;
}>>;
export declare function useBlogPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogPostQuery, BlogPostQueryVariables>): Apollo.QueryTuple<BlogPostQuery, Exact<{
    slug?: any;
    id?: string | null | undefined;
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
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useBlogPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogPostsQuery, BlogPostsQueryVariables>): Apollo.QueryTuple<BlogPostsQuery, Exact<{
    after?: string | null | undefined;
    first?: number | null | undefined;
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
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookmarksQuery, BookmarksQueryVariables>): Apollo.QueryTuple<BookmarksQuery, Exact<{
    after?: string | null | undefined;
    first?: number | null | undefined;
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
    id?: string | null | undefined;
    slug?: any;
    projectId?: string | null | undefined;
    projectSlug?: any;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionsQuery, CollectionsQueryVariables>): Apollo.QueryTuple<CollectionsQuery, Exact<{
    id?: string | null | undefined;
    slug?: any;
    projectId?: string | null | undefined;
    projectSlug?: any;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useCommentQuery(baseOptions?: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>): Apollo.QueryResult<CommentQuery, Exact<{
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
export declare function useCommentsQuery(baseOptions?: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>): Apollo.QueryResult<CommentsQuery, Exact<{
    postId: string;
    after?: string | null | undefined;
}>>;
export declare function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>): Apollo.QueryTuple<CommentsQuery, Exact<{
    postId: string;
    after?: string | null | undefined;
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
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useCurrentUserFollowingProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>): Apollo.QueryTuple<CurrentUserFollowingProjectsQuery, Exact<{
    after?: string | null | undefined;
    first?: number | null | undefined;
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
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useCurrentUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>): Apollo.QueryTuple<CurrentUserProfileQuery, Exact<{
    after?: string | null | undefined;
    first?: number | null | undefined;
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
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>): Apollo.QueryTuple<FeedQuery, Exact<{
    after?: string | null | undefined;
    first?: number | null | undefined;
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
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilesQuery, FilesQueryVariables>): Apollo.QueryTuple<FilesQuery, Exact<{
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useFollowersQuery(baseOptions?: Apollo.QueryHookOptions<FollowersQuery, FollowersQueryVariables>): Apollo.QueryResult<FollowersQuery, Exact<{
    projectId: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>): Apollo.QueryTuple<FollowersQuery, Exact<{
    projectId: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useGrowthQuery(baseOptions?: Apollo.QueryHookOptions<GrowthQuery, GrowthQueryVariables>): Apollo.QueryResult<GrowthQuery, Exact<{
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
    id?: string | null | undefined;
    slug?: any;
    name?: string | null | undefined;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useHashtagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HashtagQuery, HashtagQueryVariables>): Apollo.QueryTuple<HashtagQuery, Exact<{
    id?: string | null | undefined;
    slug?: any;
    name?: string | null | undefined;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useLikesQuery(baseOptions?: Apollo.QueryHookOptions<LikesQuery, LikesQueryVariables>): Apollo.QueryResult<LikesQuery, Exact<{
    postId: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LikesQuery, LikesQueryVariables>): Apollo.QueryTuple<LikesQuery, Exact<{
    postId: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>): Apollo.QueryTuple<NotificationsQuery, Exact<{
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function usePostQuery(baseOptions?: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>): Apollo.QueryResult<PostQuery, Exact<{
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
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>): Apollo.QueryTuple<PostsQuery, Exact<{
    after?: string | null | undefined;
    first?: number | null | undefined;
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
    id?: string | null | undefined;
    slug?: any;
    after?: string | null | undefined;
    postId?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>): Apollo.QueryTuple<ProjectQuery, Exact<{
    id?: string | null | undefined;
    slug?: any;
    after?: string | null | undefined;
    postId?: string | null | undefined;
    first?: number | null | undefined;
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
    projectId?: string | null | undefined;
    projectSlug?: any;
    slug?: any;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useProjectCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>): Apollo.QueryTuple<ProjectCollectionsQuery, Exact<{
    projectId?: string | null | undefined;
    projectSlug?: any;
    slug?: any;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useProjectSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>): Apollo.QueryTuple<ProjectSuggestionsQuery, Exact<{
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>): Apollo.QueryResult<ProjectsQuery, Exact<{
    typeId?: string | null | undefined;
    after?: string | null | undefined;
    first?: number | null | undefined;
    type: ProjectSortType;
}>>;
export declare function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>): Apollo.QueryTuple<ProjectsQuery, Exact<{
    typeId?: string | null | undefined;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
    after?: string | null | undefined;
}>>;
export declare function useRecentCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>): Apollo.QueryTuple<RecentCommentsQuery, Exact<{
    after?: string | null | undefined;
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
export declare function useRepliesQuery(baseOptions?: Apollo.QueryHookOptions<RepliesQuery, RepliesQueryVariables>): Apollo.QueryResult<RepliesQuery, Exact<{
    id: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useRepliesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepliesQuery, RepliesQueryVariables>): Apollo.QueryTuple<RepliesQuery, Exact<{
    id: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useSearchHashtagsQuery(baseOptions?: Apollo.QueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>): Apollo.QueryResult<SearchHashtagsQuery, Exact<{
    query: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useSearchHashtagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>): Apollo.QueryTuple<SearchHashtagsQuery, Exact<{
    query: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useSearchModelsQuery(baseOptions?: Apollo.QueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>): Apollo.QueryResult<SearchModelsQuery, Exact<{
    query: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useSearchModelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>): Apollo.QueryTuple<SearchModelsQuery, Exact<{
    query: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useSearchProjectsQuery(baseOptions?: Apollo.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>): Apollo.QueryResult<SearchProjectsQuery, Exact<{
    query: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useSearchProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>): Apollo.QueryTuple<SearchProjectsQuery, Exact<{
    query: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useSearchUsersQuery(baseOptions?: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>): Apollo.QueryResult<SearchUsersQuery, Exact<{
    query: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>): Apollo.QueryTuple<SearchUsersQuery, Exact<{
    query: string;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useSimilarProjectsQuery(baseOptions?: Apollo.QueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>): Apollo.QueryResult<SimilarProjectsQuery, Exact<{
    id: string;
    first?: number | null | undefined;
}>>;
export declare function useSimilarProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>): Apollo.QueryTuple<SimilarProjectsQuery, Exact<{
    id: string;
    first?: number | null | undefined;
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
export declare function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>): Apollo.QueryResult<UserQuery, Exact<{
    username: any;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>): Apollo.QueryTuple<UserQuery, Exact<{
    username: any;
    after?: string | null | undefined;
    first?: number | null | undefined;
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
export declare function useUserFollowingProjectsQuery(baseOptions?: Apollo.QueryHookOptions<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>): Apollo.QueryResult<UserFollowingProjectsQuery, Exact<{
    username: any;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare function useUserFollowingProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>): Apollo.QueryTuple<UserFollowingProjectsQuery, Exact<{
    username: any;
    after?: string | null | undefined;
    first?: number | null | undefined;
}>>;
export declare type UserFollowingProjectsQueryHookResult = ReturnType<typeof useUserFollowingProjectsQuery>;
export declare type UserFollowingProjectsLazyQueryHookResult = ReturnType<typeof useUserFollowingProjectsLazyQuery>;
export declare type UserFollowingProjectsQueryResult = Apollo.QueryResult<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>;
