import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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

export type Query = {
  __typename?: 'Query';
  dummy?: Maybe<Scalars['String']>;
  bookmarks?: Maybe<BookmarkConnection>;
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


export type QueryBookmarksArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryCommentsArgs = {
  postId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryRecentCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryCommentArgs = {
  id: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryCollectionsArgs = {
  id: Scalars['ID'];
  projectId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryProjectCollectionsArgs = {
  projectId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryFilesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  scale?: Maybe<Scalars['Int']>;
  type?: Maybe<FileType>;
};


export type QueryFollowersArgs = {
  projectId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryHashtagArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['LowercaseString']>;
};


export type QueryLikesArgs = {
  postId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryGrowthArgs = {
  type: GrowthType;
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
};


export type QueryNotificationsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryPostArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryProjectArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['LowercaseString']>;
};


export type QueryProjectsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  type: ProjectSortType;
  typeId?: Maybe<Scalars['ID']>;
};


export type QueryProjectSuggestionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QuerySimilarProjectsArgs = {
  id: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QuerySearchArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  query: Scalars['String'];
  type: SearchType;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['LowercaseString']>;
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryCurrentUserArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type BookmarkConnection = {
  __typename?: 'BookmarkConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<BookmarkEdge>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
};

export type BookmarkEdge = {
  __typename?: 'BookmarkEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type Post = {
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
  filesConnection?: Maybe<FileConnection>;
  commentsConnection?: Maybe<CommentConnection>;
  likesConnection?: Maybe<LikeConnection>;
};


export type PostFilesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  type?: Maybe<FileType>;
};


export type PostCommentsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type PostLikesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type User = {
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


export type UserProjectsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type UserFollowingProjectsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type UserPostsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type ProjectType = {
  __typename?: 'ProjectType';
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
};

export type UserSettings = {
  __typename?: 'UserSettings';
  locale?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  notifications?: Maybe<UserNotificationsSettings>;
};

export type UserNotificationsSettings = {
  __typename?: 'UserNotificationsSettings';
  types?: Maybe<NotificationSettingsType>;
};

export type NotificationSettingsType = {
  __typename?: 'NotificationSettingsType';
  NEW_FOLLOWER?: Maybe<NotificationKindSettings>;
  NEW_COMMENT?: Maybe<NotificationKindSettings>;
  NEW_MENTION?: Maybe<NotificationKindSettings>;
  NEW_ARTICLE?: Maybe<NotificationKindSettings>;
  SIMILAR_PROJECTS?: Maybe<NotificationKindSettings>;
  PRODUCT_ANNOUNCEMENTS?: Maybe<NotificationKindSettings>;
};

export type NotificationKindSettings = {
  __typename?: 'NotificationKindSettings';
  email?: Maybe<Scalars['Boolean']>;
  push?: Maybe<Scalars['Boolean']>;
};

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN'
}

export type ProjectsConnection = {
  __typename?: 'ProjectsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<ProjectEdge>>;
};

export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  cursor: Scalars['String'];
  node: Project;
};

export type Project = {
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


export type ProjectFilesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  reverse?: Maybe<Scalars['Boolean']>;
  type?: Maybe<FileType>;
};


export type ProjectFollowersConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type ProjectPostsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type ProjectCollectionsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ProjectPermissions = {
  __typename?: 'ProjectPermissions';
  isFollower?: Maybe<Scalars['Boolean']>;
  isOwner?: Maybe<Scalars['Boolean']>;
};

export type CoverType = {
  __typename?: 'CoverType';
  uri?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['Boolean']>;
};

export type Model = {
  __typename?: 'Model';
  id: Scalars['ID'];
  brand?: Maybe<Brand>;
  model?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export enum FileType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type FileConnection = {
  __typename?: 'FileConnection';
  edges?: Maybe<Array<Maybe<FileEdge>>>;
  pageInfo: PageInfo;
};

export type FileEdge = {
  __typename?: 'FileEdge';
  cursor: Scalars['String'];
  node: File;
};

export type File = {
  __typename?: 'File';
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<FileType>;
  uri: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type FollowersConnection = {
  __typename?: 'FollowersConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<FollowersEdge>>;
};

export type FollowersEdge = {
  __typename?: 'FollowersEdge';
  cursor: Scalars['String'];
  node: User;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<PostEdge>>;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<CollectionEdge>>;
};

export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  cursor: Scalars['String'];
  node: Collection;
};

export type Collection = {
  __typename?: 'Collection';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  cover?: Maybe<CoverType>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type PostPermissions = {
  __typename?: 'PostPermissions';
  isOwner?: Maybe<Scalars['Boolean']>;
};

export type Likes = {
  __typename?: 'Likes';
  totalCount?: Maybe<Scalars['Int']>;
  isLiked?: Maybe<Scalars['Boolean']>;
};

export type Bookmarks = {
  __typename?: 'Bookmarks';
  totalCount?: Maybe<Scalars['Int']>;
  isBookmarked?: Maybe<Scalars['Boolean']>;
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<CommentEdge>>;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node: Comment;
};

export type Comment = {
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


export type CommentRepliesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type CommentPermissions = {
  __typename?: 'CommentPermissions';
  isOwner?: Maybe<Scalars['Boolean']>;
};

export type LikeConnection = {
  __typename?: 'LikeConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<LikeEdge>>;
};

export type LikeEdge = {
  __typename?: 'LikeEdge';
  cursor: Scalars['String'];
  node: User;
};

export type Feed = {
  __typename?: 'Feed';
  postsConnection?: Maybe<PostConnection>;
};


export type FeedPostsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type Hashtag = {
  __typename?: 'Hashtag';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['LowercaseString']>;
  totalCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  postsConnection?: Maybe<PostConnection>;
};


export type HashtagPostsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type Meta = {
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

export enum GrowthType {
  Projects = 'PROJECTS',
  Users = 'USERS'
}

export type GrowthData = {
  __typename?: 'GrowthData';
  date?: Maybe<Scalars['Date']>;
  count?: Maybe<Scalars['Int']>;
};

export type NotificationsConnection = {
  __typename?: 'NotificationsConnection';
  unreadCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<NotificationEdge>>>;
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Notification>;
};

export type Notification = {
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


export type NotificationFilesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  type?: Maybe<FileType>;
};

export enum NotificationTypes {
  NewComment = 'NEW_COMMENT',
  NewFollower = 'NEW_FOLLOWER',
  NewPostLike = 'NEW_POST_LIKE',
  NewCommentLike = 'NEW_COMMENT_LIKE',
  NewMention = 'NEW_MENTION',
  NewReply = 'NEW_REPLY'
}

export enum ProjectSortType {
  Popular = 'POPULAR',
  Recent = 'RECENT'
}

export type ProjectSuggestionsConnection = {
  __typename?: 'ProjectSuggestionsConnection';
  totalCount?: Maybe<Scalars['Int']>;
  type?: Maybe<ProjectType>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<ProjectEdge>>;
};

export enum SearchType {
  Projects = 'PROJECTS',
  Users = 'USERS',
  Models = 'MODELS',
  Hashtags = 'HASHTAGS'
}

export type SearchResults = {
  __typename?: 'SearchResults';
  totalCount?: Maybe<Scalars['Int']>;
  edges?: Maybe<Array<Maybe<SearchResultEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type SearchResultEdge = {
  __typename?: 'SearchResultEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<SearchResultNode>;
};

export type SearchResultNode = Project | User | Model | Hashtag;

export type UserConnection = {
  __typename?: 'UserConnection';
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserEdge>>>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  dummy?: Maybe<Scalars['String']>;
  authenticateApple?: Maybe<Tokens>;
  authenticateFacebook?: Maybe<Tokens>;
  authenticateGoogle?: Maybe<Tokens>;
  refreshToken?: Maybe<AccessToken>;
  bookmarkPost?: Maybe<Post>;
  addComment?: Maybe<Comment>;
  editComment?: Maybe<Comment>;
  deleteComment?: Maybe<Scalars['Boolean']>;
  addCollection?: Maybe<Collection>;
  deleteCollection?: Maybe<Collection>;
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
  banUser?: Maybe<Scalars['Boolean']>;
  deleteCurrentUser?: Maybe<Scalars['Boolean']>;
};


export type MutationAuthenticateAppleArgs = {
  identityToken: Scalars['String'];
  user: ApplePayload;
};


export type MutationAuthenticateFacebookArgs = {
  token: Scalars['String'];
};


export type MutationAuthenticateGoogleArgs = {
  idToken: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationBookmarkPostArgs = {
  id: Scalars['ID'];
};


export type MutationAddCommentArgs = {
  postId: Scalars['ID'];
  commentId?: Maybe<Scalars['ID']>;
  input: CommentInput;
};


export type MutationEditCommentArgs = {
  id: Scalars['ID'];
  input: CommentInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationAddCollectionArgs = {
  projectId: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationDeleteCollectionArgs = {
  projectId: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationCollectPostsArgs = {
  projectId: Scalars['ID'];
  collectionId: Scalars['ID'];
  input?: Maybe<Array<Maybe<CollectionInput>>>;
};


export type MutationSendPromoArgs = {
  number: Scalars['String'];
};


export type MutationLikePostArgs = {
  id: Scalars['ID'];
};


export type MutationLikeCommentArgs = {
  id: Scalars['ID'];
};


export type MutationMarkNotificationSeenArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationAddPostArgs = {
  input: PostInput;
};


export type MutationEditPostArgs = {
  id: Scalars['ID'];
  input: EditPostInput;
};


export type MutationFollowProjectArgs = {
  id: Scalars['ID'];
};


export type MutationAddProjectArgs = {
  input: ProjectInput;
};


export type MutationEditProjectArgs = {
  id: Scalars['ID'];
  input: ProjectInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationReportArgs = {
  id: Scalars['ID'];
  type: ReportType;
};


export type MutationPreSignUrlsArgs = {
  input?: Maybe<Array<Maybe<PreSignedUrlnput>>>;
};


export type MutationPreSignUrlArgs = {
  input: PreSignedUrlInput;
};


export type MutationEditUserArgs = {
  input: EditUserInput;
  id?: Maybe<Scalars['ID']>;
};


export type MutationToggleNotificationSettingsArgs = {
  input?: Maybe<ToggleNotificationSettingsInput>;
};


export type MutationRegisterDeviceTokenArgs = {
  token: Scalars['String'];
  platform: PlatformType;
};


export type MutationBanUserArgs = {
  userId: Scalars['ID'];
};

export type ApplePayload = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type Tokens = {
  __typename?: 'Tokens';
  access_token?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  access_token?: Maybe<Scalars['String']>;
};

export type CommentInput = {
  text: Scalars['String'];
};

export type CollectionInput = {
  postId: Scalars['ID'];
};

export type PostInput = {
  projectId: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  files: Array<Maybe<FileInput>>;
};

export type FileInput = {
  filename: Scalars['String'];
};

export type EditPostInput = {
  caption?: Maybe<Scalars['String']>;
};

export type ProjectInput = {
  title?: Maybe<Scalars['String']>;
  commentsDisabled?: Maybe<Scalars['Boolean']>;
  projectTypeId?: Maybe<Scalars['ID']>;
  modelId?: Maybe<Scalars['ID']>;
};

export enum ReportType {
  Project = 'PROJECT',
  User = 'USER',
  Comment = 'COMMENT',
  Post = 'POST'
}

export type PreSignedUrlnput = {
  type: UploadType;
};

export enum UploadType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type PreSignedUrl = {
  __typename?: 'PreSignedUrl';
  url?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  filename?: Maybe<Scalars['String']>;
};

export type PreSignedUrlInput = {
  type: UploadType;
  path: Scalars['String'];
};

export type EditUserInput = {
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

export type ProjectTypeInput = {
  id?: Maybe<Scalars['ID']>;
};

export type ToggleNotificationSettingsInput = {
  deliveryMethod: Scalars['String'];
  notificationType: Scalars['String'];
};

export enum PlatformType {
  Mobile = 'MOBILE',
  Web = 'WEB'
}

export type HashtagConnection = {
  __typename?: 'HashtagConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo: PageInfo;
  edges?: Maybe<Array<HashtagEdge>>;
};

export type HashtagEdge = {
  __typename?: 'HashtagEdge';
  cursor: Scalars['String'];
  node: Hashtag;
};

export type CommentAndRepliesFragment = (
  { __typename?: 'Comment' }
  & { replies?: Maybe<(
    { __typename?: 'CommentConnection' }
    & Pick<CommentConnection, 'totalCount'>
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'CommentEdge' }
      & Pick<CommentEdge, 'cursor'>
      & { node: (
        { __typename?: 'Comment' }
        & CommentFragment
      ) }
    )>> }
  )> }
  & CommentFragment
);

export type CommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'createdAt'>
  & { permissions?: Maybe<(
    { __typename?: 'CommentPermissions' }
    & Pick<CommentPermissions, 'isOwner'>
  )>, likes?: Maybe<(
    { __typename?: 'Likes' }
    & Pick<Likes, 'isLiked' | 'totalCount'>
  )>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type NotificationFragment = (
  { __typename?: 'Notification' }
  & Pick<Notification, 'id' | 'type' | 'createdAt'>
  & { user: (
    { __typename?: 'User' }
    & UserFragment
  ), project?: Maybe<(
    { __typename?: 'Project' }
    & ProjectFragment
  )>, post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  )>, comment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text' | 'postId'>
  )>, files?: Maybe<(
    { __typename?: 'FileConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'FileEdge' }
      & { node: (
        { __typename?: 'File' }
        & Pick<File, 'id' | 'uri'>
      ) }
    )>>> }
  )> }
);

export type PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'caption' | 'createdAt'>
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )>, permissions?: Maybe<(
    { __typename?: 'PostPermissions' }
    & Pick<PostPermissions, 'isOwner'>
  )>, files?: Maybe<(
    { __typename?: 'FileConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'FileEdge' }
      & { node: (
        { __typename?: 'File' }
        & Pick<File, 'id' | 'type' | 'uri'>
      ) }
    )>>> }
  )>, project?: Maybe<(
    { __typename?: 'Project' }
    & ProjectFragment
  )>, likes?: Maybe<(
    { __typename?: 'Likes' }
    & Pick<Likes, 'isLiked' | 'totalCount'>
  )>, bookmarks?: Maybe<(
    { __typename?: 'Bookmarks' }
    & Pick<Bookmarks, 'isBookmarked'>
  )>, comments?: Maybe<(
    { __typename?: 'CommentConnection' }
    & Pick<CommentConnection, 'totalCount'>
    & { edges?: Maybe<Array<(
      { __typename?: 'CommentEdge' }
      & { node: (
        { __typename?: 'Comment' }
        & CommentFragment
      ) }
    )>> }
  )>, likesConnection?: Maybe<(
    { __typename?: 'LikeConnection' }
    & { edges?: Maybe<Array<(
      { __typename?: 'LikeEdge' }
      & { node: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'avatarUrl'>
      ) }
    )>> }
  )> }
);

export type ProjectFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'title' | 'slug' | 'dynamicLink'>
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )>, permissions?: Maybe<(
    { __typename?: 'ProjectPermissions' }
    & Pick<ProjectPermissions, 'isOwner' | 'isFollower'>
  )>, followers?: Maybe<(
    { __typename?: 'FollowersConnection' }
    & Pick<FollowersConnection, 'totalCount'>
    & { edges?: Maybe<Array<(
      { __typename?: 'FollowersEdge' }
      & { node: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'avatarUrl'>
      ) }
    )>> }
  )> }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'fullName' | 'firstName' | 'lastName' | 'username' | 'avatarUrl' | 'isSilhouette' | 'isOnline' | 'website' | 'location' | 'bio' | 'projectCount' | 'dynamicLink'>
);

export type UserProjectsFragment = (
  { __typename?: 'User' }
  & { projects?: Maybe<(
    { __typename?: 'ProjectsConnection' }
    & { edges?: Maybe<Array<(
      { __typename?: 'ProjectEdge' }
      & { node: (
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'title'>
        & { followers?: Maybe<(
          { __typename?: 'FollowersConnection' }
          & Pick<FollowersConnection, 'totalCount'>
        )>, files?: Maybe<(
          { __typename?: 'FileConnection' }
          & { edges?: Maybe<Array<Maybe<(
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
  & Pick<User, 'id' | 'role'>
  & { settings?: Maybe<(
    { __typename?: 'UserSettings' }
    & { notifications?: Maybe<(
      { __typename?: 'UserNotificationsSettings' }
      & { types?: Maybe<(
        { __typename?: 'NotificationSettingsType' }
        & { NEW_FOLLOWER?: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )>, NEW_COMMENT?: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )>, NEW_MENTION?: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )>, NEW_ARTICLE?: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )>, SIMILAR_PROJECTS?: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )>, PRODUCT_ANNOUNCEMENTS?: Maybe<(
          { __typename?: 'NotificationKindSettings' }
          & Pick<NotificationKindSettings, 'email' | 'push'>
        )> }
      )> }
    )> }
  )> }
);

export type AddCollectionMutationVariables = Exact<{
  projectId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type AddCollectionMutation = (
  { __typename?: 'Mutation' }
  & { addCollection?: Maybe<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'name' | 'id'>
  )> }
);

export type AddCommentMutationVariables = Exact<{
  postId: Scalars['ID'];
  commentId?: Maybe<Scalars['ID']>;
  input: CommentInput;
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & { addComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'commentId' | 'id' | 'text'>
  )> }
);

export type AddPostMutationVariables = Exact<{
  input: PostInput;
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost?: Maybe<(
    { __typename?: 'Post' }
    & PostFragment
  )> }
);

export type AddProjectMutationVariables = Exact<{
  input: ProjectInput;
}>;


export type AddProjectMutation = (
  { __typename?: 'Mutation' }
  & { addProject?: Maybe<(
    { __typename?: 'Project' }
    & ProjectFragment
  )> }
);

export type AuthenticateAppleMutationVariables = Exact<{
  identityToken: Scalars['String'];
  user: ApplePayload;
}>;


export type AuthenticateAppleMutation = (
  { __typename?: 'Mutation' }
  & { authenticateApple?: Maybe<(
    { __typename?: 'Tokens' }
    & Pick<Tokens, 'access_token' | 'refresh_token'>
  )> }
);

export type AuthenticateFacebookMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type AuthenticateFacebookMutation = (
  { __typename?: 'Mutation' }
  & { authenticateFacebook?: Maybe<(
    { __typename?: 'Tokens' }
    & Pick<Tokens, 'access_token' | 'refresh_token'>
  )> }
);

export type AuthenticateGoogleMutationVariables = Exact<{
  idToken: Scalars['String'];
}>;


export type AuthenticateGoogleMutation = (
  { __typename?: 'Mutation' }
  & { authenticateGoogle?: Maybe<(
    { __typename?: 'Tokens' }
    & Pick<Tokens, 'access_token' | 'refresh_token'>
  )> }
);

export type BookmarkPostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BookmarkPostMutation = (
  { __typename?: 'Mutation' }
  & { bookmarkPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
    & { bookmarks?: Maybe<(
      { __typename?: 'Bookmarks' }
      & Pick<Bookmarks, 'isBookmarked'>
    )> }
  )> }
);

export type CollectPostsMutationVariables = Exact<{
  projectId: Scalars['ID'];
  collectionId: Scalars['ID'];
  input?: Maybe<Array<Maybe<CollectionInput>>>;
}>;


export type CollectPostsMutation = (
  { __typename?: 'Mutation' }
  & { collectPosts?: Maybe<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'name'>
    & { cover?: Maybe<(
      { __typename?: 'CoverType' }
      & Pick<CoverType, 'uri'>
    )> }
  )> }
);

export type DeleteCollectionMutationVariables = Exact<{
  projectId: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type DeleteCollectionMutation = (
  { __typename?: 'Mutation' }
  & { deleteCollection?: Maybe<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'id'>
  )> }
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeleteCurrentUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteCurrentUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCurrentUser'>
);

export type DeleteNotificationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteNotificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteNotification'>
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  )> }
);

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProject'>
);

export type EditPostMutationVariables = Exact<{
  id: Scalars['ID'];
  input: EditPostInput;
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & { editPost?: Maybe<(
    { __typename?: 'Post' }
    & PostFragment
  )> }
);

export type EditProjectMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ProjectInput;
}>;


export type EditProjectMutation = (
  { __typename?: 'Mutation' }
  & { editProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title'>
  )> }
);

export type EditUserMutationVariables = Exact<{
  input: EditUserInput;
  id?: Maybe<Scalars['ID']>;
}>;


export type EditUserMutation = (
  { __typename?: 'Mutation' }
  & { editUser?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type FollowProjectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FollowProjectMutation = (
  { __typename?: 'Mutation' }
  & { followProject?: Maybe<(
    { __typename?: 'Project' }
    & { cover?: Maybe<(
      { __typename?: 'CoverType' }
      & Pick<CoverType, 'uri' | 'default'>
    )> }
    & ProjectFragment
  )> }
);

export type LikeCommentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikeCommentMutation = (
  { __typename?: 'Mutation' }
  & { likeComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
    & { likes?: Maybe<(
      { __typename?: 'Likes' }
      & Pick<Likes, 'isLiked' | 'totalCount'>
    )> }
  )> }
);

export type LikePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & { likePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
    & { likes?: Maybe<(
      { __typename?: 'Likes' }
      & Pick<Likes, 'isLiked' | 'totalCount'>
    )> }
  )> }
);

export type MarkAllNotificationsSeenMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsSeenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'markAllNotificationsSeen'>
);

export type MarkNotificationSeenMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MarkNotificationSeenMutation = (
  { __typename?: 'Mutation' }
  & { markNotificationSeen?: Maybe<(
    { __typename?: 'Notification' }
    & NotificationFragment
  )> }
);

export type PreSignUrlMutationVariables = Exact<{
  input: PreSignedUrlInput;
}>;


export type PreSignUrlMutation = (
  { __typename?: 'Mutation' }
  & { preSignUrl?: Maybe<(
    { __typename?: 'PreSignedUrl' }
    & Pick<PreSignedUrl, 'url' | 'type' | 'filename'>
  )> }
);

export type PreSignUrlsMutationVariables = Exact<{
  input: Array<Maybe<PreSignedUrlnput>>;
}>;


export type PreSignUrlsMutation = (
  { __typename?: 'Mutation' }
  & { preSignUrls?: Maybe<Array<Maybe<(
    { __typename?: 'PreSignedUrl' }
    & Pick<PreSignedUrl, 'url' | 'type' | 'filename'>
  )>>> }
);

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = (
  { __typename?: 'Mutation' }
  & { token?: Maybe<(
    { __typename?: 'AccessToken' }
    & Pick<AccessToken, 'access_token'>
  )> }
);

export type RegisterDeviceTokenMutationVariables = Exact<{
  token: Scalars['String'];
  platform: PlatformType;
}>;


export type RegisterDeviceTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'registerDeviceToken'>
);

export type ToggleNotificationSettingsMutationVariables = Exact<{
  input?: Maybe<ToggleNotificationSettingsInput>;
}>;


export type ToggleNotificationSettingsMutation = (
  { __typename?: 'Mutation' }
  & { toggleNotificationSettings?: Maybe<(
    { __typename?: 'User' }
    & UserSettingsFragment
  )> }
);

export type BookmarksQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type BookmarksQuery = (
  { __typename?: 'Query' }
  & { bookmarks?: Maybe<(
    { __typename?: 'BookmarkConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'BookmarkEdge' }
      & Pick<BookmarkEdge, 'cursor'>
      & { node: (
        { __typename?: 'Post' }
        & PostFragment
      ) }
    )>> }
  )> }
);

export type CollectionsQueryVariables = Exact<{
  id: Scalars['ID'];
  projectId: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type CollectionsQuery = (
  { __typename?: 'Query' }
  & { collections?: Maybe<(
    { __typename?: 'PostConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'PostEdge' }
      & Pick<PostEdge, 'cursor'>
      & { node: (
        { __typename?: 'Post' }
        & PostFragment
      ) }
    )>> }
  )> }
);

export type CommentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CommentQuery = (
  { __typename?: 'Query' }
  & { comment?: Maybe<(
    { __typename?: 'Comment' }
    & CommentFragment
  )> }
);

export type CommentsQueryVariables = Exact<{
  postId: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & PostFragment
  )>, comments?: Maybe<(
    { __typename?: 'CommentConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'CommentEdge' }
      & Pick<CommentEdge, 'cursor'>
      & { node: (
        { __typename?: 'Comment' }
        & CommentAndRepliesFragment
      ) }
    )>> }
  )> }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'avatarUrl' | 'bio' | 'dynamicLink' | 'firstName' | 'fullName' | 'id' | 'isOnline' | 'isSilhouette' | 'lastName' | 'location' | 'projectCount' | 'username' | 'website' | 'role'>
    & { settings?: Maybe<(
      { __typename?: 'UserSettings' }
      & Pick<UserSettings, 'timezone' | 'locale'>
    )>, interestedIn?: Maybe<Array<Maybe<(
      { __typename?: 'ProjectType' }
      & Pick<ProjectType, 'id' | 'title'>
    )>>> }
    & UserProjectsFragment
  )> }
);

export type CurrentUserFollowingProjectsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type CurrentUserFollowingProjectsQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { projects?: Maybe<(
      { __typename?: 'ProjectsConnection' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage'>
      ), edges?: Maybe<Array<(
        { __typename?: 'ProjectEdge' }
        & Pick<ProjectEdge, 'cursor'>
        & { node: (
          { __typename?: 'Project' }
          & { cover?: Maybe<(
            { __typename?: 'CoverType' }
            & Pick<CoverType, 'uri' | 'default'>
          )> }
          & ProjectFragment
        ) }
      )>> }
    )> }
  )> }
);

export type CurrentUserProfileQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type CurrentUserProfileQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & { projects?: Maybe<(
      { __typename?: 'ProjectsConnection' }
      & { edges?: Maybe<Array<(
        { __typename?: 'ProjectEdge' }
        & { node: (
          { __typename?: 'Project' }
          & { cover?: Maybe<(
            { __typename?: 'CoverType' }
            & Pick<CoverType, 'uri' | 'default'>
          )> }
          & ProjectFragment
        ) }
      )>> }
    )>, posts?: Maybe<(
      { __typename?: 'PostConnection' }
      & { edges?: Maybe<Array<(
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

export type CurrentUserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserProjectsQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserProjectsFragment
  )> }
);

export type CurrentUserSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserSettingsQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserSettingsFragment
  )> }
);

export type FeedQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed?: Maybe<(
    { __typename?: 'Feed' }
    & { posts?: Maybe<(
      { __typename?: 'PostConnection' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage'>
      ), edges?: Maybe<Array<(
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

export type FollowersQueryVariables = Exact<{
  projectId: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type FollowersQuery = (
  { __typename?: 'Query' }
  & { followers?: Maybe<(
    { __typename?: 'FollowersConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'FollowersEdge' }
      & Pick<FollowersEdge, 'cursor'>
      & { node: (
        { __typename?: 'User' }
        & UserFragment
      ) }
    )>> }
  )> }
);

export type GrowthQueryVariables = Exact<{
  type: GrowthType;
}>;


export type GrowthQuery = (
  { __typename?: 'Query' }
  & { growth?: Maybe<Array<Maybe<(
    { __typename?: 'GrowthData' }
    & Pick<GrowthData, 'date' | 'count'>
  )>>> }
);

export type HashtagQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['LowercaseString']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type HashtagQuery = (
  { __typename?: 'Query' }
  & { hashtag?: Maybe<(
    { __typename?: 'Hashtag' }
    & { posts?: Maybe<(
      { __typename?: 'PostConnection' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage'>
      ), edges?: Maybe<Array<(
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

export type LikesQueryVariables = Exact<{
  postId: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type LikesQuery = (
  { __typename?: 'Query' }
  & { likes?: Maybe<(
    { __typename?: 'LikeConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'LikeEdge' }
      & Pick<LikeEdge, 'cursor'>
      & { node: (
        { __typename?: 'User' }
        & UserFragment
      ) }
    )>> }
  )> }
);

export type MetaQueryVariables = Exact<{ [key: string]: never; }>;


export type MetaQuery = (
  { __typename?: 'Query' }
  & { meta?: Maybe<(
    { __typename?: 'Meta' }
    & Pick<Meta, 'totalUsers' | 'totalUsersToday' | 'totalPostsToday' | 'totalProjectsToday' | 'totalCommentsToday' | 'totalFilesToday' | 'totalComments' | 'totalProjects' | 'totalPosts' | 'totalFiles'>
  )> }
);

export type NotificationsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications?: Maybe<(
    { __typename?: 'NotificationsConnection' }
    & Pick<NotificationsConnection, 'unreadCount'>
    & { pageInfo?: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    )>, edges?: Maybe<Array<Maybe<(
      { __typename?: 'NotificationEdge' }
      & Pick<NotificationEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'Notification' }
        & NotificationFragment
      )> }
    )>>> }
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & PostFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<(
    { __typename?: 'PostConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'PostEdge' }
      & Pick<PostEdge, 'cursor'>
      & { node: (
        { __typename?: 'Post' }
        & PostFragment
      ) }
    )>> }
  )> }
);

export type ProjectQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['LowercaseString']>;
  after?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & PostFragment
  )>, project?: Maybe<(
    { __typename?: 'Project' }
    & { posts?: Maybe<(
      { __typename?: 'PostConnection' }
      & { edges?: Maybe<Array<(
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

export type ProjectCollectionsQueryVariables = Exact<{
  projectId: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type ProjectCollectionsQuery = (
  { __typename?: 'Query' }
  & { projectCollections?: Maybe<(
    { __typename?: 'CollectionConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'CollectionEdge' }
      & Pick<CollectionEdge, 'cursor'>
      & { node: (
        { __typename?: 'Collection' }
        & Pick<Collection, 'id' | 'name'>
        & { cover?: Maybe<(
          { __typename?: 'CoverType' }
          & Pick<CoverType, 'uri'>
        )> }
      ) }
    )>> }
  )> }
);

export type ProjectSuggestionsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type ProjectSuggestionsQuery = (
  { __typename?: 'Query' }
  & { projects?: Maybe<Array<Maybe<(
    { __typename?: 'ProjectSuggestionsConnection' }
    & { type?: Maybe<(
      { __typename?: 'ProjectType' }
      & Pick<ProjectType, 'id' | 'title'>
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'ProjectEdge' }
      & { node: (
        { __typename?: 'Project' }
        & { cover?: Maybe<(
          { __typename?: 'CoverType' }
          & Pick<CoverType, 'uri' | 'default'>
        )> }
        & ProjectFragment
      ) }
    )>> }
  )>>> }
);

export type ProjectTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectTypesQuery = (
  { __typename?: 'Query' }
  & { types?: Maybe<Array<Maybe<(
    { __typename?: 'ProjectType' }
    & Pick<ProjectType, 'id' | 'title' | 'imageUrl'>
  )>>> }
);

export type ProjectsQueryVariables = Exact<{
  typeId?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  type: ProjectSortType;
}>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects?: Maybe<(
    { __typename?: 'ProjectsConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'ProjectEdge' }
      & Pick<ProjectEdge, 'cursor'>
      & { node: (
        { __typename?: 'Project' }
        & { cover?: Maybe<(
          { __typename?: 'CoverType' }
          & Pick<CoverType, 'uri' | 'default'>
        )> }
        & ProjectFragment
      ) }
    )>> }
  )> }
);

export type RecentCommentsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
}>;


export type RecentCommentsQuery = (
  { __typename?: 'Query' }
  & { comments?: Maybe<(
    { __typename?: 'CommentConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges?: Maybe<Array<(
      { __typename?: 'CommentEdge' }
      & Pick<CommentEdge, 'cursor'>
      & { node: (
        { __typename?: 'Comment' }
        & CommentAndRepliesFragment
      ) }
    )>> }
  )> }
);

export type RepliesQueryVariables = Exact<{
  id: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type RepliesQuery = (
  { __typename?: 'Query' }
  & { comment?: Maybe<(
    { __typename?: 'Comment' }
    & { replies?: Maybe<(
      { __typename?: 'CommentConnection' }
      & Pick<CommentConnection, 'totalCount'>
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage'>
      ), edges?: Maybe<Array<(
        { __typename?: 'CommentEdge' }
        & Pick<CommentEdge, 'cursor'>
        & { node: (
          { __typename?: 'Comment' }
          & CommentFragment
        ) }
      )>> }
    )> }
  )> }
);

export type SearchHashtagsQueryVariables = Exact<{
  query: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type SearchHashtagsQuery = (
  { __typename?: 'Query' }
  & { hashtags?: Maybe<(
    { __typename?: 'SearchResults' }
    & { pageInfo?: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    )>, edges?: Maybe<Array<Maybe<(
      { __typename?: 'SearchResultEdge' }
      & Pick<SearchResultEdge, 'cursor'>
      & { node?: Maybe<{ __typename?: 'Project' } | { __typename?: 'User' } | { __typename?: 'Model' } | (
        { __typename?: 'Hashtag' }
        & Pick<Hashtag, 'id' | 'name' | 'slug' | 'totalCount'>
      )> }
    )>>> }
  )> }
);

export type SearchModelsQueryVariables = Exact<{
  query: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type SearchModelsQuery = (
  { __typename?: 'Query' }
  & { models?: Maybe<(
    { __typename?: 'SearchResults' }
    & { pageInfo?: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    )>, edges?: Maybe<Array<Maybe<(
      { __typename?: 'SearchResultEdge' }
      & { node?: Maybe<{ __typename?: 'Project' } | { __typename?: 'User' } | (
        { __typename?: 'Model' }
        & Pick<Model, 'id' | 'model' | 'year'>
        & { brand?: Maybe<(
          { __typename?: 'Brand' }
          & Pick<Brand, 'name'>
        )> }
      ) | { __typename?: 'Hashtag' }> }
    )>>> }
  )> }
);

export type SearchProjectsQueryVariables = Exact<{
  query: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type SearchProjectsQuery = (
  { __typename?: 'Query' }
  & { projects?: Maybe<(
    { __typename?: 'SearchResults' }
    & { pageInfo?: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    )>, edges?: Maybe<Array<Maybe<(
      { __typename?: 'SearchResultEdge' }
      & Pick<SearchResultEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'Project' }
        & { cover?: Maybe<(
          { __typename?: 'CoverType' }
          & Pick<CoverType, 'uri' | 'default'>
        )> }
        & ProjectFragment
      ) | { __typename?: 'User' } | { __typename?: 'Model' } | { __typename?: 'Hashtag' }> }
    )>>> }
  )> }
);

export type SearchUsersQueryVariables = Exact<{
  query: Scalars['String'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type SearchUsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<(
    { __typename?: 'SearchResults' }
    & { pageInfo?: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    )>, edges?: Maybe<Array<Maybe<(
      { __typename?: 'SearchResultEdge' }
      & Pick<SearchResultEdge, 'cursor'>
      & { node?: Maybe<{ __typename?: 'Project' } | (
        { __typename?: 'User' }
        & Pick<User, 'projectCount'>
        & UserFragment
      ) | { __typename?: 'Model' } | { __typename?: 'Hashtag' }> }
    )>>> }
  )> }
);

export type SimilarProjectsQueryVariables = Exact<{
  id: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
}>;


export type SimilarProjectsQuery = (
  { __typename?: 'Query' }
  & { similarProjects?: Maybe<(
    { __typename?: 'ProjectsConnection' }
    & { edges?: Maybe<Array<(
      { __typename?: 'ProjectEdge' }
      & Pick<ProjectEdge, 'cursor'>
      & { node: (
        { __typename?: 'Project' }
        & { cover?: Maybe<(
          { __typename?: 'CoverType' }
          & Pick<CoverType, 'uri'>
        )> }
        & ProjectFragment
      ) }
    )>> }
  )> }
);

export type UserQueryVariables = Exact<{
  username: Scalars['LowercaseString'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & { projects?: Maybe<(
      { __typename?: 'ProjectsConnection' }
      & { edges?: Maybe<Array<(
        { __typename?: 'ProjectEdge' }
        & { node: (
          { __typename?: 'Project' }
          & { cover?: Maybe<(
            { __typename?: 'CoverType' }
            & Pick<CoverType, 'uri' | 'default'>
          )> }
          & ProjectFragment
        ) }
      )>> }
    )>, posts?: Maybe<(
      { __typename?: 'PostConnection' }
      & { edges?: Maybe<Array<(
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

export type UserFollowingProjectsQueryVariables = Exact<{
  username: Scalars['LowercaseString'];
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type UserFollowingProjectsQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { projects?: Maybe<(
      { __typename?: 'ProjectsConnection' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'hasNextPage'>
      ), edges?: Maybe<Array<(
        { __typename?: 'ProjectEdge' }
        & Pick<ProjectEdge, 'cursor'>
        & { node: (
          { __typename?: 'Project' }
          & { cover?: Maybe<(
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
  dynamicLink
}
    `;
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
  user {
    ...User
  }
}
    ${UserFragmentDoc}`;
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
    ${CommentFragmentDoc}`;
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
  followers: followersConnection(first: 3) {
    totalCount
    edges {
      node {
        id
        avatarUrl
      }
    }
  }
}
    ${UserFragmentDoc}`;
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
  files: filesConnection(type: IMAGE, first: 1) {
    edges {
      node {
        id
        uri
      }
    }
  }
}
    ${UserFragmentDoc}
${ProjectFragmentDoc}`;
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
}
    ${UserFragmentDoc}
${ProjectFragmentDoc}
${CommentFragmentDoc}`;
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
    `;
export const AddCollectionDocument = gql`
    mutation addCollection($projectId: ID!, $name: String!) {
  addCollection(projectId: $projectId, name: $name) {
    name
    id
  }
}
    `;
export type AddCollectionMutationFn = Apollo.MutationFunction<AddCollectionMutation, AddCollectionMutationVariables>;

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
export function useAddCollectionMutation(baseOptions?: Apollo.MutationHookOptions<AddCollectionMutation, AddCollectionMutationVariables>) {
        return Apollo.useMutation<AddCollectionMutation, AddCollectionMutationVariables>(AddCollectionDocument, baseOptions);
      }
export type AddCollectionMutationHookResult = ReturnType<typeof useAddCollectionMutation>;
export type AddCollectionMutationResult = Apollo.MutationResult<AddCollectionMutation>;
export type AddCollectionMutationOptions = Apollo.BaseMutationOptions<AddCollectionMutation, AddCollectionMutationVariables>;
export const AddCommentDocument = gql`
    mutation addComment($postId: ID!, $commentId: ID, $input: CommentInput!) {
  addComment(postId: $postId, commentId: $commentId, input: $input) {
    commentId
    id
    text
  }
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

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
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const AddPostDocument = gql`
    mutation addPost($input: PostInput!) {
  addPost(input: $input) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

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
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, baseOptions);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const AddProjectDocument = gql`
    mutation addProject($input: ProjectInput!) {
  addProject(input: $input) {
    ...Project
  }
}
    ${ProjectFragmentDoc}`;
export type AddProjectMutationFn = Apollo.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;

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
export function useAddProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>) {
        return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(AddProjectDocument, baseOptions);
      }
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export type AddProjectMutationResult = Apollo.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const AuthenticateAppleDocument = gql`
    mutation authenticateApple($identityToken: String!, $user: ApplePayload!) {
  authenticateApple(identityToken: $identityToken, user: $user) {
    access_token
    refresh_token
  }
}
    `;
export type AuthenticateAppleMutationFn = Apollo.MutationFunction<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>;

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
export function useAuthenticateAppleMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>) {
        return Apollo.useMutation<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>(AuthenticateAppleDocument, baseOptions);
      }
export type AuthenticateAppleMutationHookResult = ReturnType<typeof useAuthenticateAppleMutation>;
export type AuthenticateAppleMutationResult = Apollo.MutationResult<AuthenticateAppleMutation>;
export type AuthenticateAppleMutationOptions = Apollo.BaseMutationOptions<AuthenticateAppleMutation, AuthenticateAppleMutationVariables>;
export const AuthenticateFacebookDocument = gql`
    mutation authenticateFacebook($token: String!) {
  authenticateFacebook(token: $token) {
    access_token
    refresh_token
  }
}
    `;
export type AuthenticateFacebookMutationFn = Apollo.MutationFunction<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>;

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
export function useAuthenticateFacebookMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>) {
        return Apollo.useMutation<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>(AuthenticateFacebookDocument, baseOptions);
      }
export type AuthenticateFacebookMutationHookResult = ReturnType<typeof useAuthenticateFacebookMutation>;
export type AuthenticateFacebookMutationResult = Apollo.MutationResult<AuthenticateFacebookMutation>;
export type AuthenticateFacebookMutationOptions = Apollo.BaseMutationOptions<AuthenticateFacebookMutation, AuthenticateFacebookMutationVariables>;
export const AuthenticateGoogleDocument = gql`
    mutation authenticateGoogle($idToken: String!) {
  authenticateGoogle(idToken: $idToken) {
    access_token
    refresh_token
  }
}
    `;
export type AuthenticateGoogleMutationFn = Apollo.MutationFunction<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>;

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
export function useAuthenticateGoogleMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>) {
        return Apollo.useMutation<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>(AuthenticateGoogleDocument, baseOptions);
      }
export type AuthenticateGoogleMutationHookResult = ReturnType<typeof useAuthenticateGoogleMutation>;
export type AuthenticateGoogleMutationResult = Apollo.MutationResult<AuthenticateGoogleMutation>;
export type AuthenticateGoogleMutationOptions = Apollo.BaseMutationOptions<AuthenticateGoogleMutation, AuthenticateGoogleMutationVariables>;
export const BookmarkPostDocument = gql`
    mutation bookmarkPost($id: ID!) {
  bookmarkPost(id: $id) {
    id
    bookmarks {
      isBookmarked
    }
  }
}
    `;
export type BookmarkPostMutationFn = Apollo.MutationFunction<BookmarkPostMutation, BookmarkPostMutationVariables>;

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
export function useBookmarkPostMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkPostMutation, BookmarkPostMutationVariables>) {
        return Apollo.useMutation<BookmarkPostMutation, BookmarkPostMutationVariables>(BookmarkPostDocument, baseOptions);
      }
export type BookmarkPostMutationHookResult = ReturnType<typeof useBookmarkPostMutation>;
export type BookmarkPostMutationResult = Apollo.MutationResult<BookmarkPostMutation>;
export type BookmarkPostMutationOptions = Apollo.BaseMutationOptions<BookmarkPostMutation, BookmarkPostMutationVariables>;
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
    `;
export type CollectPostsMutationFn = Apollo.MutationFunction<CollectPostsMutation, CollectPostsMutationVariables>;

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
export function useCollectPostsMutation(baseOptions?: Apollo.MutationHookOptions<CollectPostsMutation, CollectPostsMutationVariables>) {
        return Apollo.useMutation<CollectPostsMutation, CollectPostsMutationVariables>(CollectPostsDocument, baseOptions);
      }
export type CollectPostsMutationHookResult = ReturnType<typeof useCollectPostsMutation>;
export type CollectPostsMutationResult = Apollo.MutationResult<CollectPostsMutation>;
export type CollectPostsMutationOptions = Apollo.BaseMutationOptions<CollectPostsMutation, CollectPostsMutationVariables>;
export const DeleteCollectionDocument = gql`
    mutation deleteCollection($projectId: ID!, $id: ID!) {
  deleteCollection(id: $id, projectId: $projectId) {
    id
  }
}
    `;
export type DeleteCollectionMutationFn = Apollo.MutationFunction<DeleteCollectionMutation, DeleteCollectionMutationVariables>;

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
export function useDeleteCollectionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCollectionMutation, DeleteCollectionMutationVariables>) {
        return Apollo.useMutation<DeleteCollectionMutation, DeleteCollectionMutationVariables>(DeleteCollectionDocument, baseOptions);
      }
export type DeleteCollectionMutationHookResult = ReturnType<typeof useDeleteCollectionMutation>;
export type DeleteCollectionMutationResult = Apollo.MutationResult<DeleteCollectionMutation>;
export type DeleteCollectionMutationOptions = Apollo.BaseMutationOptions<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($id: ID!) {
  deleteComment(id: $id)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

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
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteCurrentUserDocument = gql`
    mutation deleteCurrentUser {
  deleteCurrentUser
}
    `;
export type DeleteCurrentUserMutationFn = Apollo.MutationFunction<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>;

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
export function useDeleteCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>) {
        return Apollo.useMutation<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>(DeleteCurrentUserDocument, baseOptions);
      }
export type DeleteCurrentUserMutationHookResult = ReturnType<typeof useDeleteCurrentUserMutation>;
export type DeleteCurrentUserMutationResult = Apollo.MutationResult<DeleteCurrentUserMutation>;
export type DeleteCurrentUserMutationOptions = Apollo.BaseMutationOptions<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation deleteNotification($id: ID!) {
  deleteNotification(id: $id)
}
    `;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;

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
export function useDeleteNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, baseOptions);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    id
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

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
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($id: ID!) {
  deleteProject(id: $id)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

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
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, baseOptions);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const EditPostDocument = gql`
    mutation editPost($id: ID!, $input: EditPostInput!) {
  editPost(id: $id, input: $input) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

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
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, baseOptions);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const EditProjectDocument = gql`
    mutation editProject($id: ID!, $input: ProjectInput!) {
  editProject(id: $id, input: $input) {
    id
    title
  }
}
    `;
export type EditProjectMutationFn = Apollo.MutationFunction<EditProjectMutation, EditProjectMutationVariables>;

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
export function useEditProjectMutation(baseOptions?: Apollo.MutationHookOptions<EditProjectMutation, EditProjectMutationVariables>) {
        return Apollo.useMutation<EditProjectMutation, EditProjectMutationVariables>(EditProjectDocument, baseOptions);
      }
export type EditProjectMutationHookResult = ReturnType<typeof useEditProjectMutation>;
export type EditProjectMutationResult = Apollo.MutationResult<EditProjectMutation>;
export type EditProjectMutationOptions = Apollo.BaseMutationOptions<EditProjectMutation, EditProjectMutationVariables>;
export const EditUserDocument = gql`
    mutation editUser($input: EditUserInput!, $id: ID) {
  editUser(input: $input, id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

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
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, baseOptions);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
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
    ${ProjectFragmentDoc}`;
export type FollowProjectMutationFn = Apollo.MutationFunction<FollowProjectMutation, FollowProjectMutationVariables>;

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
export function useFollowProjectMutation(baseOptions?: Apollo.MutationHookOptions<FollowProjectMutation, FollowProjectMutationVariables>) {
        return Apollo.useMutation<FollowProjectMutation, FollowProjectMutationVariables>(FollowProjectDocument, baseOptions);
      }
export type FollowProjectMutationHookResult = ReturnType<typeof useFollowProjectMutation>;
export type FollowProjectMutationResult = Apollo.MutationResult<FollowProjectMutation>;
export type FollowProjectMutationOptions = Apollo.BaseMutationOptions<FollowProjectMutation, FollowProjectMutationVariables>;
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
    `;
export type LikeCommentMutationFn = Apollo.MutationFunction<LikeCommentMutation, LikeCommentMutationVariables>;

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
export function useLikeCommentMutation(baseOptions?: Apollo.MutationHookOptions<LikeCommentMutation, LikeCommentMutationVariables>) {
        return Apollo.useMutation<LikeCommentMutation, LikeCommentMutationVariables>(LikeCommentDocument, baseOptions);
      }
export type LikeCommentMutationHookResult = ReturnType<typeof useLikeCommentMutation>;
export type LikeCommentMutationResult = Apollo.MutationResult<LikeCommentMutation>;
export type LikeCommentMutationOptions = Apollo.BaseMutationOptions<LikeCommentMutation, LikeCommentMutationVariables>;
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
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

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
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, baseOptions);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const MarkAllNotificationsSeenDocument = gql`
    mutation markAllNotificationsSeen {
  markAllNotificationsSeen
}
    `;
export type MarkAllNotificationsSeenMutationFn = Apollo.MutationFunction<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>;

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
export function useMarkAllNotificationsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>) {
        return Apollo.useMutation<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>(MarkAllNotificationsSeenDocument, baseOptions);
      }
export type MarkAllNotificationsSeenMutationHookResult = ReturnType<typeof useMarkAllNotificationsSeenMutation>;
export type MarkAllNotificationsSeenMutationResult = Apollo.MutationResult<MarkAllNotificationsSeenMutation>;
export type MarkAllNotificationsSeenMutationOptions = Apollo.BaseMutationOptions<MarkAllNotificationsSeenMutation, MarkAllNotificationsSeenMutationVariables>;
export const MarkNotificationSeenDocument = gql`
    mutation markNotificationSeen($id: ID!) {
  markNotificationSeen(id: $id) {
    ...Notification
  }
}
    ${NotificationFragmentDoc}`;
export type MarkNotificationSeenMutationFn = Apollo.MutationFunction<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>;

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
export function useMarkNotificationSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>) {
        return Apollo.useMutation<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>(MarkNotificationSeenDocument, baseOptions);
      }
export type MarkNotificationSeenMutationHookResult = ReturnType<typeof useMarkNotificationSeenMutation>;
export type MarkNotificationSeenMutationResult = Apollo.MutationResult<MarkNotificationSeenMutation>;
export type MarkNotificationSeenMutationOptions = Apollo.BaseMutationOptions<MarkNotificationSeenMutation, MarkNotificationSeenMutationVariables>;
export const PreSignUrlDocument = gql`
    mutation preSignUrl($input: PreSignedUrlInput!) {
  preSignUrl(input: $input) {
    url
    type
    filename
  }
}
    `;
export type PreSignUrlMutationFn = Apollo.MutationFunction<PreSignUrlMutation, PreSignUrlMutationVariables>;

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
export function usePreSignUrlMutation(baseOptions?: Apollo.MutationHookOptions<PreSignUrlMutation, PreSignUrlMutationVariables>) {
        return Apollo.useMutation<PreSignUrlMutation, PreSignUrlMutationVariables>(PreSignUrlDocument, baseOptions);
      }
export type PreSignUrlMutationHookResult = ReturnType<typeof usePreSignUrlMutation>;
export type PreSignUrlMutationResult = Apollo.MutationResult<PreSignUrlMutation>;
export type PreSignUrlMutationOptions = Apollo.BaseMutationOptions<PreSignUrlMutation, PreSignUrlMutationVariables>;
export const PreSignUrlsDocument = gql`
    mutation preSignUrls($input: [PreSignedUrlnput]!) {
  preSignUrls(input: $input) {
    url
    type
    filename
  }
}
    `;
export type PreSignUrlsMutationFn = Apollo.MutationFunction<PreSignUrlsMutation, PreSignUrlsMutationVariables>;

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
export function usePreSignUrlsMutation(baseOptions?: Apollo.MutationHookOptions<PreSignUrlsMutation, PreSignUrlsMutationVariables>) {
        return Apollo.useMutation<PreSignUrlsMutation, PreSignUrlsMutationVariables>(PreSignUrlsDocument, baseOptions);
      }
export type PreSignUrlsMutationHookResult = ReturnType<typeof usePreSignUrlsMutation>;
export type PreSignUrlsMutationResult = Apollo.MutationResult<PreSignUrlsMutation>;
export type PreSignUrlsMutationOptions = Apollo.BaseMutationOptions<PreSignUrlsMutation, PreSignUrlsMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($refreshToken: String!) {
  token: refreshToken(refreshToken: $refreshToken) {
    access_token
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

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
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, baseOptions);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RegisterDeviceTokenDocument = gql`
    mutation registerDeviceToken($token: String!, $platform: PlatformType!) {
  registerDeviceToken(token: $token, platform: $platform)
}
    `;
export type RegisterDeviceTokenMutationFn = Apollo.MutationFunction<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;

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
export function useRegisterDeviceTokenMutation(baseOptions?: Apollo.MutationHookOptions<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>) {
        return Apollo.useMutation<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>(RegisterDeviceTokenDocument, baseOptions);
      }
export type RegisterDeviceTokenMutationHookResult = ReturnType<typeof useRegisterDeviceTokenMutation>;
export type RegisterDeviceTokenMutationResult = Apollo.MutationResult<RegisterDeviceTokenMutation>;
export type RegisterDeviceTokenMutationOptions = Apollo.BaseMutationOptions<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;
export const ToggleNotificationSettingsDocument = gql`
    mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {
  toggleNotificationSettings(input: $input) {
    ...UserSettings
  }
}
    ${UserSettingsFragmentDoc}`;
export type ToggleNotificationSettingsMutationFn = Apollo.MutationFunction<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>;

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
export function useToggleNotificationSettingsMutation(baseOptions?: Apollo.MutationHookOptions<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>) {
        return Apollo.useMutation<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>(ToggleNotificationSettingsDocument, baseOptions);
      }
export type ToggleNotificationSettingsMutationHookResult = ReturnType<typeof useToggleNotificationSettingsMutation>;
export type ToggleNotificationSettingsMutationResult = Apollo.MutationResult<ToggleNotificationSettingsMutation>;
export type ToggleNotificationSettingsMutationOptions = Apollo.BaseMutationOptions<ToggleNotificationSettingsMutation, ToggleNotificationSettingsMutationVariables>;
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
    ${PostFragmentDoc}`;

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
export function useBookmarksQuery(baseOptions?: Apollo.QueryHookOptions<BookmarksQuery, BookmarksQueryVariables>) {
        return Apollo.useQuery<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, baseOptions);
      }
export function useBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookmarksQuery, BookmarksQueryVariables>) {
          return Apollo.useLazyQuery<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, baseOptions);
        }
export type BookmarksQueryHookResult = ReturnType<typeof useBookmarksQuery>;
export type BookmarksLazyQueryHookResult = ReturnType<typeof useBookmarksLazyQuery>;
export type BookmarksQueryResult = Apollo.QueryResult<BookmarksQuery, BookmarksQueryVariables>;
export const CollectionsDocument = gql`
    query collections($id: ID!, $projectId: ID!, $after: String, $first: Int = 5) @connection(key: "collections") {
  collections(id: $id, projectId: $projectId, after: $after, first: $first) {
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
export function useCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<CollectionsQuery, CollectionsQueryVariables>) {
        return Apollo.useQuery<CollectionsQuery, CollectionsQueryVariables>(CollectionsDocument, baseOptions);
      }
export function useCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionsQuery, CollectionsQueryVariables>) {
          return Apollo.useLazyQuery<CollectionsQuery, CollectionsQueryVariables>(CollectionsDocument, baseOptions);
        }
export type CollectionsQueryHookResult = ReturnType<typeof useCollectionsQuery>;
export type CollectionsLazyQueryHookResult = ReturnType<typeof useCollectionsLazyQuery>;
export type CollectionsQueryResult = Apollo.QueryResult<CollectionsQuery, CollectionsQueryVariables>;
export const CommentDocument = gql`
    query comment($id: ID!) {
  comment(id: $id) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;

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
export function useCommentQuery(baseOptions?: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>) {
        return Apollo.useQuery<CommentQuery, CommentQueryVariables>(CommentDocument, baseOptions);
      }
export function useCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>) {
          return Apollo.useLazyQuery<CommentQuery, CommentQueryVariables>(CommentDocument, baseOptions);
        }
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export type CommentQueryResult = Apollo.QueryResult<CommentQuery, CommentQueryVariables>;
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
${CommentAndRepliesFragmentDoc}`;

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
export function useCommentsQuery(baseOptions?: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
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
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
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
    ${ProjectFragmentDoc}`;

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
export function useCurrentUserFollowingProjectsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>) {
        return Apollo.useQuery<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>(CurrentUserFollowingProjectsDocument, baseOptions);
      }
export function useCurrentUserFollowingProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>(CurrentUserFollowingProjectsDocument, baseOptions);
        }
export type CurrentUserFollowingProjectsQueryHookResult = ReturnType<typeof useCurrentUserFollowingProjectsQuery>;
export type CurrentUserFollowingProjectsLazyQueryHookResult = ReturnType<typeof useCurrentUserFollowingProjectsLazyQuery>;
export type CurrentUserFollowingProjectsQueryResult = Apollo.QueryResult<CurrentUserFollowingProjectsQuery, CurrentUserFollowingProjectsQueryVariables>;
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
 *      first: // value for 'first'
 *   },
 * });
 */
export function useCurrentUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>) {
        return Apollo.useQuery<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>(CurrentUserProfileDocument, baseOptions);
      }
export function useCurrentUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>(CurrentUserProfileDocument, baseOptions);
        }
export type CurrentUserProfileQueryHookResult = ReturnType<typeof useCurrentUserProfileQuery>;
export type CurrentUserProfileLazyQueryHookResult = ReturnType<typeof useCurrentUserProfileLazyQuery>;
export type CurrentUserProfileQueryResult = Apollo.QueryResult<CurrentUserProfileQuery, CurrentUserProfileQueryVariables>;
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
export function useCurrentUserProjectsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>) {
        return Apollo.useQuery<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>(CurrentUserProjectsDocument, baseOptions);
      }
export function useCurrentUserProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>(CurrentUserProjectsDocument, baseOptions);
        }
export type CurrentUserProjectsQueryHookResult = ReturnType<typeof useCurrentUserProjectsQuery>;
export type CurrentUserProjectsLazyQueryHookResult = ReturnType<typeof useCurrentUserProjectsLazyQuery>;
export type CurrentUserProjectsQueryResult = Apollo.QueryResult<CurrentUserProjectsQuery, CurrentUserProjectsQueryVariables>;
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
export function useCurrentUserSettingsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>) {
        return Apollo.useQuery<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>(CurrentUserSettingsDocument, baseOptions);
      }
export function useCurrentUserSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>(CurrentUserSettingsDocument, baseOptions);
        }
export type CurrentUserSettingsQueryHookResult = ReturnType<typeof useCurrentUserSettingsQuery>;
export type CurrentUserSettingsLazyQueryHookResult = ReturnType<typeof useCurrentUserSettingsLazyQuery>;
export type CurrentUserSettingsQueryResult = Apollo.QueryResult<CurrentUserSettingsQuery, CurrentUserSettingsQueryVariables>;
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
 *      first: // value for 'first'
 *   },
 * });
 */
export function useFeedQuery(baseOptions?: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const FollowersDocument = gql`
    query followers($projectId: ID!, $after: String, $first: Int = 10) {
  followers(projectId: $projectId, after: $after, first: $first) @connection(key: "followers", filter: ["projectId"]) {
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
 *      first: // value for 'first'
 *   },
 * });
 */
export function useFollowersQuery(baseOptions?: Apollo.QueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
        return Apollo.useQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, baseOptions);
      }
export function useFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
          return Apollo.useLazyQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, baseOptions);
        }
export type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>;
export type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>;
export type FollowersQueryResult = Apollo.QueryResult<FollowersQuery, FollowersQueryVariables>;
export const GrowthDocument = gql`
    query growth($type: GrowthType!) {
  growth(type: $type) {
    date
    count
  }
}
    `;

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
export function useGrowthQuery(baseOptions?: Apollo.QueryHookOptions<GrowthQuery, GrowthQueryVariables>) {
        return Apollo.useQuery<GrowthQuery, GrowthQueryVariables>(GrowthDocument, baseOptions);
      }
export function useGrowthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrowthQuery, GrowthQueryVariables>) {
          return Apollo.useLazyQuery<GrowthQuery, GrowthQueryVariables>(GrowthDocument, baseOptions);
        }
export type GrowthQueryHookResult = ReturnType<typeof useGrowthQuery>;
export type GrowthLazyQueryHookResult = ReturnType<typeof useGrowthLazyQuery>;
export type GrowthQueryResult = Apollo.QueryResult<GrowthQuery, GrowthQueryVariables>;
export const HashtagDocument = gql`
    query hashtag($id: ID, $slug: LowercaseString, $after: String, $first: Int = 5) {
  hashtag(id: $id, slug: $slug) {
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
    ${PostFragmentDoc}`;

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
export function useHashtagQuery(baseOptions?: Apollo.QueryHookOptions<HashtagQuery, HashtagQueryVariables>) {
        return Apollo.useQuery<HashtagQuery, HashtagQueryVariables>(HashtagDocument, baseOptions);
      }
export function useHashtagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HashtagQuery, HashtagQueryVariables>) {
          return Apollo.useLazyQuery<HashtagQuery, HashtagQueryVariables>(HashtagDocument, baseOptions);
        }
export type HashtagQueryHookResult = ReturnType<typeof useHashtagQuery>;
export type HashtagLazyQueryHookResult = ReturnType<typeof useHashtagLazyQuery>;
export type HashtagQueryResult = Apollo.QueryResult<HashtagQuery, HashtagQueryVariables>;
export const LikesDocument = gql`
    query likes($postId: ID!, $after: String, $first: Int = 10) {
  likes(postId: $postId, first: $first, after: $after) {
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
export function useLikesQuery(baseOptions?: Apollo.QueryHookOptions<LikesQuery, LikesQueryVariables>) {
        return Apollo.useQuery<LikesQuery, LikesQueryVariables>(LikesDocument, baseOptions);
      }
export function useLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LikesQuery, LikesQueryVariables>) {
          return Apollo.useLazyQuery<LikesQuery, LikesQueryVariables>(LikesDocument, baseOptions);
        }
export type LikesQueryHookResult = ReturnType<typeof useLikesQuery>;
export type LikesLazyQueryHookResult = ReturnType<typeof useLikesLazyQuery>;
export type LikesQueryResult = Apollo.QueryResult<LikesQuery, LikesQueryVariables>;
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
    `;

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
        return Apollo.useQuery<MetaQuery, MetaQueryVariables>(MetaDocument, baseOptions);
      }
export function useMetaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MetaQuery, MetaQueryVariables>) {
          return Apollo.useLazyQuery<MetaQuery, MetaQueryVariables>(MetaDocument, baseOptions);
        }
export type MetaQueryHookResult = ReturnType<typeof useMetaQuery>;
export type MetaLazyQueryHookResult = ReturnType<typeof useMetaLazyQuery>;
export type MetaQueryResult = Apollo.QueryResult<MetaQuery, MetaQueryVariables>;
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
    ${NotificationFragmentDoc}`;

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
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, baseOptions);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, baseOptions);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
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
export function usePostQuery(baseOptions?: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
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
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const ProjectDocument = gql`
    query project($id: ID, $slug: LowercaseString, $after: String, $postId: ID, $first: Int = 5) {
  post(id: $postId) {
    ...Post
  }
  project(id: $id, slug: $slug) {
    ...Project
    posts: postsConnection(first: $first, after: $after) @connection(key: "posts") {
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
 *      first: // value for 'first'
 *   },
 * });
 */
export function useProjectQuery(baseOptions?: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectCollectionsDocument = gql`
    query projectCollections($projectId: ID!, $after: String, $first: Int = 10) {
  projectCollections(projectId: $projectId, first: $first, after: $after) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        name
        cover {
          uri
        }
      }
    }
  }
}
    `;

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
export function useProjectCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>) {
        return Apollo.useQuery<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>(ProjectCollectionsDocument, baseOptions);
      }
export function useProjectCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>) {
          return Apollo.useLazyQuery<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>(ProjectCollectionsDocument, baseOptions);
        }
export type ProjectCollectionsQueryHookResult = ReturnType<typeof useProjectCollectionsQuery>;
export type ProjectCollectionsLazyQueryHookResult = ReturnType<typeof useProjectCollectionsLazyQuery>;
export type ProjectCollectionsQueryResult = Apollo.QueryResult<ProjectCollectionsQuery, ProjectCollectionsQueryVariables>;
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
export function useProjectSuggestionsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>) {
        return Apollo.useQuery<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>(ProjectSuggestionsDocument, baseOptions);
      }
export function useProjectSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>) {
          return Apollo.useLazyQuery<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>(ProjectSuggestionsDocument, baseOptions);
        }
export type ProjectSuggestionsQueryHookResult = ReturnType<typeof useProjectSuggestionsQuery>;
export type ProjectSuggestionsLazyQueryHookResult = ReturnType<typeof useProjectSuggestionsLazyQuery>;
export type ProjectSuggestionsQueryResult = Apollo.QueryResult<ProjectSuggestionsQuery, ProjectSuggestionsQueryVariables>;
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
export function useProjectTypesQuery(baseOptions?: Apollo.QueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>) {
        return Apollo.useQuery<ProjectTypesQuery, ProjectTypesQueryVariables>(ProjectTypesDocument, baseOptions);
      }
export function useProjectTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectTypesQuery, ProjectTypesQueryVariables>) {
          return Apollo.useLazyQuery<ProjectTypesQuery, ProjectTypesQueryVariables>(ProjectTypesDocument, baseOptions);
        }
export type ProjectTypesQueryHookResult = ReturnType<typeof useProjectTypesQuery>;
export type ProjectTypesLazyQueryHookResult = ReturnType<typeof useProjectTypesLazyQuery>;
export type ProjectTypesQueryResult = Apollo.QueryResult<ProjectTypesQuery, ProjectTypesQueryVariables>;
export const ProjectsDocument = gql`
    query projects($typeId: ID, $after: String, $first: Int = 5, $type: ProjectSortType!) {
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
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
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
    ${CommentAndRepliesFragmentDoc}`;

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
export function useRecentCommentsQuery(baseOptions?: Apollo.QueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>) {
        return Apollo.useQuery<RecentCommentsQuery, RecentCommentsQueryVariables>(RecentCommentsDocument, baseOptions);
      }
export function useRecentCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>) {
          return Apollo.useLazyQuery<RecentCommentsQuery, RecentCommentsQueryVariables>(RecentCommentsDocument, baseOptions);
        }
export type RecentCommentsQueryHookResult = ReturnType<typeof useRecentCommentsQuery>;
export type RecentCommentsLazyQueryHookResult = ReturnType<typeof useRecentCommentsLazyQuery>;
export type RecentCommentsQueryResult = Apollo.QueryResult<RecentCommentsQuery, RecentCommentsQueryVariables>;
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
    ${CommentFragmentDoc}`;

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
export function useRepliesQuery(baseOptions?: Apollo.QueryHookOptions<RepliesQuery, RepliesQueryVariables>) {
        return Apollo.useQuery<RepliesQuery, RepliesQueryVariables>(RepliesDocument, baseOptions);
      }
export function useRepliesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepliesQuery, RepliesQueryVariables>) {
          return Apollo.useLazyQuery<RepliesQuery, RepliesQueryVariables>(RepliesDocument, baseOptions);
        }
export type RepliesQueryHookResult = ReturnType<typeof useRepliesQuery>;
export type RepliesLazyQueryHookResult = ReturnType<typeof useRepliesLazyQuery>;
export type RepliesQueryResult = Apollo.QueryResult<RepliesQuery, RepliesQueryVariables>;
export const SearchHashtagsDocument = gql`
    query searchHashtags($query: String!, $after: String, $first: Int = 10) {
  hashtags: search(query: $query, after: $after, type: HASHTAGS, first: $first) @connection(key: "hashtags", filter: ["query", "type"]) {
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
    `;

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
export function useSearchHashtagsQuery(baseOptions?: Apollo.QueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>) {
        return Apollo.useQuery<SearchHashtagsQuery, SearchHashtagsQueryVariables>(SearchHashtagsDocument, baseOptions);
      }
export function useSearchHashtagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>) {
          return Apollo.useLazyQuery<SearchHashtagsQuery, SearchHashtagsQueryVariables>(SearchHashtagsDocument, baseOptions);
        }
export type SearchHashtagsQueryHookResult = ReturnType<typeof useSearchHashtagsQuery>;
export type SearchHashtagsLazyQueryHookResult = ReturnType<typeof useSearchHashtagsLazyQuery>;
export type SearchHashtagsQueryResult = Apollo.QueryResult<SearchHashtagsQuery, SearchHashtagsQueryVariables>;
export const SearchModelsDocument = gql`
    query searchModels($query: String!, $after: String, $first: Int = 20) {
  models: search(query: $query, after: $after, type: MODELS, first: $first) @connection(key: "models", filter: ["query", "type"]) {
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
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSearchModelsQuery(baseOptions?: Apollo.QueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>) {
        return Apollo.useQuery<SearchModelsQuery, SearchModelsQueryVariables>(SearchModelsDocument, baseOptions);
      }
export function useSearchModelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchModelsQuery, SearchModelsQueryVariables>) {
          return Apollo.useLazyQuery<SearchModelsQuery, SearchModelsQueryVariables>(SearchModelsDocument, baseOptions);
        }
export type SearchModelsQueryHookResult = ReturnType<typeof useSearchModelsQuery>;
export type SearchModelsLazyQueryHookResult = ReturnType<typeof useSearchModelsLazyQuery>;
export type SearchModelsQueryResult = Apollo.QueryResult<SearchModelsQuery, SearchModelsQueryVariables>;
export const SearchProjectsDocument = gql`
    query searchProjects($query: String!, $after: String, $first: Int = 10) {
  projects: search(query: $query, after: $after, type: PROJECTS, first: $first) @connection(key: "projects", filter: ["query", "type"]) {
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
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSearchProjectsQuery(baseOptions?: Apollo.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
        return Apollo.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, baseOptions);
      }
export function useSearchProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
          return Apollo.useLazyQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, baseOptions);
        }
export type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>;
export type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>;
export type SearchProjectsQueryResult = Apollo.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;
export const SearchUsersDocument = gql`
    query searchUsers($query: String!, $after: String, $first: Int = 10) {
  users: search(query: $query, after: $after, type: USERS, first: $first) @connection(key: "users", filter: ["query", "type"]) {
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
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions?: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, baseOptions);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, baseOptions);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
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
 *      first: // value for 'first'
 *   },
 * });
 */
export function useSimilarProjectsQuery(baseOptions?: Apollo.QueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>) {
        return Apollo.useQuery<SimilarProjectsQuery, SimilarProjectsQueryVariables>(SimilarProjectsDocument, baseOptions);
      }
export function useSimilarProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>) {
          return Apollo.useLazyQuery<SimilarProjectsQuery, SimilarProjectsQueryVariables>(SimilarProjectsDocument, baseOptions);
        }
export type SimilarProjectsQueryHookResult = ReturnType<typeof useSimilarProjectsQuery>;
export type SimilarProjectsLazyQueryHookResult = ReturnType<typeof useSimilarProjectsLazyQuery>;
export type SimilarProjectsQueryResult = Apollo.QueryResult<SimilarProjectsQuery, SimilarProjectsQueryVariables>;
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
 *      first: // value for 'first'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
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
 *      first: // value for 'first'
 *   },
 * });
 */
export function useUserFollowingProjectsQuery(baseOptions?: Apollo.QueryHookOptions<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>) {
        return Apollo.useQuery<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>(UserFollowingProjectsDocument, baseOptions);
      }
export function useUserFollowingProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>) {
          return Apollo.useLazyQuery<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>(UserFollowingProjectsDocument, baseOptions);
        }
export type UserFollowingProjectsQueryHookResult = ReturnType<typeof useUserFollowingProjectsQuery>;
export type UserFollowingProjectsLazyQueryHookResult = ReturnType<typeof useUserFollowingProjectsLazyQuery>;
export type UserFollowingProjectsQueryResult = Apollo.QueryResult<UserFollowingProjectsQuery, UserFollowingProjectsQueryVariables>;