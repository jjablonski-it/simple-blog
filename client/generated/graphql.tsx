export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  test: Scalars['String'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  upvotes: Array<Upvote>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  textSnippet: PostText;
  voteStatus?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  posts: Array<Post>;
  upvotes: Array<Upvote>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Upvote = {
  __typename?: 'Upvote';
  value: Scalars['Float'];
  userId: Scalars['Float'];
  user: User;
  postId: Scalars['Float'];
  post: Post;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type PostText = {
  __typename?: 'PostText';
  text: Scalars['String'];
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  upvote: Post;
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  login?: Maybe<UserResponse>;
  register: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationUpvoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  input: UsernamePasswordInput;
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Error>;
  user?: Maybe<User>;
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]'>
  & { textSnippet: (
    { __typename?: 'PostText' }
    & Pick<PostText, '[object Object]' | '[object Object]'>
  ), creator: (
    { __typename?: 'User' }
    & Pick<User, '[object Object]' | '[object Object]'>
  ) }
);

export type ReguralUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '[object Object]' | '[object Object]' | '[object Object]'>
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & RegularPostFragment
  ) }
);

export type DeleteMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, '[object Object]'>
);

export type LoginMutationVariables = Exact<{
  input: UsernamePasswordInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserResponse' }
    & { error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, '[object Object]' | '[object Object]'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & ReguralUserFragment
    )> }
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, '[object Object]'>
);

export type RegisterMutationVariables = Exact<{
  input: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & ReguralUserFragment
    )>, error?: Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, '[object Object]' | '[object Object]'>
    )> }
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, '[object Object]' | '[object Object]' | '[object Object]'>
    & { textSnippet: (
      { __typename?: 'PostText' }
      & Pick<PostText, '[object Object]' | '[object Object]'>
    ) }
  )> }
);

export type UpvoteMutationVariables = Exact<{
  postId: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type UpvoteMutation = (
  { __typename?: 'Mutation' }
  & { upvote: (
    { __typename?: 'Post' }
    & RegularPostFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & ReguralUserFragment
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, '[object Object]'>
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Int']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, '[object Object]'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & RegularPostFragment
    )> }
  ) }
);
