import { createAction, props, ActionType } from '@ngrx/store';
import { Post } from '../../models/post.model';

export const GET_POSTS = '@Post/GetAll';
export const GET_POSTS_SUCCESS = '@Post/GetAllSuccess';
export const GET_POSTS_FAILED = '@Post/GetAllFailed';
export const GET_POST = '@Post/Get';
export const GET_POST_SUCCESS = '@Post/GetSuccess';
export const GET_POST_FAILED = '@Post/GetFailed';
export const CREATE_POST = '@Post/Create';
export const UPDATE_POST = '@Post/Update';
export const SORTING_POSTS = '@Post/Sorting';

export const getPosts = createAction(GET_POSTS);
export const getPostsSuccess = createAction(
  GET_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);
export const getPostsFailed = createAction(
  GET_POSTS_FAILED,
  props<{ error?: string }>()
);
export const getPost = createAction(GET_POST, props<{ id: string }>());
export const getPostSuccess = createAction(GET_POST_SUCCESS, props<{ item: Post }>());
export const getPostFailed = createAction(GET_POST_FAILED, props<{ error?: string }>());
export const createPost = createAction(CREATE_POST, props<{ post: Post }>()); // TODO: create post parameters type
export const updatePost = createAction(UPDATE_POST, props<{ post: Post }>()); // TODO: update post parameters type

export const sortingPost = createAction(SORTING_POSTS, props<{sort: 'asc' | 'desc' | null}>());

export type PostActions =
  | ActionType<typeof getPosts>
  | ActionType<typeof getPostsSuccess>
  | ActionType<typeof getPostsFailed>
  | ActionType<typeof getPost>
  | ActionType<typeof getPostSuccess>
  | ActionType<typeof getPostFailed>
  | ActionType<typeof createPost>
  | ActionType<typeof updatePost>
  | ActionType<typeof sortingPost>;

// export class UpdatePostAction implements Action {
//   readonly type = UpdatePost;
//   constructor(public payload: number) {} // fake payload
// }

// export const updatePost = createAction(UpdatePost, props<{payload: number}>());
