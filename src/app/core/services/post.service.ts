import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs: AngularFirestore) { }

  getPosts() {
    return this.afs.collection<Post>('posts').valueChanges({
      idField: 'id'
    });
  }

  getPostById(id: string) {
    return this.afs.collection('posts').doc<Post>(id).valueChanges().pipe(
      map(post => {
        return {
          ...post,
          id
        } as Post;
      })
    );
  }
}
