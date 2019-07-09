import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../tab1/posts.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  key;
  post;
  constructor(private route:ActivatedRoute, private postService:PostService, private navCtrl:NavController) {
      this.key = this.route.snapshot.params['key'];
      console.log(this.key);

      this.postService.getOnePost(this.key)
          .subscribe(data=>{
            console.log("d",data);
            this.post = data;
          });

   }

  ngOnInit() {
  }

  bckClick(){
    this.navCtrl.navigateBack('/tabs/tab1'); 
    } 

}
