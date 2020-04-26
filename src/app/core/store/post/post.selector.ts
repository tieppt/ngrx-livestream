import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.state';

const featurePost = createFeatureSelector<PostState>('feature_post');

export const postsSelector = createSelector(featurePost, state => state.items);
export const currentPostSelector = createSelector(featurePost, state => state.currentItem);
export const postStatusSelector = createSelector(featurePost, state => state.status);
export const postSortingSelector = createSelector(featurePost, state => state.sort);
