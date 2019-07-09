import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import {
    AngularFireStorage,
    AngularFireUploadTask
  } from '@angular/fire/storage';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

export interface Post {
    id?: string;
    title: string;
    description: string;
    price: string;
    model: string;
  }

  export class Upload {

    $key: string;
    file:File;
    name:string;
    url:string;
    progress:number;
    createdAt: Date = new Date();
  
    constructor(file:File) {
      this.file = file;
    }
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

export class UploadService {

    constructor() { }
  
    private basePath:string = '/images';
    //uploads: AngularFireList<Upload[]>;
  
    pushUpload(upload: Upload) {
      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
  
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          // upload failed
          console.log(error)
        },
        () => {
          // upload success
          upload.url = uploadTask.snapshot.downloadURL
          console.log("upload det",uploadTask.snapshot.downloadURL);
          upload.name = upload.file.name
          return this.saveFileData(upload)
        }
      );
    }
  
  
  
    // Writes the file details to the realtime db
    private saveFileData(upload: Upload) {
        
      //this.db.list(`${this.basePath}/`).push(upload);
    }
  }