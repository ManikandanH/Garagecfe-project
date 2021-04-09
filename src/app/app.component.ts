import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {
  title = "Bil";
  constructor() {}

  ngOnInit() {
    var config = {
      apiKey: "AIzaSyDy5oBQo63J9pi67Ujtm5ajwo7sApIt56Y",
      authDomain: "garagcfe.firebaseapp.com",
      databaseURL: "https://garagcfe.firebaseio.com",
      projectId: "garagcfe",
      storageBucket: "",
      messagingSenderId: "664089038611"
    };
    firebase.initializeApp(config);
    
  }
}
