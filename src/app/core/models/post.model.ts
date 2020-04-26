import * as firebase from 'firebase';
export interface PostUser {
  id: string;
  username: string;
  avatar: string;
}

export interface Post {
  caption?: string;
  images: string[];
  user: PostUser;
  createdAt: Date | firebase.firestore.Timestamp;
}
