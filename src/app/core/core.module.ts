import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './store/post/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/post/post.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('feature_post', postReducer),
    EffectsModule.forFeature([PostEffects])
  ]
})
export class CoreModule {}
