import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FileChooser } from '@ionic-native/file-chooser/ngx';
//import firebase from 'firebase';

import { UploadService, Upload } from '../tab1/posts.service';

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

  selectedFiles:FileList;
  currentUpload: Upload;
  
  constructor(
    db: AngularFirestore, 
    private fileChooser: FileChooser,
    private uploadService: UploadService
    ){
    this.postsCollection = db.collection<Post>('posts');
  }

  processForm(event) {
    //event.preventDefault();
    let post = {
      title: this.title,
      price: this.price,
      description: this.description,
      model: this.model,
      file: this.selectedFiles.item(0).name
    }
    console.log(this.title,this.description);
    this.postsCollection.add(post);
  }

  chooseFile() {
    this.fileChooser.open()
        .then(uri => {
          console.log(uri);
          alert(uri);
        })
        .catch(e => console.log(e));
  }

  detectFiles(event) {
    console.log("target",event.target.files);
    this.selectedFiles = event.target.files;
}

  uploadFile() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    console.log("current file",this.currentUpload);
    this.uploadService.pushUpload(this.currentUpload);
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
