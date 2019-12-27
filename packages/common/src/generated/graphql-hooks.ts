import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** Date custom scalar type */
  Date: any,
  /** Returns all strings in lower case */
  LowercaseString: any,
};

export type AccessToken = {
   __typename?: 'AccessToken',
  access_token?: Maybe<Scalars['String']>,
};

export type ApplePayload = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

export type Article = {
   __typename?: 'Article',
  id?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  publishedAt?: Maybe<Scalars['Date']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  author?: Maybe<ArticleAuthor>,
  publisher?: Maybe<Publisher>,
  url?: Maybe<Scalars['String']>,
  filesConnection?: Maybe<FileConnection>,
  categoriesConnection?: Maybe<ArticleCategoryConnection>,
};


export type ArticleFilesConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  reverse?: Maybe<Scalars['Boolean']>,
  type?: Maybe<FileType>
};


export type ArticleCategoriesConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  reverse?: Maybe<Scalars['Boolean']>,
  type?: Maybe<FileType>
};

export type ArticleAuthor = {
   __typename?: 'ArticleAuthor',
  id?: Maybe<Scalars['ID']>,
  fullName?: Maybe<Scalars['String']>,
};

export type ArticleCategory = {
   __typename?: 'ArticleCategory',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['LowercaseString']>,
};

export type ArticleCategoryConnection = {
   __typename?: 'ArticleCategoryConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges?: Maybe<Array<ArticleCategoryEdge>>,
};

export type ArticleCategoryEdge = {
   __typename?: 'ArticleCategoryEdge',
  cursor: Scalars['String'],
  node: ArticleCategory,
};

export type ArticleConnection = {
   __typename?: 'ArticleConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges?: Maybe<Array<ArticleEdge>>,
};

export type ArticleEdge = {
   __typename?: 'ArticleEdge',
  cursor: Scalars['String'],
  node: Article,
};

export type ArticleInput = {
  files: Array<Maybe<Scalars['String']>>,
  publisher: Scalars['String'],
  categories: Array<Maybe<Scalars['String']>>,
  author: Scalars['String'],
  createdAt: Scalars['Date'],
  description: Scalars['String'],
  title: Scalars['String'],
  url: Scalars['String'],
};

export type Brand = {
   __typename?: 'Brand',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
};

export type Comment = {
   __typename?: 'Comment',
  id?: Maybe<Scalars['ID']>,
  commentId?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  text: Scalars['String'],
  user?: Maybe<User>,
  postId?: Maybe<Scalars['ID']>,
  permissions?: Maybe<CommentPermissions>,
  repliesConnection?: Maybe<CommentConnection>,
  likes?: Maybe<Likes>,
};


export type CommentRepliesConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};

export type CommentConnection = {
   __typename?: 'CommentConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges?: Maybe<Array<CommentEdge>>,
};

export type CommentEdge = {
   __typename?: 'CommentEdge',
  cursor: Scalars['String'],
  node: Comment,
};

export type CommentInput = {
  text: Scalars['String'],
};

export type CommentPermissions = {
   __typename?: 'CommentPermissions',
  isOwner?: Maybe<Scalars['Boolean']>,
};

export type CoverType = {
   __typename?: 'CoverType',
  uri?: Maybe<Scalars['String']>,
  default?: Maybe<Scalars['Boolean']>,
};


export type EditPostInput = {
  caption?: Maybe<Scalars['String']>,
};

export type EditUserInput = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  interestedIn?: Maybe<Array<Maybe<ProjectTypeInput>>>,
  timezone?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
  avatarUrl?: Maybe<Scalars['String']>,
};

export type Feed = {
   __typename?: 'Feed',
  postsConnection?: Maybe<PostConnection>,
};


export type FeedPostsConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};

export type File = {
   __typename?: 'File',
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<FileType>,
  uri: Scalars['String'],
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
};

export type FileConnection = {
   __typename?: 'FileConnection',
  edges?: Maybe<Array<Maybe<FileEdge>>>,
  pageInfo: PageInfo,
};

export type FileEdge = {
   __typename?: 'FileEdge',
  cursor: Scalars['String'],
  node: File,
};

export type FileInput = {
  filename: Scalars['String'],
};

export enum FileType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type FollowersConnection = {
   __typename?: 'FollowersConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges?: Maybe<Array<FollowersEdge>>,
};

export type FollowersEdge = {
   __typename?: 'FollowersEdge',
  cursor: Scalars['String'],
  node: User,
};

export type Likes = {
   __typename?: 'Likes',
  totalCount?: Maybe<Scalars['Int']>,
  isLiked?: Maybe<Scalars['Boolean']>,
};


export type Model = {
   __typename?: 'Model',
  id: Scalars['ID'],
  brand?: Maybe<Brand>,
  model?: Maybe<Scalars['String']>,
  year?: Maybe<Scalars['Int']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  dummy?: Maybe<Scalars['String']>,
  addArticle?: Maybe<Article>,
  authenticateApple?: Maybe<Tokens>,
  authenticateFacebook?: Maybe<Tokens>,
  authenticateGoogle?: Maybe<Tokens>,
  refreshToken?: Maybe<AccessToken>,
  addComment?: Maybe<Comment>,
  editComment?: Maybe<Comment>,
  deleteComment?: Maybe<Scalars['Boolean']>,
  sendPromo?: Maybe<Scalars['Boolean']>,
  likePost?: Maybe<Post>,
  likeComment?: Maybe<Comment>,
  markAllNotificationsSeen?: Maybe<Scalars['Boolean']>,
  deleteNotification?: Maybe<Scalars['Boolean']>,
  deletePost?: Maybe<Post>,
  addPost?: Maybe<Post>,
  editPost?: Maybe<Post>,
  followProject?: Maybe<Project>,
  addProject?: Maybe<Project>,
  editProject?: Maybe<Project>,
  deleteProject?: Maybe<Scalars['Boolean']>,
  preSignUrls?: Maybe<Array<Maybe<PreSignedUrl>>>,
  preSignUrl?: Maybe<PreSignedUrl>,
  editUser?: Maybe<User>,
  toggleNotificationSettings?: Maybe<User>,
  registerDeviceToken?: Maybe<Scalars['Boolean']>,
  banUser?: Maybe<Scalars['Boolean']>,
  deleteCurrentUser?: Maybe<Scalars['Boolean']>,
};


export type MutationAddArticleArgs = {
  input: ArticleInput
};


export type MutationAuthenticateAppleArgs = {
  identityToken: Scalars['String'],
  user: ApplePayload
};


export type MutationAuthenticateFacebookArgs = {
  token: Scalars['String']
};


export type MutationAuthenticateGoogleArgs = {
  idToken: Scalars['String']
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']
};


export type MutationAddCommentArgs = {
  postId: Scalars['ID'],
  commentId?: Maybe<Scalars['ID']>,
  input: CommentInput
};


export type MutationEditCommentArgs = {
  id: Scalars['ID'],
  input: CommentInput
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']
};


export type MutationSendPromoArgs = {
  number: Scalars['String']
};


export type MutationLikePostArgs = {
  id: Scalars['ID']
};


export type MutationLikeCommentArgs = {
  id: Scalars['ID']
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['ID']
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']
};


export type MutationAddPostArgs = {
  input: PostInput
};


export type MutationEditPostArgs = {
  id: Scalars['ID'],
  input: EditPostInput
};


export type MutationFollowProjectArgs = {
  id: Scalars['ID']
};


export type MutationAddProjectArgs = {
  input: ProjectInput
};


export type MutationEditProjectArgs = {
  id: Scalars['ID'],
  input: ProjectInput
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']
};


export type MutationPreSignUrlsArgs = {
  input?: Maybe<Array<Maybe<PreSignedUrlnput>>>
};


export type MutationPreSignUrlArgs = {
  input: PreSignedUrlInput
};


export type MutationEditUserArgs = {
  input: EditUserInput
};


export type MutationToggleNotificationSettingsArgs = {
  input?: Maybe<ToggleNotificationSettingsInput>
};


export type MutationRegisterDeviceTokenArgs = {
  token: Scalars['String'],
  platform: PlatformType
};


export type MutationBanUserArgs = {
  userId: Scalars['ID']
};

export type Notification = {
   __typename?: 'Notification',
  id: Scalars['ID'],
  user: User,
  type?: Maybe<NotificationTypes>,
  project?: Maybe<Project>,
  post?: Maybe<Post>,
  comment?: Maybe<Comment>,
  isSeen: Scalars['Boolean'],
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
  filesConnection?: Maybe<FileConnection>,
};


export type NotificationFilesConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  reverse?: Maybe<Scalars['Boolean']>,
  type?: Maybe<FileType>
};

export type NotificationEdge = {
   __typename?: 'NotificationEdge',
  cursor?: Maybe<Scalars['String']>,
  node?: Maybe<Notification>,
};

export type NotificationKindSettings = {
   __typename?: 'NotificationKindSettings',
  email?: Maybe<Scalars['Boolean']>,
  push?: Maybe<Scalars['Boolean']>,
};

export type NotificationsConnection = {
   __typename?: 'NotificationsConnection',
  unreadCount?: Maybe<Scalars['Int']>,
  pageInfo?: Maybe<PageInfo>,
  edges?: Maybe<Array<Maybe<NotificationEdge>>>,
};

export type NotificationSettingsType = {
   __typename?: 'NotificationSettingsType',
  NEW_FOLLOWER?: Maybe<NotificationKindSettings>,
  NEW_COMMENT?: Maybe<NotificationKindSettings>,
  NEW_MENTION?: Maybe<NotificationKindSettings>,
  NEW_ARTICLE?: Maybe<NotificationKindSettings>,
  SIMILAR_PROJECTS?: Maybe<NotificationKindSettings>,
  PRODUCT_ANNOUNCEMENTS?: Maybe<NotificationKindSettings>,
};

export enum NotificationTypes {
  NewComment = 'NEW_COMMENT',
  NewFollower = 'NEW_FOLLOWER',
  NewPostLike = 'NEW_POST_LIKE',
  NewCommentLike = 'NEW_COMMENT_LIKE',
  NewMention = 'NEW_MENTION',
  NewReply = 'NEW_REPLY'
}

export type PageInfo = {
   __typename?: 'PageInfo',
  hasNextPage?: Maybe<Scalars['Boolean']>,
  hasPreviousPage?: Maybe<Scalars['Boolean']>,
};

export enum PlatformType {
  Mobile = 'MOBILE',
  Web = 'WEB'
}

export type Post = {
   __typename?: 'Post',
  id?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  caption?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  project?: Maybe<Project>,
  postPermissions?: Maybe<PostPermissions>,
  permissions?: Maybe<PostPermissions>,
  likes?: Maybe<Likes>,
  filesConnection?: Maybe<FileConnection>,
  commentsConnection?: Maybe<CommentConnection>,
};


export type PostFilesConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  reverse?: Maybe<Scalars['Boolean']>,
  type?: Maybe<FileType>
};


export type PostCommentsConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};

export type PostConnection = {
   __typename?: 'PostConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges?: Maybe<Array<PostEdge>>,
};

export type PostEdge = {
   __typename?: 'PostEdge',
  cursor: Scalars['String'],
  node: Post,
};

export type PostInput = {
  projectId: Scalars['ID'],
  caption?: Maybe<Scalars['String']>,
  files: Array<Maybe<FileInput>>,
};

export type PostPermissions = {
   __typename?: 'PostPermissions',
  isOwner?: Maybe<Scalars['Boolean']>,
};

export type PreSignedUrl = {
   __typename?: 'PreSignedUrl',
  url?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  filename?: Maybe<Scalars['String']>,
};

export type PreSignedUrlInput = {
  type: UploadType,
  path: Scalars['String'],
};

export type PreSignedUrlnput = {
  type: UploadType,
};

export type Project = {
   __typename?: 'Project',
  id?: Maybe<Scalars['ID']>,
  slug?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  dynamicLink?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  projectPermissions?: Maybe<ProjectPermissions>,
  permissions?: Maybe<ProjectPermissions>,
  commentsDisabled?: Maybe<Scalars['Boolean']>,
  type?: Maybe<ProjectType>,
  cover?: Maybe<CoverType>,
  model?: Maybe<Model>,
  filesConnection?: Maybe<FileConnection>,
  followersConnection?: Maybe<FollowersConnection>,
  postsConnection?: Maybe<PostConnection>,
};


export type ProjectFilesConnectionArgs = {
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  reverse?: Maybe<Scalars['Boolean']>,
  type?: Maybe<FileType>
};


export type ProjectFollowersConnectionArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type ProjectPostsConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};

export type ProjectEdge = {
   __typename?: 'ProjectEdge',
  cursor: Scalars['String'],
  node: Project,
};

export type ProjectInput = {
  title?: Maybe<Scalars['String']>,
  commentsDisabled?: Maybe<Scalars['Boolean']>,
  projectTypeId?: Maybe<Scalars['ID']>,
  modelId?: Maybe<Scalars['ID']>,
};

export type ProjectPermissions = {
   __typename?: 'ProjectPermissions',
  isFollower?: Maybe<Scalars['Boolean']>,
  isOwner?: Maybe<Scalars['Boolean']>,
};

export type ProjectsConnection = {
   __typename?: 'ProjectsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges?: Maybe<Array<ProjectEdge>>,
};

export enum ProjectSortType {
  Popular = 'POPULAR',
  Recent = 'RECENT'
}

export type ProjectSuggestionsConnection = {
   __typename?: 'ProjectSuggestionsConnection',
  totalCount?: Maybe<Scalars['Int']>,
  type?: Maybe<ProjectType>,
  pageInfo: PageInfo,
  edges?: Maybe<Array<ProjectEdge>>,
};

export type ProjectType = {
   __typename?: 'ProjectType',
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  imageUrl: Scalars['String'],
};

export type ProjectTypeInput = {
  id?: Maybe<Scalars['ID']>,
};

export type Publisher = {
   __typename?: 'Publisher',
  id?: Maybe<Scalars['ID']>,
  slug?: Maybe<Scalars['LowercaseString']>,
  name?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  logoUrl?: Maybe<Scalars['String']>,
  seen?: Maybe<Scalars['Boolean']>,
  articlesConnection?: Maybe<ArticleConnection>,
};


export type PublisherArticlesConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};

export type PublisherConnection = {
   __typename?: 'PublisherConnection',
  totalCount?: Maybe<Scalars['Int']>,
  pageInfo: PageInfo,
  edges?: Maybe<Array<PublisherEdge>>,
};

export type PublisherEdge = {
   __typename?: 'PublisherEdge',
  cursor: Scalars['String'],
  node: Publisher,
};

export type Query = {
   __typename?: 'Query',
  dummy?: Maybe<Scalars['String']>,
  article?: Maybe<Article>,
  articles?: Maybe<ArticleConnection>,
  comments?: Maybe<CommentConnection>,
  comment?: Maybe<Comment>,
  feed?: Maybe<Feed>,
  files?: Maybe<FileConnection>,
  followers?: Maybe<FollowersConnection>,
  notifications?: Maybe<NotificationsConnection>,
  post?: Maybe<Post>,
  posts?: Maybe<PostConnection>,
  project?: Maybe<Project>,
  projects?: Maybe<ProjectsConnection>,
  projectSuggestions?: Maybe<Array<Maybe<ProjectSuggestionsConnection>>>,
  similarProjects?: Maybe<ProjectsConnection>,
  projectTypes?: Maybe<Array<Maybe<ProjectType>>>,
  publisher?: Maybe<Publisher>,
  publishers?: Maybe<PublisherConnection>,
  search?: Maybe<SearchResults>,
  user?: Maybe<User>,
  users?: Maybe<UserConnection>,
  currentUser?: Maybe<User>,
};


export type QueryArticleArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryArticlesArgs = {
  publisherId?: Maybe<Scalars['ID']>,
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};


export type QueryCommentsArgs = {
  postId: Scalars['ID'],
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};


export type QueryCommentArgs = {
  id: Scalars['ID'],
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};


export type QueryFilesArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  scale?: Maybe<Scalars['Int']>,
  type?: Maybe<FileType>
};


export type QueryFollowersArgs = {
  projectId: Scalars['ID'],
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};


export type QueryNotificationsArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>
};


export type QueryPostArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryPostsArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};


export type QueryProjectArgs = {
  id?: Maybe<Scalars['ID']>,
  slug?: Maybe<Scalars['LowercaseString']>
};


export type QueryProjectsArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  type: ProjectSortType,
  typeId?: Maybe<Scalars['ID']>
};


export type QueryProjectSuggestionsArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QuerySimilarProjectsArgs = {
  id: Scalars['ID'],
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryPublisherArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryPublishersArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};


export type QuerySearchArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  query: Scalars['String'],
  type: SearchType
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>,
  username?: Maybe<Scalars['LowercaseString']>
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};


export type QueryCurrentUserArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};

export type SearchResultEdge = {
   __typename?: 'SearchResultEdge',
  cursor?: Maybe<Scalars['String']>,
  node?: Maybe<SearchResultNode>,
};

export type SearchResultNode = Project | User | Model;

export type SearchResults = {
   __typename?: 'SearchResults',
  totalCount?: Maybe<Scalars['Int']>,
  edges?: Maybe<Array<Maybe<SearchResultEdge>>>,
  pageInfo?: Maybe<PageInfo>,
};

export enum SearchType {
  Projects = 'PROJECTS',
  Users = 'USERS',
  Models = 'MODELS'
}

export type ToggleNotificationSettingsInput = {
  deliveryMethod: Scalars['String'],
  notificationType: Scalars['String'],
};

export type Tokens = {
   __typename?: 'Tokens',
  access_token?: Maybe<Scalars['String']>,
  refresh_token?: Maybe<Scalars['String']>,
};

export enum UploadType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username?: Maybe<Scalars['LowercaseString']>,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['Date'],
  fullName?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  avatarUrl?: Maybe<Scalars['String']>,
  projectCount?: Maybe<Scalars['Int']>,
  interestedIn?: Maybe<Array<Maybe<ProjectType>>>,
  settings?: Maybe<UserSettings>,
  dynamicLink?: Maybe<Scalars['String']>,
  isOnline?: Maybe<Scalars['Boolean']>,
  lastSeen?: Maybe<Scalars['Date']>,
  website?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  isSilhouette?: Maybe<Scalars['Boolean']>,
  projectsConnection?: Maybe<ProjectsConnection>,
  followingProjects?: Maybe<ProjectsConnection>,
  postsConnection?: Maybe<PostConnection>,
};


export type UserProjectsConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};


export type UserFollowingProjectsArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};


export type UserPostsConnectionArgs = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>
};

export type UserConnection = {
   __typename?: 'UserConnection',
  pageInfo?: Maybe<PageInfo>,
  edges?: Maybe<Array<Maybe<UserEdge>>>,
};

export type UserEdge = {
   __typename?: 'UserEdge',
  cursor?: Maybe<Scalars['String']>,
  node?: Maybe<User>,
};

export type UserNotificationsSettings = {
   __typename?: 'UserNotificationsSettings',
  types?: Maybe<NotificationSettingsType>,
};

export type UserSettings = {
   __typename?: 'UserSettings',
  locale?: Maybe<Scalars['String']>,
  timezone?: Maybe<Scalars['String']>,
  notifications?: Maybe<UserNotificationsSettings>,
};

export type CommentsFragment = (
  { __typename?: 'CommentConnection' }
  & Pick<CommentConnection, 'totalCount'>
  & { edges: Maybe<Array<(
    { __typename?: 'CommentEdge' }
    & { node: (
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text'>
      & { user: Maybe<(
        { __typename?: 'User' }
        & UserFragment
      )> }
    ) }
  )>> }
);

export type PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'caption' | 'createdAt'>
  & { user: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )>, permissions: Maybe<(
    { __typename?: 'PostPermissions' }
    & Pick<PostPermissions, 'isOwner'>
  )>, files: Maybe<(
    { __typename?: 'FileConnection' }
    & { edges: Maybe<Array<Maybe<(
      { __typename?: 'FileEdge' }
      & { node: (
        { __typename?: 'File' }
        & Pick<File, 'id' | 'type' | 'uri'>
      ) }
    )>>> }
  )>, project: Maybe<(
    { __typename?: 'Project' }
    & ProjectFragment
  )>, likes: Maybe<(
    { __typename?: 'Likes' }
    & Pick<Likes, 'isLiked' | 'totalCount'>
  )>, comments: Maybe<(
    { __typename?: 'CommentConnection' }
    & CommentsFragment
  )> }
);

export type ProjectFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'title' | 'slug' | 'dynamicLink'>
  & { user: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )>, permissions: Maybe<(
    { __typename?: 'ProjectPermissions' }
    & Pick<ProjectPermissions, 'isOwner' | 'isFollower'>
  )>, followers: Maybe<(
    { __typename?: 'FollowersConnection' }
    & Pick<FollowersConnection, 'totalCount'>
  )> }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'fullName' | 'firstName' | 'lastName' | 'username' | 'avatarUrl' | 'isSilhouette' | 'isOnline' | 'website' | 'location' | 'bio'>
);

export type UserProjectsFragment = (
  { __typename?: 'User' }
  & { projects: Maybe<(
    { __typename?: 'ProjectsConnection' }
    & { edges: Maybe<Array<(
      { __typename?: 'ProjectEdge' }
      & { node: (
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'title'>
        & { followers: Maybe<(
          { __typename?: 'FollowersConnection' }
          & Pick<FollowersConnection, 'totalCount'>
        )>, files: Maybe<(
          { __typename?: 'FileConnection' }
          & { edges: Maybe<Array<Maybe<(
            { __typename?: 'FileEdge' }
            & { node: (
              { __typename?: 'File' }
              & Pick<File, 'id' | 'uri'>
            ) }
          )>>> }
        )> }
      ) }
    )>> }
  )> }
);

export type UserSettingsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id'>
  & { settings: Maybe<(
    { __typename?: 'UserSettings' }
    & { notifications: Maybe<(
      { __typename?: 'UserNotificationsSettings' }
      & { types: Maybe<(
        { __typename?: 'NotificationSettingsType' }
        & { NEW_FOLLOWER: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )>, NEW_COMMENT: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )>, NEW_MENTION: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )>, NEW_ARTICLE: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )>, SIMILAR_PROJECTS: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )>, PRODUCT_ANNOUNCEMENTS: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )> }
      )> }
    )> }
  )> }
);

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'avatarUrl' | 'bio' | 'dynamicLink' | 'firstName' | 'fullName' | 'id' | 'isOnline' | 'isSilhouette' | 'lastName' | 'location' | 'projectCount' | 'username' | 'website'>
    & { settings: Maybe<(
      { __typename?: 'UserSettings' }
      & Pick<UserSettings, 'timezone' | 'locale'>
    )>, interestedIn: Maybe<Array<Maybe<(
      { __typename?: 'ProjectType' }
      & Pick<ProjectType, 'id' | 'title'>
    )>>> }
    & UserProjectsFragment
  )> }
);

export type GetCurrentUserQueryVariables = {
  after?: Maybe<Scalars['String']>
};


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & { projects: Maybe<(
      { __typename?: 'ProjectsConnection' }
      & { edges: Maybe<Array<(
        { __typename?: 'ProjectEdge' }
        & { node: (
          { __typename?: 'Project' }
          & Pick<Project, 'id' | 'title'>
          & { cover: Maybe<(
            { __typename?: 'CoverType' }
            & Pick<CoverType, 'uri' | 'default'>
          )>, followers: Maybe<(
            { __typename?: 'FollowersConnection' }
            & Pick<FollowersConnection, 'totalCount'>
          )> }
        ) }
      )>> }
    )>, posts: Maybe<(
      { __typename?: 'PostConnection' }
      & { edges: Maybe<Array<(
        { __typename?: 'PostEdge' }
        & Pick<PostEdge, 'cursor'>
        & { node: (
          { __typename?: 'Post' }
          & PostFragment
        ) }
      )>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage'>
      ) }
    )> }
    & UserFragment
  )> }
);

export type CurrentUserProjectsQueryVariables = {};


export type CurrentUserProjectsQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & UserProjectsFragment
  )> }
);

export type CurrentUserSettingsQueryVariables = {};


export type CurrentUserSettingsQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & UserSettingsFragment
  )> }
);

export type PostQueryVariables = {
  id: Scalars['ID']
};


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: Maybe<(
    { __typename?: 'Post' }
    & PostFragment
  )> }
);

export type ProjectTypesQueryVariables = {};


export type ProjectTypesQuery = (
  { __typename?: 'Query' }
  & { types: Maybe<Array<Maybe<(
    { __typename?: 'ProjectType' }
    & Pick<ProjectType, 'id' | 'title' | 'imageUrl'>
  )>>> }
);

export type ProjectsQueryVariables = {
  typeId?: Maybe<Scalars['ID']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  type: ProjectSortType
};


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Maybe<(
    { __typename?: 'ProjectsConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges: Maybe<Array<(
      { __typename?: 'ProjectEdge' }
      & Pick<ProjectEdge, 'cursor'>
      & { node: (
        { __typename?: 'Project' }
        & { cover: Maybe<(
          { __typename?: 'CoverType' }
          & Pick<CoverType, 'uri' | 'default'>
        )> }
        & ProjectFragment
      ) }
    )>> }
  )> }
);

export type SimilarProjectsQueryVariables = {
  id: Scalars['ID']
};


export type SimilarProjectsQuery = (
  { __typename?: 'Query' }
  & { similarProjects: Maybe<(
    { __typename?: 'ProjectsConnection' }
    & { edges: Maybe<Array<(
      { __typename?: 'ProjectEdge' }
      & { node: (
        { __typename?: 'Project' }
        & { cover: Maybe<(
          { __typename?: 'CoverType' }
          & Pick<CoverType, 'uri'>
        )> }
        & ProjectFragment
      ) }
    )>> }
  )> }
);

export type UserByUsernameQueryVariables = {
  username: Scalars['LowercaseString'],
  after?: Maybe<Scalars['String']>
};


export type UserByUsernameQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & { projects: Maybe<(
      { __typename?: 'ProjectsConnection' }
      & { edges: Maybe<Array<(
        { __typename?: 'ProjectEdge' }
        & { node: (
          { __typename?: 'Project' }
          & Pick<Project, 'id' | 'title'>
          & { cover: Maybe<(
            { __typename?: 'CoverType' }
            & Pick<CoverType, 'uri' | 'default'>
          )>, followers: Maybe<(
            { __typename?: 'FollowersConnection' }
            & Pick<FollowersConnection, 'totalCount'>
          )> }
        ) }
      )>> }
    )>, posts: Maybe<(
      { __typename?: 'PostConnection' }
      & { edges: Maybe<Array<(
        { __typename?: 'PostEdge' }
        & Pick<PostEdge, 'cursor'>
        & { node: (
          { __typename?: 'Post' }
          & PostFragment
        ) }
      )>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage'>
      ) }
    )> }
    & UserFragment
  )> }
);

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  fullName
  firstName
  lastName
  username
  avatarUrl
  isSilhouette
  isOnline
  website
  location
  bio
}
    `;
export const ProjectFragmentDoc = gql`
    fragment Project on Project {
  id
  title
  slug
  dynamicLink
  user {
    ...User
  }
  permissions {
    isOwner
    isFollower
  }
  followers: followersConnection {
    totalCount
  }
}
    ${UserFragmentDoc}`;
export const CommentsFragmentDoc = gql`
    fragment Comments on CommentConnection {
  totalCount
  edges {
    node {
      id
      text
      user {
        ...User
      }
    }
  }
}
    ${UserFragmentDoc}`;
export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  caption
  createdAt
  user {
    ...User
  }
  permissions {
    isOwner
  }
  files: filesConnection(type: IMAGE) {
    edges {
      node {
        id
        type
        uri
      }
    }
  }
  project {
    ...Project
  }
  likes {
    isLiked
    totalCount
  }
  comments: commentsConnection(first: 2) @connection(key: "comments") {
    ...Comments
  }
}
    ${UserFragmentDoc}
${ProjectFragmentDoc}
${CommentsFragmentDoc}`;
export const UserProjectsFragmentDoc = gql`
    fragment UserProjects on User {
  projects: projectsConnection {
    edges {
      node {
        id
        title
        followers: followersConnection {
          totalCount
        }
        files: filesConnection(first: 1, type: IMAGE) {
          edges {
            node {
              id
              uri
            }
          }
        }
      }
    }
  }
}
    `;
export const UserSettingsFragmentDoc = gql`
    fragment UserSettings on User {
  id
  settings {
    notifications {
      types {
        NEW_FOLLOWER {
          email
          push
        }
        NEW_COMMENT {
          email
          push
        }
        NEW_MENTION {
          email
          push
        }
        NEW_ARTICLE {
          email
          push
        }
        SIMILAR_PROJECTS {
          email
          push
        }
        PRODUCT_ANNOUNCEMENTS {
          email
          push
        }
      }
    }
  }
}
    `;
export const CurrentUserDocument = gql`
    query CurrentUser {
  user: currentUser {
    avatarUrl
    bio
    dynamicLink
    firstName
    fullName
    id
    isOnline
    isSilhouette
    lastName
    location
    projectCount
    username
    website
    settings {
      timezone
      locale
    }
    interestedIn {
      id
      title
    }
    ...UserProjects
  }
}
    ${UserProjectsFragmentDoc}`;

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
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser($after: String) {
  user: currentUser {
    ...User
    projects: projectsConnection {
      edges {
        node {
          id
          cover {
            uri
            default
          }
          title
          followers: followersConnection {
            totalCount
          }
        }
      }
    }
    posts: postsConnection(after: $after, first: 5) @connection(key: "posts") {
      edges {
        cursor
        node {
          ...Post
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
    ${UserFragmentDoc}
${PostFragmentDoc}`;

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
export function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const CurrentUserProjectsDocument = gql`
    query CurrentUserProjects {
  user: currentUser {
    ...UserProjects
  }
}
    ${UserProjectsFragmentDoc}`;

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
export function useCurrentUserProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>(CurrentUserProjectsDocument, baseOptions);
      }
export function useCurrentUserProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>(CurrentUserProjectsDocument, baseOptions);
        }
export type CurrentUserProjectsQueryHookResult = ReturnType<typeof useCurrentUserProjectsQuery>;
export type CurrentUserProjectsLazyQueryHookResult = ReturnType<typeof useCurrentUserProjectsLazyQuery>;
export type CurrentUserProjectsQueryResult = ApolloReactCommon.QueryResult<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>;
export const CurrentUserSettingsDocument = gql`
    query CurrentUserSettings {
  user: currentUser {
    ...UserSettings
  }
}
    ${UserSettingsFragmentDoc}`;

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
export function useCurrentUserSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>(CurrentUserSettingsDocument, baseOptions);
      }
export function useCurrentUserSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>(CurrentUserSettingsDocument, baseOptions);
        }
export type CurrentUserSettingsQueryHookResult = ReturnType<typeof useCurrentUserSettingsQuery>;
export type CurrentUserSettingsLazyQueryHookResult = ReturnType<typeof useCurrentUserSettingsLazyQuery>;
export type CurrentUserSettingsQueryResult = ApolloReactCommon.QueryResult<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>;
export const PostDocument = gql`
    query post($id: ID!) {
  post(id: $id) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

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
export function usePostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return ApolloReactHooks.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;
export const ProjectTypesDocument = gql`
    query projectTypes {
  types: projectTypes {
    id
    title
    imageUrl
  }
}
    `;

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
export function useProjectTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>) {
        return ApolloReactHooks.useQuery<ProjectTypesQuery, ProjectTypesQueryVariables>(ProjectTypesDocument, baseOptions);
      }
export function useProjectTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProjectTypesQuery, ProjectTypesQueryVariables>(ProjectTypesDocument, baseOptions);
        }
export type ProjectTypesQueryHookResult = ReturnType<typeof useProjectTypesQuery>;
export type ProjectTypesLazyQueryHookResult = ReturnType<typeof useProjectTypesLazyQuery>;
export type ProjectTypesQueryResult = ApolloReactCommon.QueryResult<ProjectTypesQuery, ProjectTypesQueryVariables>;
export const ProjectsDocument = gql`
    query projects($typeId: ID, $after: String, $first: Int, $type: ProjectSortType!) {
  projects(typeId: $typeId, after: $after, first: $first, type: $type) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        cover {
          uri
          default
        }
        ...Project
      }
    }
  }
}
    ${ProjectFragmentDoc}`;

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
export function useProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        return ApolloReactHooks.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
      }
export function useProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = ApolloReactCommon.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const SimilarProjectsDocument = gql`
    query similarProjects($id: ID!) {
  similarProjects(id: $id) {
    edges {
      node {
        cover {
          uri
        }
        ...Project
      }
    }
  }
}
    ${ProjectFragmentDoc}`;

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
export function useSimilarProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>) {
        return ApolloReactHooks.useQuery<SimilarProjectsQuery, SimilarProjectsQueryVariables>(SimilarProjectsDocument, baseOptions);
      }
export function useSimilarProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SimilarProjectsQuery, SimilarProjectsQueryVariables>(SimilarProjectsDocument, baseOptions);
        }
export type SimilarProjectsQueryHookResult = ReturnType<typeof useSimilarProjectsQuery>;
export type SimilarProjectsLazyQueryHookResult = ReturnType<typeof useSimilarProjectsLazyQuery>;
export type SimilarProjectsQueryResult = ApolloReactCommon.QueryResult<SimilarProjectsQuery, SimilarProjectsQueryVariables>;
export const UserByUsernameDocument = gql`
    query UserByUsername($username: LowercaseString!, $after: String) {
  user(username: $username) {
    ...User
    projects: projectsConnection {
      edges {
        node {
          id
          cover {
            uri
            default
          }
          title
          followers: followersConnection {
            totalCount
          }
        }
      }
    }
    posts: postsConnection(after: $after, first: 5) @connection(key: "posts") {
      edges {
        cursor
        node {
          ...Post
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
    ${UserFragmentDoc}
${PostFragmentDoc}`;

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
export function useUserByUsernameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserByUsernameQuery, UserByUsernameQueryVariables>) {
        return ApolloReactHooks.useQuery<UserByUsernameQuery, UserByUsernameQueryVariables>(UserByUsernameDocument, baseOptions);
      }
export function useUserByUsernameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserByUsernameQuery, UserByUsernameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserByUsernameQuery, UserByUsernameQueryVariables>(UserByUsernameDocument, baseOptions);
        }
export type UserByUsernameQueryHookResult = ReturnType<typeof useUserByUsernameQuery>;
export type UserByUsernameLazyQueryHookResult = ReturnType<typeof useUserByUsernameLazyQuery>;
export type UserByUsernameQueryResult = ApolloReactCommon.QueryResult<UserByUsernameQuery, UserByUsernameQueryVariables>;