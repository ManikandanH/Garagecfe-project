import { Component, OnInit } from "@angular/core";
import { MyService } from "src/app/firebase.service";
import { MyeditdialogComponent } from "src/app/myeditdialog/myeditdialog.component";
import { MatDialog } from "@angular/material/dialog";
import { BillingService } from "src/app/billing.service";
import * as firebase from "firebase";
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-chats",
  templateUrl: "./chats.component.html",
  styleUrls: ["./chats.component.css"]
})
export class ChatsComponent implements OnInit {
  chat: {
    name: String;
    category: String;
    addedFlag: boolean;
    price: number;
  }[] = [];
  progressFlag: boolean = false;
  searchText: String = "";
  noItemFlag: boolean = false;
  constructor(
    public snackBar: MatSnackBar,
    private dbService: MyService,
    private billingService: BillingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.progressFlag = true;
    this.dbService.chatItems().once("value", data => {
        if (data.val() !== null) {
        this.dbService.chatItems().on("child_added", items => {
          this.chat.push(items.val());
          this.progressFlag = false;
          this.noItemFlag = false;
        });
      } else {
        this.noItemFlag = true;
        this.progressFlag = false;
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  editItem(item, index) {
    let dialogRef = this.dialog.open(MyeditdialogComponent, {
      width: "300px",
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      if (item.name !== result.name) {
        this.chat.splice(index, 1);
        this.dbService.chatItems().child(item.name).remove();
        this.dbService.chatItems().child(item.name).set({
          name: result.name,
          category: result.category,
          price: result.price
        })
      } else if (item.name === result.name) {
        this.chat[index] = result;
        this.dbService.chatItems().child(item.name).set({
          name: result.name,
          category: result.category,
          price: result.price
        })
      }
    });
  }
  billing(item, index) {
    let addedFlag = 0;
    item.quantity = 1;
    item.newPrice = item.price;
    for (let i = 0; i < this.billingService.billingItems.length; i++) {
      if (this.billingService.billingItems[i].name === item.name) {
        this.openSnackBar('It is already added to the billing section','error');
        addedFlag = 1;
        break;
      }
    }
    if (addedFlag === 0) {
      this.billingService.billingItems.push(item);
      this.openSnackBar('Successfully added to the billing section','success');
    }
  }
  delete(item, index) {
    let dialogRef = this.dialog.open(DeleteDialogComponent,{
      width: '300px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'delete') {
        this.dbService.chatItems().child(item.name).remove();
        this.chat.splice(index, 1);
        this.openSnackBar('This item has been removed','success');
      }
    })
  }
}
