import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  
  title;
  price;
  description;
  model;
  
  constructor(){}

  processForm(event) {
    //event.preventDefault();
    console.log(this.title,this.description);
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
