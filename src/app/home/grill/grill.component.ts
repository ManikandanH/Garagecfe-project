import { Component, OnInit } from "@angular/core";
import { MyService } from "src/app/firebase.service";
import { MyeditdialogComponent } from "src/app/myeditdialog/myeditdialog.component";
import { MatDialog } from "@angular/material/dialog";
import * as firebase from "firebase";

import { ItemService } from "src/app/items.service";
import { MyGrillDialogComponent } from "src/app/my-grill-dialog/my-grill-dialog.component";
import { BillingService } from "src/app/billing.service";
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-grill",
  templateUrl: "./grill.component.html",
  styleUrls: ["./grill.component.css"]
})
export class GrillComponent implements OnInit {
  grill: { name: String; category: String; price: number }[] = [];
  progressFlag: boolean = false;
  billingFlag: boolean = false;
  searchText: String = "";
  noItemFlag: boolean = false;
  constructor(
    public snackBar: MatSnackBar,
    private dbService: MyService,
    private billingService: BillingService,
    public dialog: MatDialog,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.progressFlag = true;
    console.log("a");

    this.dbService.grillItems().on("value", data => {
      if (data.val() !== null) {
        this.dbService.grillItems().on("child_added", items => {
          console.log(items.val());
          this.grill.push(items.val());
          this.progressFlag = false;
          this.noItemFlag = false;
          console.log(this.grill);
        });
      } else {
        this.noItemFlag = true;
        this.progressFlag = false;
      }
    });
  }

  editItem(item, index) {
    let dialogRef = this.dialog.open(MyeditdialogComponent, {
      width: "300px",
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      if (item.name !== result.name) {
        console.log(result);
        console.log(index);
        this.grill.splice(index, 1);
        console.log(this.grill);
        this.dbService.grillItems().child(item.name).remove();
        this.dbService.grillItems().child(item.name).set({
          name: result.name,
          category:result.category,
          price: result.price
        })
      } else if (item.name === result.name) {
        this.grill[index] = result;
        this.dbService.grillItems().child(item.name).set({
          name: result.name,
          category:result.category,
          price: result.price
        })
      }
    });
  }
  delete(item, index) {
    let dialogRef = this.dialog.open(DeleteDialogComponent,{
      width: '300px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'delete') {
        this.dbService.grillItems().child(item.name).remove();
        this.grill.splice(index, 1);
        this.openSnackBar('This item has been removed','success');
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  billing(item, index) {
    let addedFlag = 0;
    item.quantity = 1;
    item.newPrice = item.price;
    for (let i = 0; i < this.billingService.billingItems.length; i++) {
      if (this.billingService.billingItems[i].name === item.name) {
        this.openSnackBar('It is already added to the billing section', 'error');
        addedFlag = 1;
        break;
      }
    }
    if (addedFlag === 0) {
      let dialogRef = this.dialog.open(MyGrillDialogComponent, {
        width: "300px",
        data: item
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result !== undefined) {
          this.billingService.billingItems.push(result);
        }
      });
    }
  }
}
