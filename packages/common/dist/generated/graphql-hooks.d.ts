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
export declare type Article = {
    __typename?: 'Article';
    id?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    publishedAt?: Maybe<Scalars['Date']>;
    title?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    author?: Maybe<ArticleAuthor>;
    publisher?: Maybe<Publisher>;
    url?: Maybe<Scalars['String']>;
    filesConnection?: Maybe<FileConnection>;
    categoriesConnection?: Maybe<ArticleCategoryConnection>;
};
export declare type ArticleFilesConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    reverse?: Maybe<Scalars['Boolean']>;
    type?: Maybe<FileType>;
};
export declare type ArticleCategoriesConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    reverse?: Maybe<Scalars['Boolean']>;
    type?: Maybe<FileType>;
};
export declare type ArticleAuthor = {
    __typename?: 'ArticleAuthor';
    id?: Maybe<Scalars['ID']>;
    fullName?: Maybe<Scalars['String']>;
};
export declare type ArticleCategory = {
    __typename?: 'ArticleCategory';
    id?: Maybe<Scalars['ID']>;
    name?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['LowercaseString']>;
};
export declare type ArticleCategoryConnection = {
    __typename?: 'ArticleCategoryConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<ArticleCategoryEdge>>;
};
export declare type ArticleCategoryEdge = {
    __typename?: 'ArticleCategoryEdge';
    cursor: Scalars['String'];
    node: ArticleCategory;
};
export declare type ArticleConnection = {
    __typename?: 'ArticleConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<ArticleEdge>>;
};
export declare type ArticleEdge = {
    __typename?: 'ArticleEdge';
    cursor: Scalars['String'];
    node: Article;
};
export declare type ArticleInput = {
    files: Array<Maybe<Scalars['String']>>;
    publisher: Scalars['String'];
    categories: Array<Maybe<Scalars['String']>>;
    author: Scalars['String'];
    createdAt: Scalars['Date'];
    description: Scalars['String'];
    title: Scalars['String'];
    url: Scalars['String'];
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
export declare type Likes = {
    __typename?: 'Likes';
    totalCount?: Maybe<Scalars['Int']>;
    isLiked?: Maybe<Scalars['Boolean']>;
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
    addArticle?: Maybe<Article>;
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
export declare type MutationAddArticleArgs = {
    input: ArticleInput;
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
export declare type Publisher = {
    __typename?: 'Publisher';
    id?: Maybe<Scalars['ID']>;
    slug?: Maybe<Scalars['LowercaseString']>;
    name?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
    logoUrl?: Maybe<Scalars['String']>;
    seen?: Maybe<Scalars['Boolean']>;
    articlesConnection?: Maybe<ArticleConnection>;
};
export declare type PublisherArticlesConnectionArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
};
export declare type PublisherConnection = {
    __typename?: 'PublisherConnection';
    totalCount?: Maybe<Scalars['Int']>;
    pageInfo: PageInfo;
    edges?: Maybe<Array<PublisherEdge>>;
};
export declare type PublisherEdge = {
    __typename?: 'PublisherEdge';
    cursor: Scalars['String'];
    node: Publisher;
};
export declare type Query = {
    __typename?: 'Query';
    dummy?: Maybe<Scalars['String']>;
    article?: Maybe<Article>;
    articles?: Maybe<ArticleConnection>;
    comments?: Maybe<CommentConnection>;
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
    publisher?: Maybe<Publisher>;
    publishers?: Maybe<PublisherConnection>;
    search?: Maybe<SearchResults>;
    user?: Maybe<User>;
    users?: Maybe<UserConnection>;
    currentUser?: Maybe<User>;
};
export declare type QueryArticleArgs = {
    id?: Maybe<Scalars['ID']>;
};
export declare type QueryArticlesArgs = {
    publisherId?: Maybe<Scalars['ID']>;
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
export declare type QueryPublisherArgs = {
    id?: Maybe<Scalars['ID']>;
};
export declare type QueryPublishersArgs = {
    first?: Maybe<Scalars['Int']>;
    after?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
    before?: Maybe<Scalars['String']>;
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
export declare type SearchResultEdge = {
    __typename?: 'SearchResultEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<SearchResultNode>;
};
export declare type SearchResultNode = Project | User | Model;
export declare type SearchResults = {
    __typename?: 'SearchResults';
    totalCount?: Maybe<Scalars['Int']>;
    edges?: Maybe<Array<Maybe<SearchResultEdge>>>;
    pageInfo?: Maybe<PageInfo>;
};
export declare enum SearchType {
    Projects = "PROJECTS",
    Users = "USERS",
    Models = "MODELS"
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
export declare type UserSettings = {
    __typename?: 'UserSettings';
    locale?: Maybe<Scalars['String']>;
    timezone?: Maybe<Scalars['String']>;
    notifications?: Maybe<UserNotificationsSettings>;
};
export declare type CommentsFragment = ({
    __typename?: 'CommentConnection';
} & Pick<CommentConnection, 'totalCount'> & {
    edges: Maybe<Array<({
        __typename?: 'CommentEdge';
    } & {
        node: ({
            __typename?: 'Comment';
        } & Pick<Comment, 'id' | 'text'> & {
            user: Maybe<({
                __typename?: 'User';
            } & UserFragment)>;
        });
    })>>;
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
    } & CommentsFragment)>;
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
} & Pick<User, 'id' | 'fullName' | 'firstName' | 'lastName' | 'username' | 'avatarUrl' | 'isSilhouette' | 'isOnline' | 'website' | 'location' | 'bio'>);
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
export declare type CurrentUserQueryVariables = {};
export declare type CurrentUserQuery = ({
    __typename?: 'Query';
} & {
    user: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'avatarUrl' | 'bio' | 'dynamicLink' | 'firstName' | 'fullName' | 'id' | 'isOnline' | 'isSilhouette' | 'lastName' | 'location' | 'projectCount' | 'username' | 'website'> & {
        settings: Maybe<({
            __typename?: 'UserSettings';
        } & Pick<UserSettings, 'timezone' | 'locale'>)>;
        interestedIn: Maybe<Array<Maybe<({
            __typename?: 'ProjectType';
        } & Pick<ProjectType, 'id' | 'title'>)>>>;
    } & UserProjectsFragment)>;
});
export declare type GetCurrentUserQueryVariables = {
    after?: Maybe<Scalars['String']>;
};
export declare type GetCurrentUserQuery = ({
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
                } & Pick<Project, 'id' | 'title'> & {
                    cover: Maybe<({
                        __typename?: 'CoverType';
                    } & Pick<CoverType, 'uri' | 'default'>)>;
                    followers: Maybe<({
                        __typename?: 'FollowersConnection';
                    } & Pick<FollowersConnection, 'totalCount'>)>;
                });
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
export declare type SimilarProjectsQueryVariables = {
    id: Scalars['ID'];
};
export declare type SimilarProjectsQuery = ({
    __typename?: 'Query';
} & {
    similarProjects: Maybe<({
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
                } & Pick<CoverType, 'uri'>)>;
            } & ProjectFragment);
        })>>;
    })>;
});
export declare type UserByUsernameQueryVariables = {
    username: Scalars['LowercaseString'];
    after?: Maybe<Scalars['String']>;
};
export declare type UserByUsernameQuery = ({
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
                } & Pick<Project, 'id' | 'title'> & {
                    cover: Maybe<({
                        __typename?: 'CoverType';
                    } & Pick<CoverType, 'uri' | 'default'>)>;
                    followers: Maybe<({
                        __typename?: 'FollowersConnection';
                    } & Pick<FollowersConnection, 'totalCount'>)>;
                });
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
export declare const UserFragmentDoc: any;
export declare const ProjectFragmentDoc: any;
export declare const CommentsFragmentDoc: any;
export declare const PostFragmentDoc: any;
export declare const UserProjectsFragmentDoc: any;
export declare const UserSettingsFragmentDoc: any;
export declare const CurrentUserDocument: any;
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
export declare function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>): [(options?: ApolloReactHooks.QueryLazyOptions<CurrentUserQueryVariables> | undefined) => void, ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>];
export declare type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export declare type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export declare type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export declare const GetCurrentUserDocument: any;
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
export declare function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>): ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export declare function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>): [(options?: ApolloReactHooks.QueryLazyOptions<GetCurrentUserQueryVariables> | undefined) => void, ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>];
export declare type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export declare type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export declare type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export declare const CurrentUserProjectsDocument: any;
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
export declare function useCurrentUserProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>): [(options?: ApolloReactHooks.QueryLazyOptions<CurrentUserProjectsQueryVariables> | undefined) => void, ApolloReactCommon.QueryResult<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>];
export declare type CurrentUserProjectsQueryHookResult = ReturnType<typeof useCurrentUserProjectsQuery>;
export declare type CurrentUserProjectsLazyQueryHookResult = ReturnType<typeof useCurrentUserProjectsLazyQuery>;
export declare type CurrentUserProjectsQueryResult = ApolloReactCommon.QueryResult<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>;
export declare const CurrentUserSettingsDocument: any;
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
export declare function useCurrentUserSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>): [(options?: ApolloReactHooks.QueryLazyOptions<CurrentUserSettingsQueryVariables> | undefined) => void, ApolloReactCommon.QueryResult<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>];
export declare type CurrentUserSettingsQueryHookResult = ReturnType<typeof useCurrentUserSettingsQuery>;
export declare type CurrentUserSettingsLazyQueryHookResult = ReturnType<typeof useCurrentUserSettingsLazyQuery>;
export declare type CurrentUserSettingsQueryResult = ApolloReactCommon.QueryResult<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>;
export declare const PostDocument: any;
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
export declare function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>): [(options?: ApolloReactHooks.QueryLazyOptions<PostQueryVariables> | undefined) => void, ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>];
export declare type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export declare type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export declare type PostQueryResult = ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;
export declare const ProjectTypesDocument: any;
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
export declare function useProjectTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>): [(options?: ApolloReactHooks.QueryLazyOptions<ProjectTypesQueryVariables> | undefined) => void, ApolloReactCommon.QueryResult<ProjectTypesQuery, ProjectTypesQueryVariables>];
export declare type ProjectTypesQueryHookResult = ReturnType<typeof useProjectTypesQuery>;
export declare type ProjectTypesLazyQueryHookResult = ReturnType<typeof useProjectTypesLazyQuery>;
export declare type ProjectTypesQueryResult = ApolloReactCommon.QueryResult<ProjectTypesQuery, ProjectTypesQueryVariables>;
export declare const ProjectsDocument: any;
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
export declare function useProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>): [(options?: ApolloReactHooks.QueryLazyOptions<ProjectsQueryVariables> | undefined) => void, ApolloReactCommon.QueryResult<ProjectsQuery, ProjectsQueryVariables>];
export declare type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export declare type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export declare type ProjectsQueryResult = ApolloReactCommon.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export declare const SimilarProjectsDocument: any;
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
export declare function useSimilarProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>): ApolloReactCommon.QueryResult<SimilarProjectsQuery, SimilarProjectsQueryVariables>;
export declare function useSimilarProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>): [(options?: ApolloReactHooks.QueryLazyOptions<SimilarProjectsQueryVariables> | undefined) => void, ApolloReactCommon.QueryResult<SimilarProjectsQuery, SimilarProjectsQueryVariables>];
export declare type SimilarProjectsQueryHookResult = ReturnType<typeof useSimilarProjectsQuery>;
export declare type SimilarProjectsLazyQueryHookResult = ReturnType<typeof useSimilarProjectsLazyQuery>;
export declare type SimilarProjectsQueryResult = ApolloReactCommon.QueryResult<SimilarProjectsQuery, SimilarProjectsQueryVariables>;
export declare const UserByUsernameDocument: any;
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
export declare function useUserByUsernameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserByUsernameQuery, UserByUsernameQueryVariables>): ApolloReactCommon.QueryResult<UserByUsernameQuery, UserByUsernameQueryVariables>;
export declare function useUserByUsernameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserByUsernameQuery, UserByUsernameQueryVariables>): [(options?: ApolloReactHooks.QueryLazyOptions<UserByUsernameQueryVariables> | undefined) => void, ApolloReactCommon.QueryResult<UserByUsernameQuery, UserByUsernameQueryVariables>];
export declare type UserByUsernameQueryHookResult = ReturnType<typeof useUserByUsernameQuery>;
export declare type UserByUsernameLazyQueryHookResult = ReturnType<typeof useUserByUsernameLazyQuery>;
export declare type UserByUsernameQueryResult = ApolloReactCommon.QueryResult<UserByUsernameQuery, UserByUsernameQueryVariables>;
