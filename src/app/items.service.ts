import * as firebase from 'firebase';
import { Injectable } from "@angular/core";
import { MyService } from "src/app/firebase.service";

@Injectable()

export class  ItemService  {
    constructor(private dbService: MyService) { }
    chat = [];
    grill = [];
    juices = [];
    shawarma = [];
    chatItems() {
        this.dbService.chatItems().on('child_added', data => {
            this.chat.push(data.val());
          })
        }
    grillItems() {
        this.dbService.grillItems().on('child_added', data => { 
          this.grill.push(data.val());
        })
    }
    juiceItems() {
        this.dbService.juiceItems().on('child_added', data => {
          this.juices.push(data.val());
        })
    }
    shawarmaItems() {
        this.dbService.shawarmaItems().on('child_added',  data  => {
            console.log(data);
            this.shawarma.push(data.val());
        })
    }
}