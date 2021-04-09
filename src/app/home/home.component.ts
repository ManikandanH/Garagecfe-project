import { Component, OnInit } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { MyDialogComponent } from "src/app/my-dialog/my-dialog.component";
import { MyService } from "src/app/firebase.service";
import { MyeditdialogComponent } from "../myeditdialog//myeditdialog.component";
import * as firebase from 'firebase';
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  dialogResult: String;
  progressFlag: boolean = false;
  grill:{name: String, category: String, price: number }[] = [];
  chat: {name: String, category: String, price: number}[] = [];
  Juices: {name: String, category: String, price: number}[] = [];
  grillFlag: boolean = false;
  chatFlag: boolean = false;
  juiceFlag: boolean = false;

  constructor(private authService:AuthService,private route: Router, public dialog: MatDialog, private dbService : MyService) {}

  ngOnInit() {
      if(!this.authService.isAuthenticated){
        this.route.navigate(['/'])
      }
  }
  

  orders() {
    this.route.navigate(["/orders"]);
  }

  addItem() {
    let dialogRef = this.dialog.open(MyDialogComponent, {
      width: "300px",
      data: "This text is passed into the dialog!"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
        this.dbService.items(result);
    });
  }

  logout() {
    localStorage.removeItem('uid');
    this.route.navigate(['/']);
  }

  datas() {
    
  }
}

