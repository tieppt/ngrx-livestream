import { createReducer, on } from '@ngrx/store';
import { PostState } from './post.state';
import * as PostActions from './post.actions';
import { orderBy } from 'lodash-es';

const initialState: PostState = {
  items: [],
  currentItem: null,
  status: 'idle',
  error: '',
  sort: null,
};

export function postReducer(
  state: PostState = initialState,
  action: PostActions.PostActions
): PostState {
  switch (action.type) {
    case PostActions.GET_POSTS:
      return { ...state, status: 'loading' };
    case PostActions.GET_POSTS_SUCCESS: {
      let items = action.posts;
      const sortOrder = state.sort;
      if (sortOrder) {
        items = orderBy([...items], ['createdAt'], [sortOrder]);
      }
      return { ...state, status: 'idle', items, error: '' };
    }
    case PostActions.GET_POSTS_FAILED:
      return { ...state, status: 'error', items: [], error: action.error };
    case PostActions.GET_POST:
      return { ...state, status: 'loading' };
    case PostActions.GET_POST_SUCCESS:
      return { ...state, status: 'idle', currentItem: action.item };
    case PostActions.GET_POST_FAILED:
      return {
        ...state,
        status: 'error',
        currentItem: null,
        error: action.error,
      };
    case PostActions.SORTING_POSTS: {
      let items = state.items;
      const sortOrder = !action.sort ? null : action.sort === 'asc' ? 'asc' : 'desc';
      if (sortOrder) {
        items = orderBy([...items], ['createdAt'], [sortOrder]);
      }
      return {
        ...state,
        items,
        sort: action.sort
      };
    }
    default:
      return state;
  }
}
