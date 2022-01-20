import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date custom scalar type */
  Date: any
  /** Returns all strings in lower case */
  LowercaseString: any
}

export type AccessToken = {
  __typename?: 'AccessToken'
  access_token?: Maybe<Scalars['String']>
}

export type ApplePayload = {
  firstName?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
}

export type BlogPost = {
  __typename?: 'BlogPost'
  content?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Date']>
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['Date']>
  user?: Maybe<User>
}

export type BlogPostConnection = {
  __typename?: 'BlogPostConnection'
  edges?: Maybe<Array<BlogPostEdge>>
  pageInfo: PageInfo
  totalCount?: Maybe<Scalars['Int']>
}

export type BlogPostEdge = {
  __typename?: 'BlogPostEdge'
  cursor: Scalars['String']
  node: BlogPost
}

export type BlogPostInput = {
  content: Scalars['String']
  title: Scalars['String']
}

export type BookmarkConnection = {
  __typename?: 'BookmarkConnection'
  edges?: Maybe<Array<BookmarkEdge>>
  pageInfo: PageInfo
  totalCount?: Maybe<Scalars['Int']>
}

export type BookmarkEdge = {
  __typename?: 'BookmarkEdge'
  cursor: Scalars['String']
  node: Post
}

export type Bookmarks = {
  __typename?: 'Bookmarks'
  isBookmarked?: Maybe<Scalars['Boolean']>
  totalCount?: Maybe<Scalars['Int']>
}

export type Brand = {
  __typename?: 'Brand'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type Collection = {
  __typename?: 'Collection'
  cover?: Maybe<CoverType>
  createdAt?: Maybe<Scalars['Date']>
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['Date']>
}

export type CollectionConnection = {
  __typename?: 'CollectionConnection'
  edges?: Maybe<Array<CollectionEdge>>
  pageInfo: PageInfo
  totalCount?: Maybe<Scalars['Int']>
}

export type CollectionEdge = {
  __typename?: 'CollectionEdge'
  cursor: Scalars['String']
  node: Collection
}

export type CollectionInput = {
  postId: Scalars['ID']
}

export type Comment = {
  __typename?: 'Comment'
  commentId?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['Date']>
  id?: Maybe<Scalars['ID']>
  language?: Maybe<Scalars['String']>
  likes?: Maybe<Likes>
  permissions?: Maybe<CommentPermissions>
  postId?: Maybe<Scalars['ID']>
  repliesConnection?: Maybe<CommentConnection>
  text: Scalars['String']
  translatable?: Maybe<Scalars['Boolean']>
  updatedAt?: Maybe<Scalars['Date']>
  user?: Maybe<User>
}

export type CommentRepliesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type CommentConnection = {
  __typename?: 'CommentConnection'
  edges?: Maybe<Array<CommentEdge>>
  pageInfo: PageInfo
  totalCount?: Maybe<Scalars['Int']>
}

export type CommentEdge = {
  __typename?: 'CommentEdge'
  cursor: Scalars['String']
  node: Comment
}

export type CommentInput = {
  text: Scalars['String']
}

export type CommentPermissions = {
  __typename?: 'CommentPermissions'
  isOwner?: Maybe<Scalars['Boolean']>
}

export type CoverType = {
  __typename?: 'CoverType'
  default?: Maybe<Scalars['Boolean']>
  uri?: Maybe<Scalars['String']>
}

export type EditCollectionInput = {
  name?: InputMaybe<Scalars['String']>
}

export type EditPostInput = {
  caption?: InputMaybe<Scalars['String']>
  collectionId?: InputMaybe<Scalars['ID']>
}

export type EditUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>
  bio?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  interestedIn?: InputMaybe<Array<InputMaybe<ProjectTypeInput>>>
  lastName?: InputMaybe<Scalars['String']>
  locale?: InputMaybe<Scalars['String']>
  location?: InputMaybe<Scalars['String']>
  timezone?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
  website?: InputMaybe<Scalars['String']>
}

export type Feed = {
  __typename?: 'Feed'
  postsConnection?: Maybe<PostConnection>
}

export type FeedPostsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type File = {
  __typename?: 'File'
  createdAt?: Maybe<Scalars['Date']>
  id?: Maybe<Scalars['ID']>
  postId?: Maybe<Scalars['ID']>
  type?: Maybe<FileType>
  updatedAt?: Maybe<Scalars['Date']>
  uri: Scalars['String']
}

export type FileConnection = {
  __typename?: 'FileConnection'
  edges?: Maybe<Array<Maybe<FileEdge>>>
  pageInfo: PageInfo
}

export type FileEdge = {
  __typename?: 'FileEdge'
  cursor: Scalars['String']
  node: File
}

export type FileInput = {
  filename: Scalars['String']
}

export enum FileType {
  Image = 'IMAGE',
  Video = 'VIDEO',
}

export type FollowersConnection = {
  __typename?: 'FollowersConnection'
  edges?: Maybe<Array<FollowersEdge>>
  pageInfo: PageInfo
  totalCount?: Maybe<Scalars['Int']>
}

export type FollowersEdge = {
  __typename?: 'FollowersEdge'
  cursor: Scalars['String']
  node: User
}

export type GrowthData = {
  __typename?: 'GrowthData'
  count?: Maybe<Scalars['Int']>
  date?: Maybe<Scalars['Date']>
}

export enum GrowthType {
  Projects = 'PROJECTS',
  Users = 'USERS',
}

export type Hashtag = {
  __typename?: 'Hashtag'
  createdAt?: Maybe<Scalars['Date']>
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  postsConnection?: Maybe<PostConnection>
  slug?: Maybe<Scalars['LowercaseString']>
  totalCount?: Maybe<Scalars['Int']>
  updatedAt?: Maybe<Scalars['Date']>
}

export type HashtagPostsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type HashtagConnection = {
  __typename?: 'HashtagConnection'
  edges?: Maybe<Array<HashtagEdge>>
  pageInfo: PageInfo
  totalCount?: Maybe<Scalars['Int']>
}

export type HashtagEdge = {
  __typename?: 'HashtagEdge'
  cursor: Scalars['String']
  node: Hashtag
}

export type LikeConnection = {
  __typename?: 'LikeConnection'
  edges?: Maybe<Array<LikeEdge>>
  pageInfo: PageInfo
  totalCount?: Maybe<Scalars['Int']>
}

export type LikeEdge = {
  __typename?: 'LikeEdge'
  cursor: Scalars['String']
  node: User
}

export type Likes = {
  __typename?: 'Likes'
  isLiked?: Maybe<Scalars['Boolean']>
  totalCount?: Maybe<Scalars['Int']>
}

export type Meta = {
  __typename?: 'Meta'
  isAdmin?: Maybe<Scalars['Boolean']>
  totalComments?: Maybe<Scalars['Int']>
  totalCommentsToday?: Maybe<Scalars['Int']>
  totalFiles?: Maybe<Scalars['Int']>
  totalFilesToday?: Maybe<Scalars['Int']>
  totalPosts?: Maybe<Scalars['Int']>
  totalPostsToday?: Maybe<Scalars['Int']>
  totalProjects?: Maybe<Scalars['Int']>
  totalProjectsToday?: Maybe<Scalars['Int']>
  totalUsers?: Maybe<Scalars['Int']>
  totalUsersToday?: Maybe<Scalars['Int']>
}

export type Model = {
  __typename?: 'Model'
  brand?: Maybe<Brand>
  id: Scalars['ID']
  model?: Maybe<Scalars['String']>
  year?: Maybe<Scalars['Int']>
}

export type Mutation = {
  __typename?: 'Mutation'
  addBlogPost?: Maybe<BlogPost>
  addCollection?: Maybe<Collection>
  addComment?: Maybe<Comment>
  addPost?: Maybe<Post>
  addProject?: Maybe<Project>
  authenticateApple?: Maybe<Tokens>
  authenticateFacebook?: Maybe<Tokens>
  authenticateGoogle?: Maybe<Tokens>
  banUser?: Maybe<User>
  bookmarkPost?: Maybe<Post>
  collectPosts?: Maybe<Collection>
  deleteBlogPost?: Maybe<BlogPost>
  deleteCollection?: Maybe<Collection>
  deleteComment?: Maybe<Scalars['Boolean']>
  deleteCurrentUser?: Maybe<Scalars['Boolean']>
  deleteNotification?: Maybe<Scalars['Boolean']>
  deletePost?: Maybe<Post>
  deleteProject?: Maybe<Scalars['Boolean']>
  deleteUser?: Maybe<Scalars['Boolean']>
  dummy?: Maybe<Scalars['String']>
  editCollection?: Maybe<Collection>
  editComment?: Maybe<Comment>
  editPost?: Maybe<Post>
  editProject?: Maybe<Project>
  editUser?: Maybe<User>
  followProject?: Maybe<Project>
  likeComment?: Maybe<Comment>
  likePost?: Maybe<Post>
  markAllNotificationsSeen?: Maybe<Scalars['Boolean']>
  markNotificationSeen?: Maybe<Notification>
  preSignUrl?: Maybe<PreSignedUrl>
  preSignUrls?: Maybe<Array<Maybe<PreSignedUrl>>>
  refreshToken?: Maybe<AccessToken>
  registerDeviceToken?: Maybe<Scalars['Boolean']>
  report?: Maybe<Scalars['Boolean']>
  sendPromo?: Maybe<Scalars['Boolean']>
  toggleNotificationSettings?: Maybe<User>
  translateComment?: Maybe<Comment>
  translatePost?: Maybe<Post>
}

export type MutationAddBlogPostArgs = {
  id?: InputMaybe<Scalars['ID']>
  input: BlogPostInput
}

export type MutationAddCollectionArgs = {
  name: Scalars['String']
  projectId: Scalars['ID']
}

export type MutationAddCommentArgs = {
  commentId?: InputMaybe<Scalars['ID']>
  input: CommentInput
  postId: Scalars['ID']
}

export type MutationAddPostArgs = {
  input: PostInput
}

export type MutationAddProjectArgs = {
  input: ProjectInput
}

export type MutationAuthenticateAppleArgs = {
  identityToken: Scalars['String']
  user: ApplePayload
}

export type MutationAuthenticateFacebookArgs = {
  token: Scalars['String']
}

export type MutationAuthenticateGoogleArgs = {
  idToken: Scalars['String']
}

export type MutationBanUserArgs = {
  id: Scalars['ID']
}

export type MutationBookmarkPostArgs = {
  id: Scalars['ID']
}

export type MutationCollectPostsArgs = {
  collectionId: Scalars['ID']
  input?: InputMaybe<Array<InputMaybe<CollectionInput>>>
  projectId: Scalars['ID']
}

export type MutationDeleteBlogPostArgs = {
  id: Scalars['ID']
}

export type MutationDeleteCollectionArgs = {
  id: Scalars['ID']
  projectId: Scalars['ID']
}

export type MutationDeleteCommentArgs = {
  id: Scalars['ID']
}

export type MutationDeleteNotificationArgs = {
  id: Scalars['ID']
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationDeleteProjectArgs = {
  id: Scalars['ID']
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
}

export type MutationEditCollectionArgs = {
  id: Scalars['ID']
  input: EditCollectionInput
}

export type MutationEditCommentArgs = {
  id: Scalars['ID']
  input: CommentInput
}

export type MutationEditPostArgs = {
  id: Scalars['ID']
  input: EditPostInput
}

export type MutationEditProjectArgs = {
  id: Scalars['ID']
  input: ProjectInput
}

export type MutationEditUserArgs = {
  id?: InputMaybe<Scalars['ID']>
  input: EditUserInput
}

export type MutationFollowProjectArgs = {
  id: Scalars['ID']
}

export type MutationLikeCommentArgs = {
  id: Scalars['ID']
}

export type MutationLikePostArgs = {
  id: Scalars['ID']
}

export type MutationMarkNotificationSeenArgs = {
  id: Scalars['ID']
}

export type MutationPreSignUrlArgs = {
  input: PreSignedUrlInput
}

export type MutationPreSignUrlsArgs = {
  input?: InputMaybe<Array<InputMaybe<PreSignedUrlnput>>>
}

export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']
}

export type MutationRegisterDeviceTokenArgs = {
  platform: PlatformType
  token: Scalars['String']
}

export type MutationReportArgs = {
  id: Scalars['ID']
  type: ReportType
}

export type MutationSendPromoArgs = {
  number: Scalars['String']
}

export type MutationToggleNotificationSettingsArgs = {
  input?: InputMaybe<ToggleNotificationSettingsInput>
}

export type MutationTranslateCommentArgs = {
  id: Scalars['ID']
  original?: InputMaybe<Scalars['Boolean']>
}

export type MutationTranslatePostArgs = {
  id: Scalars['ID']
  original?: InputMaybe<Scalars['Boolean']>
}

export type Notification = {
  __typename?: 'Notification'
  comment?: Maybe<Comment>
  createdAt: Scalars['Date']
  filesConnection?: Maybe<FileConnection>
  id: Scalars['ID']
  isSeen: Scalars['Boolean']
  post?: Maybe<Post>
  project?: Maybe<Project>
  type?: Maybe<NotificationTypes>
  updatedAt: Scalars['Date']
  user: User
}

export type NotificationFilesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  reverse?: InputMaybe<Scalars['Boolean']>
  type?: InputMaybe<FileType>
}

export type NotificationEdge = {
  __typename?: 'NotificationEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<Notification>
}

export type NotificationKindSettings = {
  __typename?: 'NotificationKindSettings'
  email?: Maybe<Scalars['Boolean']>
  push?: Maybe<Scalars['Boolean']>
}

export type NotificationSettingsType = {
  __typename?: 'NotificationSettingsType'
  NEW_ARTICLE?: Maybe<NotificationKindSettings>
  NEW_COMMENT?: Maybe<NotificationKindSettings>
  NEW_FOLLOWER?: Maybe<NotificationKindSettings>
  NEW_MENTION?: Maybe<NotificationKindSettings>
  PRODUCT_ANNOUNCEMENTS?: Maybe<NotificationKindSettings>
  SIMILAR_PROJECTS?: Maybe<NotificationKindSettings>
}

export enum NotificationTypes {
  NewComment = 'NEW_COMMENT',
  NewCommentLike = 'NEW_COMMENT_LIKE',
  NewFollower = 'NEW_FOLLOWER',
  NewMention = 'NEW_MENTION',
  NewPostLike = 'NEW_POST_LIKE',
  NewReply = 'NEW_REPLY',
}

export type NotificationsConnection = {
  __typename?: 'NotificationsConnection'
  edges?: Maybe<Array<Maybe<NotificationEdge>>>
  pageInfo?: Maybe<PageInfo>
  unreadCount?: Maybe<Scalars['Int']>
}

export type PageInfo = {
  __typename?: 'PageInfo'
  hasNextPage?: Maybe<Scalars['Boolean']>
  hasPreviousPage?: Maybe<Scalars['Boolean']>
}

export enum PlatformType {
  Mobile = 'MOBILE',
  Web = 'WEB',
}

export type Post = {
  __typename?: 'Post'
  bookmarks?: Maybe<Bookmarks>
  caption?: Maybe<Scalars['String']>
  collection?: Maybe<Collection>
  commentsConnection?: Maybe<CommentConnection>
  createdAt?: Maybe<Scalars['Date']>
  filesConnection?: Maybe<FileConnection>
  id?: Maybe<Scalars['ID']>
  language?: Maybe<Scalars['String']>
  likes?: Maybe<Likes>
  likesConnection?: Maybe<LikeConnection>
  permissions?: Maybe<PostPermissions>
  postPermissions?: Maybe<PostPermissions>
  project?: Maybe<Project>
  translatable?: Maybe<Scalars['Boolean']>
  updatedAt?: Maybe<Scalars['Date']>
  user?: Maybe<User>
}

export type PostCommentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type PostFilesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  reverse?: InputMaybe<Scalars['Boolean']>
  type?: InputMaybe<FileType>
}

export type PostLikesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type PostConnection = {
  __typename?: 'PostConnection'
  edges?: Maybe<Array<PostEdge>>
  pageInfo: PageInfo
  totalCount?: Maybe<Scalars['Int']>
}

export type PostEdge = {
  __typename?: 'PostEdge'
  cursor: Scalars['String']
  node: Post
}

export type PostInput = {
  caption?: InputMaybe<Scalars['String']>
  collectionId?: InputMaybe<Scalars['ID']>
  files: Array<InputMaybe<FileInput>>
  projectId: Scalars['ID']
}

export type PostPermissions = {
  __typename?: 'PostPermissions'
  isOwner?: Maybe<Scalars['Boolean']>
}

export type PreSignedUrl = {
  __typename?: 'PreSignedUrl'
  filename?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  type?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type PreSignedUrlInput = {
  path: Scalars['String']
  type: UploadType
}

export type PreSignedUrlnput = {
  type: UploadType
}

export type Project = {
  __typename?: 'Project'
  collectionsConnection?: Maybe<CollectionConnection>
  commentsDisabled?: Maybe<Scalars['Boolean']>
  cover?: Maybe<CoverType>
  createdAt?: Maybe<Scalars['Date']>
  dynamicLink?: Maybe<Scalars['String']>
  filesConnection?: Maybe<FileConnection>
  followersConnection?: Maybe<FollowersConnection>
  id?: Maybe<Scalars['ID']>
  model?: Maybe<Model>
  permissions?: Maybe<ProjectPermissions>
  postsConnection?: Maybe<PostConnection>
  projectPermissions?: Maybe<ProjectPermissions>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  type?: Maybe<ProjectType>
  updatedAt?: Maybe<Scalars['Date']>
  user?: Maybe<User>
}

export type ProjectCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type ProjectFilesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  reverse?: InputMaybe<Scalars['Boolean']>
  type?: InputMaybe<FileType>
}

export type ProjectFollowersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type ProjectPostsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type ProjectEdge = {
  __typename?: 'ProjectEdge'
  cursor: Scalars['String']
  node: Project
}

export type ProjectInput = {
  commentsDisabled?: InputMaybe<Scalars['Boolean']>
  modelId?: InputMaybe<Scalars['ID']>
  projectTypeId?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type ProjectPermissions = {
  __typename?: 'ProjectPermissions'
  isFollower?: Maybe<Scalars['Boolean']>
  isOwner?: Maybe<Scalars['Boolean']>
}

export enum ProjectSortType {
  Popular = 'POPULAR',
  Recent = 'RECENT',
}

export type ProjectSuggestionsConnection = {
  __typename?: 'ProjectSuggestionsConnection'
  edges?: Maybe<Array<ProjectEdge>>
  pageInfo: PageInfo
  totalCount?: Maybe<Scalars['Int']>
  type?: Maybe<ProjectType>
}

export type ProjectType = {
  __typename?: 'ProjectType'
  id?: Maybe<Scalars['ID']>
  imageUrl: Scalars['String']
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  type?: Maybe<VehicleTypes>
}

export type ProjectTypeInput = {
  id?: InputMaybe<Scalars['ID']>
}

export type ProjectsConnection = {
  __typename?: 'ProjectsConnection'
  edges?: Maybe<Array<ProjectEdge>>
  pageInfo: PageInfo
  totalCount?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  blogPost?: Maybe<BlogPost>
  blogPosts?: Maybe<BlogPostConnection>
  bookmarks?: Maybe<BookmarkConnection>
  collections?: Maybe<PostConnection>
  comment?: Maybe<Comment>
  comments?: Maybe<CommentConnection>
  currentUser?: Maybe<User>
  dummy?: Maybe<Scalars['String']>
  feed?: Maybe<Feed>
  files?: Maybe<FileConnection>
  followers?: Maybe<FollowersConnection>
  growth?: Maybe<Array<Maybe<GrowthData>>>
  hashtag?: Maybe<Hashtag>
  likes?: Maybe<LikeConnection>
  meta?: Maybe<Meta>
  notifications?: Maybe<NotificationsConnection>
  post?: Maybe<Post>
  posts?: Maybe<PostConnection>
  project?: Maybe<Project>
  projectCollections?: Maybe<CollectionConnection>
  projectSuggestions?: Maybe<Array<Maybe<ProjectSuggestionsConnection>>>
  projectTypes?: Maybe<Array<Maybe<ProjectType>>>
  projects?: Maybe<ProjectsConnection>
  recentComments?: Maybe<CommentConnection>
  search?: Maybe<SearchResults>
  similarProjects?: Maybe<ProjectsConnection>
  user?: Maybe<User>
  users?: Maybe<UserConnection>
}

export type QueryBlogPostArgs = {
  id?: InputMaybe<Scalars['ID']>
  slug?: InputMaybe<Scalars['LowercaseString']>
}

export type QueryBlogPostsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type QueryBookmarksArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type QueryCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['ID']>
  last?: InputMaybe<Scalars['Int']>
  projectId?: InputMaybe<Scalars['ID']>
  projectSlug?: InputMaybe<Scalars['LowercaseString']>
  slug?: InputMaybe<Scalars['LowercaseString']>
}

export type QueryCommentArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  id: Scalars['ID']
  last?: InputMaybe<Scalars['Int']>
}

export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  postId: Scalars['ID']
}

export type QueryCurrentUserArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type QueryFilesArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sort?: InputMaybe<SortType>
  type?: InputMaybe<FileType>
}

export type QueryFollowersArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  projectId: Scalars['ID']
}

export type QueryGrowthArgs = {
  endDate?: InputMaybe<Scalars['Date']>
  startDate?: InputMaybe<Scalars['Date']>
  type: GrowthType
}

export type QueryHashtagArgs = {
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['LowercaseString']>
}

export type QueryLikesArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  postId: Scalars['ID']
}

export type QueryNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}

export type QueryPostArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type QueryProjectArgs = {
  id?: InputMaybe<Scalars['ID']>
  slug?: InputMaybe<Scalars['LowercaseString']>
}

export type QueryProjectCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  projectId?: InputMaybe<Scalars['ID']>
  projectSlug?: InputMaybe<Scalars['LowercaseString']>
  slug?: InputMaybe<Scalars['LowercaseString']>
}

export type QueryProjectSuggestionsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type QueryProjectTypesArgs = {
  type?: InputMaybe<VehicleTypes>
}

export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  type: ProjectSortType
  typeId?: InputMaybe<Scalars['ID']>
}

export type QueryRecentCommentsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type QuerySearchArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  query: Scalars['String']
  type: SearchType
  vehicleType?: InputMaybe<VehicleTypes>
}

export type QuerySimilarProjectsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  id: Scalars['ID']
  last?: InputMaybe<Scalars['Int']>
}

export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>
  username?: InputMaybe<Scalars['LowercaseString']>
}

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export enum ReportType {
  Comment = 'COMMENT',
  Post = 'POST',
  Project = 'PROJECT',
  User = 'USER',
}

export type SearchResultEdge = {
  __typename?: 'SearchResultEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<SearchResultNode>
}

export type SearchResultNode = Hashtag | Model | Project | User

export type SearchResults = {
  __typename?: 'SearchResults'
  edges?: Maybe<Array<Maybe<SearchResultEdge>>>
  pageInfo?: Maybe<PageInfo>
  totalCount?: Maybe<Scalars['Int']>
}

export enum SearchType {
  Hashtags = 'HASHTAGS',
  Models = 'MODELS',
  Projects = 'PROJECTS',
  Users = 'USERS',
}

export enum SortType {
  Random = 'RANDOM',
  Recent = 'RECENT',
}

export type ToggleNotificationSettingsInput = {
  deliveryMethod: Scalars['String']
  notificationType: Scalars['String']
}

export type Tokens = {
  __typename?: 'Tokens'
  access_token?: Maybe<Scalars['String']>
  refresh_token?: Maybe<Scalars['String']>
}

export enum UploadType {
  Image = 'IMAGE',
  Video = 'VIDEO',
}

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']>
  bio?: Maybe<Scalars['String']>
  createdAt: Scalars['Date']
  dynamicLink?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  followingProjects?: Maybe<ProjectsConnection>
  fullName?: Maybe<Scalars['String']>
  id: Scalars['ID']
  interestedIn?: Maybe<Array<Maybe<ProjectType>>>
  isOnline?: Maybe<Scalars['Boolean']>
  isSilhouette?: Maybe<Scalars['Boolean']>
  lastName?: Maybe<Scalars['String']>
  lastSeen?: Maybe<Scalars['Date']>
  location?: Maybe<Scalars['String']>
  postsConnection?: Maybe<PostConnection>
  projectCount?: Maybe<Scalars['Int']>
  projectsConnection?: Maybe<ProjectsConnection>
  role?: Maybe<UserRole>
  settings?: Maybe<UserSettings>
  updatedAt: Scalars['Date']
  username?: Maybe<Scalars['LowercaseString']>
  website?: Maybe<Scalars['String']>
}

export type UserFollowingProjectsArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type UserPostsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type UserProjectsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type UserConnection = {
  __typename?: 'UserConnection'
  edges?: Maybe<Array<Maybe<UserEdge>>>
  pageInfo?: Maybe<PageInfo>
}

export type UserEdge = {
  __typename?: 'UserEdge'
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<User>
}

export type UserNotificationsSettings = {
  __typename?: 'UserNotificationsSettings'
  types?: Maybe<NotificationSettingsType>
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

export type UserSettings = {
  __typename?: 'UserSettings'
  locale?: Maybe<Scalars['String']>
  notifications?: Maybe<UserNotificationsSettings>
  timezone?: Maybe<Scalars['String']>
}

export enum VehicleTypes {
  Car = 'CAR',
  Motorcycle = 'MOTORCYCLE',
}

export type BlogPostFragment = {
  __typename?: 'BlogPost'
  id?: string | null | undefined
  title?: string | null | undefined
  slug?: string | null | undefined
  content?: string | null | undefined
  createdAt?: any | null | undefined
  user?:
    | {
        __typename?: 'User'
        id: string
        fullName?: string | null | undefined
        firstName?: string | null | undefined
        lastName?: string | null | undefined
        username?: any | null | undefined
        avatarUrl?: string | null | undefined
        isSilhouette?: boolean | null | undefined
        isOnline?: boolean | null | undefined
        website?: string | null | undefined
        location?: string | null | undefined
        bio?: string | null | undefined
        projectCount?: number | null | undefined
        dynamicLink?: string | null | undefined
      }
    | null
    | undefined
}

export type CollectionFragment = {
  __typename?: 'Collection'
  id?: string | null | undefined
  name?: string | null | undefined
  slug?: string | null | undefined
  cover?: { __typename?: 'CoverType'; uri?: string | null | undefined } | null | undefined
}

export type CommentAndRepliesFragment = {
  __typename?: 'Comment'
  id?: string | null | undefined
  text: string
  createdAt?: any | null | undefined
  translatable?: boolean | null | undefined
  replies?:
    | {
        __typename?: 'CommentConnection'
        totalCount?: number | null | undefined
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'CommentEdge'
              cursor: string
              node: {
                __typename?: 'Comment'
                id?: string | null | undefined
                text: string
                createdAt?: any | null | undefined
                translatable?: boolean | null | undefined
                permissions?:
                  | { __typename?: 'CommentPermissions'; isOwner?: boolean | null | undefined }
                  | null
                  | undefined
                likes?:
                  | {
                      __typename?: 'Likes'
                      isLiked?: boolean | null | undefined
                      totalCount?: number | null | undefined
                    }
                  | null
                  | undefined
                user?:
                  | {
                      __typename?: 'User'
                      id: string
                      fullName?: string | null | undefined
                      firstName?: string | null | undefined
                      lastName?: string | null | undefined
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                      isSilhouette?: boolean | null | undefined
                      isOnline?: boolean | null | undefined
                      website?: string | null | undefined
                      location?: string | null | undefined
                      bio?: string | null | undefined
                      projectCount?: number | null | undefined
                      dynamicLink?: string | null | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
  permissions?:
    | { __typename?: 'CommentPermissions'; isOwner?: boolean | null | undefined }
    | null
    | undefined
  likes?:
    | {
        __typename?: 'Likes'
        isLiked?: boolean | null | undefined
        totalCount?: number | null | undefined
      }
    | null
    | undefined
  user?:
    | {
        __typename?: 'User'
        id: string
        fullName?: string | null | undefined
        firstName?: string | null | undefined
        lastName?: string | null | undefined
        username?: any | null | undefined
        avatarUrl?: string | null | undefined
        isSilhouette?: boolean | null | undefined
        isOnline?: boolean | null | undefined
        website?: string | null | undefined
        location?: string | null | undefined
        bio?: string | null | undefined
        projectCount?: number | null | undefined
        dynamicLink?: string | null | undefined
      }
    | null
    | undefined
}

export type CommentFragment = {
  __typename?: 'Comment'
  id?: string | null | undefined
  text: string
  createdAt?: any | null | undefined
  translatable?: boolean | null | undefined
  permissions?:
    | { __typename?: 'CommentPermissions'; isOwner?: boolean | null | undefined }
    | null
    | undefined
  likes?:
    | {
        __typename?: 'Likes'
        isLiked?: boolean | null | undefined
        totalCount?: number | null | undefined
      }
    | null
    | undefined
  user?:
    | {
        __typename?: 'User'
        id: string
        fullName?: string | null | undefined
        firstName?: string | null | undefined
        lastName?: string | null | undefined
        username?: any | null | undefined
        avatarUrl?: string | null | undefined
        isSilhouette?: boolean | null | undefined
        isOnline?: boolean | null | undefined
        website?: string | null | undefined
        location?: string | null | undefined
        bio?: string | null | undefined
        projectCount?: number | null | undefined
        dynamicLink?: string | null | undefined
      }
    | null
    | undefined
}

export type NotificationFragment = {
  __typename?: 'Notification'
  id: string
  type?: NotificationTypes | null | undefined
  createdAt: any
  user: {
    __typename?: 'User'
    id: string
    fullName?: string | null | undefined
    firstName?: string | null | undefined
    lastName?: string | null | undefined
    username?: any | null | undefined
    avatarUrl?: string | null | undefined
    isSilhouette?: boolean | null | undefined
    isOnline?: boolean | null | undefined
    website?: string | null | undefined
    location?: string | null | undefined
    bio?: string | null | undefined
    projectCount?: number | null | undefined
    dynamicLink?: string | null | undefined
  }
  project?:
    | {
        __typename?: 'Project'
        id?: string | null | undefined
        title?: string | null | undefined
        slug?: string | null | undefined
        dynamicLink?: string | null | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
        permissions?:
          | {
              __typename?: 'ProjectPermissions'
              isOwner?: boolean | null | undefined
              isFollower?: boolean | null | undefined
            }
          | null
          | undefined
        type?: { __typename?: 'ProjectType'; title?: string | null | undefined } | null | undefined
        cover?: { __typename?: 'CoverType'; uri?: string | null | undefined } | null | undefined
        followers?:
          | {
              __typename?: 'FollowersConnection'
              totalCount?: number | null | undefined
              edges?:
                | Array<{
                    __typename?: 'FollowersEdge'
                    node: {
                      __typename?: 'User'
                      id: string
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
  post?: { __typename?: 'Post'; id?: string | null | undefined } | null | undefined
  comment?:
    | {
        __typename?: 'Comment'
        id?: string | null | undefined
        text: string
        postId?: string | null | undefined
      }
    | null
    | undefined
  files?:
    | {
        __typename?: 'FileConnection'
        edges?:
          | Array<
              | {
                  __typename?: 'FileEdge'
                  node: { __typename?: 'File'; id?: string | null | undefined; uri: string }
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
}

export type PostFragment = {
  __typename?: 'Post'
  id?: string | null | undefined
  caption?: string | null | undefined
  createdAt?: any | null | undefined
  translatable?: boolean | null | undefined
  user?:
    | {
        __typename?: 'User'
        id: string
        fullName?: string | null | undefined
        firstName?: string | null | undefined
        lastName?: string | null | undefined
        username?: any | null | undefined
        avatarUrl?: string | null | undefined
        isSilhouette?: boolean | null | undefined
        isOnline?: boolean | null | undefined
        website?: string | null | undefined
        location?: string | null | undefined
        bio?: string | null | undefined
        projectCount?: number | null | undefined
        dynamicLink?: string | null | undefined
      }
    | null
    | undefined
  permissions?:
    | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
    | null
    | undefined
  files?:
    | {
        __typename?: 'FileConnection'
        edges?:
          | Array<
              | {
                  __typename?: 'FileEdge'
                  node: {
                    __typename?: 'File'
                    id?: string | null | undefined
                    type?: FileType | null | undefined
                    uri: string
                  }
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
  project?:
    | {
        __typename?: 'Project'
        id?: string | null | undefined
        title?: string | null | undefined
        slug?: string | null | undefined
        dynamicLink?: string | null | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
        permissions?:
          | {
              __typename?: 'ProjectPermissions'
              isOwner?: boolean | null | undefined
              isFollower?: boolean | null | undefined
            }
          | null
          | undefined
        type?: { __typename?: 'ProjectType'; title?: string | null | undefined } | null | undefined
        cover?: { __typename?: 'CoverType'; uri?: string | null | undefined } | null | undefined
        followers?:
          | {
              __typename?: 'FollowersConnection'
              totalCount?: number | null | undefined
              edges?:
                | Array<{
                    __typename?: 'FollowersEdge'
                    node: {
                      __typename?: 'User'
                      id: string
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
  likes?:
    | {
        __typename?: 'Likes'
        isLiked?: boolean | null | undefined
        totalCount?: number | null | undefined
      }
    | null
    | undefined
  bookmarks?:
    | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
    | null
    | undefined
  comments?:
    | {
        __typename?: 'CommentConnection'
        totalCount?: number | null | undefined
        edges?:
          | Array<{
              __typename?: 'CommentEdge'
              node: {
                __typename?: 'Comment'
                id?: string | null | undefined
                text: string
                createdAt?: any | null | undefined
                translatable?: boolean | null | undefined
                permissions?:
                  | { __typename?: 'CommentPermissions'; isOwner?: boolean | null | undefined }
                  | null
                  | undefined
                likes?:
                  | {
                      __typename?: 'Likes'
                      isLiked?: boolean | null | undefined
                      totalCount?: number | null | undefined
                    }
                  | null
                  | undefined
                user?:
                  | {
                      __typename?: 'User'
                      id: string
                      fullName?: string | null | undefined
                      firstName?: string | null | undefined
                      lastName?: string | null | undefined
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                      isSilhouette?: boolean | null | undefined
                      isOnline?: boolean | null | undefined
                      website?: string | null | undefined
                      location?: string | null | undefined
                      bio?: string | null | undefined
                      projectCount?: number | null | undefined
                      dynamicLink?: string | null | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
  likesConnection?:
    | {
        __typename?: 'LikeConnection'
        edges?:
          | Array<{
              __typename?: 'LikeEdge'
              node: { __typename?: 'User'; id: string; avatarUrl?: string | null | undefined }
            }>
          | null
          | undefined
      }
    | null
    | undefined
  collection?:
    | {
        __typename?: 'Collection'
        id?: string | null | undefined
        name?: string | null | undefined
        slug?: string | null | undefined
      }
    | null
    | undefined
}

export type ProjectFragment = {
  __typename?: 'Project'
  id?: string | null | undefined
  title?: string | null | undefined
  slug?: string | null | undefined
  dynamicLink?: string | null | undefined
  user?:
    | {
        __typename?: 'User'
        id: string
        fullName?: string | null | undefined
        firstName?: string | null | undefined
        lastName?: string | null | undefined
        username?: any | null | undefined
        avatarUrl?: string | null | undefined
        isSilhouette?: boolean | null | undefined
        isOnline?: boolean | null | undefined
        website?: string | null | undefined
        location?: string | null | undefined
        bio?: string | null | undefined
        projectCount?: number | null | undefined
        dynamicLink?: string | null | undefined
      }
    | null
    | undefined
  permissions?:
    | {
        __typename?: 'ProjectPermissions'
        isOwner?: boolean | null | undefined
        isFollower?: boolean | null | undefined
      }
    | null
    | undefined
  type?: { __typename?: 'ProjectType'; title?: string | null | undefined } | null | undefined
  cover?: { __typename?: 'CoverType'; uri?: string | null | undefined } | null | undefined
  followers?:
    | {
        __typename?: 'FollowersConnection'
        totalCount?: number | null | undefined
        edges?:
          | Array<{
              __typename?: 'FollowersEdge'
              node: {
                __typename?: 'User'
                id: string
                username?: any | null | undefined
                avatarUrl?: string | null | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type UserFragment = {
  __typename?: 'User'
  id: string
  fullName?: string | null | undefined
  firstName?: string | null | undefined
  lastName?: string | null | undefined
  username?: any | null | undefined
  avatarUrl?: string | null | undefined
  isSilhouette?: boolean | null | undefined
  isOnline?: boolean | null | undefined
  website?: string | null | undefined
  location?: string | null | undefined
  bio?: string | null | undefined
  projectCount?: number | null | undefined
  dynamicLink?: string | null | undefined
}

export type UserProjectsFragment = {
  __typename?: 'User'
  projects?:
    | {
        __typename?: 'ProjectsConnection'
        edges?:
          | Array<{
              __typename?: 'ProjectEdge'
              node: {
                __typename?: 'Project'
                id?: string | null | undefined
                title?: string | null | undefined
                followers?:
                  | { __typename?: 'FollowersConnection'; totalCount?: number | null | undefined }
                  | null
                  | undefined
                files?:
                  | {
                      __typename?: 'FileConnection'
                      edges?:
                        | Array<
                            | {
                                __typename?: 'FileEdge'
                                node: {
                                  __typename?: 'File'
                                  id?: string | null | undefined
                                  uri: string
                                }
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type UserSettingsFragment = {
  __typename?: 'User'
  id: string
  role?: UserRole | null | undefined
  settings?:
    | {
        __typename?: 'UserSettings'
        notifications?:
          | {
              __typename?: 'UserNotificationsSettings'
              types?:
                | {
                    __typename?: 'NotificationSettingsType'
                    NEW_FOLLOWER?:
                      | {
                          __typename?: 'NotificationKindSettings'
                          email?: boolean | null | undefined
                          push?: boolean | null | undefined
                        }
                      | null
                      | undefined
                    NEW_COMMENT?:
                      | {
                          __typename?: 'NotificationKindSettings'
                          email?: boolean | null | undefined
                          push?: boolean | null | undefined
                        }
                      | null
                      | undefined
                    NEW_MENTION?:
                      | {
                          __typename?: 'NotificationKindSettings'
                          email?: boolean | null | undefined
                          push?: boolean | null | undefined
                        }
                      | null
                      | undefined
                    NEW_ARTICLE?:
                      | {
                          __typename?: 'NotificationKindSettings'
                          email?: boolean | null | undefined
                          push?: boolean | null | undefined
                        }
                      | null
                      | undefined
                    SIMILAR_PROJECTS?:
                      | {
                          __typename?: 'NotificationKindSettings'
                          email?: boolean | null | undefined
                          push?: boolean | null | undefined
                        }
                      | null
                      | undefined
                    PRODUCT_ANNOUNCEMENTS?:
                      | {
                          __typename?: 'NotificationKindSettings'
                          email?: boolean | null | undefined
                          push?: boolean | null | undefined
                        }
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type AddBlogPostMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
  input: BlogPostInput
}>

export type AddBlogPostMutation = {
  __typename?: 'Mutation'
  addBlogPost?:
    | {
        __typename?: 'BlogPost'
        id?: string | null | undefined
        title?: string | null | undefined
        slug?: string | null | undefined
        content?: string | null | undefined
        createdAt?: any | null | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type AddCollectionMutationVariables = Exact<{
  projectId: Scalars['ID']
  name: Scalars['String']
}>

export type AddCollectionMutation = {
  __typename?: 'Mutation'
  addCollection?:
    | {
        __typename?: 'Collection'
        id?: string | null | undefined
        name?: string | null | undefined
        slug?: string | null | undefined
        cover?: { __typename?: 'CoverType'; uri?: string | null | undefined } | null | undefined
      }
    | null
    | undefined
}

export type AddCommentMutationVariables = Exact<{
  postId: Scalars['ID']
  commentId?: InputMaybe<Scalars['ID']>
  input: CommentInput
}>

export type AddCommentMutation = {
  __typename?: 'Mutation'
  addComment?:
    | {
        __typename?: 'Comment'
        id?: string | null | undefined
        text: string
        createdAt?: any | null | undefined
        translatable?: boolean | null | undefined
        replies?:
          | {
              __typename?: 'CommentConnection'
              totalCount?: number | null | undefined
              pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
              edges?:
                | Array<{
                    __typename?: 'CommentEdge'
                    cursor: string
                    node: {
                      __typename?: 'Comment'
                      id?: string | null | undefined
                      text: string
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      permissions?:
                        | {
                            __typename?: 'CommentPermissions'
                            isOwner?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        permissions?:
          | { __typename?: 'CommentPermissions'; isOwner?: boolean | null | undefined }
          | null
          | undefined
        likes?:
          | {
              __typename?: 'Likes'
              isLiked?: boolean | null | undefined
              totalCount?: number | null | undefined
            }
          | null
          | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type AddPostMutationVariables = Exact<{
  input: PostInput
}>

export type AddPostMutation = {
  __typename?: 'Mutation'
  addPost?:
    | {
        __typename?: 'Post'
        id?: string | null | undefined
        caption?: string | null | undefined
        createdAt?: any | null | undefined
        translatable?: boolean | null | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
        permissions?:
          | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
          | null
          | undefined
        files?:
          | {
              __typename?: 'FileConnection'
              edges?:
                | Array<
                    | {
                        __typename?: 'FileEdge'
                        node: {
                          __typename?: 'File'
                          id?: string | null | undefined
                          type?: FileType | null | undefined
                          uri: string
                        }
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined
            }
          | null
          | undefined
        project?:
          | {
              __typename?: 'Project'
              id?: string | null | undefined
              title?: string | null | undefined
              slug?: string | null | undefined
              dynamicLink?: string | null | undefined
              user?:
                | {
                    __typename?: 'User'
                    id: string
                    fullName?: string | null | undefined
                    firstName?: string | null | undefined
                    lastName?: string | null | undefined
                    username?: any | null | undefined
                    avatarUrl?: string | null | undefined
                    isSilhouette?: boolean | null | undefined
                    isOnline?: boolean | null | undefined
                    website?: string | null | undefined
                    location?: string | null | undefined
                    bio?: string | null | undefined
                    projectCount?: number | null | undefined
                    dynamicLink?: string | null | undefined
                  }
                | null
                | undefined
              permissions?:
                | {
                    __typename?: 'ProjectPermissions'
                    isOwner?: boolean | null | undefined
                    isFollower?: boolean | null | undefined
                  }
                | null
                | undefined
              type?:
                | { __typename?: 'ProjectType'; title?: string | null | undefined }
                | null
                | undefined
              cover?:
                | { __typename?: 'CoverType'; uri?: string | null | undefined }
                | null
                | undefined
              followers?:
                | {
                    __typename?: 'FollowersConnection'
                    totalCount?: number | null | undefined
                    edges?:
                      | Array<{
                          __typename?: 'FollowersEdge'
                          node: {
                            __typename?: 'User'
                            id: string
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                          }
                        }>
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
        likes?:
          | {
              __typename?: 'Likes'
              isLiked?: boolean | null | undefined
              totalCount?: number | null | undefined
            }
          | null
          | undefined
        bookmarks?:
          | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
          | null
          | undefined
        comments?:
          | {
              __typename?: 'CommentConnection'
              totalCount?: number | null | undefined
              edges?:
                | Array<{
                    __typename?: 'CommentEdge'
                    node: {
                      __typename?: 'Comment'
                      id?: string | null | undefined
                      text: string
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      permissions?:
                        | {
                            __typename?: 'CommentPermissions'
                            isOwner?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        likesConnection?:
          | {
              __typename?: 'LikeConnection'
              edges?:
                | Array<{
                    __typename?: 'LikeEdge'
                    node: { __typename?: 'User'; id: string; avatarUrl?: string | null | undefined }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        collection?:
          | {
              __typename?: 'Collection'
              id?: string | null | undefined
              name?: string | null | undefined
              slug?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type AddProjectMutationVariables = Exact<{
  input: ProjectInput
}>

export type AddProjectMutation = {
  __typename?: 'Mutation'
  addProject?:
    | {
        __typename?: 'Project'
        id?: string | null | undefined
        title?: string | null | undefined
        slug?: string | null | undefined
        dynamicLink?: string | null | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
        permissions?:
          | {
              __typename?: 'ProjectPermissions'
              isOwner?: boolean | null | undefined
              isFollower?: boolean | null | undefined
            }
          | null
          | undefined
        type?: { __typename?: 'ProjectType'; title?: string | null | undefined } | null | undefined
        cover?: { __typename?: 'CoverType'; uri?: string | null | undefined } | null | undefined
        followers?:
          | {
              __typename?: 'FollowersConnection'
              totalCount?: number | null | undefined
              edges?:
                | Array<{
                    __typename?: 'FollowersEdge'
                    node: {
                      __typename?: 'User'
                      id: string
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type AuthenticateAppleMutationVariables = Exact<{
  identityToken: Scalars['String']
  user: ApplePayload
}>

export type AuthenticateAppleMutation = {
  __typename?: 'Mutation'
  authenticateApple?:
    | {
        __typename?: 'Tokens'
        access_token?: string | null | undefined
        refresh_token?: string | null | undefined
      }
    | null
    | undefined
}

export type AuthenticateFacebookMutationVariables = Exact<{
  token: Scalars['String']
}>

export type AuthenticateFacebookMutation = {
  __typename?: 'Mutation'
  authenticateFacebook?:
    | {
        __typename?: 'Tokens'
        access_token?: string | null | undefined
        refresh_token?: string | null | undefined
      }
    | null
    | undefined
}

export type AuthenticateGoogleMutationVariables = Exact<{
  idToken: Scalars['String']
}>

export type AuthenticateGoogleMutation = {
  __typename?: 'Mutation'
  authenticateGoogle?:
    | {
        __typename?: 'Tokens'
        access_token?: string | null | undefined
        refresh_token?: string | null | undefined
      }
    | null
    | undefined
}

export type BanUserMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type BanUserMutation = {
  __typename?: 'Mutation'
  banUser?:
    | {
        __typename?: 'User'
        id: string
        fullName?: string | null | undefined
        firstName?: string | null | undefined
        lastName?: string | null | undefined
        username?: any | null | undefined
        avatarUrl?: string | null | undefined
        isSilhouette?: boolean | null | undefined
        isOnline?: boolean | null | undefined
        website?: string | null | undefined
        location?: string | null | undefined
        bio?: string | null | undefined
        projectCount?: number | null | undefined
        dynamicLink?: string | null | undefined
      }
    | null
    | undefined
}

export type BookmarkPostMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type BookmarkPostMutation = {
  __typename?: 'Mutation'
  bookmarkPost?:
    | {
        __typename?: 'Post'
        id?: string | null | undefined
        bookmarks?:
          | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
          | null
          | undefined
      }
    | null
    | undefined
}

export type CollectPostsMutationVariables = Exact<{
  projectId: Scalars['ID']
  collectionId: Scalars['ID']
  input?: InputMaybe<Array<InputMaybe<CollectionInput>> | InputMaybe<CollectionInput>>
}>

export type CollectPostsMutation = {
  __typename?: 'Mutation'
  collectPosts?:
    | {
        __typename?: 'Collection'
        id?: string | null | undefined
        name?: string | null | undefined
        cover?: { __typename?: 'CoverType'; uri?: string | null | undefined } | null | undefined
      }
    | null
    | undefined
}

export type DeleteBlogPostMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteBlogPostMutation = {
  __typename?: 'Mutation'
  deleteBlogPost?: { __typename?: 'BlogPost'; id?: string | null | undefined } | null | undefined
}

export type DeleteCollectionMutationVariables = Exact<{
  projectId: Scalars['ID']
  id: Scalars['ID']
}>

export type DeleteCollectionMutation = {
  __typename?: 'Mutation'
  deleteCollection?:
    | { __typename?: 'Collection'; id?: string | null | undefined }
    | null
    | undefined
}

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteCommentMutation = {
  __typename?: 'Mutation'
  deleteComment?: boolean | null | undefined
}

export type DeleteCurrentUserMutationVariables = Exact<{ [key: string]: never }>

export type DeleteCurrentUserMutation = {
  __typename?: 'Mutation'
  deleteCurrentUser?: boolean | null | undefined
}

export type DeleteNotificationMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteNotificationMutation = {
  __typename?: 'Mutation'
  deleteNotification?: boolean | null | undefined
}

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeletePostMutation = {
  __typename?: 'Mutation'
  deletePost?: { __typename?: 'Post'; id?: string | null | undefined } | null | undefined
}

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteProjectMutation = {
  __typename?: 'Mutation'
  deleteProject?: boolean | null | undefined
}

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteUserMutation = {
  __typename?: 'Mutation'
  deleteUser?: boolean | null | undefined
}

export type EditCollectionMutationVariables = Exact<{
  input: EditCollectionInput
  id: Scalars['ID']
}>

export type EditCollectionMutation = {
  __typename?: 'Mutation'
  editCollection?:
    | {
        __typename?: 'Collection'
        id?: string | null | undefined
        name?: string | null | undefined
        slug?: string | null | undefined
        cover?: { __typename?: 'CoverType'; uri?: string | null | undefined } | null | undefined
      }
    | null
    | undefined
}

export type EditPostMutationVariables = Exact<{
  id: Scalars['ID']
  input: EditPostInput
}>

export type EditPostMutation = {
  __typename?: 'Mutation'
  editPost?:
    | {
        __typename?: 'Post'
        id?: string | null | undefined
        caption?: string | null | undefined
        createdAt?: any | null | undefined
        translatable?: boolean | null | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
        permissions?:
          | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
          | null
          | undefined
        files?:
          | {
              __typename?: 'FileConnection'
              edges?:
                | Array<
                    | {
                        __typename?: 'FileEdge'
                        node: {
                          __typename?: 'File'
                          id?: string | null | undefined
                          type?: FileType | null | undefined
                          uri: string
                        }
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined
            }
          | null
          | undefined
        project?:
          | {
              __typename?: 'Project'
              id?: string | null | undefined
              title?: string | null | undefined
              slug?: string | null | undefined
              dynamicLink?: string | null | undefined
              user?:
                | {
                    __typename?: 'User'
                    id: string
                    fullName?: string | null | undefined
                    firstName?: string | null | undefined
                    lastName?: string | null | undefined
                    username?: any | null | undefined
                    avatarUrl?: string | null | undefined
                    isSilhouette?: boolean | null | undefined
                    isOnline?: boolean | null | undefined
                    website?: string | null | undefined
                    location?: string | null | undefined
                    bio?: string | null | undefined
                    projectCount?: number | null | undefined
                    dynamicLink?: string | null | undefined
                  }
                | null
                | undefined
              permissions?:
                | {
                    __typename?: 'ProjectPermissions'
                    isOwner?: boolean | null | undefined
                    isFollower?: boolean | null | undefined
                  }
                | null
                | undefined
              type?:
                | { __typename?: 'ProjectType'; title?: string | null | undefined }
                | null
                | undefined
              cover?:
                | { __typename?: 'CoverType'; uri?: string | null | undefined }
                | null
                | undefined
              followers?:
                | {
                    __typename?: 'FollowersConnection'
                    totalCount?: number | null | undefined
                    edges?:
                      | Array<{
                          __typename?: 'FollowersEdge'
                          node: {
                            __typename?: 'User'
                            id: string
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                          }
                        }>
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
        likes?:
          | {
              __typename?: 'Likes'
              isLiked?: boolean | null | undefined
              totalCount?: number | null | undefined
            }
          | null
          | undefined
        bookmarks?:
          | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
          | null
          | undefined
        comments?:
          | {
              __typename?: 'CommentConnection'
              totalCount?: number | null | undefined
              edges?:
                | Array<{
                    __typename?: 'CommentEdge'
                    node: {
                      __typename?: 'Comment'
                      id?: string | null | undefined
                      text: string
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      permissions?:
                        | {
                            __typename?: 'CommentPermissions'
                            isOwner?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        likesConnection?:
          | {
              __typename?: 'LikeConnection'
              edges?:
                | Array<{
                    __typename?: 'LikeEdge'
                    node: { __typename?: 'User'; id: string; avatarUrl?: string | null | undefined }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        collection?:
          | {
              __typename?: 'Collection'
              id?: string | null | undefined
              name?: string | null | undefined
              slug?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type EditProjectMutationVariables = Exact<{
  id: Scalars['ID']
  input: ProjectInput
}>

export type EditProjectMutation = {
  __typename?: 'Mutation'
  editProject?:
    | { __typename?: 'Project'; id?: string | null | undefined; title?: string | null | undefined }
    | null
    | undefined
}

export type EditUserMutationVariables = Exact<{
  input: EditUserInput
  id?: InputMaybe<Scalars['ID']>
}>

export type EditUserMutation = {
  __typename?: 'Mutation'
  editUser?:
    | {
        __typename?: 'User'
        id: string
        fullName?: string | null | undefined
        firstName?: string | null | undefined
        lastName?: string | null | undefined
        username?: any | null | undefined
        avatarUrl?: string | null | undefined
        isSilhouette?: boolean | null | undefined
        isOnline?: boolean | null | undefined
        website?: string | null | undefined
        location?: string | null | undefined
        bio?: string | null | undefined
        projectCount?: number | null | undefined
        dynamicLink?: string | null | undefined
      }
    | null
    | undefined
}

export type FollowProjectMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type FollowProjectMutation = {
  __typename?: 'Mutation'
  followProject?:
    | {
        __typename?: 'Project'
        id?: string | null | undefined
        title?: string | null | undefined
        slug?: string | null | undefined
        dynamicLink?: string | null | undefined
        cover?:
          | {
              __typename?: 'CoverType'
              uri?: string | null | undefined
              default?: boolean | null | undefined
            }
          | null
          | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
        permissions?:
          | {
              __typename?: 'ProjectPermissions'
              isOwner?: boolean | null | undefined
              isFollower?: boolean | null | undefined
            }
          | null
          | undefined
        type?: { __typename?: 'ProjectType'; title?: string | null | undefined } | null | undefined
        followers?:
          | {
              __typename?: 'FollowersConnection'
              totalCount?: number | null | undefined
              edges?:
                | Array<{
                    __typename?: 'FollowersEdge'
                    node: {
                      __typename?: 'User'
                      id: string
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type LikeCommentMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type LikeCommentMutation = {
  __typename?: 'Mutation'
  likeComment?:
    | {
        __typename?: 'Comment'
        id?: string | null | undefined
        likes?:
          | {
              __typename?: 'Likes'
              isLiked?: boolean | null | undefined
              totalCount?: number | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type LikePostMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type LikePostMutation = {
  __typename?: 'Mutation'
  likePost?:
    | {
        __typename?: 'Post'
        id?: string | null | undefined
        likes?:
          | {
              __typename?: 'Likes'
              isLiked?: boolean | null | undefined
              totalCount?: number | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type MarkAllNotificationsSeenMutationVariables = Exact<{ [key: string]: never }>

export type MarkAllNotificationsSeenMutation = {
  __typename?: 'Mutation'
  markAllNotificationsSeen?: boolean | null | undefined
}

export type MarkNotificationSeenMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type MarkNotificationSeenMutation = {
  __typename?: 'Mutation'
  markNotificationSeen?:
    | {
        __typename?: 'Notification'
        id: string
        type?: NotificationTypes | null | undefined
        createdAt: any
        user: {
          __typename?: 'User'
          id: string
          fullName?: string | null | undefined
          firstName?: string | null | undefined
          lastName?: string | null | undefined
          username?: any | null | undefined
          avatarUrl?: string | null | undefined
          isSilhouette?: boolean | null | undefined
          isOnline?: boolean | null | undefined
          website?: string | null | undefined
          location?: string | null | undefined
          bio?: string | null | undefined
          projectCount?: number | null | undefined
          dynamicLink?: string | null | undefined
        }
        project?:
          | {
              __typename?: 'Project'
              id?: string | null | undefined
              title?: string | null | undefined
              slug?: string | null | undefined
              dynamicLink?: string | null | undefined
              user?:
                | {
                    __typename?: 'User'
                    id: string
                    fullName?: string | null | undefined
                    firstName?: string | null | undefined
                    lastName?: string | null | undefined
                    username?: any | null | undefined
                    avatarUrl?: string | null | undefined
                    isSilhouette?: boolean | null | undefined
                    isOnline?: boolean | null | undefined
                    website?: string | null | undefined
                    location?: string | null | undefined
                    bio?: string | null | undefined
                    projectCount?: number | null | undefined
                    dynamicLink?: string | null | undefined
                  }
                | null
                | undefined
              permissions?:
                | {
                    __typename?: 'ProjectPermissions'
                    isOwner?: boolean | null | undefined
                    isFollower?: boolean | null | undefined
                  }
                | null
                | undefined
              type?:
                | { __typename?: 'ProjectType'; title?: string | null | undefined }
                | null
                | undefined
              cover?:
                | { __typename?: 'CoverType'; uri?: string | null | undefined }
                | null
                | undefined
              followers?:
                | {
                    __typename?: 'FollowersConnection'
                    totalCount?: number | null | undefined
                    edges?:
                      | Array<{
                          __typename?: 'FollowersEdge'
                          node: {
                            __typename?: 'User'
                            id: string
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                          }
                        }>
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
        post?: { __typename?: 'Post'; id?: string | null | undefined } | null | undefined
        comment?:
          | {
              __typename?: 'Comment'
              id?: string | null | undefined
              text: string
              postId?: string | null | undefined
            }
          | null
          | undefined
        files?:
          | {
              __typename?: 'FileConnection'
              edges?:
                | Array<
                    | {
                        __typename?: 'FileEdge'
                        node: { __typename?: 'File'; id?: string | null | undefined; uri: string }
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type PreSignUrlMutationVariables = Exact<{
  input: PreSignedUrlInput
}>

export type PreSignUrlMutation = {
  __typename?: 'Mutation'
  preSignUrl?:
    | {
        __typename?: 'PreSignedUrl'
        url?: string | null | undefined
        type?: string | null | undefined
        filename?: string | null | undefined
      }
    | null
    | undefined
}

export type PreSignUrlsMutationVariables = Exact<{
  input: Array<InputMaybe<PreSignedUrlnput>> | InputMaybe<PreSignedUrlnput>
}>

export type PreSignUrlsMutation = {
  __typename?: 'Mutation'
  preSignUrls?:
    | Array<
        | {
            __typename?: 'PreSignedUrl'
            url?: string | null | undefined
            type?: string | null | undefined
            filename?: string | null | undefined
          }
        | null
        | undefined
      >
    | null
    | undefined
}

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']
}>

export type RefreshTokenMutation = {
  __typename?: 'Mutation'
  token?:
    | { __typename?: 'AccessToken'; access_token?: string | null | undefined }
    | null
    | undefined
}

export type RegisterDeviceTokenMutationVariables = Exact<{
  token: Scalars['String']
  platform: PlatformType
}>

export type RegisterDeviceTokenMutation = {
  __typename?: 'Mutation'
  registerDeviceToken?: boolean | null | undefined
}

export type SendPromoMutationVariables = Exact<{
  number: Scalars['String']
}>

export type SendPromoMutation = { __typename?: 'Mutation'; sendPromo?: boolean | null | undefined }

export type ToggleNotificationSettingsMutationVariables = Exact<{
  input?: InputMaybe<ToggleNotificationSettingsInput>
}>

export type ToggleNotificationSettingsMutation = {
  __typename?: 'Mutation'
  toggleNotificationSettings?:
    | {
        __typename?: 'User'
        id: string
        role?: UserRole | null | undefined
        settings?:
          | {
              __typename?: 'UserSettings'
              notifications?:
                | {
                    __typename?: 'UserNotificationsSettings'
                    types?:
                      | {
                          __typename?: 'NotificationSettingsType'
                          NEW_FOLLOWER?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                          NEW_COMMENT?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                          NEW_MENTION?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                          NEW_ARTICLE?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                          SIMILAR_PROJECTS?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                          PRODUCT_ANNOUNCEMENTS?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                        }
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type TranslateCommentMutationVariables = Exact<{
  id: Scalars['ID']
  original?: InputMaybe<Scalars['Boolean']>
}>

export type TranslateCommentMutation = {
  __typename?: 'Mutation'
  translateComment?:
    | {
        __typename?: 'Comment'
        id?: string | null | undefined
        translatable?: boolean | null | undefined
        text: string
      }
    | null
    | undefined
}

export type TranslatePostMutationVariables = Exact<{
  id: Scalars['ID']
  original?: InputMaybe<Scalars['Boolean']>
}>

export type TranslatePostMutation = {
  __typename?: 'Mutation'
  translatePost?:
    | {
        __typename?: 'Post'
        id?: string | null | undefined
        translatable?: boolean | null | undefined
        caption?: string | null | undefined
      }
    | null
    | undefined
}

export type BlogPostQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['LowercaseString']>
  id?: InputMaybe<Scalars['ID']>
}>

export type BlogPostQuery = {
  __typename?: 'Query'
  blogPost?:
    | {
        __typename?: 'BlogPost'
        id?: string | null | undefined
        title?: string | null | undefined
        slug?: string | null | undefined
        content?: string | null | undefined
        createdAt?: any | null | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type BlogPostsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type BlogPostsQuery = {
  __typename?: 'Query'
  blogPosts?:
    | {
        __typename?: 'BlogPostConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'BlogPostEdge'
              cursor: string
              node: {
                __typename?: 'BlogPost'
                id?: string | null | undefined
                title?: string | null | undefined
                slug?: string | null | undefined
                content?: string | null | undefined
                createdAt?: any | null | undefined
                user?:
                  | {
                      __typename?: 'User'
                      id: string
                      fullName?: string | null | undefined
                      firstName?: string | null | undefined
                      lastName?: string | null | undefined
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                      isSilhouette?: boolean | null | undefined
                      isOnline?: boolean | null | undefined
                      website?: string | null | undefined
                      location?: string | null | undefined
                      bio?: string | null | undefined
                      projectCount?: number | null | undefined
                      dynamicLink?: string | null | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type BookmarksQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type BookmarksQuery = {
  __typename?: 'Query'
  bookmarks?:
    | {
        __typename?: 'BookmarkConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'BookmarkEdge'
              cursor: string
              node: {
                __typename?: 'Post'
                id?: string | null | undefined
                caption?: string | null | undefined
                createdAt?: any | null | undefined
                translatable?: boolean | null | undefined
                user?:
                  | {
                      __typename?: 'User'
                      id: string
                      fullName?: string | null | undefined
                      firstName?: string | null | undefined
                      lastName?: string | null | undefined
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                      isSilhouette?: boolean | null | undefined
                      isOnline?: boolean | null | undefined
                      website?: string | null | undefined
                      location?: string | null | undefined
                      bio?: string | null | undefined
                      projectCount?: number | null | undefined
                      dynamicLink?: string | null | undefined
                    }
                  | null
                  | undefined
                permissions?:
                  | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
                  | null
                  | undefined
                files?:
                  | {
                      __typename?: 'FileConnection'
                      edges?:
                        | Array<
                            | {
                                __typename?: 'FileEdge'
                                node: {
                                  __typename?: 'File'
                                  id?: string | null | undefined
                                  type?: FileType | null | undefined
                                  uri: string
                                }
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                project?:
                  | {
                      __typename?: 'Project'
                      id?: string | null | undefined
                      title?: string | null | undefined
                      slug?: string | null | undefined
                      dynamicLink?: string | null | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | {
                            __typename?: 'ProjectPermissions'
                            isOwner?: boolean | null | undefined
                            isFollower?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      type?:
                        | { __typename?: 'ProjectType'; title?: string | null | undefined }
                        | null
                        | undefined
                      cover?:
                        | { __typename?: 'CoverType'; uri?: string | null | undefined }
                        | null
                        | undefined
                      followers?:
                        | {
                            __typename?: 'FollowersConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'FollowersEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                likes?:
                  | {
                      __typename?: 'Likes'
                      isLiked?: boolean | null | undefined
                      totalCount?: number | null | undefined
                    }
                  | null
                  | undefined
                bookmarks?:
                  | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
                  | null
                  | undefined
                comments?:
                  | {
                      __typename?: 'CommentConnection'
                      totalCount?: number | null | undefined
                      edges?:
                        | Array<{
                            __typename?: 'CommentEdge'
                            node: {
                              __typename?: 'Comment'
                              id?: string | null | undefined
                              text: string
                              createdAt?: any | null | undefined
                              translatable?: boolean | null | undefined
                              permissions?:
                                | {
                                    __typename?: 'CommentPermissions'
                                    isOwner?: boolean | null | undefined
                                  }
                                | null
                                | undefined
                              likes?:
                                | {
                                    __typename?: 'Likes'
                                    isLiked?: boolean | null | undefined
                                    totalCount?: number | null | undefined
                                  }
                                | null
                                | undefined
                              user?:
                                | {
                                    __typename?: 'User'
                                    id: string
                                    fullName?: string | null | undefined
                                    firstName?: string | null | undefined
                                    lastName?: string | null | undefined
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                    isSilhouette?: boolean | null | undefined
                                    isOnline?: boolean | null | undefined
                                    website?: string | null | undefined
                                    location?: string | null | undefined
                                    bio?: string | null | undefined
                                    projectCount?: number | null | undefined
                                    dynamicLink?: string | null | undefined
                                  }
                                | null
                                | undefined
                            }
                          }>
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                likesConnection?:
                  | {
                      __typename?: 'LikeConnection'
                      edges?:
                        | Array<{
                            __typename?: 'LikeEdge'
                            node: {
                              __typename?: 'User'
                              id: string
                              avatarUrl?: string | null | undefined
                            }
                          }>
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                collection?:
                  | {
                      __typename?: 'Collection'
                      id?: string | null | undefined
                      name?: string | null | undefined
                      slug?: string | null | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type CollectionsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
  slug?: InputMaybe<Scalars['LowercaseString']>
  projectId?: InputMaybe<Scalars['ID']>
  projectSlug?: InputMaybe<Scalars['LowercaseString']>
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type CollectionsQuery = {
  __typename?: 'Query'
  collections?:
    | {
        __typename?: 'PostConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'PostEdge'
              cursor: string
              node: {
                __typename?: 'Post'
                id?: string | null | undefined
                caption?: string | null | undefined
                createdAt?: any | null | undefined
                translatable?: boolean | null | undefined
                user?:
                  | {
                      __typename?: 'User'
                      id: string
                      fullName?: string | null | undefined
                      firstName?: string | null | undefined
                      lastName?: string | null | undefined
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                      isSilhouette?: boolean | null | undefined
                      isOnline?: boolean | null | undefined
                      website?: string | null | undefined
                      location?: string | null | undefined
                      bio?: string | null | undefined
                      projectCount?: number | null | undefined
                      dynamicLink?: string | null | undefined
                    }
                  | null
                  | undefined
                permissions?:
                  | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
                  | null
                  | undefined
                files?:
                  | {
                      __typename?: 'FileConnection'
                      edges?:
                        | Array<
                            | {
                                __typename?: 'FileEdge'
                                node: {
                                  __typename?: 'File'
                                  id?: string | null | undefined
                                  type?: FileType | null | undefined
                                  uri: string
                                }
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                project?:
                  | {
                      __typename?: 'Project'
                      id?: string | null | undefined
                      title?: string | null | undefined
                      slug?: string | null | undefined
                      dynamicLink?: string | null | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | {
                            __typename?: 'ProjectPermissions'
                            isOwner?: boolean | null | undefined
                            isFollower?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      type?:
                        | { __typename?: 'ProjectType'; title?: string | null | undefined }
                        | null
                        | undefined
                      cover?:
                        | { __typename?: 'CoverType'; uri?: string | null | undefined }
                        | null
                        | undefined
                      followers?:
                        | {
                            __typename?: 'FollowersConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'FollowersEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                likes?:
                  | {
                      __typename?: 'Likes'
                      isLiked?: boolean | null | undefined
                      totalCount?: number | null | undefined
                    }
                  | null
                  | undefined
                bookmarks?:
                  | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
                  | null
                  | undefined
                comments?:
                  | {
                      __typename?: 'CommentConnection'
                      totalCount?: number | null | undefined
                      edges?:
                        | Array<{
                            __typename?: 'CommentEdge'
                            node: {
                              __typename?: 'Comment'
                              id?: string | null | undefined
                              text: string
                              createdAt?: any | null | undefined
                              translatable?: boolean | null | undefined
                              permissions?:
                                | {
                                    __typename?: 'CommentPermissions'
                                    isOwner?: boolean | null | undefined
                                  }
                                | null
                                | undefined
                              likes?:
                                | {
                                    __typename?: 'Likes'
                                    isLiked?: boolean | null | undefined
                                    totalCount?: number | null | undefined
                                  }
                                | null
                                | undefined
                              user?:
                                | {
                                    __typename?: 'User'
                                    id: string
                                    fullName?: string | null | undefined
                                    firstName?: string | null | undefined
                                    lastName?: string | null | undefined
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                    isSilhouette?: boolean | null | undefined
                                    isOnline?: boolean | null | undefined
                                    website?: string | null | undefined
                                    location?: string | null | undefined
                                    bio?: string | null | undefined
                                    projectCount?: number | null | undefined
                                    dynamicLink?: string | null | undefined
                                  }
                                | null
                                | undefined
                            }
                          }>
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                likesConnection?:
                  | {
                      __typename?: 'LikeConnection'
                      edges?:
                        | Array<{
                            __typename?: 'LikeEdge'
                            node: {
                              __typename?: 'User'
                              id: string
                              avatarUrl?: string | null | undefined
                            }
                          }>
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                collection?:
                  | {
                      __typename?: 'Collection'
                      id?: string | null | undefined
                      name?: string | null | undefined
                      slug?: string | null | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type CommentQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type CommentQuery = {
  __typename?: 'Query'
  comment?:
    | {
        __typename?: 'Comment'
        id?: string | null | undefined
        text: string
        createdAt?: any | null | undefined
        translatable?: boolean | null | undefined
        permissions?:
          | { __typename?: 'CommentPermissions'; isOwner?: boolean | null | undefined }
          | null
          | undefined
        likes?:
          | {
              __typename?: 'Likes'
              isLiked?: boolean | null | undefined
              totalCount?: number | null | undefined
            }
          | null
          | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type CommentsQueryVariables = Exact<{
  postId: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
}>

export type CommentsQuery = {
  __typename?: 'Query'
  post?:
    | {
        __typename?: 'Post'
        id?: string | null | undefined
        caption?: string | null | undefined
        createdAt?: any | null | undefined
        translatable?: boolean | null | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
        permissions?:
          | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
          | null
          | undefined
        files?:
          | {
              __typename?: 'FileConnection'
              edges?:
                | Array<
                    | {
                        __typename?: 'FileEdge'
                        node: {
                          __typename?: 'File'
                          id?: string | null | undefined
                          type?: FileType | null | undefined
                          uri: string
                        }
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined
            }
          | null
          | undefined
        project?:
          | {
              __typename?: 'Project'
              id?: string | null | undefined
              title?: string | null | undefined
              slug?: string | null | undefined
              dynamicLink?: string | null | undefined
              user?:
                | {
                    __typename?: 'User'
                    id: string
                    fullName?: string | null | undefined
                    firstName?: string | null | undefined
                    lastName?: string | null | undefined
                    username?: any | null | undefined
                    avatarUrl?: string | null | undefined
                    isSilhouette?: boolean | null | undefined
                    isOnline?: boolean | null | undefined
                    website?: string | null | undefined
                    location?: string | null | undefined
                    bio?: string | null | undefined
                    projectCount?: number | null | undefined
                    dynamicLink?: string | null | undefined
                  }
                | null
                | undefined
              permissions?:
                | {
                    __typename?: 'ProjectPermissions'
                    isOwner?: boolean | null | undefined
                    isFollower?: boolean | null | undefined
                  }
                | null
                | undefined
              type?:
                | { __typename?: 'ProjectType'; title?: string | null | undefined }
                | null
                | undefined
              cover?:
                | { __typename?: 'CoverType'; uri?: string | null | undefined }
                | null
                | undefined
              followers?:
                | {
                    __typename?: 'FollowersConnection'
                    totalCount?: number | null | undefined
                    edges?:
                      | Array<{
                          __typename?: 'FollowersEdge'
                          node: {
                            __typename?: 'User'
                            id: string
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                          }
                        }>
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
        likes?:
          | {
              __typename?: 'Likes'
              isLiked?: boolean | null | undefined
              totalCount?: number | null | undefined
            }
          | null
          | undefined
        bookmarks?:
          | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
          | null
          | undefined
        comments?:
          | {
              __typename?: 'CommentConnection'
              totalCount?: number | null | undefined
              edges?:
                | Array<{
                    __typename?: 'CommentEdge'
                    node: {
                      __typename?: 'Comment'
                      id?: string | null | undefined
                      text: string
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      permissions?:
                        | {
                            __typename?: 'CommentPermissions'
                            isOwner?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        likesConnection?:
          | {
              __typename?: 'LikeConnection'
              edges?:
                | Array<{
                    __typename?: 'LikeEdge'
                    node: { __typename?: 'User'; id: string; avatarUrl?: string | null | undefined }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        collection?:
          | {
              __typename?: 'Collection'
              id?: string | null | undefined
              name?: string | null | undefined
              slug?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
  comments?:
    | {
        __typename?: 'CommentConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'CommentEdge'
              cursor: string
              node: {
                __typename?: 'Comment'
                id?: string | null | undefined
                text: string
                createdAt?: any | null | undefined
                translatable?: boolean | null | undefined
                replies?:
                  | {
                      __typename?: 'CommentConnection'
                      totalCount?: number | null | undefined
                      pageInfo: {
                        __typename?: 'PageInfo'
                        hasNextPage?: boolean | null | undefined
                      }
                      edges?:
                        | Array<{
                            __typename?: 'CommentEdge'
                            cursor: string
                            node: {
                              __typename?: 'Comment'
                              id?: string | null | undefined
                              text: string
                              createdAt?: any | null | undefined
                              translatable?: boolean | null | undefined
                              permissions?:
                                | {
                                    __typename?: 'CommentPermissions'
                                    isOwner?: boolean | null | undefined
                                  }
                                | null
                                | undefined
                              likes?:
                                | {
                                    __typename?: 'Likes'
                                    isLiked?: boolean | null | undefined
                                    totalCount?: number | null | undefined
                                  }
                                | null
                                | undefined
                              user?:
                                | {
                                    __typename?: 'User'
                                    id: string
                                    fullName?: string | null | undefined
                                    firstName?: string | null | undefined
                                    lastName?: string | null | undefined
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                    isSilhouette?: boolean | null | undefined
                                    isOnline?: boolean | null | undefined
                                    website?: string | null | undefined
                                    location?: string | null | undefined
                                    bio?: string | null | undefined
                                    projectCount?: number | null | undefined
                                    dynamicLink?: string | null | undefined
                                  }
                                | null
                                | undefined
                            }
                          }>
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                permissions?:
                  | { __typename?: 'CommentPermissions'; isOwner?: boolean | null | undefined }
                  | null
                  | undefined
                likes?:
                  | {
                      __typename?: 'Likes'
                      isLiked?: boolean | null | undefined
                      totalCount?: number | null | undefined
                    }
                  | null
                  | undefined
                user?:
                  | {
                      __typename?: 'User'
                      id: string
                      fullName?: string | null | undefined
                      firstName?: string | null | undefined
                      lastName?: string | null | undefined
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                      isSilhouette?: boolean | null | undefined
                      isOnline?: boolean | null | undefined
                      website?: string | null | undefined
                      location?: string | null | undefined
                      bio?: string | null | undefined
                      projectCount?: number | null | undefined
                      dynamicLink?: string | null | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        avatarUrl?: string | null | undefined
        bio?: string | null | undefined
        dynamicLink?: string | null | undefined
        firstName?: string | null | undefined
        fullName?: string | null | undefined
        id: string
        isOnline?: boolean | null | undefined
        isSilhouette?: boolean | null | undefined
        lastName?: string | null | undefined
        location?: string | null | undefined
        projectCount?: number | null | undefined
        username?: any | null | undefined
        website?: string | null | undefined
        role?: UserRole | null | undefined
        settings?:
          | {
              __typename?: 'UserSettings'
              timezone?: string | null | undefined
              locale?: string | null | undefined
            }
          | null
          | undefined
        interestedIn?:
          | Array<
              | {
                  __typename?: 'ProjectType'
                  id?: string | null | undefined
                  title?: string | null | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
        projects?:
          | {
              __typename?: 'ProjectsConnection'
              edges?:
                | Array<{
                    __typename?: 'ProjectEdge'
                    node: {
                      __typename?: 'Project'
                      id?: string | null | undefined
                      title?: string | null | undefined
                      followers?:
                        | {
                            __typename?: 'FollowersConnection'
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      files?:
                        | {
                            __typename?: 'FileConnection'
                            edges?:
                              | Array<
                                  | {
                                      __typename?: 'FileEdge'
                                      node: {
                                        __typename?: 'File'
                                        id?: string | null | undefined
                                        uri: string
                                      }
                                    }
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type CurrentUserFollowingProjectsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type CurrentUserFollowingProjectsQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        id: string
        projects?:
          | {
              __typename?: 'ProjectsConnection'
              pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
              edges?:
                | Array<{
                    __typename?: 'ProjectEdge'
                    cursor: string
                    node: {
                      __typename?: 'Project'
                      id?: string | null | undefined
                      title?: string | null | undefined
                      slug?: string | null | undefined
                      dynamicLink?: string | null | undefined
                      cover?:
                        | {
                            __typename?: 'CoverType'
                            uri?: string | null | undefined
                            default?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | {
                            __typename?: 'ProjectPermissions'
                            isOwner?: boolean | null | undefined
                            isFollower?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      type?:
                        | { __typename?: 'ProjectType'; title?: string | null | undefined }
                        | null
                        | undefined
                      followers?:
                        | {
                            __typename?: 'FollowersConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'FollowersEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type CurrentUserProfileQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type CurrentUserProfileQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        id: string
        fullName?: string | null | undefined
        firstName?: string | null | undefined
        lastName?: string | null | undefined
        username?: any | null | undefined
        avatarUrl?: string | null | undefined
        isSilhouette?: boolean | null | undefined
        isOnline?: boolean | null | undefined
        website?: string | null | undefined
        location?: string | null | undefined
        bio?: string | null | undefined
        projectCount?: number | null | undefined
        dynamicLink?: string | null | undefined
        projects?:
          | {
              __typename?: 'ProjectsConnection'
              edges?:
                | Array<{
                    __typename?: 'ProjectEdge'
                    node: {
                      __typename?: 'Project'
                      id?: string | null | undefined
                      title?: string | null | undefined
                      slug?: string | null | undefined
                      dynamicLink?: string | null | undefined
                      cover?:
                        | {
                            __typename?: 'CoverType'
                            uri?: string | null | undefined
                            default?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | {
                            __typename?: 'ProjectPermissions'
                            isOwner?: boolean | null | undefined
                            isFollower?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      type?:
                        | { __typename?: 'ProjectType'; title?: string | null | undefined }
                        | null
                        | undefined
                      followers?:
                        | {
                            __typename?: 'FollowersConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'FollowersEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        posts?:
          | {
              __typename?: 'PostConnection'
              edges?:
                | Array<{
                    __typename?: 'PostEdge'
                    cursor: string
                    node: {
                      __typename?: 'Post'
                      id?: string | null | undefined
                      caption?: string | null | undefined
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
                        | null
                        | undefined
                      files?:
                        | {
                            __typename?: 'FileConnection'
                            edges?:
                              | Array<
                                  | {
                                      __typename?: 'FileEdge'
                                      node: {
                                        __typename?: 'File'
                                        id?: string | null | undefined
                                        type?: FileType | null | undefined
                                        uri: string
                                      }
                                    }
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      project?:
                        | {
                            __typename?: 'Project'
                            id?: string | null | undefined
                            title?: string | null | undefined
                            slug?: string | null | undefined
                            dynamicLink?: string | null | undefined
                            user?:
                              | {
                                  __typename?: 'User'
                                  id: string
                                  fullName?: string | null | undefined
                                  firstName?: string | null | undefined
                                  lastName?: string | null | undefined
                                  username?: any | null | undefined
                                  avatarUrl?: string | null | undefined
                                  isSilhouette?: boolean | null | undefined
                                  isOnline?: boolean | null | undefined
                                  website?: string | null | undefined
                                  location?: string | null | undefined
                                  bio?: string | null | undefined
                                  projectCount?: number | null | undefined
                                  dynamicLink?: string | null | undefined
                                }
                              | null
                              | undefined
                            permissions?:
                              | {
                                  __typename?: 'ProjectPermissions'
                                  isOwner?: boolean | null | undefined
                                  isFollower?: boolean | null | undefined
                                }
                              | null
                              | undefined
                            type?:
                              | { __typename?: 'ProjectType'; title?: string | null | undefined }
                              | null
                              | undefined
                            cover?:
                              | { __typename?: 'CoverType'; uri?: string | null | undefined }
                              | null
                              | undefined
                            followers?:
                              | {
                                  __typename?: 'FollowersConnection'
                                  totalCount?: number | null | undefined
                                  edges?:
                                    | Array<{
                                        __typename?: 'FollowersEdge'
                                        node: {
                                          __typename?: 'User'
                                          id: string
                                          username?: any | null | undefined
                                          avatarUrl?: string | null | undefined
                                        }
                                      }>
                                    | null
                                    | undefined
                                }
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      bookmarks?:
                        | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
                        | null
                        | undefined
                      comments?:
                        | {
                            __typename?: 'CommentConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'CommentEdge'
                                  node: {
                                    __typename?: 'Comment'
                                    id?: string | null | undefined
                                    text: string
                                    createdAt?: any | null | undefined
                                    translatable?: boolean | null | undefined
                                    permissions?:
                                      | {
                                          __typename?: 'CommentPermissions'
                                          isOwner?: boolean | null | undefined
                                        }
                                      | null
                                      | undefined
                                    likes?:
                                      | {
                                          __typename?: 'Likes'
                                          isLiked?: boolean | null | undefined
                                          totalCount?: number | null | undefined
                                        }
                                      | null
                                      | undefined
                                    user?:
                                      | {
                                          __typename?: 'User'
                                          id: string
                                          fullName?: string | null | undefined
                                          firstName?: string | null | undefined
                                          lastName?: string | null | undefined
                                          username?: any | null | undefined
                                          avatarUrl?: string | null | undefined
                                          isSilhouette?: boolean | null | undefined
                                          isOnline?: boolean | null | undefined
                                          website?: string | null | undefined
                                          location?: string | null | undefined
                                          bio?: string | null | undefined
                                          projectCount?: number | null | undefined
                                          dynamicLink?: string | null | undefined
                                        }
                                      | null
                                      | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      likesConnection?:
                        | {
                            __typename?: 'LikeConnection'
                            edges?:
                              | Array<{
                                  __typename?: 'LikeEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      collection?:
                        | {
                            __typename?: 'Collection'
                            id?: string | null | undefined
                            name?: string | null | undefined
                            slug?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
              pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type CurrentUserProjectsQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserProjectsQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        projects?:
          | {
              __typename?: 'ProjectsConnection'
              edges?:
                | Array<{
                    __typename?: 'ProjectEdge'
                    node: {
                      __typename?: 'Project'
                      id?: string | null | undefined
                      title?: string | null | undefined
                      followers?:
                        | {
                            __typename?: 'FollowersConnection'
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      files?:
                        | {
                            __typename?: 'FileConnection'
                            edges?:
                              | Array<
                                  | {
                                      __typename?: 'FileEdge'
                                      node: {
                                        __typename?: 'File'
                                        id?: string | null | undefined
                                        uri: string
                                      }
                                    }
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type CurrentUserSettingsQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserSettingsQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        id: string
        role?: UserRole | null | undefined
        settings?:
          | {
              __typename?: 'UserSettings'
              notifications?:
                | {
                    __typename?: 'UserNotificationsSettings'
                    types?:
                      | {
                          __typename?: 'NotificationSettingsType'
                          NEW_FOLLOWER?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                          NEW_COMMENT?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                          NEW_MENTION?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                          NEW_ARTICLE?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                          SIMILAR_PROJECTS?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                          PRODUCT_ANNOUNCEMENTS?:
                            | {
                                __typename?: 'NotificationKindSettings'
                                email?: boolean | null | undefined
                                push?: boolean | null | undefined
                              }
                            | null
                            | undefined
                        }
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type FeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type FeedQuery = {
  __typename?: 'Query'
  feed?:
    | {
        __typename?: 'Feed'
        posts?:
          | {
              __typename?: 'PostConnection'
              pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
              edges?:
                | Array<{
                    __typename?: 'PostEdge'
                    cursor: string
                    node: {
                      __typename?: 'Post'
                      id?: string | null | undefined
                      caption?: string | null | undefined
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
                        | null
                        | undefined
                      files?:
                        | {
                            __typename?: 'FileConnection'
                            edges?:
                              | Array<
                                  | {
                                      __typename?: 'FileEdge'
                                      node: {
                                        __typename?: 'File'
                                        id?: string | null | undefined
                                        type?: FileType | null | undefined
                                        uri: string
                                      }
                                    }
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      project?:
                        | {
                            __typename?: 'Project'
                            id?: string | null | undefined
                            title?: string | null | undefined
                            slug?: string | null | undefined
                            dynamicLink?: string | null | undefined
                            user?:
                              | {
                                  __typename?: 'User'
                                  id: string
                                  fullName?: string | null | undefined
                                  firstName?: string | null | undefined
                                  lastName?: string | null | undefined
                                  username?: any | null | undefined
                                  avatarUrl?: string | null | undefined
                                  isSilhouette?: boolean | null | undefined
                                  isOnline?: boolean | null | undefined
                                  website?: string | null | undefined
                                  location?: string | null | undefined
                                  bio?: string | null | undefined
                                  projectCount?: number | null | undefined
                                  dynamicLink?: string | null | undefined
                                }
                              | null
                              | undefined
                            permissions?:
                              | {
                                  __typename?: 'ProjectPermissions'
                                  isOwner?: boolean | null | undefined
                                  isFollower?: boolean | null | undefined
                                }
                              | null
                              | undefined
                            type?:
                              | { __typename?: 'ProjectType'; title?: string | null | undefined }
                              | null
                              | undefined
                            cover?:
                              | { __typename?: 'CoverType'; uri?: string | null | undefined }
                              | null
                              | undefined
                            followers?:
                              | {
                                  __typename?: 'FollowersConnection'
                                  totalCount?: number | null | undefined
                                  edges?:
                                    | Array<{
                                        __typename?: 'FollowersEdge'
                                        node: {
                                          __typename?: 'User'
                                          id: string
                                          username?: any | null | undefined
                                          avatarUrl?: string | null | undefined
                                        }
                                      }>
                                    | null
                                    | undefined
                                }
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      bookmarks?:
                        | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
                        | null
                        | undefined
                      comments?:
                        | {
                            __typename?: 'CommentConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'CommentEdge'
                                  node: {
                                    __typename?: 'Comment'
                                    id?: string | null | undefined
                                    text: string
                                    createdAt?: any | null | undefined
                                    translatable?: boolean | null | undefined
                                    permissions?:
                                      | {
                                          __typename?: 'CommentPermissions'
                                          isOwner?: boolean | null | undefined
                                        }
                                      | null
                                      | undefined
                                    likes?:
                                      | {
                                          __typename?: 'Likes'
                                          isLiked?: boolean | null | undefined
                                          totalCount?: number | null | undefined
                                        }
                                      | null
                                      | undefined
                                    user?:
                                      | {
                                          __typename?: 'User'
                                          id: string
                                          fullName?: string | null | undefined
                                          firstName?: string | null | undefined
                                          lastName?: string | null | undefined
                                          username?: any | null | undefined
                                          avatarUrl?: string | null | undefined
                                          isSilhouette?: boolean | null | undefined
                                          isOnline?: boolean | null | undefined
                                          website?: string | null | undefined
                                          location?: string | null | undefined
                                          bio?: string | null | undefined
                                          projectCount?: number | null | undefined
                                          dynamicLink?: string | null | undefined
                                        }
                                      | null
                                      | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      likesConnection?:
                        | {
                            __typename?: 'LikeConnection'
                            edges?:
                              | Array<{
                                  __typename?: 'LikeEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      collection?:
                        | {
                            __typename?: 'Collection'
                            id?: string | null | undefined
                            name?: string | null | undefined
                            slug?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type FilesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type FilesQuery = {
  __typename?: 'Query'
  files?:
    | {
        __typename?: 'FileConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<
              | {
                  __typename?: 'FileEdge'
                  cursor: string
                  node: {
                    __typename?: 'File'
                    id?: string | null | undefined
                    uri: string
                    postId?: string | null | undefined
                  }
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
}

export type FollowersQueryVariables = Exact<{
  projectId: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type FollowersQuery = {
  __typename?: 'Query'
  followers?:
    | {
        __typename?: 'FollowersConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'FollowersEdge'
              cursor: string
              node: {
                __typename?: 'User'
                id: string
                fullName?: string | null | undefined
                firstName?: string | null | undefined
                lastName?: string | null | undefined
                username?: any | null | undefined
                avatarUrl?: string | null | undefined
                isSilhouette?: boolean | null | undefined
                isOnline?: boolean | null | undefined
                website?: string | null | undefined
                location?: string | null | undefined
                bio?: string | null | undefined
                projectCount?: number | null | undefined
                dynamicLink?: string | null | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type GrowthQueryVariables = Exact<{
  type: GrowthType
}>

export type GrowthQuery = {
  __typename?: 'Query'
  growth?:
    | Array<
        | {
            __typename?: 'GrowthData'
            date?: any | null | undefined
            count?: number | null | undefined
          }
        | null
        | undefined
      >
    | null
    | undefined
}

export type HashtagQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
  slug?: InputMaybe<Scalars['LowercaseString']>
  name?: InputMaybe<Scalars['String']>
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type HashtagQuery = {
  __typename?: 'Query'
  hashtag?:
    | {
        __typename?: 'Hashtag'
        posts?:
          | {
              __typename?: 'PostConnection'
              pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
              edges?:
                | Array<{
                    __typename?: 'PostEdge'
                    cursor: string
                    node: {
                      __typename?: 'Post'
                      id?: string | null | undefined
                      caption?: string | null | undefined
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
                        | null
                        | undefined
                      files?:
                        | {
                            __typename?: 'FileConnection'
                            edges?:
                              | Array<
                                  | {
                                      __typename?: 'FileEdge'
                                      node: {
                                        __typename?: 'File'
                                        id?: string | null | undefined
                                        type?: FileType | null | undefined
                                        uri: string
                                      }
                                    }
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      project?:
                        | {
                            __typename?: 'Project'
                            id?: string | null | undefined
                            title?: string | null | undefined
                            slug?: string | null | undefined
                            dynamicLink?: string | null | undefined
                            user?:
                              | {
                                  __typename?: 'User'
                                  id: string
                                  fullName?: string | null | undefined
                                  firstName?: string | null | undefined
                                  lastName?: string | null | undefined
                                  username?: any | null | undefined
                                  avatarUrl?: string | null | undefined
                                  isSilhouette?: boolean | null | undefined
                                  isOnline?: boolean | null | undefined
                                  website?: string | null | undefined
                                  location?: string | null | undefined
                                  bio?: string | null | undefined
                                  projectCount?: number | null | undefined
                                  dynamicLink?: string | null | undefined
                                }
                              | null
                              | undefined
                            permissions?:
                              | {
                                  __typename?: 'ProjectPermissions'
                                  isOwner?: boolean | null | undefined
                                  isFollower?: boolean | null | undefined
                                }
                              | null
                              | undefined
                            type?:
                              | { __typename?: 'ProjectType'; title?: string | null | undefined }
                              | null
                              | undefined
                            cover?:
                              | { __typename?: 'CoverType'; uri?: string | null | undefined }
                              | null
                              | undefined
                            followers?:
                              | {
                                  __typename?: 'FollowersConnection'
                                  totalCount?: number | null | undefined
                                  edges?:
                                    | Array<{
                                        __typename?: 'FollowersEdge'
                                        node: {
                                          __typename?: 'User'
                                          id: string
                                          username?: any | null | undefined
                                          avatarUrl?: string | null | undefined
                                        }
                                      }>
                                    | null
                                    | undefined
                                }
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      bookmarks?:
                        | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
                        | null
                        | undefined
                      comments?:
                        | {
                            __typename?: 'CommentConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'CommentEdge'
                                  node: {
                                    __typename?: 'Comment'
                                    id?: string | null | undefined
                                    text: string
                                    createdAt?: any | null | undefined
                                    translatable?: boolean | null | undefined
                                    permissions?:
                                      | {
                                          __typename?: 'CommentPermissions'
                                          isOwner?: boolean | null | undefined
                                        }
                                      | null
                                      | undefined
                                    likes?:
                                      | {
                                          __typename?: 'Likes'
                                          isLiked?: boolean | null | undefined
                                          totalCount?: number | null | undefined
                                        }
                                      | null
                                      | undefined
                                    user?:
                                      | {
                                          __typename?: 'User'
                                          id: string
                                          fullName?: string | null | undefined
                                          firstName?: string | null | undefined
                                          lastName?: string | null | undefined
                                          username?: any | null | undefined
                                          avatarUrl?: string | null | undefined
                                          isSilhouette?: boolean | null | undefined
                                          isOnline?: boolean | null | undefined
                                          website?: string | null | undefined
                                          location?: string | null | undefined
                                          bio?: string | null | undefined
                                          projectCount?: number | null | undefined
                                          dynamicLink?: string | null | undefined
                                        }
                                      | null
                                      | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      likesConnection?:
                        | {
                            __typename?: 'LikeConnection'
                            edges?:
                              | Array<{
                                  __typename?: 'LikeEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      collection?:
                        | {
                            __typename?: 'Collection'
                            id?: string | null | undefined
                            name?: string | null | undefined
                            slug?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type LikesQueryVariables = Exact<{
  postId: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type LikesQuery = {
  __typename?: 'Query'
  likes?:
    | {
        __typename?: 'LikeConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'LikeEdge'
              cursor: string
              node: {
                __typename?: 'User'
                id: string
                fullName?: string | null | undefined
                firstName?: string | null | undefined
                lastName?: string | null | undefined
                username?: any | null | undefined
                avatarUrl?: string | null | undefined
                isSilhouette?: boolean | null | undefined
                isOnline?: boolean | null | undefined
                website?: string | null | undefined
                location?: string | null | undefined
                bio?: string | null | undefined
                projectCount?: number | null | undefined
                dynamicLink?: string | null | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type MetaQueryVariables = Exact<{ [key: string]: never }>

export type MetaQuery = {
  __typename?: 'Query'
  meta?:
    | {
        __typename?: 'Meta'
        totalUsers?: number | null | undefined
        totalUsersToday?: number | null | undefined
        totalPostsToday?: number | null | undefined
        totalProjectsToday?: number | null | undefined
        totalCommentsToday?: number | null | undefined
        totalFilesToday?: number | null | undefined
        totalComments?: number | null | undefined
        totalProjects?: number | null | undefined
        totalPosts?: number | null | undefined
        totalFiles?: number | null | undefined
      }
    | null
    | undefined
}

export type NotificationsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type NotificationsQuery = {
  __typename?: 'Query'
  notifications?:
    | {
        __typename?: 'NotificationsConnection'
        unreadCount?: number | null | undefined
        pageInfo?:
          | { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
          | null
          | undefined
        edges?:
          | Array<
              | {
                  __typename?: 'NotificationEdge'
                  cursor?: string | null | undefined
                  node?:
                    | {
                        __typename?: 'Notification'
                        id: string
                        type?: NotificationTypes | null | undefined
                        createdAt: any
                        user: {
                          __typename?: 'User'
                          id: string
                          fullName?: string | null | undefined
                          firstName?: string | null | undefined
                          lastName?: string | null | undefined
                          username?: any | null | undefined
                          avatarUrl?: string | null | undefined
                          isSilhouette?: boolean | null | undefined
                          isOnline?: boolean | null | undefined
                          website?: string | null | undefined
                          location?: string | null | undefined
                          bio?: string | null | undefined
                          projectCount?: number | null | undefined
                          dynamicLink?: string | null | undefined
                        }
                        project?:
                          | {
                              __typename?: 'Project'
                              id?: string | null | undefined
                              title?: string | null | undefined
                              slug?: string | null | undefined
                              dynamicLink?: string | null | undefined
                              user?:
                                | {
                                    __typename?: 'User'
                                    id: string
                                    fullName?: string | null | undefined
                                    firstName?: string | null | undefined
                                    lastName?: string | null | undefined
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                    isSilhouette?: boolean | null | undefined
                                    isOnline?: boolean | null | undefined
                                    website?: string | null | undefined
                                    location?: string | null | undefined
                                    bio?: string | null | undefined
                                    projectCount?: number | null | undefined
                                    dynamicLink?: string | null | undefined
                                  }
                                | null
                                | undefined
                              permissions?:
                                | {
                                    __typename?: 'ProjectPermissions'
                                    isOwner?: boolean | null | undefined
                                    isFollower?: boolean | null | undefined
                                  }
                                | null
                                | undefined
                              type?:
                                | { __typename?: 'ProjectType'; title?: string | null | undefined }
                                | null
                                | undefined
                              cover?:
                                | { __typename?: 'CoverType'; uri?: string | null | undefined }
                                | null
                                | undefined
                              followers?:
                                | {
                                    __typename?: 'FollowersConnection'
                                    totalCount?: number | null | undefined
                                    edges?:
                                      | Array<{
                                          __typename?: 'FollowersEdge'
                                          node: {
                                            __typename?: 'User'
                                            id: string
                                            username?: any | null | undefined
                                            avatarUrl?: string | null | undefined
                                          }
                                        }>
                                      | null
                                      | undefined
                                  }
                                | null
                                | undefined
                            }
                          | null
                          | undefined
                        post?:
                          | { __typename?: 'Post'; id?: string | null | undefined }
                          | null
                          | undefined
                        comment?:
                          | {
                              __typename?: 'Comment'
                              id?: string | null | undefined
                              text: string
                              postId?: string | null | undefined
                            }
                          | null
                          | undefined
                        files?:
                          | {
                              __typename?: 'FileConnection'
                              edges?:
                                | Array<
                                    | {
                                        __typename?: 'FileEdge'
                                        node: {
                                          __typename?: 'File'
                                          id?: string | null | undefined
                                          uri: string
                                        }
                                      }
                                    | null
                                    | undefined
                                  >
                                | null
                                | undefined
                            }
                          | null
                          | undefined
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
}

export type PostQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type PostQuery = {
  __typename?: 'Query'
  post?:
    | {
        __typename?: 'Post'
        id?: string | null | undefined
        caption?: string | null | undefined
        createdAt?: any | null | undefined
        translatable?: boolean | null | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
        permissions?:
          | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
          | null
          | undefined
        files?:
          | {
              __typename?: 'FileConnection'
              edges?:
                | Array<
                    | {
                        __typename?: 'FileEdge'
                        node: {
                          __typename?: 'File'
                          id?: string | null | undefined
                          type?: FileType | null | undefined
                          uri: string
                        }
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined
            }
          | null
          | undefined
        project?:
          | {
              __typename?: 'Project'
              id?: string | null | undefined
              title?: string | null | undefined
              slug?: string | null | undefined
              dynamicLink?: string | null | undefined
              user?:
                | {
                    __typename?: 'User'
                    id: string
                    fullName?: string | null | undefined
                    firstName?: string | null | undefined
                    lastName?: string | null | undefined
                    username?: any | null | undefined
                    avatarUrl?: string | null | undefined
                    isSilhouette?: boolean | null | undefined
                    isOnline?: boolean | null | undefined
                    website?: string | null | undefined
                    location?: string | null | undefined
                    bio?: string | null | undefined
                    projectCount?: number | null | undefined
                    dynamicLink?: string | null | undefined
                  }
                | null
                | undefined
              permissions?:
                | {
                    __typename?: 'ProjectPermissions'
                    isOwner?: boolean | null | undefined
                    isFollower?: boolean | null | undefined
                  }
                | null
                | undefined
              type?:
                | { __typename?: 'ProjectType'; title?: string | null | undefined }
                | null
                | undefined
              cover?:
                | { __typename?: 'CoverType'; uri?: string | null | undefined }
                | null
                | undefined
              followers?:
                | {
                    __typename?: 'FollowersConnection'
                    totalCount?: number | null | undefined
                    edges?:
                      | Array<{
                          __typename?: 'FollowersEdge'
                          node: {
                            __typename?: 'User'
                            id: string
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                          }
                        }>
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
        likes?:
          | {
              __typename?: 'Likes'
              isLiked?: boolean | null | undefined
              totalCount?: number | null | undefined
            }
          | null
          | undefined
        bookmarks?:
          | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
          | null
          | undefined
        comments?:
          | {
              __typename?: 'CommentConnection'
              totalCount?: number | null | undefined
              edges?:
                | Array<{
                    __typename?: 'CommentEdge'
                    node: {
                      __typename?: 'Comment'
                      id?: string | null | undefined
                      text: string
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      permissions?:
                        | {
                            __typename?: 'CommentPermissions'
                            isOwner?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        likesConnection?:
          | {
              __typename?: 'LikeConnection'
              edges?:
                | Array<{
                    __typename?: 'LikeEdge'
                    node: { __typename?: 'User'; id: string; avatarUrl?: string | null | undefined }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        collection?:
          | {
              __typename?: 'Collection'
              id?: string | null | undefined
              name?: string | null | undefined
              slug?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type PostsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type PostsQuery = {
  __typename?: 'Query'
  posts?:
    | {
        __typename?: 'PostConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'PostEdge'
              cursor: string
              node: {
                __typename?: 'Post'
                id?: string | null | undefined
                caption?: string | null | undefined
                createdAt?: any | null | undefined
                translatable?: boolean | null | undefined
                user?:
                  | {
                      __typename?: 'User'
                      id: string
                      fullName?: string | null | undefined
                      firstName?: string | null | undefined
                      lastName?: string | null | undefined
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                      isSilhouette?: boolean | null | undefined
                      isOnline?: boolean | null | undefined
                      website?: string | null | undefined
                      location?: string | null | undefined
                      bio?: string | null | undefined
                      projectCount?: number | null | undefined
                      dynamicLink?: string | null | undefined
                    }
                  | null
                  | undefined
                permissions?:
                  | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
                  | null
                  | undefined
                files?:
                  | {
                      __typename?: 'FileConnection'
                      edges?:
                        | Array<
                            | {
                                __typename?: 'FileEdge'
                                node: {
                                  __typename?: 'File'
                                  id?: string | null | undefined
                                  type?: FileType | null | undefined
                                  uri: string
                                }
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                project?:
                  | {
                      __typename?: 'Project'
                      id?: string | null | undefined
                      title?: string | null | undefined
                      slug?: string | null | undefined
                      dynamicLink?: string | null | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | {
                            __typename?: 'ProjectPermissions'
                            isOwner?: boolean | null | undefined
                            isFollower?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      type?:
                        | { __typename?: 'ProjectType'; title?: string | null | undefined }
                        | null
                        | undefined
                      cover?:
                        | { __typename?: 'CoverType'; uri?: string | null | undefined }
                        | null
                        | undefined
                      followers?:
                        | {
                            __typename?: 'FollowersConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'FollowersEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                likes?:
                  | {
                      __typename?: 'Likes'
                      isLiked?: boolean | null | undefined
                      totalCount?: number | null | undefined
                    }
                  | null
                  | undefined
                bookmarks?:
                  | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
                  | null
                  | undefined
                comments?:
                  | {
                      __typename?: 'CommentConnection'
                      totalCount?: number | null | undefined
                      edges?:
                        | Array<{
                            __typename?: 'CommentEdge'
                            node: {
                              __typename?: 'Comment'
                              id?: string | null | undefined
                              text: string
                              createdAt?: any | null | undefined
                              translatable?: boolean | null | undefined
                              permissions?:
                                | {
                                    __typename?: 'CommentPermissions'
                                    isOwner?: boolean | null | undefined
                                  }
                                | null
                                | undefined
                              likes?:
                                | {
                                    __typename?: 'Likes'
                                    isLiked?: boolean | null | undefined
                                    totalCount?: number | null | undefined
                                  }
                                | null
                                | undefined
                              user?:
                                | {
                                    __typename?: 'User'
                                    id: string
                                    fullName?: string | null | undefined
                                    firstName?: string | null | undefined
                                    lastName?: string | null | undefined
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                    isSilhouette?: boolean | null | undefined
                                    isOnline?: boolean | null | undefined
                                    website?: string | null | undefined
                                    location?: string | null | undefined
                                    bio?: string | null | undefined
                                    projectCount?: number | null | undefined
                                    dynamicLink?: string | null | undefined
                                  }
                                | null
                                | undefined
                            }
                          }>
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                likesConnection?:
                  | {
                      __typename?: 'LikeConnection'
                      edges?:
                        | Array<{
                            __typename?: 'LikeEdge'
                            node: {
                              __typename?: 'User'
                              id: string
                              avatarUrl?: string | null | undefined
                            }
                          }>
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                collection?:
                  | {
                      __typename?: 'Collection'
                      id?: string | null | undefined
                      name?: string | null | undefined
                      slug?: string | null | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type ProjectQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
  slug?: InputMaybe<Scalars['LowercaseString']>
  after?: InputMaybe<Scalars['String']>
  postId?: InputMaybe<Scalars['ID']>
  first?: InputMaybe<Scalars['Int']>
}>

export type ProjectQuery = {
  __typename?: 'Query'
  post?:
    | {
        __typename?: 'Post'
        id?: string | null | undefined
        caption?: string | null | undefined
        createdAt?: any | null | undefined
        translatable?: boolean | null | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
        permissions?:
          | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
          | null
          | undefined
        files?:
          | {
              __typename?: 'FileConnection'
              edges?:
                | Array<
                    | {
                        __typename?: 'FileEdge'
                        node: {
                          __typename?: 'File'
                          id?: string | null | undefined
                          type?: FileType | null | undefined
                          uri: string
                        }
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined
            }
          | null
          | undefined
        project?:
          | {
              __typename?: 'Project'
              id?: string | null | undefined
              title?: string | null | undefined
              slug?: string | null | undefined
              dynamicLink?: string | null | undefined
              user?:
                | {
                    __typename?: 'User'
                    id: string
                    fullName?: string | null | undefined
                    firstName?: string | null | undefined
                    lastName?: string | null | undefined
                    username?: any | null | undefined
                    avatarUrl?: string | null | undefined
                    isSilhouette?: boolean | null | undefined
                    isOnline?: boolean | null | undefined
                    website?: string | null | undefined
                    location?: string | null | undefined
                    bio?: string | null | undefined
                    projectCount?: number | null | undefined
                    dynamicLink?: string | null | undefined
                  }
                | null
                | undefined
              permissions?:
                | {
                    __typename?: 'ProjectPermissions'
                    isOwner?: boolean | null | undefined
                    isFollower?: boolean | null | undefined
                  }
                | null
                | undefined
              type?:
                | { __typename?: 'ProjectType'; title?: string | null | undefined }
                | null
                | undefined
              cover?:
                | { __typename?: 'CoverType'; uri?: string | null | undefined }
                | null
                | undefined
              followers?:
                | {
                    __typename?: 'FollowersConnection'
                    totalCount?: number | null | undefined
                    edges?:
                      | Array<{
                          __typename?: 'FollowersEdge'
                          node: {
                            __typename?: 'User'
                            id: string
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                          }
                        }>
                      | null
                      | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
        likes?:
          | {
              __typename?: 'Likes'
              isLiked?: boolean | null | undefined
              totalCount?: number | null | undefined
            }
          | null
          | undefined
        bookmarks?:
          | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
          | null
          | undefined
        comments?:
          | {
              __typename?: 'CommentConnection'
              totalCount?: number | null | undefined
              edges?:
                | Array<{
                    __typename?: 'CommentEdge'
                    node: {
                      __typename?: 'Comment'
                      id?: string | null | undefined
                      text: string
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      permissions?:
                        | {
                            __typename?: 'CommentPermissions'
                            isOwner?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        likesConnection?:
          | {
              __typename?: 'LikeConnection'
              edges?:
                | Array<{
                    __typename?: 'LikeEdge'
                    node: { __typename?: 'User'; id: string; avatarUrl?: string | null | undefined }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        collection?:
          | {
              __typename?: 'Collection'
              id?: string | null | undefined
              name?: string | null | undefined
              slug?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
  project?:
    | {
        __typename?: 'Project'
        id?: string | null | undefined
        title?: string | null | undefined
        slug?: string | null | undefined
        dynamicLink?: string | null | undefined
        posts?:
          | {
              __typename?: 'PostConnection'
              totalCount?: number | null | undefined
              pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
              edges?:
                | Array<{
                    __typename?: 'PostEdge'
                    cursor: string
                    node: {
                      __typename?: 'Post'
                      id?: string | null | undefined
                      caption?: string | null | undefined
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
                        | null
                        | undefined
                      files?:
                        | {
                            __typename?: 'FileConnection'
                            edges?:
                              | Array<
                                  | {
                                      __typename?: 'FileEdge'
                                      node: {
                                        __typename?: 'File'
                                        id?: string | null | undefined
                                        type?: FileType | null | undefined
                                        uri: string
                                      }
                                    }
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      project?:
                        | {
                            __typename?: 'Project'
                            id?: string | null | undefined
                            title?: string | null | undefined
                            slug?: string | null | undefined
                            dynamicLink?: string | null | undefined
                            user?:
                              | {
                                  __typename?: 'User'
                                  id: string
                                  fullName?: string | null | undefined
                                  firstName?: string | null | undefined
                                  lastName?: string | null | undefined
                                  username?: any | null | undefined
                                  avatarUrl?: string | null | undefined
                                  isSilhouette?: boolean | null | undefined
                                  isOnline?: boolean | null | undefined
                                  website?: string | null | undefined
                                  location?: string | null | undefined
                                  bio?: string | null | undefined
                                  projectCount?: number | null | undefined
                                  dynamicLink?: string | null | undefined
                                }
                              | null
                              | undefined
                            permissions?:
                              | {
                                  __typename?: 'ProjectPermissions'
                                  isOwner?: boolean | null | undefined
                                  isFollower?: boolean | null | undefined
                                }
                              | null
                              | undefined
                            type?:
                              | { __typename?: 'ProjectType'; title?: string | null | undefined }
                              | null
                              | undefined
                            cover?:
                              | { __typename?: 'CoverType'; uri?: string | null | undefined }
                              | null
                              | undefined
                            followers?:
                              | {
                                  __typename?: 'FollowersConnection'
                                  totalCount?: number | null | undefined
                                  edges?:
                                    | Array<{
                                        __typename?: 'FollowersEdge'
                                        node: {
                                          __typename?: 'User'
                                          id: string
                                          username?: any | null | undefined
                                          avatarUrl?: string | null | undefined
                                        }
                                      }>
                                    | null
                                    | undefined
                                }
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      bookmarks?:
                        | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
                        | null
                        | undefined
                      comments?:
                        | {
                            __typename?: 'CommentConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'CommentEdge'
                                  node: {
                                    __typename?: 'Comment'
                                    id?: string | null | undefined
                                    text: string
                                    createdAt?: any | null | undefined
                                    translatable?: boolean | null | undefined
                                    permissions?:
                                      | {
                                          __typename?: 'CommentPermissions'
                                          isOwner?: boolean | null | undefined
                                        }
                                      | null
                                      | undefined
                                    likes?:
                                      | {
                                          __typename?: 'Likes'
                                          isLiked?: boolean | null | undefined
                                          totalCount?: number | null | undefined
                                        }
                                      | null
                                      | undefined
                                    user?:
                                      | {
                                          __typename?: 'User'
                                          id: string
                                          fullName?: string | null | undefined
                                          firstName?: string | null | undefined
                                          lastName?: string | null | undefined
                                          username?: any | null | undefined
                                          avatarUrl?: string | null | undefined
                                          isSilhouette?: boolean | null | undefined
                                          isOnline?: boolean | null | undefined
                                          website?: string | null | undefined
                                          location?: string | null | undefined
                                          bio?: string | null | undefined
                                          projectCount?: number | null | undefined
                                          dynamicLink?: string | null | undefined
                                        }
                                      | null
                                      | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      likesConnection?:
                        | {
                            __typename?: 'LikeConnection'
                            edges?:
                              | Array<{
                                  __typename?: 'LikeEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      collection?:
                        | {
                            __typename?: 'Collection'
                            id?: string | null | undefined
                            name?: string | null | undefined
                            slug?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        user?:
          | {
              __typename?: 'User'
              id: string
              fullName?: string | null | undefined
              firstName?: string | null | undefined
              lastName?: string | null | undefined
              username?: any | null | undefined
              avatarUrl?: string | null | undefined
              isSilhouette?: boolean | null | undefined
              isOnline?: boolean | null | undefined
              website?: string | null | undefined
              location?: string | null | undefined
              bio?: string | null | undefined
              projectCount?: number | null | undefined
              dynamicLink?: string | null | undefined
            }
          | null
          | undefined
        permissions?:
          | {
              __typename?: 'ProjectPermissions'
              isOwner?: boolean | null | undefined
              isFollower?: boolean | null | undefined
            }
          | null
          | undefined
        type?: { __typename?: 'ProjectType'; title?: string | null | undefined } | null | undefined
        cover?: { __typename?: 'CoverType'; uri?: string | null | undefined } | null | undefined
        followers?:
          | {
              __typename?: 'FollowersConnection'
              totalCount?: number | null | undefined
              edges?:
                | Array<{
                    __typename?: 'FollowersEdge'
                    node: {
                      __typename?: 'User'
                      id: string
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type ProjectCollectionsQueryVariables = Exact<{
  projectId?: InputMaybe<Scalars['ID']>
  projectSlug?: InputMaybe<Scalars['LowercaseString']>
  slug?: InputMaybe<Scalars['LowercaseString']>
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type ProjectCollectionsQuery = {
  __typename?: 'Query'
  projectCollections?:
    | {
        __typename?: 'CollectionConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'CollectionEdge'
              cursor: string
              node: {
                __typename?: 'Collection'
                id?: string | null | undefined
                name?: string | null | undefined
                slug?: string | null | undefined
                cover?:
                  | { __typename?: 'CoverType'; uri?: string | null | undefined }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type ProjectSuggestionsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type ProjectSuggestionsQuery = {
  __typename?: 'Query'
  projects?:
    | Array<
        | {
            __typename?: 'ProjectSuggestionsConnection'
            type?:
              | {
                  __typename?: 'ProjectType'
                  id?: string | null | undefined
                  title?: string | null | undefined
                }
              | null
              | undefined
            pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
            edges?:
              | Array<{
                  __typename?: 'ProjectEdge'
                  node: {
                    __typename?: 'Project'
                    id?: string | null | undefined
                    title?: string | null | undefined
                    slug?: string | null | undefined
                    dynamicLink?: string | null | undefined
                    cover?:
                      | {
                          __typename?: 'CoverType'
                          uri?: string | null | undefined
                          default?: boolean | null | undefined
                        }
                      | null
                      | undefined
                    user?:
                      | {
                          __typename?: 'User'
                          id: string
                          fullName?: string | null | undefined
                          firstName?: string | null | undefined
                          lastName?: string | null | undefined
                          username?: any | null | undefined
                          avatarUrl?: string | null | undefined
                          isSilhouette?: boolean | null | undefined
                          isOnline?: boolean | null | undefined
                          website?: string | null | undefined
                          location?: string | null | undefined
                          bio?: string | null | undefined
                          projectCount?: number | null | undefined
                          dynamicLink?: string | null | undefined
                        }
                      | null
                      | undefined
                    permissions?:
                      | {
                          __typename?: 'ProjectPermissions'
                          isOwner?: boolean | null | undefined
                          isFollower?: boolean | null | undefined
                        }
                      | null
                      | undefined
                    type?:
                      | { __typename?: 'ProjectType'; title?: string | null | undefined }
                      | null
                      | undefined
                    followers?:
                      | {
                          __typename?: 'FollowersConnection'
                          totalCount?: number | null | undefined
                          edges?:
                            | Array<{
                                __typename?: 'FollowersEdge'
                                node: {
                                  __typename?: 'User'
                                  id: string
                                  username?: any | null | undefined
                                  avatarUrl?: string | null | undefined
                                }
                              }>
                            | null
                            | undefined
                        }
                      | null
                      | undefined
                  }
                }>
              | null
              | undefined
          }
        | null
        | undefined
      >
    | null
    | undefined
}

export type ProjectTypesQueryVariables = Exact<{ [key: string]: never }>

export type ProjectTypesQuery = {
  __typename?: 'Query'
  types?:
    | Array<
        | {
            __typename?: 'ProjectType'
            id?: string | null | undefined
            title?: string | null | undefined
            imageUrl: string
          }
        | null
        | undefined
      >
    | null
    | undefined
}

export type ProjectsQueryVariables = Exact<{
  typeId?: InputMaybe<Scalars['ID']>
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  type: ProjectSortType
}>

export type ProjectsQuery = {
  __typename?: 'Query'
  projects?:
    | {
        __typename?: 'ProjectsConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'ProjectEdge'
              cursor: string
              node: {
                __typename?: 'Project'
                id?: string | null | undefined
                title?: string | null | undefined
                slug?: string | null | undefined
                dynamicLink?: string | null | undefined
                cover?:
                  | {
                      __typename?: 'CoverType'
                      uri?: string | null | undefined
                      default?: boolean | null | undefined
                    }
                  | null
                  | undefined
                user?:
                  | {
                      __typename?: 'User'
                      id: string
                      fullName?: string | null | undefined
                      firstName?: string | null | undefined
                      lastName?: string | null | undefined
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                      isSilhouette?: boolean | null | undefined
                      isOnline?: boolean | null | undefined
                      website?: string | null | undefined
                      location?: string | null | undefined
                      bio?: string | null | undefined
                      projectCount?: number | null | undefined
                      dynamicLink?: string | null | undefined
                    }
                  | null
                  | undefined
                permissions?:
                  | {
                      __typename?: 'ProjectPermissions'
                      isOwner?: boolean | null | undefined
                      isFollower?: boolean | null | undefined
                    }
                  | null
                  | undefined
                type?:
                  | { __typename?: 'ProjectType'; title?: string | null | undefined }
                  | null
                  | undefined
                followers?:
                  | {
                      __typename?: 'FollowersConnection'
                      totalCount?: number | null | undefined
                      edges?:
                        | Array<{
                            __typename?: 'FollowersEdge'
                            node: {
                              __typename?: 'User'
                              id: string
                              username?: any | null | undefined
                              avatarUrl?: string | null | undefined
                            }
                          }>
                        | null
                        | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type RecentCommentsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
}>

export type RecentCommentsQuery = {
  __typename?: 'Query'
  comments?:
    | {
        __typename?: 'CommentConnection'
        pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
        edges?:
          | Array<{
              __typename?: 'CommentEdge'
              cursor: string
              node: {
                __typename?: 'Comment'
                id?: string | null | undefined
                text: string
                createdAt?: any | null | undefined
                translatable?: boolean | null | undefined
                replies?:
                  | {
                      __typename?: 'CommentConnection'
                      totalCount?: number | null | undefined
                      pageInfo: {
                        __typename?: 'PageInfo'
                        hasNextPage?: boolean | null | undefined
                      }
                      edges?:
                        | Array<{
                            __typename?: 'CommentEdge'
                            cursor: string
                            node: {
                              __typename?: 'Comment'
                              id?: string | null | undefined
                              text: string
                              createdAt?: any | null | undefined
                              translatable?: boolean | null | undefined
                              permissions?:
                                | {
                                    __typename?: 'CommentPermissions'
                                    isOwner?: boolean | null | undefined
                                  }
                                | null
                                | undefined
                              likes?:
                                | {
                                    __typename?: 'Likes'
                                    isLiked?: boolean | null | undefined
                                    totalCount?: number | null | undefined
                                  }
                                | null
                                | undefined
                              user?:
                                | {
                                    __typename?: 'User'
                                    id: string
                                    fullName?: string | null | undefined
                                    firstName?: string | null | undefined
                                    lastName?: string | null | undefined
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                    isSilhouette?: boolean | null | undefined
                                    isOnline?: boolean | null | undefined
                                    website?: string | null | undefined
                                    location?: string | null | undefined
                                    bio?: string | null | undefined
                                    projectCount?: number | null | undefined
                                    dynamicLink?: string | null | undefined
                                  }
                                | null
                                | undefined
                            }
                          }>
                        | null
                        | undefined
                    }
                  | null
                  | undefined
                permissions?:
                  | { __typename?: 'CommentPermissions'; isOwner?: boolean | null | undefined }
                  | null
                  | undefined
                likes?:
                  | {
                      __typename?: 'Likes'
                      isLiked?: boolean | null | undefined
                      totalCount?: number | null | undefined
                    }
                  | null
                  | undefined
                user?:
                  | {
                      __typename?: 'User'
                      id: string
                      fullName?: string | null | undefined
                      firstName?: string | null | undefined
                      lastName?: string | null | undefined
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                      isSilhouette?: boolean | null | undefined
                      isOnline?: boolean | null | undefined
                      website?: string | null | undefined
                      location?: string | null | undefined
                      bio?: string | null | undefined
                      projectCount?: number | null | undefined
                      dynamicLink?: string | null | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type RepliesQueryVariables = Exact<{
  id: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type RepliesQuery = {
  __typename?: 'Query'
  comment?:
    | {
        __typename?: 'Comment'
        replies?:
          | {
              __typename?: 'CommentConnection'
              totalCount?: number | null | undefined
              pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
              edges?:
                | Array<{
                    __typename?: 'CommentEdge'
                    cursor: string
                    node: {
                      __typename?: 'Comment'
                      id?: string | null | undefined
                      text: string
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      permissions?:
                        | {
                            __typename?: 'CommentPermissions'
                            isOwner?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type SearchHashtagsQueryVariables = Exact<{
  query: Scalars['String']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type SearchHashtagsQuery = {
  __typename?: 'Query'
  hashtags?:
    | {
        __typename?: 'SearchResults'
        pageInfo?:
          | { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
          | null
          | undefined
        edges?:
          | Array<
              | {
                  __typename?: 'SearchResultEdge'
                  cursor?: string | null | undefined
                  node?:
                    | {
                        __typename?: 'Hashtag'
                        id?: string | null | undefined
                        name?: string | null | undefined
                        slug?: any | null | undefined
                        totalCount?: number | null | undefined
                      }
                    | { __typename?: 'Model' }
                    | { __typename?: 'Project' }
                    | { __typename?: 'User' }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
}

export type SearchModelsQueryVariables = Exact<{
  query: Scalars['String']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type SearchModelsQuery = {
  __typename?: 'Query'
  models?:
    | {
        __typename?: 'SearchResults'
        pageInfo?:
          | { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
          | null
          | undefined
        edges?:
          | Array<
              | {
                  __typename?: 'SearchResultEdge'
                  cursor?: string | null | undefined
                  node?:
                    | { __typename?: 'Hashtag' }
                    | {
                        __typename?: 'Model'
                        id: string
                        model?: string | null | undefined
                        year?: number | null | undefined
                        brand?:
                          | { __typename?: 'Brand'; name?: string | null | undefined }
                          | null
                          | undefined
                      }
                    | { __typename?: 'Project' }
                    | { __typename?: 'User' }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
}

export type SearchProjectsQueryVariables = Exact<{
  query: Scalars['String']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type SearchProjectsQuery = {
  __typename?: 'Query'
  projects?:
    | {
        __typename?: 'SearchResults'
        pageInfo?:
          | { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
          | null
          | undefined
        edges?:
          | Array<
              | {
                  __typename?: 'SearchResultEdge'
                  cursor?: string | null | undefined
                  node?:
                    | { __typename?: 'Hashtag' }
                    | { __typename?: 'Model' }
                    | {
                        __typename?: 'Project'
                        id?: string | null | undefined
                        title?: string | null | undefined
                        slug?: string | null | undefined
                        dynamicLink?: string | null | undefined
                        cover?:
                          | {
                              __typename?: 'CoverType'
                              uri?: string | null | undefined
                              default?: boolean | null | undefined
                            }
                          | null
                          | undefined
                        user?:
                          | {
                              __typename?: 'User'
                              id: string
                              fullName?: string | null | undefined
                              firstName?: string | null | undefined
                              lastName?: string | null | undefined
                              username?: any | null | undefined
                              avatarUrl?: string | null | undefined
                              isSilhouette?: boolean | null | undefined
                              isOnline?: boolean | null | undefined
                              website?: string | null | undefined
                              location?: string | null | undefined
                              bio?: string | null | undefined
                              projectCount?: number | null | undefined
                              dynamicLink?: string | null | undefined
                            }
                          | null
                          | undefined
                        permissions?:
                          | {
                              __typename?: 'ProjectPermissions'
                              isOwner?: boolean | null | undefined
                              isFollower?: boolean | null | undefined
                            }
                          | null
                          | undefined
                        type?:
                          | { __typename?: 'ProjectType'; title?: string | null | undefined }
                          | null
                          | undefined
                        followers?:
                          | {
                              __typename?: 'FollowersConnection'
                              totalCount?: number | null | undefined
                              edges?:
                                | Array<{
                                    __typename?: 'FollowersEdge'
                                    node: {
                                      __typename?: 'User'
                                      id: string
                                      username?: any | null | undefined
                                      avatarUrl?: string | null | undefined
                                    }
                                  }>
                                | null
                                | undefined
                            }
                          | null
                          | undefined
                      }
                    | { __typename?: 'User' }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
}

export type SearchUsersQueryVariables = Exact<{
  query: Scalars['String']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type SearchUsersQuery = {
  __typename?: 'Query'
  users?:
    | {
        __typename?: 'SearchResults'
        pageInfo?:
          | { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
          | null
          | undefined
        edges?:
          | Array<
              | {
                  __typename?: 'SearchResultEdge'
                  cursor?: string | null | undefined
                  node?:
                    | { __typename?: 'Hashtag' }
                    | { __typename?: 'Model' }
                    | { __typename?: 'Project' }
                    | {
                        __typename?: 'User'
                        projectCount?: number | null | undefined
                        id: string
                        fullName?: string | null | undefined
                        firstName?: string | null | undefined
                        lastName?: string | null | undefined
                        username?: any | null | undefined
                        avatarUrl?: string | null | undefined
                        isSilhouette?: boolean | null | undefined
                        isOnline?: boolean | null | undefined
                        website?: string | null | undefined
                        location?: string | null | undefined
                        bio?: string | null | undefined
                        dynamicLink?: string | null | undefined
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
}

export type SimilarProjectsQueryVariables = Exact<{
  id: Scalars['ID']
  first?: InputMaybe<Scalars['Int']>
}>

export type SimilarProjectsQuery = {
  __typename?: 'Query'
  similarProjects?:
    | {
        __typename?: 'ProjectsConnection'
        edges?:
          | Array<{
              __typename?: 'ProjectEdge'
              cursor: string
              node: {
                __typename?: 'Project'
                id?: string | null | undefined
                title?: string | null | undefined
                slug?: string | null | undefined
                dynamicLink?: string | null | undefined
                cover?:
                  | { __typename?: 'CoverType'; uri?: string | null | undefined }
                  | null
                  | undefined
                user?:
                  | {
                      __typename?: 'User'
                      id: string
                      fullName?: string | null | undefined
                      firstName?: string | null | undefined
                      lastName?: string | null | undefined
                      username?: any | null | undefined
                      avatarUrl?: string | null | undefined
                      isSilhouette?: boolean | null | undefined
                      isOnline?: boolean | null | undefined
                      website?: string | null | undefined
                      location?: string | null | undefined
                      bio?: string | null | undefined
                      projectCount?: number | null | undefined
                      dynamicLink?: string | null | undefined
                    }
                  | null
                  | undefined
                permissions?:
                  | {
                      __typename?: 'ProjectPermissions'
                      isOwner?: boolean | null | undefined
                      isFollower?: boolean | null | undefined
                    }
                  | null
                  | undefined
                type?:
                  | { __typename?: 'ProjectType'; title?: string | null | undefined }
                  | null
                  | undefined
                followers?:
                  | {
                      __typename?: 'FollowersConnection'
                      totalCount?: number | null | undefined
                      edges?:
                        | Array<{
                            __typename?: 'FollowersEdge'
                            node: {
                              __typename?: 'User'
                              id: string
                              username?: any | null | undefined
                              avatarUrl?: string | null | undefined
                            }
                          }>
                        | null
                        | undefined
                    }
                  | null
                  | undefined
              }
            }>
          | null
          | undefined
      }
    | null
    | undefined
}

export type UnreadNotificationsQueryVariables = Exact<{ [key: string]: never }>

export type UnreadNotificationsQuery = {
  __typename?: 'Query'
  notifications?:
    | { __typename?: 'NotificationsConnection'; unreadCount?: number | null | undefined }
    | null
    | undefined
}

export type UserQueryVariables = Exact<{
  username: Scalars['LowercaseString']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type UserQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        id: string
        fullName?: string | null | undefined
        firstName?: string | null | undefined
        lastName?: string | null | undefined
        username?: any | null | undefined
        avatarUrl?: string | null | undefined
        isSilhouette?: boolean | null | undefined
        isOnline?: boolean | null | undefined
        website?: string | null | undefined
        location?: string | null | undefined
        bio?: string | null | undefined
        projectCount?: number | null | undefined
        dynamicLink?: string | null | undefined
        projects?:
          | {
              __typename?: 'ProjectsConnection'
              edges?:
                | Array<{
                    __typename?: 'ProjectEdge'
                    node: {
                      __typename?: 'Project'
                      id?: string | null | undefined
                      title?: string | null | undefined
                      slug?: string | null | undefined
                      dynamicLink?: string | null | undefined
                      cover?:
                        | {
                            __typename?: 'CoverType'
                            uri?: string | null | undefined
                            default?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | {
                            __typename?: 'ProjectPermissions'
                            isOwner?: boolean | null | undefined
                            isFollower?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      type?:
                        | { __typename?: 'ProjectType'; title?: string | null | undefined }
                        | null
                        | undefined
                      followers?:
                        | {
                            __typename?: 'FollowersConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'FollowersEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
        posts?:
          | {
              __typename?: 'PostConnection'
              edges?:
                | Array<{
                    __typename?: 'PostEdge'
                    cursor: string
                    node: {
                      __typename?: 'Post'
                      id?: string | null | undefined
                      caption?: string | null | undefined
                      createdAt?: any | null | undefined
                      translatable?: boolean | null | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | { __typename?: 'PostPermissions'; isOwner?: boolean | null | undefined }
                        | null
                        | undefined
                      files?:
                        | {
                            __typename?: 'FileConnection'
                            edges?:
                              | Array<
                                  | {
                                      __typename?: 'FileEdge'
                                      node: {
                                        __typename?: 'File'
                                        id?: string | null | undefined
                                        type?: FileType | null | undefined
                                        uri: string
                                      }
                                    }
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      project?:
                        | {
                            __typename?: 'Project'
                            id?: string | null | undefined
                            title?: string | null | undefined
                            slug?: string | null | undefined
                            dynamicLink?: string | null | undefined
                            user?:
                              | {
                                  __typename?: 'User'
                                  id: string
                                  fullName?: string | null | undefined
                                  firstName?: string | null | undefined
                                  lastName?: string | null | undefined
                                  username?: any | null | undefined
                                  avatarUrl?: string | null | undefined
                                  isSilhouette?: boolean | null | undefined
                                  isOnline?: boolean | null | undefined
                                  website?: string | null | undefined
                                  location?: string | null | undefined
                                  bio?: string | null | undefined
                                  projectCount?: number | null | undefined
                                  dynamicLink?: string | null | undefined
                                }
                              | null
                              | undefined
                            permissions?:
                              | {
                                  __typename?: 'ProjectPermissions'
                                  isOwner?: boolean | null | undefined
                                  isFollower?: boolean | null | undefined
                                }
                              | null
                              | undefined
                            type?:
                              | { __typename?: 'ProjectType'; title?: string | null | undefined }
                              | null
                              | undefined
                            cover?:
                              | { __typename?: 'CoverType'; uri?: string | null | undefined }
                              | null
                              | undefined
                            followers?:
                              | {
                                  __typename?: 'FollowersConnection'
                                  totalCount?: number | null | undefined
                                  edges?:
                                    | Array<{
                                        __typename?: 'FollowersEdge'
                                        node: {
                                          __typename?: 'User'
                                          id: string
                                          username?: any | null | undefined
                                          avatarUrl?: string | null | undefined
                                        }
                                      }>
                                    | null
                                    | undefined
                                }
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      likes?:
                        | {
                            __typename?: 'Likes'
                            isLiked?: boolean | null | undefined
                            totalCount?: number | null | undefined
                          }
                        | null
                        | undefined
                      bookmarks?:
                        | { __typename?: 'Bookmarks'; isBookmarked?: boolean | null | undefined }
                        | null
                        | undefined
                      comments?:
                        | {
                            __typename?: 'CommentConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'CommentEdge'
                                  node: {
                                    __typename?: 'Comment'
                                    id?: string | null | undefined
                                    text: string
                                    createdAt?: any | null | undefined
                                    translatable?: boolean | null | undefined
                                    permissions?:
                                      | {
                                          __typename?: 'CommentPermissions'
                                          isOwner?: boolean | null | undefined
                                        }
                                      | null
                                      | undefined
                                    likes?:
                                      | {
                                          __typename?: 'Likes'
                                          isLiked?: boolean | null | undefined
                                          totalCount?: number | null | undefined
                                        }
                                      | null
                                      | undefined
                                    user?:
                                      | {
                                          __typename?: 'User'
                                          id: string
                                          fullName?: string | null | undefined
                                          firstName?: string | null | undefined
                                          lastName?: string | null | undefined
                                          username?: any | null | undefined
                                          avatarUrl?: string | null | undefined
                                          isSilhouette?: boolean | null | undefined
                                          isOnline?: boolean | null | undefined
                                          website?: string | null | undefined
                                          location?: string | null | undefined
                                          bio?: string | null | undefined
                                          projectCount?: number | null | undefined
                                          dynamicLink?: string | null | undefined
                                        }
                                      | null
                                      | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      likesConnection?:
                        | {
                            __typename?: 'LikeConnection'
                            edges?:
                              | Array<{
                                  __typename?: 'LikeEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                      collection?:
                        | {
                            __typename?: 'Collection'
                            id?: string | null | undefined
                            name?: string | null | undefined
                            slug?: string | null | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
              pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type UserFollowingProjectsQueryVariables = Exact<{
  username: Scalars['LowercaseString']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
}>

export type UserFollowingProjectsQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        id: string
        projects?:
          | {
              __typename?: 'ProjectsConnection'
              pageInfo: { __typename?: 'PageInfo'; hasNextPage?: boolean | null | undefined }
              edges?:
                | Array<{
                    __typename?: 'ProjectEdge'
                    cursor: string
                    node: {
                      __typename?: 'Project'
                      id?: string | null | undefined
                      title?: string | null | undefined
                      slug?: string | null | undefined
                      dynamicLink?: string | null | undefined
                      cover?:
                        | {
                            __typename?: 'CoverType'
                            uri?: string | null | undefined
                            default?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      user?:
                        | {
                            __typename?: 'User'
                            id: string
                            fullName?: string | null | undefined
                            firstName?: string | null | undefined
                            lastName?: string | null | undefined
                            username?: any | null | undefined
                            avatarUrl?: string | null | undefined
                            isSilhouette?: boolean | null | undefined
                            isOnline?: boolean | null | undefined
                            website?: string | null | undefined
                            location?: string | null | undefined
                            bio?: string | null | undefined
                            projectCount?: number | null | undefined
                            dynamicLink?: string | null | undefined
                          }
                        | null
                        | undefined
                      permissions?:
                        | {
                            __typename?: 'ProjectPermissions'
                            isOwner?: boolean | null | undefined
                            isFollower?: boolean | null | undefined
                          }
                        | null
                        | undefined
                      type?:
                        | { __typename?: 'ProjectType'; title?: string | null | undefined }
                        | null
                        | undefined
                      followers?:
                        | {
                            __typename?: 'FollowersConnection'
                            totalCount?: number | null | undefined
                            edges?:
                              | Array<{
                                  __typename?: 'FollowersEdge'
                                  node: {
                                    __typename?: 'User'
                                    id: string
                                    username?: any | null | undefined
                                    avatarUrl?: string | null | undefined
                                  }
                                }>
                              | null
                              | undefined
                          }
                        | null
                        | undefined
                    }
                  }>
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

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
    dynamicLink
  }
`
export const BlogPostFragmentDoc = gql`
  fragment BlogPost on BlogPost {
    id
    title
    slug
    content
    createdAt
    user {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export const CollectionFragmentDoc = gql`
  fragment Collection on Collection {
    id
    name
    slug
    cover {
      uri
    }
  }
`
export const CommentFragmentDoc = gql`
  fragment Comment on Comment {
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
    translatable
    user {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export const CommentAndRepliesFragmentDoc = gql`
  fragment CommentAndReplies on Comment {
    ...Comment
    replies: repliesConnection(first: 1) {
      pageInfo {
        hasNextPage
      }
      totalCount
      edges {
        cursor
        node {
          ...Comment
        }
      }
    }
  }
  ${CommentFragmentDoc}
`
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
    type {
      title
    }
    cover {
      uri
    }
    followers: followersConnection(first: 3) {
      totalCount
      edges {
        node {
          id
          username
          avatarUrl
        }
      }
    }
  }
  ${UserFragmentDoc}
`
export const NotificationFragmentDoc = gql`
  fragment Notification on Notification {
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
    files: filesConnection(first: 1) {
      edges {
        node {
          id
          uri
        }
      }
    }
  }
  ${UserFragmentDoc}
  ${ProjectFragmentDoc}
`
export const PostFragmentDoc = gql`
  fragment Post on Post {
    id
    caption
    createdAt
    translatable
    user {
      ...User
    }
    permissions {
      isOwner
    }
    files: filesConnection {
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
    bookmarks {
      isBookmarked
    }
    comments: commentsConnection(first: 2) @connection(key: "comments") {
      totalCount
      edges {
        node {
          ...Comment
        }
      }
    }
    likesConnection(first: 3) @connection(key: "likes") {
      edges {
        node {
          id
          avatarUrl
        }
      }
    }
    collection {
      id
      name
      slug
    }
  }
  ${UserFragmentDoc}
  ${ProjectFragmentDoc}
  ${CommentFragmentDoc}
`
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
          files: filesConnection(first: 1) {
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
`
export const UserSettingsFragmentDoc = gql`
  fragment UserSettings on User {
    id
    role
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
`
export const AddBlogPostDocument = gql`
  mutation addBlogPost($id: ID, $input: BlogPostInput!) {
    addBlogPost(id: $id, input: $input) {
      ...BlogPost
    }
  }
  ${BlogPostFragmentDoc}
`
export type AddBlogPostMutationFn = Apollo.MutationFunction<
  AddBlogPostMutation,
  AddBlogPostMutationVariables
>

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
export function useAddBlogPostMutation(
  baseOptions?: Apollo.MutationHookOptions<AddBlogPostMutation, AddBlogPostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddBlogPostMutation, AddBlogPostMutationVariables>(
    AddBlogPostDocument,
    options
  )
}
export type AddBlogPostMutationHookResult = ReturnType<typeof useAddBlogPostMutation>
export type AddBlogPostMutationResult = Apollo.MutationResult<AddBlogPostMutation>
export type AddBlogPostMutationOptions = Apollo.BaseMutationOptions<
  AddBlogPostMutation,
  AddBlogPostMutationVariables
>
export const AddCollectionDocument = gql`
  mutation addCollection($projectId: ID!, $name: String!) {
    addCollection(projectId: $projectId, name: $name) {
      ...Collection
    }
  }
  ${CollectionFragmentDoc}
`
export type AddCollectionMutationFn = Apollo.MutationFunction<
  AddCollectionMutation,
  AddCollectionMutationVariables
>

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
export function useAddCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<AddCollectionMutation, AddCollectionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddCollectionMutation, AddCollectionMutationVariables>(
    AddCollectionDocument,
    options
  )
}
export type AddCollectionMutationHookResult = ReturnType<typeof useAddCollectionMutation>
export type AddCollectionMutationResult = Apollo.MutationResult<AddCollectionMutation>
export type AddCollectionMutationOptions = Apollo.BaseMutationOptions<
  AddCollectionMutation,
  AddCollectionMutationVariables
>
export const AddCommentDocument = gql`
  mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {
    addComment(postId: $postId, commentId: $commentId, input: $input) {
      ...CommentAndReplies
    }
  }
  ${CommentAndRepliesFragmentDoc}
`
export type AddCommentMutationFn = Apollo.MutationFunction<
  AddCommentMutation,
  AddCommentMutationVariables
>

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
export function useAddCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(
    AddCommentDocument,
    options
  )
}
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<
  AddCommentMutation,
  AddCommentMutationVariables
>
export const AddPostDocument = gql`
  mutation addPost($input: PostInput!) {
    addPost(input: $input) {
      ...Post
    }
  }
  ${PostFragmentDoc}
`
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>

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
export function useAddPostMutation(
  baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options)
}
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>
export type AddPostMutationOptions = Apollo.BaseMutationOptions<
  AddPostMutation,
  AddPostMutationVariables
>
export const AddProjectDocument = gql`
  mutation addProject($input: ProjectInput!) {
    addProject(input: $input) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`
export type AddProjectMutationFn = Apollo.MutationFunction<
  AddProjectMutation,
  AddProjectMutationVariables
>

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
export function useAddProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(
    AddProjectDocument,
    options
  )
}
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>
export type AddProjectMutationResult = Apollo.MutationResult<AddProjectMutation>
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<
  AddProjectMutation,
  AddProjectMutationVariables
>
export const AuthenticateAppleDocument = gql`
  mutation authenticateApple($identityToken: String!, $user: ApplePayload!) {
    authenticateApple(identityToken: $identityToken, user: $user) {
      access_token
      refresh_token
    }
  }
`
export type AuthenticateAppleMutationFn = Apollo.MutationFunction<
  AuthenticateAppleMutation,
  AuthenticateAppleMutationVariables
>

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
export function useAuthenticateAppleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthenticateAppleMutation,
    AuthenticateAppleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>(
    AuthenticateAppleDocument,
    options
  )
}
export type AuthenticateAppleMutationHookResult = ReturnType<typeof useAuthenticateAppleMutation>
export type AuthenticateAppleMutationResult = Apollo.MutationResult<AuthenticateAppleMutation>
export type AuthenticateAppleMutationOptions = Apollo.BaseMutationOptions<
  AuthenticateAppleMutation,
  AuthenticateAppleMutationVariables
>
export const AuthenticateFacebookDocument = gql`
  mutation authenticateFacebook($token: String!) {
    authenticateFacebook(token: $token) {
      access_token
      refresh_token
    }
  }
`
export type AuthenticateFacebookMutationFn = Apollo.MutationFunction<
  AuthenticateFacebookMutation,
  AuthenticateFacebookMutationVariables
>

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
export function useAuthenticateFacebookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthenticateFacebookMutation,
    AuthenticateFacebookMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>(
    AuthenticateFacebookDocument,
    options
  )
}
export type AuthenticateFacebookMutationHookResult = ReturnType<
  typeof useAuthenticateFacebookMutation
>
export type AuthenticateFacebookMutationResult = Apollo.MutationResult<AuthenticateFacebookMutation>
export type AuthenticateFacebookMutationOptions = Apollo.BaseMutationOptions<
  AuthenticateFacebookMutation,
  AuthenticateFacebookMutationVariables
>
export const AuthenticateGoogleDocument = gql`
  mutation authenticateGoogle($idToken: String!) {
    authenticateGoogle(idToken: $idToken) {
      access_token
      refresh_token
    }
  }
`
export type AuthenticateGoogleMutationFn = Apollo.MutationFunction<
  AuthenticateGoogleMutation,
  AuthenticateGoogleMutationVariables
>

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
export function useAuthenticateGoogleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthenticateGoogleMutation,
    AuthenticateGoogleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>(
    AuthenticateGoogleDocument,
    options
  )
}
export type AuthenticateGoogleMutationHookResult = ReturnType<typeof useAuthenticateGoogleMutation>
export type AuthenticateGoogleMutationResult = Apollo.MutationResult<AuthenticateGoogleMutation>
export type AuthenticateGoogleMutationOptions = Apollo.BaseMutationOptions<
  AuthenticateGoogleMutation,
  AuthenticateGoogleMutationVariables
>
export const BanUserDocument = gql`
  mutation banUser($id: ID!) {
    banUser(id: $id) {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export type BanUserMutationFn = Apollo.MutationFunction<BanUserMutation, BanUserMutationVariables>

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
export function useBanUserMutation(
  baseOptions?: Apollo.MutationHookOptions<BanUserMutation, BanUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument, options)
}
export type BanUserMutationHookResult = ReturnType<typeof useBanUserMutation>
export type BanUserMutationResult = Apollo.MutationResult<BanUserMutation>
export type BanUserMutationOptions = Apollo.BaseMutationOptions<
  BanUserMutation,
  BanUserMutationVariables
>
export const BookmarkPostDocument = gql`
  mutation bookmarkPost($id: ID!) {
    bookmarkPost(id: $id) {
      id
      bookmarks {
        isBookmarked
      }
    }
  }
`
export type BookmarkPostMutationFn = Apollo.MutationFunction<
  BookmarkPostMutation,
  BookmarkPostMutationVariables
>

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
export function useBookmarkPostMutation(
  baseOptions?: Apollo.MutationHookOptions<BookmarkPostMutation, BookmarkPostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<BookmarkPostMutation, BookmarkPostMutationVariables>(
    BookmarkPostDocument,
    options
  )
}
export type BookmarkPostMutationHookResult = ReturnType<typeof useBookmarkPostMutation>
export type BookmarkPostMutationResult = Apollo.MutationResult<BookmarkPostMutation>
export type BookmarkPostMutationOptions = Apollo.BaseMutationOptions<
  BookmarkPostMutation,
  BookmarkPostMutationVariables
>
export const CollectPostsDocument = gql`
  mutation collectPosts($projectId: ID!, $collectionId: ID!, $input: [CollectionInput]) {
    collectPosts(projectId: $projectId, collectionId: $collectionId, input: $input) {
      id
      name
      cover {
        uri
      }
    }
  }
`
export type CollectPostsMutationFn = Apollo.MutationFunction<
  CollectPostsMutation,
  CollectPostsMutationVariables
>

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
export function useCollectPostsMutation(
  baseOptions?: Apollo.MutationHookOptions<CollectPostsMutation, CollectPostsMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CollectPostsMutation, CollectPostsMutationVariables>(
    CollectPostsDocument,
    options
  )
}
export type CollectPostsMutationHookResult = ReturnType<typeof useCollectPostsMutation>
export type CollectPostsMutationResult = Apollo.MutationResult<CollectPostsMutation>
export type CollectPostsMutationOptions = Apollo.BaseMutationOptions<
  CollectPostsMutation,
  CollectPostsMutationVariables
>
export const DeleteBlogPostDocument = gql`
  mutation deleteBlogPost($id: ID!) {
    deleteBlogPost(id: $id) {
      id
    }
  }
`
export type DeleteBlogPostMutationFn = Apollo.MutationFunction<
  DeleteBlogPostMutation,
  DeleteBlogPostMutationVariables
>

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
export function useDeleteBlogPostMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteBlogPostMutation, DeleteBlogPostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteBlogPostMutation, DeleteBlogPostMutationVariables>(
    DeleteBlogPostDocument,
    options
  )
}
export type DeleteBlogPostMutationHookResult = ReturnType<typeof useDeleteBlogPostMutation>
export type DeleteBlogPostMutationResult = Apollo.MutationResult<DeleteBlogPostMutation>
export type DeleteBlogPostMutationOptions = Apollo.BaseMutationOptions<
  DeleteBlogPostMutation,
  DeleteBlogPostMutationVariables
>
export const DeleteCollectionDocument = gql`
  mutation deleteCollection($projectId: ID!, $id: ID!) {
    deleteCollection(id: $id, projectId: $projectId) {
      id
    }
  }
`
export type DeleteCollectionMutationFn = Apollo.MutationFunction<
  DeleteCollectionMutation,
  DeleteCollectionMutationVariables
>

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
export function useDeleteCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCollectionMutation,
    DeleteCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteCollectionMutation, DeleteCollectionMutationVariables>(
    DeleteCollectionDocument,
    options
  )
}
export type DeleteCollectionMutationHookResult = ReturnType<typeof useDeleteCollectionMutation>
export type DeleteCollectionMutationResult = Apollo.MutationResult<DeleteCollectionMutation>
export type DeleteCollectionMutationOptions = Apollo.BaseMutationOptions<
  DeleteCollectionMutation,
  DeleteCollectionMutationVariables
>
export const DeleteCommentDocument = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>

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
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
    DeleteCommentDocument,
    options
  )
}
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>
export const DeleteCurrentUserDocument = gql`
  mutation deleteCurrentUser {
    deleteCurrentUser
  }
`
export type DeleteCurrentUserMutationFn = Apollo.MutationFunction<
  DeleteCurrentUserMutation,
  DeleteCurrentUserMutationVariables
>

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
export function useDeleteCurrentUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCurrentUserMutation,
    DeleteCurrentUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>(
    DeleteCurrentUserDocument,
    options
  )
}
export type DeleteCurrentUserMutationHookResult = ReturnType<typeof useDeleteCurrentUserMutation>
export type DeleteCurrentUserMutationResult = Apollo.MutationResult<DeleteCurrentUserMutation>
export type DeleteCurrentUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteCurrentUserMutation,
  DeleteCurrentUserMutationVariables
>
export const DeleteNotificationDocument = gql`
  mutation deleteNotification($id: ID!) {
    deleteNotification(id: $id)
  }
`
export type DeleteNotificationMutationFn = Apollo.MutationFunction<
  DeleteNotificationMutation,
  DeleteNotificationMutationVariables
>

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
export function useDeleteNotificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteNotificationMutation,
    DeleteNotificationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(
    DeleteNotificationDocument,
    options
  )
}
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<
  DeleteNotificationMutation,
  DeleteNotificationMutationVariables
>
export const DeletePostDocument = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`
export type DeletePostMutationFn = Apollo.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>

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
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    options
  )
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>
export const DeleteProjectDocument = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`
export type DeleteProjectMutationFn = Apollo.MutationFunction<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>

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
export function useDeleteProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(
    DeleteProjectDocument,
    options
  )
}
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>
export const DeleteUserDocument = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>

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
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  )
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>
export const EditCollectionDocument = gql`
  mutation editCollection($input: EditCollectionInput!, $id: ID!) {
    editCollection(input: $input, id: $id) {
      ...Collection
    }
  }
  ${CollectionFragmentDoc}
`
export type EditCollectionMutationFn = Apollo.MutationFunction<
  EditCollectionMutation,
  EditCollectionMutationVariables
>

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
export function useEditCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<EditCollectionMutation, EditCollectionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<EditCollectionMutation, EditCollectionMutationVariables>(
    EditCollectionDocument,
    options
  )
}
export type EditCollectionMutationHookResult = ReturnType<typeof useEditCollectionMutation>
export type EditCollectionMutationResult = Apollo.MutationResult<EditCollectionMutation>
export type EditCollectionMutationOptions = Apollo.BaseMutationOptions<
  EditCollectionMutation,
  EditCollectionMutationVariables
>
export const EditPostDocument = gql`
  mutation editPost($id: ID!, $input: EditPostInput!) {
    editPost(id: $id, input: $input) {
      ...Post
    }
  }
  ${PostFragmentDoc}
`
export type EditPostMutationFn = Apollo.MutationFunction<
  EditPostMutation,
  EditPostMutationVariables
>

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
export function useEditPostMutation(
  baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options)
}
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>
export type EditPostMutationOptions = Apollo.BaseMutationOptions<
  EditPostMutation,
  EditPostMutationVariables
>
export const EditProjectDocument = gql`
  mutation editProject($id: ID!, $input: ProjectInput!) {
    editProject(id: $id, input: $input) {
      id
      title
    }
  }
`
export type EditProjectMutationFn = Apollo.MutationFunction<
  EditProjectMutation,
  EditProjectMutationVariables
>

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
export function useEditProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<EditProjectMutation, EditProjectMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<EditProjectMutation, EditProjectMutationVariables>(
    EditProjectDocument,
    options
  )
}
export type EditProjectMutationHookResult = ReturnType<typeof useEditProjectMutation>
export type EditProjectMutationResult = Apollo.MutationResult<EditProjectMutation>
export type EditProjectMutationOptions = Apollo.BaseMutationOptions<
  EditProjectMutation,
  EditProjectMutationVariables
>
export const EditUserDocument = gql`
  mutation editUser($input: EditUserInput!, $id: ID) {
    editUser(input: $input, id: $id) {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export type EditUserMutationFn = Apollo.MutationFunction<
  EditUserMutation,
  EditUserMutationVariables
>

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
export function useEditUserMutation(
  baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options)
}
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>
export type EditUserMutationOptions = Apollo.BaseMutationOptions<
  EditUserMutation,
  EditUserMutationVariables
>
export const FollowProjectDocument = gql`
  mutation followProject($id: ID!) {
    followProject(id: $id) {
      cover {
        uri
        default
      }
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`
export type FollowProjectMutationFn = Apollo.MutationFunction<
  FollowProjectMutation,
  FollowProjectMutationVariables
>

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
export function useFollowProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<FollowProjectMutation, FollowProjectMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<FollowProjectMutation, FollowProjectMutationVariables>(
    FollowProjectDocument,
    options
  )
}
export type FollowProjectMutationHookResult = ReturnType<typeof useFollowProjectMutation>
export type FollowProjectMutationResult = Apollo.MutationResult<FollowProjectMutation>
export type FollowProjectMutationOptions = Apollo.BaseMutationOptions<
  FollowProjectMutation,
  FollowProjectMutationVariables
>
export const LikeCommentDocument = gql`
  mutation likeComment($id: ID!) {
    likeComment(id: $id) {
      id
      likes {
        isLiked
        totalCount
      }
    }
  }
`
export type LikeCommentMutationFn = Apollo.MutationFunction<
  LikeCommentMutation,
  LikeCommentMutationVariables
>

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
export function useLikeCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<LikeCommentMutation, LikeCommentMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LikeCommentMutation, LikeCommentMutationVariables>(
    LikeCommentDocument,
    options
  )
}
export type LikeCommentMutationHookResult = ReturnType<typeof useLikeCommentMutation>
export type LikeCommentMutationResult = Apollo.MutationResult<LikeCommentMutation>
export type LikeCommentMutationOptions = Apollo.BaseMutationOptions<
  LikeCommentMutation,
  LikeCommentMutationVariables
>
export const LikePostDocument = gql`
  mutation likePost($id: ID!) {
    likePost(id: $id) {
      id
      likes {
        isLiked
        totalCount
      }
    }
  }
`
export type LikePostMutationFn = Apollo.MutationFunction<
  LikePostMutation,
  LikePostMutationVariables
>

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
export function useLikePostMutation(
  baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options)
}
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>
export type LikePostMutationOptions = Apollo.BaseMutationOptions<
  LikePostMutation,
  LikePostMutationVariables
>
export const MarkAllNotificationsSeenDocument = gql`
  mutation markAllNotificationsSeen {
    markAllNotificationsSeen
  }
`
export type MarkAllNotificationsSeenMutationFn = Apollo.MutationFunction<
  MarkAllNotificationsSeenMutation,
  MarkAllNotificationsSeenMutationVariables
>

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
export function useMarkAllNotificationsSeenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkAllNotificationsSeenMutation,
    MarkAllNotificationsSeenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    MarkAllNotificationsSeenMutation,
    MarkAllNotificationsSeenMutationVariables
  >(MarkAllNotificationsSeenDocument, options)
}
export type MarkAllNotificationsSeenMutationHookResult = ReturnType<
  typeof useMarkAllNotificationsSeenMutation
>
export type MarkAllNotificationsSeenMutationResult =
  Apollo.MutationResult<MarkAllNotificationsSeenMutation>
export type MarkAllNotificationsSeenMutationOptions = Apollo.BaseMutationOptions<
  MarkAllNotificationsSeenMutation,
  MarkAllNotificationsSeenMutationVariables
>
export const MarkNotificationSeenDocument = gql`
  mutation markNotificationSeen($id: ID!) {
    markNotificationSeen(id: $id) {
      ...Notification
    }
  }
  ${NotificationFragmentDoc}
`
export type MarkNotificationSeenMutationFn = Apollo.MutationFunction<
  MarkNotificationSeenMutation,
  MarkNotificationSeenMutationVariables
>

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
export function useMarkNotificationSeenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkNotificationSeenMutation,
    MarkNotificationSeenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>(
    MarkNotificationSeenDocument,
    options
  )
}
export type MarkNotificationSeenMutationHookResult = ReturnType<
  typeof useMarkNotificationSeenMutation
>
export type MarkNotificationSeenMutationResult = Apollo.MutationResult<MarkNotificationSeenMutation>
export type MarkNotificationSeenMutationOptions = Apollo.BaseMutationOptions<
  MarkNotificationSeenMutation,
  MarkNotificationSeenMutationVariables
>
export const PreSignUrlDocument = gql`
  mutation preSignUrl($input: PreSignedUrlInput!) {
    preSignUrl(input: $input) {
      url
      type
      filename
    }
  }
`
export type PreSignUrlMutationFn = Apollo.MutationFunction<
  PreSignUrlMutation,
  PreSignUrlMutationVariables
>

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
export function usePreSignUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<PreSignUrlMutation, PreSignUrlMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<PreSignUrlMutation, PreSignUrlMutationVariables>(
    PreSignUrlDocument,
    options
  )
}
export type PreSignUrlMutationHookResult = ReturnType<typeof usePreSignUrlMutation>
export type PreSignUrlMutationResult = Apollo.MutationResult<PreSignUrlMutation>
export type PreSignUrlMutationOptions = Apollo.BaseMutationOptions<
  PreSignUrlMutation,
  PreSignUrlMutationVariables
>
export const PreSignUrlsDocument = gql`
  mutation preSignUrls($input: [PreSignedUrlnput]!) {
    preSignUrls(input: $input) {
      url
      type
      filename
    }
  }
`
export type PreSignUrlsMutationFn = Apollo.MutationFunction<
  PreSignUrlsMutation,
  PreSignUrlsMutationVariables
>

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
export function usePreSignUrlsMutation(
  baseOptions?: Apollo.MutationHookOptions<PreSignUrlsMutation, PreSignUrlsMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<PreSignUrlsMutation, PreSignUrlsMutationVariables>(
    PreSignUrlsDocument,
    options
  )
}
export type PreSignUrlsMutationHookResult = ReturnType<typeof usePreSignUrlsMutation>
export type PreSignUrlsMutationResult = Apollo.MutationResult<PreSignUrlsMutation>
export type PreSignUrlsMutationOptions = Apollo.BaseMutationOptions<
  PreSignUrlsMutation,
  PreSignUrlsMutationVariables
>
export const RefreshTokenDocument = gql`
  mutation refreshToken($refreshToken: String!) {
    token: refreshToken(refreshToken: $refreshToken) {
      access_token
    }
  }
`
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>

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
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    RefreshTokenDocument,
    options
  )
}
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>
export const RegisterDeviceTokenDocument = gql`
  mutation registerDeviceToken($token: String!, $platform: PlatformType!) {
    registerDeviceToken(token: $token, platform: $platform)
  }
`
export type RegisterDeviceTokenMutationFn = Apollo.MutationFunction<
  RegisterDeviceTokenMutation,
  RegisterDeviceTokenMutationVariables
>

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
export function useRegisterDeviceTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterDeviceTokenMutation,
    RegisterDeviceTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>(
    RegisterDeviceTokenDocument,
    options
  )
}
export type RegisterDeviceTokenMutationHookResult = ReturnType<
  typeof useRegisterDeviceTokenMutation
>
export type RegisterDeviceTokenMutationResult = Apollo.MutationResult<RegisterDeviceTokenMutation>
export type RegisterDeviceTokenMutationOptions = Apollo.BaseMutationOptions<
  RegisterDeviceTokenMutation,
  RegisterDeviceTokenMutationVariables
>
export const SendPromoDocument = gql`
  mutation sendPromo($number: String!) {
    sendPromo(number: $number)
  }
`
export type SendPromoMutationFn = Apollo.MutationFunction<
  SendPromoMutation,
  SendPromoMutationVariables
>

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
export function useSendPromoMutation(
  baseOptions?: Apollo.MutationHookOptions<SendPromoMutation, SendPromoMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SendPromoMutation, SendPromoMutationVariables>(
    SendPromoDocument,
    options
  )
}
export type SendPromoMutationHookResult = ReturnType<typeof useSendPromoMutation>
export type SendPromoMutationResult = Apollo.MutationResult<SendPromoMutation>
export type SendPromoMutationOptions = Apollo.BaseMutationOptions<
  SendPromoMutation,
  SendPromoMutationVariables
>
export const ToggleNotificationSettingsDocument = gql`
  mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {
    toggleNotificationSettings(input: $input) {
      ...UserSettings
    }
  }
  ${UserSettingsFragmentDoc}
`
export type ToggleNotificationSettingsMutationFn = Apollo.MutationFunction<
  ToggleNotificationSettingsMutation,
  ToggleNotificationSettingsMutationVariables
>

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
export function useToggleNotificationSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleNotificationSettingsMutation,
    ToggleNotificationSettingsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ToggleNotificationSettingsMutation,
    ToggleNotificationSettingsMutationVariables
  >(ToggleNotificationSettingsDocument, options)
}
export type ToggleNotificationSettingsMutationHookResult = ReturnType<
  typeof useToggleNotificationSettingsMutation
>
export type ToggleNotificationSettingsMutationResult =
  Apollo.MutationResult<ToggleNotificationSettingsMutation>
export type ToggleNotificationSettingsMutationOptions = Apollo.BaseMutationOptions<
  ToggleNotificationSettingsMutation,
  ToggleNotificationSettingsMutationVariables
>
export const TranslateCommentDocument = gql`
  mutation translateComment($id: ID!, $original: Boolean) {
    translateComment(id: $id, original: $original) {
      id
      translatable
      text
    }
  }
`
export type TranslateCommentMutationFn = Apollo.MutationFunction<
  TranslateCommentMutation,
  TranslateCommentMutationVariables
>

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
export function useTranslateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TranslateCommentMutation,
    TranslateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<TranslateCommentMutation, TranslateCommentMutationVariables>(
    TranslateCommentDocument,
    options
  )
}
export type TranslateCommentMutationHookResult = ReturnType<typeof useTranslateCommentMutation>
export type TranslateCommentMutationResult = Apollo.MutationResult<TranslateCommentMutation>
export type TranslateCommentMutationOptions = Apollo.BaseMutationOptions<
  TranslateCommentMutation,
  TranslateCommentMutationVariables
>
export const TranslatePostDocument = gql`
  mutation translatePost($id: ID!, $original: Boolean) {
    translatePost(id: $id, original: $original) {
      id
      translatable
      caption
    }
  }
`
export type TranslatePostMutationFn = Apollo.MutationFunction<
  TranslatePostMutation,
  TranslatePostMutationVariables
>

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
export function useTranslatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<TranslatePostMutation, TranslatePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<TranslatePostMutation, TranslatePostMutationVariables>(
    TranslatePostDocument,
    options
  )
}
export type TranslatePostMutationHookResult = ReturnType<typeof useTranslatePostMutation>
export type TranslatePostMutationResult = Apollo.MutationResult<TranslatePostMutation>
export type TranslatePostMutationOptions = Apollo.BaseMutationOptions<
  TranslatePostMutation,
  TranslatePostMutationVariables
>
export const BlogPostDocument = gql`
  query blogPost($slug: LowercaseString, $id: ID) {
    blogPost(slug: $slug, id: $id) {
      ...BlogPost
    }
  }
  ${BlogPostFragmentDoc}
`

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
export function useBlogPostQuery(
  baseOptions?: Apollo.QueryHookOptions<BlogPostQuery, BlogPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<BlogPostQuery, BlogPostQueryVariables>(BlogPostDocument, options)
}
export function useBlogPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BlogPostQuery, BlogPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<BlogPostQuery, BlogPostQueryVariables>(BlogPostDocument, options)
}
export type BlogPostQueryHookResult = ReturnType<typeof useBlogPostQuery>
export type BlogPostLazyQueryHookResult = ReturnType<typeof useBlogPostLazyQuery>
export type BlogPostQueryResult = Apollo.QueryResult<BlogPostQuery, BlogPostQueryVariables>
export const BlogPostsDocument = gql`
  query blogPosts($after: String, $first: Int = 5) @connection(key: "blogPosts") {
    blogPosts(after: $after, first: $first) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...BlogPost
        }
      }
    }
  }
  ${BlogPostFragmentDoc}
`

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
export function useBlogPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<BlogPostsQuery, BlogPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<BlogPostsQuery, BlogPostsQueryVariables>(BlogPostsDocument, options)
}
export function useBlogPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BlogPostsQuery, BlogPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<BlogPostsQuery, BlogPostsQueryVariables>(BlogPostsDocument, options)
}
export type BlogPostsQueryHookResult = ReturnType<typeof useBlogPostsQuery>
export type BlogPostsLazyQueryHookResult = ReturnType<typeof useBlogPostsLazyQuery>
export type BlogPostsQueryResult = Apollo.QueryResult<BlogPostsQuery, BlogPostsQueryVariables>
export const BookmarksDocument = gql`
  query bookmarks($after: String, $first: Int = 5) @connection(key: "bookmarks") {
    bookmarks(after: $after, first: $first) {
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
  ${PostFragmentDoc}
`

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
export function useBookmarksQuery(
  baseOptions?: Apollo.QueryHookOptions<BookmarksQuery, BookmarksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, options)
}
export function useBookmarksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookmarksQuery, BookmarksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, options)
}
export type BookmarksQueryHookResult = ReturnType<typeof useBookmarksQuery>
export type BookmarksLazyQueryHookResult = ReturnType<typeof useBookmarksLazyQuery>
export type BookmarksQueryResult = Apollo.QueryResult<BookmarksQuery, BookmarksQueryVariables>
export const CollectionsDocument = gql`
  query collections(
    $id: ID
    $slug: LowercaseString
    $projectId: ID
    $projectSlug: LowercaseString
    $after: String
    $first: Int = 5
  ) @connection(key: "collections") {
    collections(
      id: $id
      slug: $slug
      projectId: $projectId
      projectSlug: $projectSlug
      after: $after
      first: $first
    ) {
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
  ${PostFragmentDoc}
`

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
export function useCollectionsQuery(
  baseOptions?: Apollo.QueryHookOptions<CollectionsQuery, CollectionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CollectionsQuery, CollectionsQueryVariables>(CollectionsDocument, options)
}
export function useCollectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CollectionsQuery, CollectionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CollectionsQuery, CollectionsQueryVariables>(
    CollectionsDocument,
    options
  )
}
export type CollectionsQueryHookResult = ReturnType<typeof useCollectionsQuery>
export type CollectionsLazyQueryHookResult = ReturnType<typeof useCollectionsLazyQuery>
export type CollectionsQueryResult = Apollo.QueryResult<CollectionsQuery, CollectionsQueryVariables>
export const CommentDocument = gql`
  query comment($id: ID!) {
    comment(id: $id) {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`

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
export function useCommentQuery(
  baseOptions: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options)
}
export function useCommentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options)
}
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>
export type CommentQueryResult = Apollo.QueryResult<CommentQuery, CommentQueryVariables>
export const CommentsDocument = gql`
  query comments($postId: ID!, $after: String) {
    post(id: $postId) {
      ...Post
    }
    comments(postId: $postId, after: $after) @connection(key: "comments", filter: ["postId"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...CommentAndReplies
        }
      }
    }
  }
  ${PostFragmentDoc}
  ${CommentAndRepliesFragmentDoc}
`

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
export function useCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options)
}
export function useCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options)
}
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>
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
      role
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
  ${UserProjectsFragmentDoc}
`

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
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options)
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  )
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>
export const CurrentUserFollowingProjectsDocument = gql`
  query currentUserFollowingProjects($after: String, $first: Int = 5) {
    user: currentUser {
      id
      projects: followingProjects(after: $after, first: $first) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
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
  ${ProjectFragmentDoc}
`

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
export function useCurrentUserFollowingProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserFollowingProjectsQuery,
    CurrentUserFollowingProjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    CurrentUserFollowingProjectsQuery,
    CurrentUserFollowingProjectsQueryVariables
  >(CurrentUserFollowingProjectsDocument, options)
}
export function useCurrentUserFollowingProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserFollowingProjectsQuery,
    CurrentUserFollowingProjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    CurrentUserFollowingProjectsQuery,
    CurrentUserFollowingProjectsQueryVariables
  >(CurrentUserFollowingProjectsDocument, options)
}
export type CurrentUserFollowingProjectsQueryHookResult = ReturnType<
  typeof useCurrentUserFollowingProjectsQuery
>
export type CurrentUserFollowingProjectsLazyQueryHookResult = ReturnType<
  typeof useCurrentUserFollowingProjectsLazyQuery
>
export type CurrentUserFollowingProjectsQueryResult = Apollo.QueryResult<
  CurrentUserFollowingProjectsQuery,
  CurrentUserFollowingProjectsQueryVariables
>
export const CurrentUserProfileDocument = gql`
  query currentUserProfile($after: String, $first: Int = 5) {
    user: currentUser {
      ...User
      projects: projectsConnection {
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
      posts: postsConnection(after: $after, first: $first) @connection(key: "posts") {
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
  ${ProjectFragmentDoc}
  ${PostFragmentDoc}
`

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
export function useCurrentUserProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>(
    CurrentUserProfileDocument,
    options
  )
}
export function useCurrentUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserProfileQuery,
    CurrentUserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>(
    CurrentUserProfileDocument,
    options
  )
}
export type CurrentUserProfileQueryHookResult = ReturnType<typeof useCurrentUserProfileQuery>
export type CurrentUserProfileLazyQueryHookResult = ReturnType<
  typeof useCurrentUserProfileLazyQuery
>
export type CurrentUserProfileQueryResult = Apollo.QueryResult<
  CurrentUserProfileQuery,
  CurrentUserProfileQueryVariables
>
export const CurrentUserProjectsDocument = gql`
  query currentUserProjects {
    user: currentUser {
      ...UserProjects
    }
  }
  ${UserProjectsFragmentDoc}
`

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
export function useCurrentUserProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>(
    CurrentUserProjectsDocument,
    options
  )
}
export function useCurrentUserProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserProjectsQuery,
    CurrentUserProjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>(
    CurrentUserProjectsDocument,
    options
  )
}
export type CurrentUserProjectsQueryHookResult = ReturnType<typeof useCurrentUserProjectsQuery>
export type CurrentUserProjectsLazyQueryHookResult = ReturnType<
  typeof useCurrentUserProjectsLazyQuery
>
export type CurrentUserProjectsQueryResult = Apollo.QueryResult<
  CurrentUserProjectsQuery,
  CurrentUserProjectsQueryVariables
>
export const CurrentUserSettingsDocument = gql`
  query currentUserSettings {
    user: currentUser {
      ...UserSettings
    }
  }
  ${UserSettingsFragmentDoc}
`

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
export function useCurrentUserSettingsQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>(
    CurrentUserSettingsDocument,
    options
  )
}
export function useCurrentUserSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserSettingsQuery,
    CurrentUserSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>(
    CurrentUserSettingsDocument,
    options
  )
}
export type CurrentUserSettingsQueryHookResult = ReturnType<typeof useCurrentUserSettingsQuery>
export type CurrentUserSettingsLazyQueryHookResult = ReturnType<
  typeof useCurrentUserSettingsLazyQuery
>
export type CurrentUserSettingsQueryResult = Apollo.QueryResult<
  CurrentUserSettingsQuery,
  CurrentUserSettingsQueryVariables
>
export const FeedDocument = gql`
  query feed($after: String, $first: Int = 5) {
    feed {
      posts: postsConnection(after: $after, first: $first) @connection(key: "posts") {
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
  ${PostFragmentDoc}
`

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
export function useFeedQuery(baseOptions?: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options)
}
export function useFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options)
}
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>
export const FilesDocument = gql`
  query files($after: String, $first: Int = 10) @connection(key: "files") {
    files(after: $after, first: $first) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          uri
          postId
        }
      }
    }
  }
`

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
export function useFilesQuery(
  baseOptions?: Apollo.QueryHookOptions<FilesQuery, FilesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FilesQuery, FilesQueryVariables>(FilesDocument, options)
}
export function useFilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FilesQuery, FilesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FilesQuery, FilesQueryVariables>(FilesDocument, options)
}
export type FilesQueryHookResult = ReturnType<typeof useFilesQuery>
export type FilesLazyQueryHookResult = ReturnType<typeof useFilesLazyQuery>
export type FilesQueryResult = Apollo.QueryResult<FilesQuery, FilesQueryVariables>
export const FollowersDocument = gql`
  query followers($projectId: ID!, $after: String, $first: Int = 10) {
    followers(projectId: $projectId, after: $after, first: $first)
      @connection(key: "followers", filter: ["projectId"]) {
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
  ${UserFragmentDoc}
`

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
export function useFollowersQuery(
  baseOptions: Apollo.QueryHookOptions<FollowersQuery, FollowersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options)
}
export function useFollowersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options)
}
export type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>
export type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>
export type FollowersQueryResult = Apollo.QueryResult<FollowersQuery, FollowersQueryVariables>
export const GrowthDocument = gql`
  query growth($type: GrowthType!) {
    growth(type: $type) {
      date
      count
    }
  }
`

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
export function useGrowthQuery(
  baseOptions: Apollo.QueryHookOptions<GrowthQuery, GrowthQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GrowthQuery, GrowthQueryVariables>(GrowthDocument, options)
}
export function useGrowthLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GrowthQuery, GrowthQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GrowthQuery, GrowthQueryVariables>(GrowthDocument, options)
}
export type GrowthQueryHookResult = ReturnType<typeof useGrowthQuery>
export type GrowthLazyQueryHookResult = ReturnType<typeof useGrowthLazyQuery>
export type GrowthQueryResult = Apollo.QueryResult<GrowthQuery, GrowthQueryVariables>
export const HashtagDocument = gql`
  query hashtag($id: ID, $slug: LowercaseString, $name: String, $after: String, $first: Int = 5) {
    hashtag(id: $id, slug: $slug, name: $name) {
      posts: postsConnection(first: $first, after: $after) @connection(key: "posts") {
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
  ${PostFragmentDoc}
`

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
export function useHashtagQuery(
  baseOptions?: Apollo.QueryHookOptions<HashtagQuery, HashtagQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<HashtagQuery, HashtagQueryVariables>(HashtagDocument, options)
}
export function useHashtagLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HashtagQuery, HashtagQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<HashtagQuery, HashtagQueryVariables>(HashtagDocument, options)
}
export type HashtagQueryHookResult = ReturnType<typeof useHashtagQuery>
export type HashtagLazyQueryHookResult = ReturnType<typeof useHashtagLazyQuery>
export type HashtagQueryResult = Apollo.QueryResult<HashtagQuery, HashtagQueryVariables>
export const LikesDocument = gql`
  query likes($postId: ID!, $after: String, $first: Int = 10) {
    likes(postId: $postId, first: $first, after: $after)
      @connection(key: "comments", filter: ["postId"]) {
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
  ${UserFragmentDoc}
`

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
export function useLikesQuery(
  baseOptions: Apollo.QueryHookOptions<LikesQuery, LikesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<LikesQuery, LikesQueryVariables>(LikesDocument, options)
}
export function useLikesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LikesQuery, LikesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<LikesQuery, LikesQueryVariables>(LikesDocument, options)
}
export type LikesQueryHookResult = ReturnType<typeof useLikesQuery>
export type LikesLazyQueryHookResult = ReturnType<typeof useLikesLazyQuery>
export type LikesQueryResult = Apollo.QueryResult<LikesQuery, LikesQueryVariables>
export const MetaDocument = gql`
  query meta {
    meta {
      totalUsers
      totalUsersToday
      totalPostsToday
      totalProjectsToday
      totalCommentsToday
      totalFilesToday
      totalComments
      totalProjects
      totalPosts
      totalFiles
    }
  }
`

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
export function useMetaQuery(baseOptions?: Apollo.QueryHookOptions<MetaQuery, MetaQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MetaQuery, MetaQueryVariables>(MetaDocument, options)
}
export function useMetaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MetaQuery, MetaQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MetaQuery, MetaQueryVariables>(MetaDocument, options)
}
export type MetaQueryHookResult = ReturnType<typeof useMetaQuery>
export type MetaLazyQueryHookResult = ReturnType<typeof useMetaLazyQuery>
export type MetaQueryResult = Apollo.QueryResult<MetaQuery, MetaQueryVariables>
export const NotificationsDocument = gql`
  query notifications($after: String, $first: Int = 10) {
    notifications(after: $after, first: $first) @connection(key: "notifications") {
      unreadCount
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...Notification
        }
      }
    }
  }
  ${NotificationFragmentDoc}
`

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
export function useNotificationsQuery(
  baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(
    NotificationsDocument,
    options
  )
}
export function useNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(
    NotificationsDocument,
    options
  )
}
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>
export type NotificationsQueryResult = Apollo.QueryResult<
  NotificationsQuery,
  NotificationsQueryVariables
>
export const PostDocument = gql`
  query post($id: ID!) {
    post(id: $id) {
      ...Post
    }
  }
  ${PostFragmentDoc}
`

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
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options)
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options)
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>
export const PostsDocument = gql`
  query posts($after: String, $first: Int = 5) @connection(key: "posts") {
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
  ${PostFragmentDoc}
`

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
export function usePostsQuery(
  baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options)
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options)
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>
export const ProjectDocument = gql`
  query project($id: ID, $slug: LowercaseString, $after: String, $postId: ID, $first: Int = 5) {
    post(id: $postId) {
      ...Post
    }
    project(id: $id, slug: $slug) {
      ...Project
      posts: postsConnection(first: $first, after: $after) @connection(key: "posts") {
        totalCount
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
  ${PostFragmentDoc}
  ${ProjectFragmentDoc}
`

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
export function useProjectQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options)
}
export function useProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options)
}
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>
export const ProjectCollectionsDocument = gql`
  query projectCollections(
    $projectId: ID
    $projectSlug: LowercaseString
    $slug: LowercaseString
    $after: String
    $first: Int = 10
  ) {
    projectCollections(
      projectId: $projectId
      projectSlug: $projectSlug
      slug: $slug
      first: $first
      after: $after
    ) @connection(key: "collections", filter: ["projectId"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...Collection
        }
      }
    }
  }
  ${CollectionFragmentDoc}
`

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
export function useProjectCollectionsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>(
    ProjectCollectionsDocument,
    options
  )
}
export function useProjectCollectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectCollectionsQuery,
    ProjectCollectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>(
    ProjectCollectionsDocument,
    options
  )
}
export type ProjectCollectionsQueryHookResult = ReturnType<typeof useProjectCollectionsQuery>
export type ProjectCollectionsLazyQueryHookResult = ReturnType<
  typeof useProjectCollectionsLazyQuery
>
export type ProjectCollectionsQueryResult = Apollo.QueryResult<
  ProjectCollectionsQuery,
  ProjectCollectionsQueryVariables
>
export const ProjectSuggestionsDocument = gql`
  query projectSuggestions($after: String, $first: Int = 5) {
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
  ${ProjectFragmentDoc}
`

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
export function useProjectSuggestionsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>(
    ProjectSuggestionsDocument,
    options
  )
}
export function useProjectSuggestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectSuggestionsQuery,
    ProjectSuggestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>(
    ProjectSuggestionsDocument,
    options
  )
}
export type ProjectSuggestionsQueryHookResult = ReturnType<typeof useProjectSuggestionsQuery>
export type ProjectSuggestionsLazyQueryHookResult = ReturnType<
  typeof useProjectSuggestionsLazyQuery
>
export type ProjectSuggestionsQueryResult = Apollo.QueryResult<
  ProjectSuggestionsQuery,
  ProjectSuggestionsQueryVariables
>
export const ProjectTypesDocument = gql`
  query projectTypes {
    types: projectTypes {
      id
      title
      imageUrl
    }
  }
`

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
export function useProjectTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectTypesQuery, ProjectTypesQueryVariables>(
    ProjectTypesDocument,
    options
  )
}
export function useProjectTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectTypesQuery, ProjectTypesQueryVariables>(
    ProjectTypesDocument,
    options
  )
}
export type ProjectTypesQueryHookResult = ReturnType<typeof useProjectTypesQuery>
export type ProjectTypesLazyQueryHookResult = ReturnType<typeof useProjectTypesLazyQuery>
export type ProjectTypesQueryResult = Apollo.QueryResult<
  ProjectTypesQuery,
  ProjectTypesQueryVariables
>
export const ProjectsDocument = gql`
  query projects($typeId: ID, $after: String, $first: Int = 5, $type: ProjectSortType!) {
    projects(typeId: $typeId, after: $after, first: $first, type: $type)
      @connection(key: "projects", filter: ["type", "typeId"]) {
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
  ${ProjectFragmentDoc}
`

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
export function useProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options)
}
export function useProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options)
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>
export const RecentCommentsDocument = gql`
  query recentComments($after: String) {
    comments: recentComments(after: $after) @connection(key: "comments", filter: ["postId"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...CommentAndReplies
        }
      }
    }
  }
  ${CommentAndRepliesFragmentDoc}
`

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
export function useRecentCommentsQuery(
  baseOptions?: Apollo.QueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<RecentCommentsQuery, RecentCommentsQueryVariables>(
    RecentCommentsDocument,
    options
  )
}
export function useRecentCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<RecentCommentsQuery, RecentCommentsQueryVariables>(
    RecentCommentsDocument,
    options
  )
}
export type RecentCommentsQueryHookResult = ReturnType<typeof useRecentCommentsQuery>
export type RecentCommentsLazyQueryHookResult = ReturnType<typeof useRecentCommentsLazyQuery>
export type RecentCommentsQueryResult = Apollo.QueryResult<
  RecentCommentsQuery,
  RecentCommentsQueryVariables
>
export const RepliesDocument = gql`
  query replies($id: ID!, $after: String, $first: Int = 5) {
    comment(id: $id) {
      replies: repliesConnection(after: $after, first: $first) {
        pageInfo {
          hasNextPage
        }
        totalCount
        edges {
          cursor
          node {
            ...Comment
          }
        }
      }
    }
  }
  ${CommentFragmentDoc}
`

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
export function useRepliesQuery(
  baseOptions: Apollo.QueryHookOptions<RepliesQuery, RepliesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<RepliesQuery, RepliesQueryVariables>(RepliesDocument, options)
}
export function useRepliesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RepliesQuery, RepliesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<RepliesQuery, RepliesQueryVariables>(RepliesDocument, options)
}
export type RepliesQueryHookResult = ReturnType<typeof useRepliesQuery>
export type RepliesLazyQueryHookResult = ReturnType<typeof useRepliesLazyQuery>
export type RepliesQueryResult = Apollo.QueryResult<RepliesQuery, RepliesQueryVariables>
export const SearchHashtagsDocument = gql`
  query searchHashtags($query: String!, $after: String, $first: Int = 10) {
    hashtags: search(query: $query, after: $after, type: HASHTAGS, first: $first)
      @connection(key: "hashtags", filter: ["query", "type"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Hashtag {
            id
            name
            slug
            totalCount
          }
        }
      }
    }
  }
`

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
export function useSearchHashtagsQuery(
  baseOptions: Apollo.QueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchHashtagsQuery, SearchHashtagsQueryVariables>(
    SearchHashtagsDocument,
    options
  )
}
export function useSearchHashtagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchHashtagsQuery, SearchHashtagsQueryVariables>(
    SearchHashtagsDocument,
    options
  )
}
export type SearchHashtagsQueryHookResult = ReturnType<typeof useSearchHashtagsQuery>
export type SearchHashtagsLazyQueryHookResult = ReturnType<typeof useSearchHashtagsLazyQuery>
export type SearchHashtagsQueryResult = Apollo.QueryResult<
  SearchHashtagsQuery,
  SearchHashtagsQueryVariables
>
export const SearchModelsDocument = gql`
  query searchModels($query: String!, $after: String, $first: Int = 20) {
    models: search(query: $query, after: $after, type: MODELS, first: $first)
      @connection(key: "models", filter: ["query", "type"]) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
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
`

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
export function useSearchModelsQuery(
  baseOptions: Apollo.QueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchModelsQuery, SearchModelsQueryVariables>(
    SearchModelsDocument,
    options
  )
}
export function useSearchModelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchModelsQuery, SearchModelsQueryVariables>(
    SearchModelsDocument,
    options
  )
}
export type SearchModelsQueryHookResult = ReturnType<typeof useSearchModelsQuery>
export type SearchModelsLazyQueryHookResult = ReturnType<typeof useSearchModelsLazyQuery>
export type SearchModelsQueryResult = Apollo.QueryResult<
  SearchModelsQuery,
  SearchModelsQueryVariables
>
export const SearchProjectsDocument = gql`
  query searchProjects($query: String!, $after: String, $first: Int = 10) {
    projects: search(query: $query, after: $after, type: PROJECTS, first: $first)
      @connection(key: "projects", filter: ["query", "type"]) {
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
  ${ProjectFragmentDoc}
`

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
export function useSearchProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(
    SearchProjectsDocument,
    options
  )
}
export function useSearchProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(
    SearchProjectsDocument,
    options
  )
}
export type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>
export type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>
export type SearchProjectsQueryResult = Apollo.QueryResult<
  SearchProjectsQuery,
  SearchProjectsQueryVariables
>
export const SearchUsersDocument = gql`
  query searchUsers($query: String!, $after: String, $first: Int = 10) {
    users: search(query: $query, after: $after, type: USERS, first: $first)
      @connection(key: "users", filter: ["query", "type"]) {
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
  ${UserFragmentDoc}
`

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
export function useSearchUsersQuery(
  baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options)
}
export function useSearchUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(
    SearchUsersDocument,
    options
  )
}
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>
export const SimilarProjectsDocument = gql`
  query similarProjects($id: ID!, $first: Int = 5) {
    similarProjects(id: $id, first: $first) {
      edges {
        cursor
        node {
          cover {
            uri
          }
          ...Project
        }
      }
    }
  }
  ${ProjectFragmentDoc}
`

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
export function useSimilarProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SimilarProjectsQuery, SimilarProjectsQueryVariables>(
    SimilarProjectsDocument,
    options
  )
}
export function useSimilarProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SimilarProjectsQuery, SimilarProjectsQueryVariables>(
    SimilarProjectsDocument,
    options
  )
}
export type SimilarProjectsQueryHookResult = ReturnType<typeof useSimilarProjectsQuery>
export type SimilarProjectsLazyQueryHookResult = ReturnType<typeof useSimilarProjectsLazyQuery>
export type SimilarProjectsQueryResult = Apollo.QueryResult<
  SimilarProjectsQuery,
  SimilarProjectsQueryVariables
>
export const UnreadNotificationsDocument = gql`
  query unreadNotifications {
    notifications {
      unreadCount
    }
  }
`

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
export function useUnreadNotificationsQuery(
  baseOptions?: Apollo.QueryHookOptions<UnreadNotificationsQuery, UnreadNotificationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UnreadNotificationsQuery, UnreadNotificationsQueryVariables>(
    UnreadNotificationsDocument,
    options
  )
}
export function useUnreadNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UnreadNotificationsQuery,
    UnreadNotificationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UnreadNotificationsQuery, UnreadNotificationsQueryVariables>(
    UnreadNotificationsDocument,
    options
  )
}
export type UnreadNotificationsQueryHookResult = ReturnType<typeof useUnreadNotificationsQuery>
export type UnreadNotificationsLazyQueryHookResult = ReturnType<
  typeof useUnreadNotificationsLazyQuery
>
export type UnreadNotificationsQueryResult = Apollo.QueryResult<
  UnreadNotificationsQuery,
  UnreadNotificationsQueryVariables
>
export const UserDocument = gql`
  query user($username: LowercaseString!, $after: String, $first: Int = 5) {
    user(username: $username) {
      ...User
      projects: projectsConnection {
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
      posts: postsConnection(after: $after, first: $first) @connection(key: "posts") {
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
  ${ProjectFragmentDoc}
  ${PostFragmentDoc}
`

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
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options)
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options)
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>
export const UserFollowingProjectsDocument = gql`
  query userFollowingProjects($username: LowercaseString!, $after: String, $first: Int = 5) {
    user(username: $username) {
      id
      projects: followingProjects(after: $after, first: $first) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
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
  ${ProjectFragmentDoc}
`

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
export function useUserFollowingProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserFollowingProjectsQuery,
    UserFollowingProjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>(
    UserFollowingProjectsDocument,
    options
  )
}
export function useUserFollowingProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserFollowingProjectsQuery,
    UserFollowingProjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>(
    UserFollowingProjectsDocument,
    options
  )
}
export type UserFollowingProjectsQueryHookResult = ReturnType<typeof useUserFollowingProjectsQuery>
export type UserFollowingProjectsLazyQueryHookResult = ReturnType<
  typeof useUserFollowingProjectsLazyQuery
>
export type UserFollowingProjectsQueryResult = Apollo.QueryResult<
  UserFollowingProjectsQuery,
  UserFollowingProjectsQueryVariables
>
