import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export declare type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    LowercaseString: any;
};
export declare type AccessToken = {
    __typename?: 'AccessToken';
    access_token?: Maybe<Scalars['String']>;
};
export declare type ApplePayload = {
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
};
export declare type Brand = {
    __typename?: 'Brand';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
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
    repliesConnection?: Maybe<CommentConnection>;
    likes?: Maybe<Likes>;
};
export declare type CommentRepliesConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
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
export declare type CommentInput = {
    text: Scalars['String'];
};
export declare type CommentPermissions = {
    __typename?: 'CommentPermissions';
    isOwner?: Maybe<Scalars['Boolean']>;
};
export declare type CoverType = {
    __typename?: 'CoverType';
    uri?: Maybe<Scalars['String']>;
    default?: Maybe<Scalars['Boolean']>;
};
export declare type EditPostInput = {
    caption?: Maybe<Scalars['String']>;
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
export declare type File = {
    __typename?: 'File';
    id?: Maybe<Scalars['ID']>;
    type?: Maybe<FileType>;
    uri: Scalars['String'];
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
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
};
export declare enum FileType {
    Image = "IMAGE",
    Video = "VIDEO"
}
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
export declare type GrowthData = {
    __typename?: 'GrowthData';
    date?: Maybe<Scalars['Date']>;
    count?: Maybe<Scalars['Int']>;
};
export declare enum GrowthType {
    Projects = "PROJECTS",
    Users = "USERS"
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
export declare type Likes = {
    __typename?: 'Likes';
    totalCount?: Maybe<Scalars['Int']>;
    isLiked?: Maybe<Scalars['Boolean']>;
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
export declare type Model = {
    __typename?: 'Model';
    id: Scalars['ID'];
    brand?: Maybe<Brand>;
    model?: Maybe<Scalars['String']>;
    year?: Maybe<Scalars['Int']>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    dummy?: Maybe<Scalars['String']>;
    authenticateApple?: Maybe<Tokens>;
    authenticateFacebook?: Maybe<Tokens>;
    authenticateGoogle?: Maybe<Tokens>;
    refreshToken?: Maybe<AccessToken>;
    addComment?: Maybe<Comment>;
    editComment?: Maybe<Comment>;
    deleteComment?: Maybe<Scalars['Boolean']>;
    sendPromo?: Maybe<Scalars['Boolean']>;
    likePost?: Maybe<Post>;
    likeComment?: Maybe<Comment>;
    markAllNotificationsSeen?: Maybe<Scalars['Boolean']>;
    markNotificationSeen?: Maybe<Notification>;
    deleteNotification?: Maybe<Scalars['Boolean']>;
    deletePost?: Maybe<Post>;
    addPost?: Maybe<Post>;
    editPost?: Maybe<Post>;
    followProject?: Maybe<Project>;
    addProject?: Maybe<Project>;
    editProject?: Maybe<Project>;
    deleteProject?: Maybe<Scalars['Boolean']>;
    preSignUrls?: Maybe<Array<Maybe<PreSignedUrl>>>;
    preSignUrl?: Maybe<PreSignedUrl>;
    editUser?: Maybe<User>;
    toggleNotificationSettings?: Maybe<User>;
    registerDeviceToken?: Maybe<Scalars['Boolean']>;
    banUser?: Maybe<Scalars['Boolean']>;
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
    userId: Scalars['ID'];
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
export declare type NotificationsConnection = {
    __typename?: 'NotificationsConnection';
    unreadCount?: Maybe<Scalars['Int']>;
    pageInfo?: Maybe<PageInfo>;
    edges?: Maybe<Array<Maybe<NotificationEdge>>>;
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
export declare enum NotificationTypes {
    NewComment = "NEW_COMMENT",
    NewFollower = "NEW_FOLLOWER",
    NewPostLike = "NEW_POST_LIKE",
    NewCommentLike = "NEW_COMMENT_LIKE",
    NewMention = "NEW_MENTION",
    NewReply = "NEW_REPLY"
}
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
    id?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    caption?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
    project?: Maybe<Project>;
    postPermissions?: Maybe<PostPermissions>;
    permissions?: Maybe<PostPermissions>;
    likes?: Maybe<Likes>;
    filesConnection?: Maybe<FileConnection>;
    commentsConnection?: Maybe<CommentConnection>;
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
export declare type PostInput = {
    projectId: Scalars['ID'];
    caption?: Maybe<Scalars['String']>;
    files: Array<Maybe<FileInput>>;
};
export declare type PostPermissions = {
    __typename?: 'PostPermissions';
    isOwner?: Maybe<Scalars['Boolean']>;
};
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
export declare type PreSignedUrlnput = {
    type: UploadType;
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
export declare type ProjectEdge = {
    __typename?: 'ProjectEdge';
    cursor: Scalars['String'];
    node: Project;
};
export declare type ProjectInput = {
    title?: Maybe<Scalars['String']>;
    commentsDisabled?: Maybe<Scalars['Boolean']>;
    projectTypeId?: Maybe<Scalars['ID']>;
    modelId?: Maybe<Scalars['ID']>;
};
export declare type ProjectPermissions = {
    __typename?: 'ProjectPermissions';
    isFollower?: Maybe<Scalars['Boolean']>;
    isOwner?: Maybe<Scalars['Boolean']>;
};
export declare type ProjectsConnection = {
    __typename?: 'ProjectsConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<ProjectEdge>>;
};
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
export declare type ProjectType = {
    __typename?: 'ProjectType';
    id?: Maybe<Scalars['ID']>;
    title?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['String']>;
    imageUrl: Scalars['String'];
};
export declare type ProjectTypeInput = {
    id?: Maybe<Scalars['ID']>;
};
export declare type Query = {
    __typename?: 'Query';
    dummy?: Maybe<Scalars['String']>;
    comments?: Maybe<CommentConnection>;
    recentComments?: Maybe<CommentConnection>;
    comment?: Maybe<Comment>;
    feed?: Maybe<Feed>;
    files?: Maybe<FileConnection>;
    followers?: Maybe<FollowersConnection>;
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
    meta?: Maybe<Meta>;
    growth?: Maybe<Array<Maybe<GrowthData>>>;
    hashtag?: Maybe<Hashtag>;
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
export declare type QueryFilesArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    scale?: Maybe<Scalars['Int']>;
    type?: Maybe<FileType>;
};
export declare type QueryFollowersArgs = {
    projectId: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
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
export declare type QueryGrowthArgs = {
    type: GrowthType;
    startDate?: Maybe<Scalars['Date']>;
    endDate?: Maybe<Scalars['Date']>;
};
export declare type QueryHashtagArgs = {
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['LowercaseString']>;
};
export declare type SearchResultEdge = {
    __typename?: 'SearchResultEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<SearchResultNode>;
};
export declare type SearchResultNode = Project | User | Model | Hashtag;
export declare type SearchResults = {
    __typename?: 'SearchResults';
    totalCount?: Maybe<Scalars['Int']>;
    edges?: Maybe<Array<Maybe<SearchResultEdge>>>;
    pageInfo?: Maybe<PageInfo>;
};
export declare enum SearchType {
    Projects = "PROJECTS",
    Users = "USERS",
    Models = "MODELS",
    Hashtags = "HASHTAGS"
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
export declare type UserNotificationsSettings = {
    __typename?: 'UserNotificationsSettings';
    types?: Maybe<NotificationSettingsType>;
};
export declare enum UserRole {
    User = "USER",
    Admin = "ADMIN"
}
export declare type UserSettings = {
    __typename?: 'UserSettings';
    locale?: Maybe<Scalars['String']>;
    timezone?: Maybe<Scalars['String']>;
    notifications?: Maybe<UserNotificationsSettings>;
};
export declare type CommentAndRepliesFragment = ({
    __typename?: 'Comment';
} & {
    replies: Maybe<({
        __typename?: 'CommentConnection';
    } & Pick<CommentConnection, 'totalCount'> & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges: Maybe<Array<({
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
} & Pick<Comment, 'id' | 'text' | 'createdAt'> & {
    permissions: Maybe<({
        __typename?: 'CommentPermissions';
    } & Pick<CommentPermissions, 'isOwner'>)>;
    likes: Maybe<({
        __typename?: 'Likes';
    } & Pick<Likes, 'isLiked' | 'totalCount'>)>;
    user: Maybe<({
        __typename?: 'User';
    } & UserFragment)>;
});
export declare type NotificationFragment = ({
    __typename?: 'Notification';
} & Pick<Notification, 'id' | 'type' | 'createdAt'> & {
    user: ({
        __typename?: 'User';
    } & UserFragment);
    project: Maybe<({
        __typename?: 'Project';
    } & ProjectFragment)>;
    post: Maybe<({
        __typename?: 'Post';
    } & Pick<Post, 'id'>)>;
    comment: Maybe<({
        __typename?: 'Comment';
    } & Pick<Comment, 'id' | 'text' | 'postId'>)>;
    files: Maybe<({
        __typename?: 'FileConnection';
    } & {
        edges: Maybe<Array<Maybe<({
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
} & Pick<Post, 'id' | 'caption' | 'createdAt'> & {
    user: Maybe<({
        __typename?: 'User';
    } & UserFragment)>;
    permissions: Maybe<({
        __typename?: 'PostPermissions';
    } & Pick<PostPermissions, 'isOwner'>)>;
    files: Maybe<({
        __typename?: 'FileConnection';
    } & {
        edges: Maybe<Array<Maybe<({
            __typename?: 'FileEdge';
        } & {
            node: ({
                __typename?: 'File';
            } & Pick<File, 'id' | 'type' | 'uri'>);
        })>>>;
    })>;
    project: Maybe<({
        __typename?: 'Project';
    } & ProjectFragment)>;
    likes: Maybe<({
        __typename?: 'Likes';
    } & Pick<Likes, 'isLiked' | 'totalCount'>)>;
    comments: Maybe<({
        __typename?: 'CommentConnection';
    } & Pick<CommentConnection, 'totalCount'> & {
        edges: Maybe<Array<({
            __typename?: 'CommentEdge';
        } & {
            node: ({
                __typename?: 'Comment';
            } & CommentFragment);
        })>>;
    })>;
});
export declare type ProjectFragment = ({
    __typename?: 'Project';
} & Pick<Project, 'id' | 'title' | 'slug' | 'dynamicLink'> & {
    user: Maybe<({
        __typename?: 'User';
    } & UserFragment)>;
    permissions: Maybe<({
        __typename?: 'ProjectPermissions';
    } & Pick<ProjectPermissions, 'isOwner' | 'isFollower'>)>;
    followers: Maybe<({
        __typename?: 'FollowersConnection';
    } & Pick<FollowersConnection, 'totalCount'>)>;
});
export declare type UserFragment = ({
    __typename?: 'User';
} & Pick<User, 'id' | 'fullName' | 'firstName' | 'lastName' | 'username' | 'avatarUrl' | 'isSilhouette' | 'isOnline' | 'website' | 'location' | 'bio' | 'projectCount' | 'dynamicLink'>);
export declare type UserProjectsFragment = ({
    __typename?: 'User';
} & {
    projects: Maybe<({
        __typename?: 'ProjectsConnection';
    } & {
        edges: Maybe<Array<({
            __typename?: 'ProjectEdge';
        } & {
            node: ({
                __typename?: 'Project';
            } & Pick<Project, 'id' | 'title'> & {
                followers: Maybe<({
                    __typename?: 'FollowersConnection';
                } & Pick<FollowersConnection, 'totalCount'>)>;
                files: Maybe<({
                    __typename?: 'FileConnection';
                } & {
                    edges: Maybe<Array<Maybe<({
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
} & Pick<User, 'id'> & {
    settings: Maybe<({
        __typename?: 'UserSettings';
    } & {
        notifications: Maybe<({
            __typename?: 'UserNotificationsSettings';
        } & {
            types: Maybe<({
                __typename?: 'NotificationSettingsType';
            } & {
                NEW_FOLLOWER: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
                NEW_COMMENT: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
                NEW_MENTION: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
                NEW_ARTICLE: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
                SIMILAR_PROJECTS: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
                PRODUCT_ANNOUNCEMENTS: Maybe<({
                    __typename?: 'NotificationKindSettings';
                } & Pick<NotificationKindSettings, 'email' | 'push'>)>;
            })>;
        })>;
    })>;
});
export declare type AddCommentMutationVariables = {
    postId: Scalars['ID'];
    commentId?: Maybe<Scalars['ID']>;
    input: CommentInput;
};
export declare type AddCommentMutation = ({
    __typename?: 'Mutation';
} & {
    addComment: Maybe<({
        __typename?: 'Comment';
    } & Pick<Comment, 'commentId' | 'id' | 'text'>)>;
});
export declare type AddPostMutationVariables = {
    input: PostInput;
};
export declare type AddPostMutation = ({
    __typename?: 'Mutation';
} & {
    addPost: Maybe<({
        __typename?: 'Post';
    } & PostFragment)>;
});
export declare type AddProjectMutationVariables = {
    input: ProjectInput;
};
export declare type AddProjectMutation = ({
    __typename?: 'Mutation';
} & {
    addProject: Maybe<({
        __typename?: 'Project';
    } & ProjectFragment)>;
});
export declare type AuthenticateAppleMutationVariables = {
    identityToken: Scalars['String'];
    user: ApplePayload;
};
export declare type AuthenticateAppleMutation = ({
    __typename?: 'Mutation';
} & {
    authenticateApple: Maybe<({
        __typename?: 'Tokens';
    } & Pick<Tokens, 'access_token' | 'refresh_token'>)>;
});
export declare type AuthenticateFacebookMutationVariables = {
    token: Scalars['String'];
};
export declare type AuthenticateFacebookMutation = ({
    __typename?: 'Mutation';
} & {
    authenticateFacebook: Maybe<({
        __typename?: 'Tokens';
    } & Pick<Tokens, 'access_token' | 'refresh_token'>)>;
});
export declare type AuthenticateGoogleMutationVariables = {
    idToken: Scalars['String'];
};
export declare type AuthenticateGoogleMutation = ({
    __typename?: 'Mutation';
} & {
    authenticateGoogle: Maybe<({
        __typename?: 'Tokens';
    } & Pick<Tokens, 'access_token' | 'refresh_token'>)>;
});
export declare type DeleteCommentMutationVariables = {
    id: Scalars['ID'];
};
export declare type DeleteCommentMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deleteComment'>);
export declare type DeleteNotificationMutationVariables = {
    id: Scalars['ID'];
};
export declare type DeleteNotificationMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deleteNotification'>);
export declare type DeletePostMutationVariables = {
    id: Scalars['ID'];
};
export declare type DeletePostMutation = ({
    __typename?: 'Mutation';
} & {
    deletePost: Maybe<({
        __typename?: 'Post';
    } & Pick<Post, 'id'>)>;
});
export declare type DeleteProjectMutationVariables = {
    id: Scalars['ID'];
};
export declare type DeleteProjectMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deleteProject'>);
export declare type EditPostMutationVariables = {
    id: Scalars['ID'];
    input: EditPostInput;
};
export declare type EditPostMutation = ({
    __typename?: 'Mutation';
} & {
    editPost: Maybe<({
        __typename?: 'Post';
    } & PostFragment)>;
});
export declare type EditProjectMutationVariables = {
    id: Scalars['ID'];
    input: ProjectInput;
};
export declare type EditProjectMutation = ({
    __typename?: 'Mutation';
} & {
    editProject: Maybe<({
        __typename?: 'Project';
    } & Pick<Project, 'id' | 'title'>)>;
});
export declare type EditUserMutationVariables = {
    input: EditUserInput;
    id?: Maybe<Scalars['ID']>;
};
export declare type EditUserMutation = ({
    __typename?: 'Mutation';
} & {
    editUser: Maybe<({
        __typename?: 'User';
    } & UserFragment)>;
});
export declare type FollowProjectMutationVariables = {
    id: Scalars['ID'];
};
export declare type FollowProjectMutation = ({
    __typename?: 'Mutation';
} & {
    followProject: Maybe<({
        __typename?: 'Project';
    } & {
        cover: Maybe<({
            __typename?: 'CoverType';
        } & Pick<CoverType, 'uri' | 'default'>)>;
    } & ProjectFragment)>;
});
export declare type LikeCommentMutationVariables = {
    id: Scalars['ID'];
};
export declare type LikeCommentMutation = ({
    __typename?: 'Mutation';
} & {
    likeComment: Maybe<({
        __typename?: 'Comment';
    } & Pick<Comment, 'id'> & {
        likes: Maybe<({
            __typename?: 'Likes';
        } & Pick<Likes, 'isLiked' | 'totalCount'>)>;
    })>;
});
export declare type LikePostMutationVariables = {
    id: Scalars['ID'];
};
export declare type LikePostMutation = ({
    __typename?: 'Mutation';
} & {
    likePost: Maybe<({
        __typename?: 'Post';
    } & Pick<Post, 'id'> & {
        likes: Maybe<({
            __typename?: 'Likes';
        } & Pick<Likes, 'isLiked' | 'totalCount'>)>;
    })>;
});
export declare type MarkAllNotificationsSeenMutationVariables = {};
export declare type MarkAllNotificationsSeenMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'markAllNotificationsSeen'>);
export declare type MarkNotificationSeenMutationVariables = {
    id: Scalars['ID'];
};
export declare type MarkNotificationSeenMutation = ({
    __typename?: 'Mutation';
} & {
    markNotificationSeen: Maybe<({
        __typename?: 'Notification';
    } & NotificationFragment)>;
});
export declare type PreSignUrlMutationVariables = {
    input: PreSignedUrlInput;
};
export declare type PreSignUrlMutation = ({
    __typename?: 'Mutation';
} & {
    preSignUrl: Maybe<({
        __typename?: 'PreSignedUrl';
    } & Pick<PreSignedUrl, 'url' | 'type' | 'filename'>)>;
});
export declare type PreSignUrlsMutationVariables = {
    input: Array<Maybe<PreSignedUrlnput>>;
};
export declare type PreSignUrlsMutation = ({
    __typename?: 'Mutation';
} & {
    preSignUrls: Maybe<Array<Maybe<({
        __typename?: 'PreSignedUrl';
    } & Pick<PreSignedUrl, 'url' | 'type' | 'filename'>)>>>;
});
export declare type RefreshTokenMutationVariables = {
    refreshToken: Scalars['String'];
};
export declare type RefreshTokenMutation = ({
    __typename?: 'Mutation';
} & {
    token: Maybe<({
        __typename?: 'AccessToken';
    } & Pick<AccessToken, 'access_token'>)>;
});
export declare type RegisterDeviceTokenMutationVariables = {
    token: Scalars['String'];
    platform: PlatformType;
};
export declare type RegisterDeviceTokenMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'registerDeviceToken'>);
export declare type ToggleNotificationSettingsMutationVariables = {
    input?: Maybe<ToggleNotificationSettingsInput>;
};
export declare type ToggleNotificationSettingsMutation = ({
    __typename?: 'Mutation';
} & {
    toggleNotificationSettings: Maybe<({
        __typename?: 'User';
    } & UserSettingsFragment)>;
});
export declare type CommentQueryVariables = {
    id: Scalars['ID'];
};
export declare type CommentQuery = ({
    __typename?: 'Query';
} & {
    comment: Maybe<({
        __typename?: 'Comment';
    } & CommentFragment)>;
});
export declare type CommentsQueryVariables = {
    postId: Scalars['ID'];
    after?: Maybe<Scalars['String']>;
};
export declare type CommentsQuery = ({
    __typename?: 'Query';
} & {
    post: Maybe<({
        __typename?: 'Post';
    } & PostFragment)>;
    comments: Maybe<({
        __typename?: 'CommentConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges: Maybe<Array<({
            __typename?: 'CommentEdge';
        } & Pick<CommentEdge, 'cursor'> & {
            node: ({
                __typename?: 'Comment';
            } & CommentAndRepliesFragment);
        })>>;
    })>;
});
export declare type CurrentUserQueryVariables = {};
export declare type CurrentUserQuery = ({
    __typename?: 'Query';
} & {
    user: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'avatarUrl' | 'bio' | 'dynamicLink' | 'firstName' | 'fullName' | 'id' | 'isOnline' | 'isSilhouette' | 'lastName' | 'location' | 'projectCount' | 'username' | 'website' | 'role'> & {
        settings: Maybe<({
            __typename?: 'UserSettings';
        } & Pick<UserSettings, 'timezone' | 'locale'>)>;
        interestedIn: Maybe<Array<Maybe<({
            __typename?: 'ProjectType';
        } & Pick<ProjectType, 'id' | 'title'>)>>>;
    } & UserProjectsFragment)>;
});
export declare type CurrentUserFollowingProjectsQueryVariables = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type CurrentUserFollowingProjectsQuery = ({
    __typename?: 'Query';
} & {
    user: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id'> & {
        projects: Maybe<({
            __typename?: 'ProjectsConnection';
        } & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges: Maybe<Array<({
                __typename?: 'ProjectEdge';
            } & Pick<ProjectEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Project';
                } & {
                    cover: Maybe<({
                        __typename?: 'CoverType';
                    } & Pick<CoverType, 'uri' | 'default'>)>;
                } & ProjectFragment);
            })>>;
        })>;
    })>;
});
export declare type CurrentUserProfileQueryVariables = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type CurrentUserProfileQuery = ({
    __typename?: 'Query';
} & {
    user: Maybe<({
        __typename?: 'User';
    } & {
        projects: Maybe<({
            __typename?: 'ProjectsConnection';
        } & {
            edges: Maybe<Array<({
                __typename?: 'ProjectEdge';
            } & {
                node: ({
                    __typename?: 'Project';
                } & {
                    cover: Maybe<({
                        __typename?: 'CoverType';
                    } & Pick<CoverType, 'uri' | 'default'>)>;
                } & ProjectFragment);
            })>>;
        })>;
        posts: Maybe<({
            __typename?: 'PostConnection';
        } & {
            edges: Maybe<Array<({
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
export declare type CurrentUserProjectsQueryVariables = {};
export declare type CurrentUserProjectsQuery = ({
    __typename?: 'Query';
} & {
    user: Maybe<({
        __typename?: 'User';
    } & UserProjectsFragment)>;
});
export declare type CurrentUserSettingsQueryVariables = {};
export declare type CurrentUserSettingsQuery = ({
    __typename?: 'Query';
} & {
    user: Maybe<({
        __typename?: 'User';
    } & UserSettingsFragment)>;
});
export declare type FeedQueryVariables = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type FeedQuery = ({
    __typename?: 'Query';
} & {
    feed: Maybe<({
        __typename?: 'Feed';
    } & {
        posts: Maybe<({
            __typename?: 'PostConnection';
        } & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges: Maybe<Array<({
                __typename?: 'PostEdge';
            } & Pick<PostEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Post';
                } & PostFragment);
            })>>;
        })>;
    })>;
});
export declare type FollowersQueryVariables = {
    projectId: Scalars['ID'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type FollowersQuery = ({
    __typename?: 'Query';
} & {
    followers: Maybe<({
        __typename?: 'FollowersConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges: Maybe<Array<({
            __typename?: 'FollowersEdge';
        } & Pick<FollowersEdge, 'cursor'> & {
            node: ({
                __typename?: 'User';
            } & UserFragment);
        })>>;
    })>;
});
export declare type GrowthQueryVariables = {
    type: GrowthType;
};
export declare type GrowthQuery = ({
    __typename?: 'Query';
} & {
    growth: Maybe<Array<Maybe<({
        __typename?: 'GrowthData';
    } & Pick<GrowthData, 'date' | 'count'>)>>>;
});
export declare type HashtagQueryVariables = {
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['LowercaseString']>;
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type HashtagQuery = ({
    __typename?: 'Query';
} & {
    hashtag: Maybe<({
        __typename?: 'Hashtag';
    } & {
        posts: Maybe<({
            __typename?: 'PostConnection';
        } & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges: Maybe<Array<({
                __typename?: 'PostEdge';
            } & Pick<PostEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Post';
                } & PostFragment);
            })>>;
        })>;
    })>;
});
export declare type MetaQueryVariables = {};
export declare type MetaQuery = ({
    __typename?: 'Query';
} & {
    meta: Maybe<({
        __typename?: 'Meta';
    } & Pick<Meta, 'totalUsers' | 'totalUsersToday' | 'totalPostsToday' | 'totalProjectsToday' | 'totalCommentsToday' | 'totalFilesToday' | 'totalComments' | 'totalProjects' | 'totalPosts' | 'totalFiles'>)>;
});
export declare type NotificationsQueryVariables = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type NotificationsQuery = ({
    __typename?: 'Query';
} & {
    notifications: Maybe<({
        __typename?: 'NotificationsConnection';
    } & Pick<NotificationsConnection, 'unreadCount'> & {
        pageInfo: Maybe<({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>)>;
        edges: Maybe<Array<Maybe<({
            __typename?: 'NotificationEdge';
        } & Pick<NotificationEdge, 'cursor'> & {
            node: Maybe<({
                __typename?: 'Notification';
            } & NotificationFragment)>;
        })>>>;
    })>;
});
export declare type PostQueryVariables = {
    id: Scalars['ID'];
};
export declare type PostQuery = ({
    __typename?: 'Query';
} & {
    post: Maybe<({
        __typename?: 'Post';
    } & PostFragment)>;
});
export declare type PostsQueryVariables = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type PostsQuery = ({
    __typename?: 'Query';
} & {
    posts: Maybe<({
        __typename?: 'PostConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges: Maybe<Array<({
            __typename?: 'PostEdge';
        } & Pick<PostEdge, 'cursor'> & {
            node: ({
                __typename?: 'Post';
            } & PostFragment);
        })>>;
    })>;
});
export declare type ProjectQueryVariables = {
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['LowercaseString']>;
    after?: Maybe<Scalars['String']>;
    postId?: Maybe<Scalars['ID']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type ProjectQuery = ({
    __typename?: 'Query';
} & {
    post: Maybe<({
        __typename?: 'Post';
    } & PostFragment)>;
    project: Maybe<({
        __typename?: 'Project';
    } & {
        posts: Maybe<({
            __typename?: 'PostConnection';
        } & {
            edges: Maybe<Array<({
                __typename?: 'PostEdge';
            } & Pick<PostEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Post';
                } & PostFragment);
            })>>;
        })>;
    } & ProjectFragment)>;
});
export declare type ProjectSuggestionsQueryVariables = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type ProjectSuggestionsQuery = ({
    __typename?: 'Query';
} & {
    projects: Maybe<Array<Maybe<({
        __typename?: 'ProjectSuggestionsConnection';
    } & {
        type: Maybe<({
            __typename?: 'ProjectType';
        } & Pick<ProjectType, 'id' | 'title'>)>;
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges: Maybe<Array<({
            __typename?: 'ProjectEdge';
        } & {
            node: ({
                __typename?: 'Project';
            } & {
                cover: Maybe<({
                    __typename?: 'CoverType';
                } & Pick<CoverType, 'uri' | 'default'>)>;
            } & ProjectFragment);
        })>>;
    })>>>;
});
export declare type ProjectTypesQueryVariables = {};
export declare type ProjectTypesQuery = ({
    __typename?: 'Query';
} & {
    types: Maybe<Array<Maybe<({
        __typename?: 'ProjectType';
    } & Pick<ProjectType, 'id' | 'title' | 'imageUrl'>)>>>;
});
export declare type ProjectsQueryVariables = {
    typeId?: Maybe<Scalars['ID']>;
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    type: ProjectSortType;
};
export declare type ProjectsQuery = ({
    __typename?: 'Query';
} & {
    projects: Maybe<({
        __typename?: 'ProjectsConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges: Maybe<Array<({
            __typename?: 'ProjectEdge';
        } & Pick<ProjectEdge, 'cursor'> & {
            node: ({
                __typename?: 'Project';
            } & {
                cover: Maybe<({
                    __typename?: 'CoverType';
                } & Pick<CoverType, 'uri' | 'default'>)>;
            } & ProjectFragment);
        })>>;
    })>;
});
export declare type RecentCommentsQueryVariables = {
    after?: Maybe<Scalars['String']>;
};
export declare type RecentCommentsQuery = ({
    __typename?: 'Query';
} & {
    comments: Maybe<({
        __typename?: 'CommentConnection';
    } & {
        pageInfo: ({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>);
        edges: Maybe<Array<({
            __typename?: 'CommentEdge';
        } & Pick<CommentEdge, 'cursor'> & {
            node: ({
                __typename?: 'Comment';
            } & CommentAndRepliesFragment);
        })>>;
    })>;
});
export declare type RepliesQueryVariables = {
    id: Scalars['ID'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type RepliesQuery = ({
    __typename?: 'Query';
} & {
    comment: Maybe<({
        __typename?: 'Comment';
    } & {
        replies: Maybe<({
            __typename?: 'CommentConnection';
        } & Pick<CommentConnection, 'totalCount'> & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges: Maybe<Array<({
                __typename?: 'CommentEdge';
            } & Pick<CommentEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Comment';
                } & CommentFragment);
            })>>;
        })>;
    })>;
});
export declare type SearchHashtagsQueryVariables = {
    query: Scalars['String'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type SearchHashtagsQuery = ({
    __typename?: 'Query';
} & {
    hashtags: Maybe<({
        __typename?: 'SearchResults';
    } & {
        pageInfo: Maybe<({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>)>;
        edges: Maybe<Array<Maybe<({
            __typename?: 'SearchResultEdge';
        } & Pick<SearchResultEdge, 'cursor'> & {
            node: Maybe<{
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
export declare type SearchModelsQueryVariables = {
    query: Scalars['String'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type SearchModelsQuery = ({
    __typename?: 'Query';
} & {
    models: Maybe<({
        __typename?: 'SearchResults';
    } & {
        pageInfo: Maybe<({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>)>;
        edges: Maybe<Array<Maybe<({
            __typename?: 'SearchResultEdge';
        } & {
            node: Maybe<{
                __typename?: 'Project';
            } | {
                __typename?: 'User';
            } | ({
                __typename?: 'Model';
            } & Pick<Model, 'id' | 'model' | 'year'> & {
                brand: Maybe<({
                    __typename?: 'Brand';
                } & Pick<Brand, 'name'>)>;
            }) | {
                __typename?: 'Hashtag';
            }>;
        })>>>;
    })>;
});
export declare type SearchProjectsQueryVariables = {
    query: Scalars['String'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type SearchProjectsQuery = ({
    __typename?: 'Query';
} & {
    projects: Maybe<({
        __typename?: 'SearchResults';
    } & {
        pageInfo: Maybe<({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>)>;
        edges: Maybe<Array<Maybe<({
            __typename?: 'SearchResultEdge';
        } & Pick<SearchResultEdge, 'cursor'> & {
            node: Maybe<({
                __typename?: 'Project';
            } & {
                cover: Maybe<({
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
export declare type SearchUsersQueryVariables = {
    query: Scalars['String'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type SearchUsersQuery = ({
    __typename?: 'Query';
} & {
    users: Maybe<({
        __typename?: 'SearchResults';
    } & {
        pageInfo: Maybe<({
            __typename?: 'PageInfo';
        } & Pick<PageInfo, 'hasNextPage'>)>;
        edges: Maybe<Array<Maybe<({
            __typename?: 'SearchResultEdge';
        } & Pick<SearchResultEdge, 'cursor'> & {
            node: Maybe<{
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
export declare type SimilarProjectsQueryVariables = {
    id: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
};
export declare type SimilarProjectsQuery = ({
    __typename?: 'Query';
} & {
    similarProjects: Maybe<({
        __typename?: 'ProjectsConnection';
    } & {
        edges: Maybe<Array<({
            __typename?: 'ProjectEdge';
        } & Pick<ProjectEdge, 'cursor'> & {
            node: ({
                __typename?: 'Project';
            } & {
                cover: Maybe<({
                    __typename?: 'CoverType';
                } & Pick<CoverType, 'uri'>)>;
            } & ProjectFragment);
        })>>;
    })>;
});
export declare type UserQueryVariables = {
    username: Scalars['LowercaseString'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type UserQuery = ({
    __typename?: 'Query';
} & {
    user: Maybe<({
        __typename?: 'User';
    } & {
        projects: Maybe<({
            __typename?: 'ProjectsConnection';
        } & {
            edges: Maybe<Array<({
                __typename?: 'ProjectEdge';
            } & {
                node: ({
                    __typename?: 'Project';
                } & {
                    cover: Maybe<({
                        __typename?: 'CoverType';
                    } & Pick<CoverType, 'uri' | 'default'>)>;
                } & ProjectFragment);
            })>>;
        })>;
        posts: Maybe<({
            __typename?: 'PostConnection';
        } & {
            edges: Maybe<Array<({
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
export declare type UserFollowingProjectsQueryVariables = {
    username: Scalars['LowercaseString'];
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type UserFollowingProjectsQuery = ({
    __typename?: 'Query';
} & {
    user: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id'> & {
        projects: Maybe<({
            __typename?: 'ProjectsConnection';
        } & {
            pageInfo: ({
                __typename?: 'PageInfo';
            } & Pick<PageInfo, 'hasNextPage'>);
            edges: Maybe<Array<({
                __typename?: 'ProjectEdge';
            } & Pick<ProjectEdge, 'cursor'> & {
                node: ({
                    __typename?: 'Project';
                } & {
                    cover: Maybe<({
                        __typename?: 'CoverType';
                    } & Pick<CoverType, 'uri' | 'default'>)>;
                } & ProjectFragment);
            })>>;
        })>;
    })>;
});
export declare const UserFragmentDoc: import("graphql").DocumentNode;
export declare const CommentFragmentDoc: import("graphql").DocumentNode;
export declare const CommentAndRepliesFragmentDoc: import("graphql").DocumentNode;
export declare const ProjectFragmentDoc: import("graphql").DocumentNode;
export declare const NotificationFragmentDoc: import("graphql").DocumentNode;
export declare const PostFragmentDoc: import("graphql").DocumentNode;
export declare const UserProjectsFragmentDoc: import("graphql").DocumentNode;
export declare const UserSettingsFragmentDoc: import("graphql").DocumentNode;
export declare const AddCommentDocument: import("graphql").DocumentNode;
export declare type AddCommentMutationFn = ApolloReactCommon.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;
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
export declare function useAddCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>): ApolloReactHooks.MutationTuple<AddCommentMutation, AddCommentMutationVariables>;
export declare type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export declare type AddCommentMutationResult = ApolloReactCommon.MutationResult<AddCommentMutation>;
export declare type AddCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export declare const AddPostDocument: import("graphql").DocumentNode;
export declare type AddPostMutationFn = ApolloReactCommon.MutationFunction<AddPostMutation, AddPostMutationVariables>;
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
export declare function useAddPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPostMutation, AddPostMutationVariables>): ApolloReactHooks.MutationTuple<AddPostMutation, AddPostMutationVariables>;
export declare type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export declare type AddPostMutationResult = ApolloReactCommon.MutationResult<AddPostMutation>;
export declare type AddPostMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export declare const AddProjectDocument: import("graphql").DocumentNode;
export declare type AddProjectMutationFn = ApolloReactCommon.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;
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
export declare function useAddProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>): ApolloReactHooks.MutationTuple<AddProjectMutation, AddProjectMutationVariables>;
export declare type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export declare type AddProjectMutationResult = ApolloReactCommon.MutationResult<AddProjectMutation>;
export declare type AddProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export declare const AuthenticateAppleDocument: import("graphql").DocumentNode;
export declare type AuthenticateAppleMutationFn = ApolloReactCommon.MutationFunction<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>;
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
export declare function useAuthenticateAppleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>): ApolloReactHooks.MutationTuple<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>;
export declare type AuthenticateAppleMutationHookResult = ReturnType<typeof useAuthenticateAppleMutation>;
export declare type AuthenticateAppleMutationResult = ApolloReactCommon.MutationResult<AuthenticateAppleMutation>;
export declare type AuthenticateAppleMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>;
export declare const AuthenticateFacebookDocument: import("graphql").DocumentNode;
export declare type AuthenticateFacebookMutationFn = ApolloReactCommon.MutationFunction<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>;
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
export declare function useAuthenticateFacebookMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>): ApolloReactHooks.MutationTuple<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>;
export declare type AuthenticateFacebookMutationHookResult = ReturnType<typeof useAuthenticateFacebookMutation>;
export declare type AuthenticateFacebookMutationResult = ApolloReactCommon.MutationResult<AuthenticateFacebookMutation>;
export declare type AuthenticateFacebookMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>;
export declare const AuthenticateGoogleDocument: import("graphql").DocumentNode;
export declare type AuthenticateGoogleMutationFn = ApolloReactCommon.MutationFunction<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>;
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
export declare function useAuthenticateGoogleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>): ApolloReactHooks.MutationTuple<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>;
export declare type AuthenticateGoogleMutationHookResult = ReturnType<typeof useAuthenticateGoogleMutation>;
export declare type AuthenticateGoogleMutationResult = ApolloReactCommon.MutationResult<AuthenticateGoogleMutation>;
export declare type AuthenticateGoogleMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>;
export declare const DeleteCommentDocument: import("graphql").DocumentNode;
export declare type DeleteCommentMutationFn = ApolloReactCommon.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;
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
export declare function useDeleteCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>): ApolloReactHooks.MutationTuple<DeleteCommentMutation, DeleteCommentMutationVariables>;
export declare type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export declare type DeleteCommentMutationResult = ApolloReactCommon.MutationResult<DeleteCommentMutation>;
export declare type DeleteCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export declare const DeleteNotificationDocument: import("graphql").DocumentNode;
export declare type DeleteNotificationMutationFn = ApolloReactCommon.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
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
export declare function useDeleteNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>): ApolloReactHooks.MutationTuple<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export declare type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export declare type DeleteNotificationMutationResult = ApolloReactCommon.MutationResult<DeleteNotificationMutation>;
export declare type DeleteNotificationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export declare const DeletePostDocument: import("graphql").DocumentNode;
export declare type DeletePostMutationFn = ApolloReactCommon.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;
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
export declare function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>): ApolloReactHooks.MutationTuple<DeletePostMutation, DeletePostMutationVariables>;
export declare type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export declare type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export declare type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export declare const DeleteProjectDocument: import("graphql").DocumentNode;
export declare type DeleteProjectMutationFn = ApolloReactCommon.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;
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
export declare function useDeleteProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>): ApolloReactHooks.MutationTuple<DeleteProjectMutation, DeleteProjectMutationVariables>;
export declare type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export declare type DeleteProjectMutationResult = ApolloReactCommon.MutationResult<DeleteProjectMutation>;
export declare type DeleteProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export declare const EditPostDocument: import("graphql").DocumentNode;
export declare type EditPostMutationFn = ApolloReactCommon.MutationFunction<EditPostMutation, EditPostMutationVariables>;
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
export declare function useEditPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditPostMutation, EditPostMutationVariables>): ApolloReactHooks.MutationTuple<EditPostMutation, EditPostMutationVariables>;
export declare type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export declare type EditPostMutationResult = ApolloReactCommon.MutationResult<EditPostMutation>;
export declare type EditPostMutationOptions = ApolloReactCommon.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export declare const EditProjectDocument: import("graphql").DocumentNode;
export declare type EditProjectMutationFn = ApolloReactCommon.MutationFunction<EditProjectMutation, EditProjectMutationVariables>;
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
export declare function useEditProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditProjectMutation, EditProjectMutationVariables>): ApolloReactHooks.MutationTuple<EditProjectMutation, EditProjectMutationVariables>;
export declare type EditProjectMutationHookResult = ReturnType<typeof useEditProjectMutation>;
export declare type EditProjectMutationResult = ApolloReactCommon.MutationResult<EditProjectMutation>;
export declare type EditProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<EditProjectMutation, EditProjectMutationVariables>;
export declare const EditUserDocument: import("graphql").DocumentNode;
export declare type EditUserMutationFn = ApolloReactCommon.MutationFunction<EditUserMutation, EditUserMutationVariables>;
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
export declare function useEditUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditUserMutation, EditUserMutationVariables>): ApolloReactHooks.MutationTuple<EditUserMutation, EditUserMutationVariables>;
export declare type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export declare type EditUserMutationResult = ApolloReactCommon.MutationResult<EditUserMutation>;
export declare type EditUserMutationOptions = ApolloReactCommon.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export declare const FollowProjectDocument: import("graphql").DocumentNode;
export declare type FollowProjectMutationFn = ApolloReactCommon.MutationFunction<FollowProjectMutation, FollowProjectMutationVariables>;
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
export declare function useFollowProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FollowProjectMutation, FollowProjectMutationVariables>): ApolloReactHooks.MutationTuple<FollowProjectMutation, FollowProjectMutationVariables>;
export declare type FollowProjectMutationHookResult = ReturnType<typeof useFollowProjectMutation>;
export declare type FollowProjectMutationResult = ApolloReactCommon.MutationResult<FollowProjectMutation>;
export declare type FollowProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<FollowProjectMutation, FollowProjectMutationVariables>;
export declare const LikeCommentDocument: import("graphql").DocumentNode;
export declare type LikeCommentMutationFn = ApolloReactCommon.MutationFunction<LikeCommentMutation, LikeCommentMutationVariables>;
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
export declare function useLikeCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikeCommentMutation, LikeCommentMutationVariables>): ApolloReactHooks.MutationTuple<LikeCommentMutation, LikeCommentMutationVariables>;
export declare type LikeCommentMutationHookResult = ReturnType<typeof useLikeCommentMutation>;
export declare type LikeCommentMutationResult = ApolloReactCommon.MutationResult<LikeCommentMutation>;
export declare type LikeCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<LikeCommentMutation, LikeCommentMutationVariables>;
export declare const LikePostDocument: import("graphql").DocumentNode;
export declare type LikePostMutationFn = ApolloReactCommon.MutationFunction<LikePostMutation, LikePostMutationVariables>;
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
export declare function useLikePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikePostMutation, LikePostMutationVariables>): ApolloReactHooks.MutationTuple<LikePostMutation, LikePostMutationVariables>;
export declare type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export declare type LikePostMutationResult = ApolloReactCommon.MutationResult<LikePostMutation>;
export declare type LikePostMutationOptions = ApolloReactCommon.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export declare const MarkAllNotificationsSeenDocument: import("graphql").DocumentNode;
export declare type MarkAllNotificationsSeenMutationFn = ApolloReactCommon.MutationFunction<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>;
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
export declare function useMarkAllNotificationsSeenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>): ApolloReactHooks.MutationTuple<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>;
export declare type MarkAllNotificationsSeenMutationHookResult = ReturnType<typeof useMarkAllNotificationsSeenMutation>;
export declare type MarkAllNotificationsSeenMutationResult = ApolloReactCommon.MutationResult<MarkAllNotificationsSeenMutation>;
export declare type MarkAllNotificationsSeenMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>;
export declare const MarkNotificationSeenDocument: import("graphql").DocumentNode;
export declare type MarkNotificationSeenMutationFn = ApolloReactCommon.MutationFunction<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>;
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
export declare function useMarkNotificationSeenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>): ApolloReactHooks.MutationTuple<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>;
export declare type MarkNotificationSeenMutationHookResult = ReturnType<typeof useMarkNotificationSeenMutation>;
export declare type MarkNotificationSeenMutationResult = ApolloReactCommon.MutationResult<MarkNotificationSeenMutation>;
export declare type MarkNotificationSeenMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>;
export declare const PreSignUrlDocument: import("graphql").DocumentNode;
export declare type PreSignUrlMutationFn = ApolloReactCommon.MutationFunction<PreSignUrlMutation, PreSignUrlMutationVariables>;
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
export declare function usePreSignUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PreSignUrlMutation, PreSignUrlMutationVariables>): ApolloReactHooks.MutationTuple<PreSignUrlMutation, PreSignUrlMutationVariables>;
export declare type PreSignUrlMutationHookResult = ReturnType<typeof usePreSignUrlMutation>;
export declare type PreSignUrlMutationResult = ApolloReactCommon.MutationResult<PreSignUrlMutation>;
export declare type PreSignUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<PreSignUrlMutation, PreSignUrlMutationVariables>;
export declare const PreSignUrlsDocument: import("graphql").DocumentNode;
export declare type PreSignUrlsMutationFn = ApolloReactCommon.MutationFunction<PreSignUrlsMutation, PreSignUrlsMutationVariables>;
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
export declare function usePreSignUrlsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PreSignUrlsMutation, PreSignUrlsMutationVariables>): ApolloReactHooks.MutationTuple<PreSignUrlsMutation, PreSignUrlsMutationVariables>;
export declare type PreSignUrlsMutationHookResult = ReturnType<typeof usePreSignUrlsMutation>;
export declare type PreSignUrlsMutationResult = ApolloReactCommon.MutationResult<PreSignUrlsMutation>;
export declare type PreSignUrlsMutationOptions = ApolloReactCommon.BaseMutationOptions<PreSignUrlsMutation, PreSignUrlsMutationVariables>;
export declare const RefreshTokenDocument: import("graphql").DocumentNode;
export declare type RefreshTokenMutationFn = ApolloReactCommon.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;
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
export declare function useRefreshTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>): ApolloReactHooks.MutationTuple<RefreshTokenMutation, RefreshTokenMutationVariables>;
export declare type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export declare type RefreshTokenMutationResult = ApolloReactCommon.MutationResult<RefreshTokenMutation>;
export declare type RefreshTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export declare const RegisterDeviceTokenDocument: import("graphql").DocumentNode;
export declare type RegisterDeviceTokenMutationFn = ApolloReactCommon.MutationFunction<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;
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
export declare function useRegisterDeviceTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>): ApolloReactHooks.MutationTuple<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;
export declare type RegisterDeviceTokenMutationHookResult = ReturnType<typeof useRegisterDeviceTokenMutation>;
export declare type RegisterDeviceTokenMutationResult = ApolloReactCommon.MutationResult<RegisterDeviceTokenMutation>;
export declare type RegisterDeviceTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;
export declare const ToggleNotificationSettingsDocument: import("graphql").DocumentNode;
export declare type ToggleNotificationSettingsMutationFn = ApolloReactCommon.MutationFunction<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>;
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
export declare function useToggleNotificationSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>): ApolloReactHooks.MutationTuple<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>;
export declare type ToggleNotificationSettingsMutationHookResult = ReturnType<typeof useToggleNotificationSettingsMutation>;
export declare type ToggleNotificationSettingsMutationResult = ApolloReactCommon.MutationResult<ToggleNotificationSettingsMutation>;
export declare type ToggleNotificationSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>;
export declare const CommentDocument: import("graphql").DocumentNode;
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
export declare function useCommentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CommentQuery, CommentQueryVariables>): ApolloReactCommon.QueryResult<CommentQuery, CommentQueryVariables>;
export declare function useCommentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>): ApolloReactHooks.QueryTuple<CommentQuery, CommentQueryVariables>;
export declare type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export declare type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export declare type CommentQueryResult = ApolloReactCommon.QueryResult<CommentQuery, CommentQueryVariables>;
export declare const CommentsDocument: import("graphql").DocumentNode;
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
export declare function useCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CommentsQuery, CommentsQueryVariables>): ApolloReactCommon.QueryResult<CommentsQuery, CommentsQueryVariables>;
export declare function useCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>): ApolloReactHooks.QueryTuple<CommentsQuery, CommentsQueryVariables>;
export declare type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export declare type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export declare type CommentsQueryResult = ApolloReactCommon.QueryResult<CommentsQuery, CommentsQueryVariables>;
export declare const CurrentUserDocument: import("graphql").DocumentNode;
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
export declare function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>): ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export declare function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>): ApolloReactHooks.QueryTuple<CurrentUserQuery, CurrentUserQueryVariables>;
export declare type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export declare type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export declare type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export declare const CurrentUserFollowingProjectsDocument: import("graphql").DocumentNode;
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
export declare function useCurrentUserFollowingProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>): ApolloReactCommon.QueryResult<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>;
export declare function useCurrentUserFollowingProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>): ApolloReactHooks.QueryTuple<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>;
export declare type CurrentUserFollowingProjectsQueryHookResult = ReturnType<typeof useCurrentUserFollowingProjectsQuery>;
export declare type CurrentUserFollowingProjectsLazyQueryHookResult = ReturnType<typeof useCurrentUserFollowingProjectsLazyQuery>;
export declare type CurrentUserFollowingProjectsQueryResult = ApolloReactCommon.QueryResult<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>;
export declare const CurrentUserProfileDocument: import("graphql").DocumentNode;
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
export declare function useCurrentUserProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>): ApolloReactCommon.QueryResult<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>;
export declare function useCurrentUserProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>): ApolloReactHooks.QueryTuple<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>;
export declare type CurrentUserProfileQueryHookResult = ReturnType<typeof useCurrentUserProfileQuery>;
export declare type CurrentUserProfileLazyQueryHookResult = ReturnType<typeof useCurrentUserProfileLazyQuery>;
export declare type CurrentUserProfileQueryResult = ApolloReactCommon.QueryResult<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>;
export declare const CurrentUserProjectsDocument: import("graphql").DocumentNode;
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
export declare function useCurrentUserProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>): ApolloReactCommon.QueryResult<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>;
export declare function useCurrentUserProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>): ApolloReactHooks.QueryTuple<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>;
export declare type CurrentUserProjectsQueryHookResult = ReturnType<typeof useCurrentUserProjectsQuery>;
export declare type CurrentUserProjectsLazyQueryHookResult = ReturnType<typeof useCurrentUserProjectsLazyQuery>;
export declare type CurrentUserProjectsQueryResult = ApolloReactCommon.QueryResult<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>;
export declare const CurrentUserSettingsDocument: import("graphql").DocumentNode;
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
export declare function useCurrentUserSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>): ApolloReactCommon.QueryResult<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>;
export declare function useCurrentUserSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>): ApolloReactHooks.QueryTuple<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>;
export declare type CurrentUserSettingsQueryHookResult = ReturnType<typeof useCurrentUserSettingsQuery>;
export declare type CurrentUserSettingsLazyQueryHookResult = ReturnType<typeof useCurrentUserSettingsLazyQuery>;
export declare type CurrentUserSettingsQueryResult = ApolloReactCommon.QueryResult<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>;
export declare const FeedDocument: import("graphql").DocumentNode;
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
export declare function useFeedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeedQuery, FeedQueryVariables>): ApolloReactCommon.QueryResult<FeedQuery, FeedQueryVariables>;
export declare function useFeedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>): ApolloReactHooks.QueryTuple<FeedQuery, FeedQueryVariables>;
export declare type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export declare type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export declare type FeedQueryResult = ApolloReactCommon.QueryResult<FeedQuery, FeedQueryVariables>;
export declare const FollowersDocument: import("graphql").DocumentNode;
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
export declare function useFollowersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FollowersQuery, FollowersQueryVariables>): ApolloReactCommon.QueryResult<FollowersQuery, FollowersQueryVariables>;
export declare function useFollowersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>): ApolloReactHooks.QueryTuple<FollowersQuery, FollowersQueryVariables>;
export declare type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>;
export declare type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>;
export declare type FollowersQueryResult = ApolloReactCommon.QueryResult<FollowersQuery, FollowersQueryVariables>;
export declare const GrowthDocument: import("graphql").DocumentNode;
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
export declare function useGrowthQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GrowthQuery, GrowthQueryVariables>): ApolloReactCommon.QueryResult<GrowthQuery, GrowthQueryVariables>;
export declare function useGrowthLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GrowthQuery, GrowthQueryVariables>): ApolloReactHooks.QueryTuple<GrowthQuery, GrowthQueryVariables>;
export declare type GrowthQueryHookResult = ReturnType<typeof useGrowthQuery>;
export declare type GrowthLazyQueryHookResult = ReturnType<typeof useGrowthLazyQuery>;
export declare type GrowthQueryResult = ApolloReactCommon.QueryResult<GrowthQuery, GrowthQueryVariables>;
export declare const HashtagDocument: import("graphql").DocumentNode;
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
export declare function useHashtagQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HashtagQuery, HashtagQueryVariables>): ApolloReactCommon.QueryResult<HashtagQuery, HashtagQueryVariables>;
export declare function useHashtagLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HashtagQuery, HashtagQueryVariables>): ApolloReactHooks.QueryTuple<HashtagQuery, HashtagQueryVariables>;
export declare type HashtagQueryHookResult = ReturnType<typeof useHashtagQuery>;
export declare type HashtagLazyQueryHookResult = ReturnType<typeof useHashtagLazyQuery>;
export declare type HashtagQueryResult = ApolloReactCommon.QueryResult<HashtagQuery, HashtagQueryVariables>;
export declare const MetaDocument: import("graphql").DocumentNode;
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
export declare function useMetaQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MetaQuery, MetaQueryVariables>): ApolloReactCommon.QueryResult<MetaQuery, MetaQueryVariables>;
export declare function useMetaLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MetaQuery, MetaQueryVariables>): ApolloReactHooks.QueryTuple<MetaQuery, MetaQueryVariables>;
export declare type MetaQueryHookResult = ReturnType<typeof useMetaQuery>;
export declare type MetaLazyQueryHookResult = ReturnType<typeof useMetaLazyQuery>;
export declare type MetaQueryResult = ApolloReactCommon.QueryResult<MetaQuery, MetaQueryVariables>;
export declare const NotificationsDocument: import("graphql").DocumentNode;
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
export declare function useNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>): ApolloReactCommon.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export declare function useNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>): ApolloReactHooks.QueryTuple<NotificationsQuery, NotificationsQueryVariables>;
export declare type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export declare type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export declare type NotificationsQueryResult = ApolloReactCommon.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export declare const PostDocument: import("graphql").DocumentNode;
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
export declare function usePostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostQuery, PostQueryVariables>): ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;
export declare function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>): ApolloReactHooks.QueryTuple<PostQuery, PostQueryVariables>;
export declare type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export declare type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export declare type PostQueryResult = ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;
export declare const PostsDocument: import("graphql").DocumentNode;
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
export declare function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>): ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export declare function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>): ApolloReactHooks.QueryTuple<PostsQuery, PostsQueryVariables>;
export declare type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export declare type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export declare type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export declare const ProjectDocument: import("graphql").DocumentNode;
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
export declare function useProjectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectQuery, ProjectQueryVariables>): ApolloReactCommon.QueryResult<ProjectQuery, ProjectQueryVariables>;
export declare function useProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>): ApolloReactHooks.QueryTuple<ProjectQuery, ProjectQueryVariables>;
export declare type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export declare type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export declare type ProjectQueryResult = ApolloReactCommon.QueryResult<ProjectQuery, ProjectQueryVariables>;
export declare const ProjectSuggestionsDocument: import("graphql").DocumentNode;
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
export declare function useProjectSuggestionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>): ApolloReactCommon.QueryResult<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>;
export declare function useProjectSuggestionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>): ApolloReactHooks.QueryTuple<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>;
export declare type ProjectSuggestionsQueryHookResult = ReturnType<typeof useProjectSuggestionsQuery>;
export declare type ProjectSuggestionsLazyQueryHookResult = ReturnType<typeof useProjectSuggestionsLazyQuery>;
export declare type ProjectSuggestionsQueryResult = ApolloReactCommon.QueryResult<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>;
export declare const ProjectTypesDocument: import("graphql").DocumentNode;
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
export declare function useProjectTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>): ApolloReactCommon.QueryResult<ProjectTypesQuery, ProjectTypesQueryVariables>;
export declare function useProjectTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>): ApolloReactHooks.QueryTuple<ProjectTypesQuery, ProjectTypesQueryVariables>;
export declare type ProjectTypesQueryHookResult = ReturnType<typeof useProjectTypesQuery>;
export declare type ProjectTypesLazyQueryHookResult = ReturnType<typeof useProjectTypesLazyQuery>;
export declare type ProjectTypesQueryResult = ApolloReactCommon.QueryResult<ProjectTypesQuery, ProjectTypesQueryVariables>;
export declare const ProjectsDocument: import("graphql").DocumentNode;
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
export declare function useProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>): ApolloReactCommon.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export declare function useProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>): ApolloReactHooks.QueryTuple<ProjectsQuery, ProjectsQueryVariables>;
export declare type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export declare type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export declare type ProjectsQueryResult = ApolloReactCommon.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export declare const RecentCommentsDocument: import("graphql").DocumentNode;
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
export declare function useRecentCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>): ApolloReactCommon.QueryResult<RecentCommentsQuery, RecentCommentsQueryVariables>;
export declare function useRecentCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>): ApolloReactHooks.QueryTuple<RecentCommentsQuery, RecentCommentsQueryVariables>;
export declare type RecentCommentsQueryHookResult = ReturnType<typeof useRecentCommentsQuery>;
export declare type RecentCommentsLazyQueryHookResult = ReturnType<typeof useRecentCommentsLazyQuery>;
export declare type RecentCommentsQueryResult = ApolloReactCommon.QueryResult<RecentCommentsQuery, RecentCommentsQueryVariables>;
export declare const RepliesDocument: import("graphql").DocumentNode;
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
export declare function useRepliesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RepliesQuery, RepliesQueryVariables>): ApolloReactCommon.QueryResult<RepliesQuery, RepliesQueryVariables>;
export declare function useRepliesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RepliesQuery, RepliesQueryVariables>): ApolloReactHooks.QueryTuple<RepliesQuery, RepliesQueryVariables>;
export declare type RepliesQueryHookResult = ReturnType<typeof useRepliesQuery>;
export declare type RepliesLazyQueryHookResult = ReturnType<typeof useRepliesLazyQuery>;
export declare type RepliesQueryResult = ApolloReactCommon.QueryResult<RepliesQuery, RepliesQueryVariables>;
export declare const SearchHashtagsDocument: import("graphql").DocumentNode;
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
export declare function useSearchHashtagsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>): ApolloReactCommon.QueryResult<SearchHashtagsQuery, SearchHashtagsQueryVariables>;
export declare function useSearchHashtagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>): ApolloReactHooks.QueryTuple<SearchHashtagsQuery, SearchHashtagsQueryVariables>;
export declare type SearchHashtagsQueryHookResult = ReturnType<typeof useSearchHashtagsQuery>;
export declare type SearchHashtagsLazyQueryHookResult = ReturnType<typeof useSearchHashtagsLazyQuery>;
export declare type SearchHashtagsQueryResult = ApolloReactCommon.QueryResult<SearchHashtagsQuery, SearchHashtagsQueryVariables>;
export declare const SearchModelsDocument: import("graphql").DocumentNode;
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
export declare function useSearchModelsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>): ApolloReactCommon.QueryResult<SearchModelsQuery, SearchModelsQueryVariables>;
export declare function useSearchModelsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>): ApolloReactHooks.QueryTuple<SearchModelsQuery, SearchModelsQueryVariables>;
export declare type SearchModelsQueryHookResult = ReturnType<typeof useSearchModelsQuery>;
export declare type SearchModelsLazyQueryHookResult = ReturnType<typeof useSearchModelsLazyQuery>;
export declare type SearchModelsQueryResult = ApolloReactCommon.QueryResult<SearchModelsQuery, SearchModelsQueryVariables>;
export declare const SearchProjectsDocument: import("graphql").DocumentNode;
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
export declare function useSearchProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>): ApolloReactCommon.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;
export declare function useSearchProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>): ApolloReactHooks.QueryTuple<SearchProjectsQuery, SearchProjectsQueryVariables>;
export declare type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>;
export declare type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>;
export declare type SearchProjectsQueryResult = ApolloReactCommon.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;
export declare const SearchUsersDocument: import("graphql").DocumentNode;
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
export declare function useSearchUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>): ApolloReactCommon.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export declare function useSearchUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>): ApolloReactHooks.QueryTuple<SearchUsersQuery, SearchUsersQueryVariables>;
export declare type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export declare type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export declare type SearchUsersQueryResult = ApolloReactCommon.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export declare const SimilarProjectsDocument: import("graphql").DocumentNode;
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
export declare function useSimilarProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>): ApolloReactCommon.QueryResult<SimilarProjectsQuery, SimilarProjectsQueryVariables>;
export declare function useSimilarProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>): ApolloReactHooks.QueryTuple<SimilarProjectsQuery, SimilarProjectsQueryVariables>;
export declare type SimilarProjectsQueryHookResult = ReturnType<typeof useSimilarProjectsQuery>;
export declare type SimilarProjectsLazyQueryHookResult = ReturnType<typeof useSimilarProjectsLazyQuery>;
export declare type SimilarProjectsQueryResult = ApolloReactCommon.QueryResult<SimilarProjectsQuery, SimilarProjectsQueryVariables>;
export declare const UserDocument: import("graphql").DocumentNode;
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
export declare function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>): ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export declare function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>): ApolloReactHooks.QueryTuple<UserQuery, UserQueryVariables>;
export declare type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export declare type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export declare type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export declare const UserFollowingProjectsDocument: import("graphql").DocumentNode;
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
export declare function useUserFollowingProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>): ApolloReactCommon.QueryResult<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>;
export declare function useUserFollowingProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>): ApolloReactHooks.QueryTuple<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>;
export declare type UserFollowingProjectsQueryHookResult = ReturnType<typeof useUserFollowingProjectsQuery>;
export declare type UserFollowingProjectsLazyQueryHookResult = ReturnType<typeof useUserFollowingProjectsLazyQuery>;
export declare type UserFollowingProjectsQueryResult = ApolloReactCommon.QueryResult<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>;
