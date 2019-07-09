import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Post {
    id?: string;
    title: string;
    description: string;
    price: string;
    model: string;
  }


@Injectable({
    providedIn: 'root'
  })

export class PostService {
  private postsCollection: AngularFirestoreCollection<Post>;
  private posts: Observable<Post[]>;

  constructor(private db: AngularFirestore) { 
    this.postsCollection = db.collection<Post>('posts');

    this.posts = this.postsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }


  getPosts(): Observable<Post[]> {
    return this.posts;
    }
}