import { Component, OnInit } from "@angular/core";
import { BillingService } from "src/app/billing.service";
import { MyService } from "src/app/firebase.service";
import { MatDialog } from "@angular/material/dialog";
import { MyeditdialogComponent } from "src/app/myeditdialog/myeditdialog.component";
import * as firebase from "firebase";
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-shawarma",
  templateUrl: "./shawarma.component.html",
  styleUrls: ["./shawarma.component.css"]
})
export class ShawarmaComponent implements OnInit {
  Shawarma: { name: String; category: String; price: number }[] = [];
  progressFlag: boolean = false;
  noItemFlag: boolean = false;
  searchText: String = "";

  constructor(
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private dbService: MyService,
    private billingService: BillingService
  ) {}

  ngOnInit() {
    this.progressFlag = true;
    this.dbService.shawarmaItems().once("value", data => {
      if (data.val() !== null) {
        this.dbService.shawarmaItems().on("child_added", items => {
          this.Shawarma.push(items.val());
          this.progressFlag = false;
          this.noItemFlag = false;
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
      console.log(result);
      console.log(item);
      if (item.name !== result.name) {
        this.Shawarma.splice(index, 1);
        this.dbService
          .shawarmaItems()
          .child(item.name)
          .remove();
        this.dbService
          .shawarmaItems()
          .child(item.name)
          .set({
            name: result.name,
            category: result.category,
            price: result.price
          });
      } else if (item.name === result.name) {
        this.Shawarma[index] = result;
        this.dbService
          .shawarmaItems()
          .child(item.name)
          .set({
            name: result.name,
            category: result.category,
            price: result.price
          });
      }
    });
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
        this.dbService.shawarmaItems().child(item.name).remove();
        this.Shawarma.splice(index, 1);
        this.openSnackBar('This item has been removed','success');
      }
    })
  }
}
