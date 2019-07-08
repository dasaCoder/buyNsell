import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  id?: string;
  title: string;
  description: string;
  price: string;
  model: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {

  private postsCollection: AngularFirestoreCollection<Post>;
  private posts: Observable<Post[]>;
  private retrievedPosts: Observable<Post[]>;

  constructor(
    private aut: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore) { 
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

      //console.log(this.posts);  
    }

    ngOnInit() {
      this.getPosts();
    }

    getPosts() {
      this.posts.subscribe(data => {
        console.log("tat",data);
        this.retrievedPosts = data;
      })
    }

  async signOut() {
    const res = await this.aut.auth.signOut();
    console.log(res);
    this.router.navigateByUrl('/login');
  }
}
