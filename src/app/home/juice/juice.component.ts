import { Component, OnInit } from "@angular/core";
import { MyService } from "src/app/firebase.service";
import { MatDialog } from "@angular/material/dialog";
import { MyeditdialogComponent } from "src/app/myeditdialog/myeditdialog.component";
import * as firebase from "firebase";
import { BillingService } from "src/app/billing.service";
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-juice",
  templateUrl: "./juice.component.html",
  styleUrls: ["./juice.component.css"]
})
export class JuiceComponent implements OnInit {
  Juices: { name: String; category: String; price: number }[] = [];
  progressFlag: boolean = false;
  searchText: String = null ;
  noItemFlag: boolean = false;
  constructor(
    public snackBar: MatSnackBar,
    private dbService: MyService,
    private billingService: BillingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.progressFlag = true;
    this.dbService.juiceItems().once("value", data => {
      if (data.val() !== null) {
        this.dbService.juiceItems().on("child_added", items => {
          this.Juices.push(items.val());
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
      console.log(result);
      console.log(item);
      if (item.name !== result.name) {
        this.Juices.splice(index, 1);
        this.dbService.juiceItems().child(item.name).remove();
        this.dbService.juiceItems().child(item.name).set({
          name: result.name,
          category: result.category,
          price: result.price
        })
      } else if (item.name === result.name) {
        this.Juices[index] = result;
        this.dbService.juiceItems().child(item.name).set({
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
        this.dbService.juiceItems().child(item.name).remove();
        this.Juices.splice(index, 1);
        this.openSnackBar('This item has been removed','success');
      }
    })
  }
}
