import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FileChooser } from '@ionic-native/file-chooser/ngx';

export interface Post {
  id?: string;
  title: string;
  description: string;
  price: string;
  model: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private postsCollection: AngularFirestoreCollection<Post>;
  private posts: Observable<Post[]>;
  
  title;
  price;
  description;
  model;
  
  constructor(db: AngularFirestore, private fileChooser: FileChooser){
    this.postsCollection = db.collection<Post>('posts');
  }

  processForm(event) {
    //event.preventDefault();
    let post = {
      title: this.title,
      price: this.price,
      description: this.description,
      model: this.model
    }
    console.log(this.title,this.description);
    this.postsCollection.add(post);
  }

  chooseFile() {
    this.fileChooser.open()
        .then(uri => console.log(uri))
        .catch(e => console.log(e));
  }
  
 handleTitle(event) {
    this.title = event.target.value;
    console.log(this.title,this.description);
  }

  handlePrice(event) {
    this.price = event.target.value;
  }

  handleModel(event) {
    this.model = event.target.value;
  }

  handleDes(event) {
    this.description = event.target.value;
  }
}
