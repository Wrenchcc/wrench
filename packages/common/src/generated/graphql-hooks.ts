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
  Date: any,
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
  role?: Maybe<UserRole>,
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

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN'
}

export type UserSettings = {
   __typename?: 'UserSettings',
  locale?: Maybe<Scalars['String']>,
  timezone?: Maybe<Scalars['String']>,
  notifications?: Maybe<UserNotificationsSettings>,
};

export type CommentFragmentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'createdAt'>
  & { permissions: Maybe<(
    { __typename?: 'CommentPermissions' }
    & Pick<CommentPermissions, 'isOwner'>
  )>, likes: Maybe<(
    { __typename?: 'Likes' }
    & Pick<Likes, 'isLiked' | 'totalCount'>
  )>, user: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
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
    & Pick<CommentConnection, 'totalCount'>
    & { edges: Maybe<Array<(
      { __typename?: 'CommentEdge' }
      & { node: (
        { __typename?: 'Comment' }
        & CommentFragmentFragment
      ) }
    )>> }
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

export type RepliesFragment = (
  { __typename?: 'Comment' }
  & { replies: Maybe<(
    { __typename?: 'CommentConnection' }
    & Pick<CommentConnection, 'totalCount'>
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges: Maybe<Array<(
      { __typename?: 'CommentEdge' }
      & Pick<CommentEdge, 'cursor'>
      & { node: (
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'commentId' | 'text' | 'createdAt'>
        & { permissions: Maybe<(
          { __typename?: 'CommentPermissions' }
          & Pick<CommentPermissions, 'isOwner'>
        )>, likes: Maybe<(
          { __typename?: 'Likes' }
          & Pick<Likes, 'isLiked' | 'totalCount'>
        )>, user: Maybe<(
          { __typename?: 'User' }
          & UserFragment
        )> }
      ) }
    )>> }
  )> }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'fullName' | 'firstName' | 'lastName' | 'username' | 'avatarUrl' | 'isSilhouette' | 'isOnline' | 'website' | 'location' | 'bio' | 'projectCount'>
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

export type CommentQueryVariables = {
  id: Scalars['ID']
};


export type CommentQuery = (
  { __typename?: 'Query' }
  & { comment: Maybe<(
    { __typename?: 'Comment' }
    & CommentFragmentFragment
    & RepliesFragment
  )> }
);

export type CommentsQueryVariables = {
  postId: Scalars['ID'],
  after?: Maybe<Scalars['String']>
};


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments: Maybe<(
    { __typename?: 'CommentConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges: Maybe<Array<(
      { __typename?: 'CommentEdge' }
      & Pick<CommentEdge, 'cursor'>
      & { node: (
        { __typename?: 'Comment' }
        & CommentFragmentFragment
      ) }
    )>> }
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

export type CurrentUserProfileQueryVariables = {
  after?: Maybe<Scalars['String']>
};


export type CurrentUserProfileQuery = (
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

export type FeedQueryVariables = {
  after?: Maybe<Scalars['String']>
};


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed: Maybe<(
    { __typename?: 'Feed' }
    & { posts: Maybe<(
      { __typename?: 'PostConnection' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage'>
      ), edges: Maybe<Array<(
        { __typename?: 'PostEdge' }
        & Pick<PostEdge, 'cursor'>
        & { node: (
          { __typename?: 'Post' }
          & PostFragment
        ) }
      )>> }
    )> }
  )> }
);

export type FollowersQueryVariables = {
  projectId: Scalars['ID'],
  after?: Maybe<Scalars['String']>
};


export type FollowersQuery = (
  { __typename?: 'Query' }
  & { followers: Maybe<(
    { __typename?: 'FollowersConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges: Maybe<Array<(
      { __typename?: 'FollowersEdge' }
      & Pick<FollowersEdge, 'cursor'>
      & { node: (
        { __typename?: 'User' }
        & UserFragment
      ) }
    )>> }
  )> }
);

export type NotificationsQueryVariables = {
  after?: Maybe<Scalars['String']>
};


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications: Maybe<(
    { __typename?: 'NotificationsConnection' }
    & Pick<NotificationsConnection, 'unreadCount'>
    & { pageInfo: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    )>, edges: Maybe<Array<Maybe<(
      { __typename?: 'NotificationEdge' }
      & Pick<NotificationEdge, 'cursor'>
      & { node: Maybe<(
        { __typename?: 'Notification' }
        & Pick<Notification, 'id' | 'type' | 'createdAt'>
        & { user: (
          { __typename?: 'User' }
          & UserFragment
        ), project: Maybe<(
          { __typename?: 'Project' }
          & ProjectFragment
        )>, post: Maybe<(
          { __typename?: 'Post' }
          & Pick<Post, 'id'>
        )>, comment: Maybe<(
          { __typename?: 'Comment' }
          & Pick<Comment, 'id' | 'text' | 'postId'>
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
      )> }
    )>>> }
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

export type PostsQueryVariables = {
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>
};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Maybe<(
    { __typename?: 'PostConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges: Maybe<Array<(
      { __typename?: 'PostEdge' }
      & Pick<PostEdge, 'cursor'>
      & { node: (
        { __typename?: 'Post' }
        & PostFragment
      ) }
    )>> }
  )> }
);

export type ProjectQueryVariables = {
  id?: Maybe<Scalars['ID']>,
  slug?: Maybe<Scalars['LowercaseString']>,
  after?: Maybe<Scalars['String']>,
  postId?: Maybe<Scalars['ID']>
};


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { post: Maybe<(
    { __typename?: 'Post' }
    & PostFragment
  )>, project: Maybe<(
    { __typename?: 'Project' }
    & { posts: Maybe<(
      { __typename?: 'PostConnection' }
      & { edges: Maybe<Array<(
        { __typename?: 'PostEdge' }
        & Pick<PostEdge, 'cursor'>
        & { node: (
          { __typename?: 'Post' }
          & PostFragment
        ) }
      )>> }
    )> }
    & ProjectFragment
  )> }
);

export type ProjectSuggestionsQueryVariables = {
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>
};


export type ProjectSuggestionsQuery = (
  { __typename?: 'Query' }
  & { projects: Maybe<Array<Maybe<(
    { __typename?: 'ProjectSuggestionsConnection' }
    & { type: Maybe<(
      { __typename?: 'ProjectType' }
      & Pick<ProjectType, 'id' | 'title'>
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges: Maybe<Array<(
      { __typename?: 'ProjectEdge' }
      & { node: (
        { __typename?: 'Project' }
        & { cover: Maybe<(
          { __typename?: 'CoverType' }
          & Pick<CoverType, 'uri' | 'default'>
        )> }
        & ProjectFragment
      ) }
    )>> }
  )>>> }
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

export type SearchModelsQueryVariables = {
  query: Scalars['String'],
  after?: Maybe<Scalars['String']>
};


export type SearchModelsQuery = (
  { __typename?: 'Query' }
  & { models: Maybe<(
    { __typename?: 'SearchResults' }
    & { pageInfo: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    )>, edges: Maybe<Array<Maybe<(
      { __typename?: 'SearchResultEdge' }
      & { node: Maybe<{ __typename?: 'Project' } | { __typename?: 'User' } | (
        { __typename?: 'Model' }
        & Pick<Model, 'id' | 'model' | 'year'>
        & { brand: Maybe<(
          { __typename?: 'Brand' }
          & Pick<Brand, 'name'>
        )> }
      )> }
    )>>> }
  )> }
);

export type SearchProjectsQueryVariables = {
  query: Scalars['String'],
  after?: Maybe<Scalars['String']>
};


export type SearchProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Maybe<(
    { __typename?: 'SearchResults' }
    & { pageInfo: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    )>, edges: Maybe<Array<Maybe<(
      { __typename?: 'SearchResultEdge' }
      & Pick<SearchResultEdge, 'cursor'>
      & { node: Maybe<(
        { __typename?: 'Project' }
        & { cover: Maybe<(
          { __typename?: 'CoverType' }
          & Pick<CoverType, 'uri' | 'default'>
        )> }
        & ProjectFragment
      ) | { __typename?: 'User' } | { __typename?: 'Model' }> }
    )>>> }
  )> }
);

export type SearchUsersQueryVariables = {
  query: Scalars['String'],
  after?: Maybe<Scalars['String']>
};


export type SearchUsersQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<(
    { __typename?: 'SearchResults' }
    & { pageInfo: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    )>, edges: Maybe<Array<Maybe<(
      { __typename?: 'SearchResultEdge' }
      & Pick<SearchResultEdge, 'cursor'>
      & { node: Maybe<{ __typename?: 'Project' } | (
        { __typename?: 'User' }
        & Pick<User, 'projectCount'>
        & UserFragment
      ) | { __typename?: 'Model' }> }
    )>>> }
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

export type UserQueryVariables = {
  username: Scalars['LowercaseString'],
  after?: Maybe<Scalars['String']>
};


export type UserQuery = (
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

export type UserFollowingProjectsQueryVariables = {
  username: Scalars['LowercaseString'],
  after?: Maybe<Scalars['String']>
};


export type UserFollowingProjectsQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { projects: Maybe<(
      { __typename?: 'ProjectsConnection' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage'>
      ), edges: Maybe<Array<(
        { __typename?: 'ProjectEdge' }
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
  projectCount
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
export const CommentFragmentFragmentDoc = gql`
    fragment CommentFragment on Comment {
  id
  text
  createdAt
  permissions {
    isOwner
  }
  likes {
    isLiked
    totalCount
  }
  user {
    ...User
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
    totalCount
    edges {
      node {
        ...CommentFragment
      }
    }
  }
}
    ${UserFragmentDoc}
${ProjectFragmentDoc}
${CommentFragmentFragmentDoc}`;
export const RepliesFragmentDoc = gql`
    fragment Replies on Comment {
  replies: repliesConnection(first: 2) @connection(key: "replies") {
    pageInfo {
      hasNextPage
    }
    totalCount
    edges {
      cursor
      node {
        id
        commentId
        text
        createdAt
        permissions {
          isOwner
        }
        likes {
          isLiked
          totalCount
        }
        user {
          ...User
        }
      }
    }
  }
}
    ${UserFragmentDoc}`;
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
export const CommentDocument = gql`
    query comment($id: ID!) {
  comment(id: $id) {
    ...CommentFragment
    ...Replies
  }
}
    ${CommentFragmentFragmentDoc}
${RepliesFragmentDoc}`;

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
export function useCommentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CommentQuery, CommentQueryVariables>) {
        return ApolloReactHooks.useQuery<CommentQuery, CommentQueryVariables>(CommentDocument, baseOptions);
      }
export function useCommentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CommentQuery, CommentQueryVariables>(CommentDocument, baseOptions);
        }
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export type CommentQueryResult = ApolloReactCommon.QueryResult<CommentQuery, CommentQueryVariables>;
export const CommentsDocument = gql`
    query comments($postId: ID!, $after: String) {
  comments(postId: $postId, after: $after) @connection(key: "comments", filter: ["postId"]) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        ...CommentFragment
      }
    }
  }
}
    ${CommentFragmentFragmentDoc}`;

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
export function useCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
      }
export function useCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = ApolloReactCommon.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
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
export const CurrentUserProfileDocument = gql`
    query currentUserProfile($after: String) {
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
export function useCurrentUserProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>(CurrentUserProfileDocument, baseOptions);
      }
export function useCurrentUserProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>(CurrentUserProfileDocument, baseOptions);
        }
export type CurrentUserProfileQueryHookResult = ReturnType<typeof useCurrentUserProfileQuery>;
export type CurrentUserProfileLazyQueryHookResult = ReturnType<typeof useCurrentUserProfileLazyQuery>;
export type CurrentUserProfileQueryResult = ApolloReactCommon.QueryResult<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>;
export const CurrentUserProjectsDocument = gql`
    query currentUserProjects {
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
    query currentUserSettings {
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
export const FeedDocument = gql`
    query feed($after: String) {
  feed {
    posts: postsConnection(after: $after) @connection(key: "posts") {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...Post
        }
      }
    }
  }
}
    ${PostFragmentDoc}`;

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
export function useFeedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        return ApolloReactHooks.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions);
      }
export function useFeedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = ApolloReactCommon.QueryResult<FeedQuery, FeedQueryVariables>;
export const FollowersDocument = gql`
    query followers($projectId: ID!, $after: String) {
  followers(projectId: $projectId, after: $after) @connection(key: "followers", filter: ["projectId"]) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        ...User
      }
    }
  }
}
    ${UserFragmentDoc}`;

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
export function useFollowersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
        return ApolloReactHooks.useQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, baseOptions);
      }
export function useFollowersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, baseOptions);
        }
export type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>;
export type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>;
export type FollowersQueryResult = ApolloReactCommon.QueryResult<FollowersQuery, FollowersQueryVariables>;
export const NotificationsDocument = gql`
    query notifications($after: String) {
  notifications(after: $after) @connection(key: "notifications") {
    unreadCount
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        type
        createdAt
        user {
          ...User
        }
        project {
          ...Project
        }
        post {
          id
        }
        comment {
          id
          text
          postId
        }
        files: filesConnection(type: IMAGE, first: 1) {
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
    ${UserFragmentDoc}
${ProjectFragmentDoc}`;

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
export function useNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        return ApolloReactHooks.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, baseOptions);
      }
export function useNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, baseOptions);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = ApolloReactCommon.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
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
export const PostsDocument = gql`
    query posts($after: String, $first: Int) @connection(key: "posts") {
  posts(after: $after, first: $first) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        ...Post
      }
    }
  }
}
    ${PostFragmentDoc}`;

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
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export const ProjectDocument = gql`
    query project($id: ID, $slug: LowercaseString, $after: String, $postId: ID) {
  post(id: $postId) {
    ...Post
  }
  project(id: $id, slug: $slug) {
    ...Project
    posts: postsConnection(first: 5, after: $after) @connection(key: "posts") {
      edges {
        cursor
        node {
          ...Post
        }
      }
    }
  }
}
    ${PostFragmentDoc}
${ProjectFragmentDoc}`;

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
export function useProjectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        return ApolloReactHooks.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
      }
export function useProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = ApolloReactCommon.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectSuggestionsDocument = gql`
    query projectSuggestions($after: String, $first: Int) {
  projects: projectSuggestions(after: $after, first: $first) @connection(key: "projects") {
    type {
      id
      title
    }
    pageInfo {
      hasNextPage
    }
    edges {
      node {
        ...Project
        cover {
          uri
          default
        }
      }
    }
  }
}
    ${ProjectFragmentDoc}`;

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
export function useProjectSuggestionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>) {
        return ApolloReactHooks.useQuery<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>(ProjectSuggestionsDocument, baseOptions);
      }
export function useProjectSuggestionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>(ProjectSuggestionsDocument, baseOptions);
        }
export type ProjectSuggestionsQueryHookResult = ReturnType<typeof useProjectSuggestionsQuery>;
export type ProjectSuggestionsLazyQueryHookResult = ReturnType<typeof useProjectSuggestionsLazyQuery>;
export type ProjectSuggestionsQueryResult = ApolloReactCommon.QueryResult<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>;
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
  projects(typeId: $typeId, after: $after, first: $first, type: $type) @connection(key: "projects", filter: ["type", "typeId"]) {
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
export const SearchModelsDocument = gql`
    query searchModels($query: String!, $after: String) {
  models: search(query: $query, after: $after, type: MODELS, first: 20) @connection(key: "models", filter: ["query", "type"]) {
    pageInfo {
      hasNextPage
    }
    edges {
      node {
        ... on Model {
          id
          brand {
            name
          }
          model
          year
        }
      }
    }
  }
}
    `;

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
export function useSearchModelsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchModelsQuery, SearchModelsQueryVariables>(SearchModelsDocument, baseOptions);
      }
export function useSearchModelsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchModelsQuery, SearchModelsQueryVariables>(SearchModelsDocument, baseOptions);
        }
export type SearchModelsQueryHookResult = ReturnType<typeof useSearchModelsQuery>;
export type SearchModelsLazyQueryHookResult = ReturnType<typeof useSearchModelsLazyQuery>;
export type SearchModelsQueryResult = ApolloReactCommon.QueryResult<SearchModelsQuery, SearchModelsQueryVariables>;
export const SearchProjectsDocument = gql`
    query searchProjects($query: String!, $after: String) {
  projects: search(query: $query, after: $after, type: PROJECTS) @connection(key: "projects", filter: ["query", "type"]) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        ... on Project {
          ...Project
          cover {
            uri
            default
          }
        }
      }
    }
  }
}
    ${ProjectFragmentDoc}`;

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
export function useSearchProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, baseOptions);
      }
export function useSearchProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, baseOptions);
        }
export type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>;
export type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>;
export type SearchProjectsQueryResult = ApolloReactCommon.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;
export const SearchUsersDocument = gql`
    query searchUsers($query: String!, $after: String) {
  users: search(query: $query, after: $after, type: USERS) @connection(key: "users", filter: ["query", "type"]) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        ... on User {
          ...User
          projectCount
        }
      }
    }
  }
}
    ${UserFragmentDoc}`;

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
export function useSearchUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, baseOptions);
      }
export function useSearchUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, baseOptions);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = ApolloReactCommon.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
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
export const UserDocument = gql`
    query user($username: LowercaseString!, $after: String) {
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
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const UserFollowingProjectsDocument = gql`
    query userFollowingProjects($username: LowercaseString!, $after: String) {
  user(username: $username) {
    id
    projects: followingProjects(after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...Project
          cover {
            uri
            default
          }
        }
      }
    }
  }
}
    ${ProjectFragmentDoc}`;

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
export function useUserFollowingProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>) {
        return ApolloReactHooks.useQuery<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>(UserFollowingProjectsDocument, baseOptions);
      }
export function useUserFollowingProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>(UserFollowingProjectsDocument, baseOptions);
        }
export type UserFollowingProjectsQueryHookResult = ReturnType<typeof useUserFollowingProjectsQuery>;
export type UserFollowingProjectsLazyQueryHookResult = ReturnType<typeof useUserFollowingProjectsLazyQuery>;
export type UserFollowingProjectsQueryResult = ApolloReactCommon.QueryResult<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>;