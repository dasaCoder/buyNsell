import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalController } from '@ionic/angular';

import { Post, PostService } from './posts.service';
import { Tab2Page } from '../tab2/tab2.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {

  private retrievedPosts: Observable<Post[]>;

  constructor(
    private aut: AngularFireAuth,
    private router: Router,
    private postServie: PostService,
    public modalController: ModalController) { 
     
    }

    ngOnInit() {
        this.retrievedPosts = this.postServie.getPosts();
    }

    goAnOtherPage(post) {

    }

    test(item) {
      console.log("t",item);
    }

  async signOut() {
    const res = await this.aut.auth.signOut();
    console.log(res);
    this.router.navigateByUrl('/login');
  }
}
