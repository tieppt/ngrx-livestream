import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Post } from '../../core/models/post.model';
import { PostService } from '../../core/services/post.service';
import { Observable } from 'rxjs';
import {vmFromLatest} from '../../core/utils/operators.util';
import { Store, select } from '@ngrx/store';
import { getPosts, sortingPost } from '../../core/store/post/post.actions';
import { postsSelector, postStatusSelector, postSortingSelector } from '../../core/store/post/post.selector';
import { AppState } from '../../core/store/app.state';
import { map, first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

interface PostListVm {
  posts: Post[];
  isLoading: boolean;
  sort?: 'asc' | 'desc';
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styles: [
    `
    .sorting {
      min-width: 250px;
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit {

  vm$: Observable<PostListVm>;

  sortCtrl = new FormControl(null);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // TODO: selector and dispatch
    this.store.dispatch(getPosts());

    this.vm$ = vmFromLatest<PostListVm>({
      posts: this.store.pipe(select(postsSelector)),
      sort: this.store.pipe(select(postSortingSelector)),
      isLoading: this.store.pipe(select(postStatusSelector), map(status => status === 'loading'))
    });
    this.vm$.subscribe(vm => {
      this.sortCtrl.setValue(vm.sort, {emitEvent: false});
    });
    this.sortCtrl.valueChanges.subscribe(value => this.setSorting(value));
  }

  setSorting(order: 'asc' | 'desc') {
    this.store.dispatch(sortingPost({sort: order}));
  }

}
